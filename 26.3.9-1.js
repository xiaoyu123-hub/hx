import { connect } from 'cloudflare:sockets';
/* ===================== 1. 配置 ===================== */
const 配置 = {
  私钥: "12345",
  全局反代IP: "ProxyIP.KR.CMLiussss.net:443",
  启用DOH查询转换: true,
  优先查询IPV6: false,
  本地严格缓存: true,
  DOH服务器列表: [
    "https://1.1.1.1/dns-query",
    "https://dns.google/resolve",
    "https://cloudflare-dns.com/dns-query",
  ],

  // --- TCP随机填充 (注：此版本中此部分配置由下面的填充逻辑实现) ---
  启用随机填充: true, 

  // --- DOH ---
  启用DOH响应随机填充: false,
  DNS缓存最大条目: 2000,
  连接超时_MS: 5000,
  DOH_并行数: 3,
  DOH_请求超时_MS: 3000,
  DOH_最小缓存秒: 30,
  DOH_最大缓存扰动秒: 60,

  // --- 空闲填充 ---
  空闲填充最小间隔: 1000,
  空闲填充最大间隔: 3000,
  空闲填充最小长度: 100,
  空闲填充最大长度: 500,
  空闲阈值因子: 0.5, // 空闲超过阈值才触发填充

  // --- 恒定速率 ---
  强制恒定填充: false,
  恒定填充目标速率_Bps: 10240, // 10 KB/s
  恒定填充周期_MS: 200,
};

/* ===================== 2. 模式应用逻辑 ===================== */
(function 应用模式() {
  switch (配置.模式) {
    case "调试":
      配置.启用随机填充 = false;
      配置.启用DOH响应随机填充 = false;
      配置.强制恒定填充 = false;
      break;
    case "日常":
      配置.启用随机填充 = true;
      配置.启用DOH响应随机填充 = false;
      配置.强制恒定填充 = false;
      break;
    case "高对抗(补齐型)":
      配置.启用随机填充 = true;
      配置.启用DOH响应随机填充 = true;
      配置.强制恒定填充 = true;
      配置.恒定填充目标速率_Bps = 10240; // 10 KB/s
      break;
    case "高对抗(强制型)":
      配置.启用随机填充 = true;
      配置.启用DOH响应随机填充 = true;
      配置.强制恒定填充 = true;
      配置.恒定填充目标速率_Bps = 20480; // 20 KB/s
      break;
    case "省流量":
      配置.启用随机填充 = false;
      配置.启用DOH响应随机填充 = false;
      配置.强制恒定填充 = false;
      break;
    default:
      console.warn(`未知模式 "${配置.模式}"，使用调试配置。`);
      配置.启用随机填充 = false;
      配置.启用DOH响应随机填充 = false;
      配置.强制恒定填充 = false;
  }
})();

/* ===================== 3. 全局状态 ===================== */
globalThis.DNS缓存记录 = globalThis.DNS缓存记录 ?? new Map();
globalThis.DOH_IN_FLIGHT = globalThis.DOH_IN_FLIGHT ?? new Map();

/* ===================== 4. 私钥提取 ===================== */
function 提取私钥(访问请求) {
  const url = new URL(访问请求.url);
  return url.searchParams.get("my-key") ?? null;
}

/* ===================== 5. DOH 查询工具 ===================== */
// ... (此部分代码无变化，为节省篇幅已折叠)
function setDNSCache(key, value) {
  if (DNS缓存记录.has(key)) DNS缓存记录.delete(key);
  DNS缓存记录.set(key, value);
  while (DNS缓存记录.size > 配置.DNS缓存最大条目) {
    const firstKey = DNS缓存记录.keys().next().value;
    DNS缓存记录.delete(firstKey);
  }
}
function 缓存并存储(域名, result, now) {
  let ttl = result.TTL;
  if (配置.启用DOH响应随机填充) {
    const jitter = Math.floor(Math.random() * Math.min(配置.DOH_最大缓存扰动秒, Math.floor(ttl * 0.2)));
    ttl = Math.max(配置.DOH_最小缓存秒, ttl + (Math.random() < 0.5 ? -jitter : jitter));
  }
  const expireAt = now + ttl * 1000;
  setDNSCache(域名, { 域名, IPs: result.IPs, TTL过期时间: expireAt, 更新时间: now });
  return result.IPs[0];
}
async function 查询最快IP(域名) {
  const now = Date.now();
  const 缓存 = DNS缓存记录.get(域名);
  if (缓存 && (!配置.本地严格缓存 || now < 缓存.TTL过期时间)) {
    if (缓存.IPs && 缓存.IPs.length) return 缓存.IPs[0];
  }
  if (DOH_IN_FLIGHT.has(域名)) return await DOH_IN_FLIGHT.get(域名);
  const promise = (async () => {
    const 首选类型 = 配置.优先查询IPV6 ? "AAAA" : "A";
    const 备选类型 = 配置.优先查询IPV6 ? "A" : "AAAA";
    const tryType = async (type) => {
      const servers = 配置.DOH服务器列表.slice(0, 配置.DOH_并行数);
      const requests = servers.map(DOH => {
        const controller = new AbortController();
        const pad = 配置.启用DOH响应随机填充 ? `&_pad=${Math.floor(Math.random() * 1e6)}` : "";
        const url = `${DOH}?name=${encodeURIComponent(域名)}&type=${type}${pad}`;
        const fetchPromise = fetch(url, { method: "GET", headers: { "Accept": "application/dns-json" }, signal: controller.signal })
          .then(res => res.json())
          .then(json => {
            const answers = json.Answer ?? [];
            const records = answers.filter(r => r.type === (type === "A" ? 1 : 28)).map(r => r.data);
            if (records.length) {
              const ttls = answers.map(a => a.TTL ?? 120);
              const minTTL = Math.max(配置.DOH_最小缓存秒, Math.min(...ttls));
              return { IPs: records, TTL: minTTL };
            }
            return Promise.reject(new Error(`无 ${type} 记录`));
          });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => {
          controller.abort(); reject(new Error("DOH 超时"));
        }, 配置.DOH_请求超时_MS));
        return Promise.race([fetchPromise, timeoutPromise]);
      });
      return Promise.any(requests);
    };
    try {
      const result = await tryType(首选类型);
      return 缓存并存储(域名, result, now);
    } catch(e1) {
      try {
        const fallback = await tryType(备选类型);
        return 缓存并存储(域名, fallback, now);
      } catch(e2) {
        console.error(`DOH for ${域名} failed on all types:`, e2);
        return 域名;
      }
    }
  })();
  DOH_IN_FLIGHT.set(域名, promise);
  try { return await promise; } finally { DOH_IN_FLIGHT.delete(域名); }
}


/* ===================== 6. 随机填充工具 ===================== */
function 生成随机填充(最小 = 1, 最大 = 1) {
  if (最小 <= 0 || 最大 <= 0 || 最小 > 最大) return new Uint8Array(0);
  const 长度 = Math.floor(Math.random() * (最大 - 最小 + 1)) + 最小;
  const 填充 = new Uint8Array(长度);
  crypto.getRandomValues(填充);
  return 填充;
}

/* ===================== 7. L0: 接入层 ===================== */
async function L0_处理访问(访问请求, env, ctx) {
    // ... (此部分代码无变化，为节省篇幅已折叠)
    const url = new URL(访问请求.url);
    if (!url.pathname.endsWith("/anything")) return new Response("未找到", { status: 404 });
    const 升级 = 访问请求.headers.get("Upgrade");
    if (!升级 || 升级.toLowerCase() !== "websocket") return new Response("必须 WebSocket", { status: 426 });
    const 提供的私钥 = 提取私钥(访问请求);
    if (提供的私钥 !== 配置.私钥) return new Response("未授权", { status: 403 });
    const 创建WS接口 = new WebSocketPair();
    const [客户端, WS接口] = Object.values(创建WS接口);
    WS接口.accept();
    ctx.waitUntil(L2_解析并连接(WS接口, url));
    return new Response(null, { status: 101, webSocket: 客户端 });
}

/* ===================== 8. L2: 协议解析 + 多层代理 ===================== */
async function L2_解析并连接(WS接口, url) {
    // ... (此部分代码无变化，为节省篇幅已折叠)
    try {
        const 二进制数据 = await new Promise((resolve, reject) => {
          WS接口.addEventListener("message", (事件) => {
            if (事件.data instanceof ArrayBuffer) resolve(事件.data);
            else reject(new Error("首包不是ArrayBuffer"));
          }, { once: true });
        });
        const 视图 = new DataView(二进制数据);
        const 版本号 = new Uint8Array(二进制数据)[0];
        const 附加长度 = new Uint8Array(二进制数据)[17];
        const 端口偏移 = 18 + 附加长度 + 1;
        // const 访问端口 = 视图.getUint16(端口偏移);
        const 地址类型 = new Uint8Array(二进制数据)[端口偏移 + 2];
        let 地址偏移 = 端口偏移 + 3;
        let 访问地址 = "";
        switch (地址类型) {
          case 1:
            访问地址 = Array.from(new Uint8Array(二进制数据.slice(地址偏移, 地址偏移 + 4))).join(".");
            地址偏移 += 4; break;
          case 2:
            const len = new Uint8Array(二进制数据)[地址偏移];
            let 域名 = new TextDecoder().decode(二进制数据.slice(地址偏移 + 1, 地址偏移 + 1 + len));
            if (配置.启用DOH查询转换) 域名 = await 查询最快IP(域名);
            访问地址 = 域名;
            地址偏移 += len + 1; break;
          case 3:
            const ipv6数组 = [];
            for (let i = 0; i < 8; i++) ipv6数组.push(视图.getUint16(地址偏移 + i * 2).toString(16));
            访问地址 = `[${ipv6数组.join(":")}]`;
            地址偏移 += 16; break;
          default:
            WS接口.close(1008, "无效地址类型"); return;
        }
        const 访问端口 = 视图.getUint16(端口偏移); // 移到这里，因为SOCKS5也需要
        const 初始数据 = new Uint8Array(二进制数据.slice(地址偏移));
        const 回复头 = new Uint8Array([版本号, 0]);
        let TCP接口;
        if (url.searchParams.has("s5")) {
          const s5参数 = url.searchParams.get("s5");
          TCP接口 = await 创建SOCKS5接口(s5参数, 访问地址, 访问端口);
        } else {
          const SNI = url.searchParams.get("sni") || 访问地址;
          let 成功连接 = false;
          const 候选目标 = [[访问地址, 访问端口]];
          if (url.searchParams.has("pyip")) {
            const [ip, p = 访问端口] = url.searchParams.get("pyip").split(":");
            候选目标.push([ip, Number(p)]);
          }
          if (配置.全局反代IP) {
            const [ip, p = 访问端口] = 配置.全局反代IP.split(":");
            候选目标.push([ip, Number(p)]);
          }
          for (const [目标主机, 目标端口] of 候选目标) {
            try {
              TCP接口 = connect({ hostname: 目标主机, port: 目标端口, tls: true, servername: SNI });
              await TCP接口.opened;
              成功连接 = true; break;
            } catch {}
          }
          if (!成功连接) { WS接口.close(1011, "所有后端连接失败"); return; }
        }
        if (WS接口.readyState === WebSocket.OPEN) WS接口.send(回复头);
        if (初始数据.length > 0) {
            const writer = TCP接口.writable.getWriter();
            await writer.write(初始数据);
            writer.releaseLock();
        }
        await L3_数据管道(WS接口, TCP接口);
      } catch (e) {
        console.error("L2 Error:", e);
        WS接口.close(1008, "协议错误");
      }
}

/* ===================== 9. L3: 数据管道 (V2 修正版) ===================== */
async function L3_数据管道(WS接口, TCP接口) {
  let 最近活动时间 = Date.now();
  let 周期已发送 = 0;

  function 记录出站活动(字节数) {
    周期已发送 += 字节数;
    最近活动时间 = Date.now();
  }

  // 上行流：WS -> TCP (无修改，直接转发)
  const 上行流 = new ReadableStream({
    start(controller) {
      WS接口.addEventListener("message", (e) => {
        if (e.data instanceof ArrayBuffer) {
          controller.enqueue(new Uint8Array(e.data));
        }
      });
      WS接口.addEventListener("close", () => { try { controller.close() } catch(e){} });
      WS接口.addEventListener("error", () => controller.error("WebSocket上行流错误"));
    }
  });

  // 下行流：TCP -> WS
  // 使用 TransformStream 来统计流量，而不破坏原生管道
  const 流量统计变换 = new TransformStream({
    transform(chunk, controller) {
      记录出站活动(chunk.length);
      controller.enqueue(chunk);
    },
  });

  // 定义最终将数据写入WebSocket的WritableStream
  const WS可写流 = new WritableStream({
    write(chunk) {
      if (WS接口.readyState === WebSocket.OPEN) {
        WS接口.send(chunk);
      }
    }
  });

  // 独立填充循环
  const 填充循环 = async () => {
    while(WS接口.readyState === WebSocket.OPEN) {
      const 等待间隔 = 配置.恒定填充周期_MS > 0 ? 配置.恒定填充周期_MS : 配置.空闲填充最大间隔;
      await new Promise(r => setTimeout(r, 等待间隔));

      if (WS接口.readyState !== WebSocket.OPEN) break;

      // 恒定速率填充
      if (配置.强制恒定填充 && 配置.恒定填充目标速率_Bps > 0) {
        const 每周期目标字节数 = Math.floor(配置.恒定填充目标速率_Bps * 配置.恒定填充周期_MS / 1000);
        let 已发送 = 周期已发送;
        周期已发送 = 0; // 重置计数器
        let 需要补齐 = 每周期目标字节数 - 已发送;

        if (需要补齐 > 0) {
          const 填充 = 生成随机填充(需要补齐, 需要补齐);
          try {
            WS接口.send(填充);
            记录出站活动(填充.length);
          } catch(e) { break; }
        }
      // 空闲填充
      } else if (配置.启用随机填充) {
        const 空闲时长 = Date.now() - 最近活动时间;
        const 阈值 = 配置.空闲阈值因子 * 配置.空闲填充最大间隔;
        if (空闲时长 > 阈值) {
          const 填充包 = 生成随机填充(配置.空闲填充最小长度, 配置.空闲填充最大长度);
          try {
            WS接口.send(填充包);
            记录出站活动(填充包.length);
          } catch(e) { break; }
        }
      }
    }
  };
  
  // 运行所有任务
  // pipeTo Promise 会在流关闭或出错时完成。
  // 我们使用 Promise.race 来确保任何一个管道终止，整个函数就会结束，从而关闭连接。
  try {
    const 上行管道 = 上行流.pipeTo(TCP接口.writable);
    const 下行管道 = TCP接口.readable.pipeThrough(流量统计变换).pipeTo(WS可写流);
    
    // 启动并行填充任务，但不直接 await 它
    填充循环();

    // 等待任何一个数据管道结束
    await Promise.race([上行管道, 下行管道]);
  } catch (error) {
    console.error("数据管道错误:", error);
  } finally {
    // 确保连接被关闭
    if (WS接口.readyState === WebSocket.OPEN) {
      WS接口.close(1000, "管道关闭");
    }
    // TCP接口的关闭通常由运行时自动处理
  }
}
/* ===================== 10. Worker 主入口 ===================== */
export default {
  fetch: L0_处理访问,
};
