import { connect } from 'cloudflare:sockets';

let authToken = 'eb2a5eba-f7af-4c18-9d70-0c4d0a40dd9c';
let fallbackAddress = 'bpb.yousef.isegaro.com';
let fallbackPort = '443';
let socks5Config = '';

const directDomains = [
    { name: "cloudflare.182682.xyz", domain: "cloudflare.182682.xyz" }, { name: "speed.marisalnc.com", domain: "speed.marisalnc.com" },
    { domain: "freeyx.cloudflare88.eu.org" }, { domain: "bestcf.top" }, { domain: "cdn.2020111.xyz" }, { domain: "cfip.cfcdn.vip" },
    { domain: "cf.0sm.com" }, { domain: "cf.090227.xyz" }, { domain: "cf.zhetengsha.eu.org" }, { domain: "cloudflare.9jy.cc" },
    { domain: "cf.zerone-cdn.pp.ua" }, { domain: "cfip.1323123.xyz" }, { domain: "cnamefuckxxs.yuchen.icu" }, { domain: "cloudflare-ip.mofashi.ltd" },
    { domain: "115155.xyz" }, { domain: "cname.xirancdn.us" }, { domain: "f3058171cad.002404.xyz" }, { domain: "8.889288.xyz" },
    { domain: "cdn.tzpro.xyz" }, { domain: "cf.877771.xyz" }, { domain: "xn--b6gac.eu.org" }
];

const E_INVALID_DATA = atob('aW52YWxpZCBkYXRh');
const E_INVALID_USER = atob('aW52YWxpZCB1c2Vy');
const E_UNSUPPORTED_CMD = atob('Y29tbWFuZCBpcyBub3Qgc3VwcG9ydGVk');
const E_UDP_DNS_ONLY = atob('VURQIHByb3h5IG9ubHkgZW5hYmxlIGZvciBETlMgd2hpY2ggaXMgcG9ydCA1Mw==');
const E_INVALID_ADDR_TYPE = atob('aW52YWxpZCBhZGRyZXNzVHlwZQ==');
const E_EMPTY_ADDR = atob('YWRkcmVzc1ZhbHVlIGlzIGVtcHR5');
const E_WS_NOT_OPEN = atob('d2ViU29ja2V0LmVhZHlTdGF0ZSBpcyBub3Qgb3Blbg==');
const E_INVALID_ID_STR = atob('U3RyaW5naWZpZWQgaWRlbnRpZmllciBpcyBpbnZhbGlk');
const E_INVALID_SOCKS_ADDR = atob('SW52YWxpZCBTT0NLUyBhZGRyZXNzIGZvcm1hdA==');
const E_SOCKS_NO_METHOD = atob('bm8gYWNjZXB0YWJsZSBtZXRob2Rz');
const E_SOCKS_AUTH_NEEDED = atob('c29ja3Mgc2VydmVyIG5lZWRzIGF1dGg=');
const E_SOCKS_AUTH_FAIL = atob('ZmFpbCB0byBhdXRoIHNvY2tzIHNlcnZlcg==');
const E_SOCKS_CONN_FAIL = atob('ZmFpbCB0byBvcGVuIHNvY2tzIGNvbm5lY3Rpb24=');

let parsedSocks5Config = {};
let isSocksEnabled = false;

const ADDRESS_TYPE_IPV4 = 1;
const ADDRESS_TYPE_URL = 2;
const ADDRESS_TYPE_IPV6 = 3;

export default {
	async fetch(request, env, ctx) {
		try {
			authToken = (env.uuid || env.u || env.UUID || authToken).toLowerCase();
			const subPath = (env.d || authToken).toLowerCase();
			
			const envFallback = env.p || env.P;
			if (envFallback) {
				const fallbackValue = envFallback.toLowerCase();
				if (fallbackValue.includes(']:')) {
					const lastColonIndex = fallbackValue.lastIndexOf(':');
					fallbackPort = fallbackValue.slice(lastColonIndex + 1);
					fallbackAddress = fallbackValue.slice(0, lastColonIndex);
				} else if (!fallbackValue.includes(']:') && !fallbackValue.includes(']')) {
					[fallbackAddress, fallbackPort = '443'] = fallbackValue.split(':');
				} else {
					fallbackAddress = fallbackValue;
					fallbackPort = '443';
				}
			}

			socks5Config = env.s || env.S || socks5Config;
			if (socks5Config) {
				try {
					parsedSocks5Config = parseSocksConfig(socks5Config.toLowerCase());
					isSocksEnabled = true;
				} catch (err) {
					console.log(`Invalid SOCKS5 config: ${err.toString()}`);
					isSocksEnabled = false;
				}
			}

			const url = new URL(request.url);

			if (request.headers.get('Upgrade') === 'websocket') {
				return await handleWsRequest(request);
			} else if (request.method === 'GET') {
				if (url.pathname === '/') {
					const successHtml = `<!DOCTYPE html> <html lang="zh-CN"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Powered by Cloudflare | 全球领先的云网络平台</title> <script src="https://cdn.tailwindcss.com"></script> <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"> <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <script> tailwind.config = { theme: { extend: { colors: { cloudflare: { blue: '#F38020', dark: '#16181C', light: '#F7FAFC', gray: '#6E7681', }, }, fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], }, } } } </script> <style type="text/tailwindcss"> @layer utilities { .content-auto { content-visibility: auto; } .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.1); } .bg-gradient-cf { background: linear-gradient(135deg, #16181C 0%, #2A2E35 100%); } } </style> </head> <body class="bg-cloudflare-light font-sans text-cloudflare-dark antialiased"> <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm"> <div class="container mx-auto px-4 py-4 flex justify-between items-center"> <div class="flex items-center space-x-2"> <i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i> <span class="text-xl font-bold">Cloudflare Power</span> </div> <nav class="hidden md:flex space-x-8"> <a href="#features" class="font-medium hover:text-cloudflare-blue transition-colors">核心特性</a> <a href="#performance" class="font-medium hover:text-cloudflare-blue transition-colors">性能数据</a> <a href="#protection" class="font-medium hover:text-cloudflare-blue transition-colors">安全防护</a> <a href="#global" class="font-medium hover:text-cloudflare-blue transition-colors">全球网络</a> </nav> <button class="bg-cloudflare-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">立即使用</button> </div> </header> <section class="bg-gradient-cf text-white py-20 md:py-32"> <div class="container mx-auto px-4"> <div class="max-w-3xl mx-auto text-center"> <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-shadow mb-6">由 Cloudflare 强力驱动</h1> <p class="text-xl text-gray-200 mb-10">全球 300+ 城市节点，99.99% 可用性，为你的网站提供极致性能与顶级安全防护</p> <div class="flex flex-col sm:flex-row justify-center gap-4"> <button class="bg-cloudflare-blue text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">查看性能报告</button> <button class="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm">了解更多</button> </div> <div class="mt-16 flex flex-wrap justify-center gap-4"> <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-bolt-lightning text-cloudflare-blue"></i><span>全球CDN加速</span></div> <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-shield-virus text-cloudflare-blue"></i><span>DDoS防护</span></div> <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-lock text-cloudflare-blue"></i><span>SSL/TLS加密</span></div> <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-globe text-cloudflare-blue"></i><span>300+ 数据中心</span></div> <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-code text-cloudflare-blue"></i><span>边缘计算</span></div> </div> </div> </div> </section> <section id="features" class="py-20"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">Cloudflare 核心优势</h2> <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">一站式解决网站性能、安全、可靠性问题，无需复杂配置</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-rocket text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">极速CDN</h3> <p class="text-cloudflare-gray">智能缓存策略，全球节点就近分发，页面加载速度提升90%以上</p> </div> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">全面安全防护</h3> <p class="text-cloudflare-gray">内置DDoS防护、WAF、Bot管理，全方位抵御各类网络攻击</p> </div> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-infinity text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">99.99% 可用性</h3> <p class="text-cloudflare-gray">全球分布式网络架构，单点故障不影响整体服务，保障业务持续在线</p> </div> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-lock text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">免费SSL证书</h3> <p class="text-cloudflare-gray">一键启用HTTPS，自动续期，支持TLS 1.3，保障数据传输安全</p> </div> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-gears text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">边缘计算</h3> <p class="text-cloudflare-gray">Workers 运行时环境，在全球边缘节点执行代码，降低延迟</p> </div> <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100"> <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-chart-line text-2xl text-cloudflare-blue"></i></div> <h3 class="text-xl font-bold mb-3">实时分析</h3> <p class="text-cloudflare-gray">详细的流量、性能、安全数据统计，帮助优化网站体验</p> </div> </div> </div> </section> <section id="performance" class="py-20 bg-gray-50"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">性能数据可视化</h2> <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">使用 Cloudflare 前后的性能对比，数据一目了然</p> </div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"> <div class="bg-white rounded-xl shadow-lg p-6"> <h3 class="text-xl font-bold mb-4">页面加载速度对比 (ms)</h3> <div class="h-80"><canvas id="speedChart"></canvas></div> </div> <div class="bg-white rounded-xl shadow-lg p-6"> <h3 class="text-xl font-bold mb-4">全球各地区响应时间 (ms)</h3> <div class="h-80"><canvas id="regionChart"></canvas></div> </div> </div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"> <div class="bg-white rounded-xl shadow-lg p-6 text-center"> <div class="text-4xl font-bold text-cloudflare-blue mb-2">99.99%</div> <p class="text-cloudflare-gray">网络可用性</p> </div> <div class="bg-white rounded-xl shadow-lg p-6 text-center"> <div class="text-4xl font-bold text-cloudflare-blue mb-2">85%</div> <p class="text-cloudflare-gray">带宽节省率</p> </div> <div class="bg-white rounded-xl shadow-lg p-6 text-center"> <div class="text-4xl font-bold text-cloudflare-blue mb-2">300+</div> <p class="text-cloudflare-gray">全球数据中心</p> </div> </div> </div> </section> <section id="protection" class="py-20"> <div class="container mx-auto px-4"> <div class="max-w-5xl mx-auto"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">企业级安全防护</h2> <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">从基础的DDoS防护到高级的Bot管理，全方位保障网站安全</p> </div> <div class="relative"> <div class="bg-cloudflare-dark rounded-2xl p-8 text-white mb-12"> <div class="flex flex-col md:flex-row items-center gap-8"> <div class="md:w-1/2"> <h3 class="text-2xl font-bold mb-4">智能威胁识别与拦截</h3> <ul class="space-y-4"> <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Layer 3/4/7 DDoS 防护，自动缓解各类攻击</span></li> <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Web应用防火墙(WAF)，防护SQL注入、XSS等攻击</span></li> <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Bot管理，识别并拦截恶意爬虫和自动化攻击</span></li> <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Rate Limiting，防止暴力破解和API滥用</span></li> </ul> </div> <div class="md:w-1/2"><img src="https://picsum.photos/seed/cloudflare-sec/600/400" alt="Cloudflare 安全防护" class="rounded-lg shadow-xl w-full"></div> </div> </div> <div class="bg-white rounded-xl shadow-lg p-6 -mt-20 mx-4 relative z-10"> <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center"> <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">100Tbps+</div><p class="text-cloudflare-gray">DDoS防护容量</p></div> <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">76B+</div><p class="text-cloudflare-gray">每月拦截威胁</p></div> <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">99.9%</div><p class="text-cloudflare-gray">Bot识别准确率</p></div> <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">0秒</div><p class="text-cloudflare-gray">攻击缓解延迟</p></div> </div> </div> </div> </div> </div> </section> <section id="global" class="py-20 bg-gray-50"> <div class="container mx-auto px-4"> <div class="text-center mb-16"> <h2 class="text-3xl md:text-4xl font-bold mb-4">全球分布式网络</h2> <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">遍布全球300+城市的边缘节点，让你的内容离用户更近</p> </div> <div class="bg-white rounded-xl shadow-lg p-6"> <div class="aspect-w-16 aspect-h-9 mb-8"><img src="https://picsum.photos/seed/cloudflare-map/1200/675" alt="Cloudflare 全球网络地图" class="rounded-lg w-full h-auto"></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8"> <div class="text-center"><i class="fa-solid fa-globe-americas text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">覆盖范围</h3><p class="text-cloudflare-gray">遍布全球200+国家和地区，300+城市节点，覆盖所有主要互联网市场</p></div> <div class="text-center"><i class="fa-solid fa-network-wired text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">网络质量</h3><p class="text-cloudflare-gray">直连全球顶级运营商，低延迟、高带宽，保障最佳用户体验</p></div> <div class="text-center"><i class="fa-solid fa-server text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">弹性扩展</h3><p class="text-cloudflare-gray">自动扩缩容，无需人工干预，轻松应对流量峰值和突发访问</p></div> </div> </div> </div> </section> <footer class="bg-cloudflare-dark text-white py-12"> <div class="container mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8"> <div> <div class="flex items-center space-x-2 mb-4"><i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i><span class="text-xl font-bold">Cloudflare Power</span></div> <p class="text-gray-400 mb-4">让互联网更快速、更安全、更可靠</p> <div class="flex space-x-4"> <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-twitter"></i></a> <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-github"></i></a> <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-linkedin"></i></a> </div> </div> <div> <h4 class="text-lg font-bold mb-4">产品</h4> <ul class="space-y-2"> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">CDN</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">DDoS防护</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">WAF</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Workers</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">R2存储</a></li> </ul> </div> <div> <h4 class="text-lg font-bold mb-4">资源</h4> <ul class="space-y-2"> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">文档</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">开发者平台</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">状态页面</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">博客</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">社区</a></li> </ul> </div> <div> <h4 class="text-lg font-bold mb-4">公司</h4> <ul class="space-y-2"> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">关于我们</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">客户案例</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">合作伙伴</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">招贤纳士</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">联系我们</a></li> </ul> </div> </div> <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"> <p class="text-gray-500 mb-4 md:mb-0">© 2025 Cloudflare Power. All rights reserved.</p> <div class="flex space-x-6"> <a href="#" class="text-gray-500 hover:text-white transition-colors">隐私政策</a> <a href="#" class="text-gray-500 hover:text-white transition-colors">服务条款</a> <a href="#" class="text-gray-500 hover:text-white transition-colors">Cookie 设置</a> </div> </div> </div> </footer> <script> document.addEventListener('DOMContentLoaded', function() { const speedCtx = document.getElementById('speedChart').getContext('2d'); new Chart(speedCtx, { type: 'bar', data: { labels: ['亚太地区', '欧洲', '北美', '南美', '非洲', '中东'], datasets: [ { label: '使用Cloudflare前 (ms)', data: [850, 620, 450, 780, 950, 720], backgroundColor: '#e5e7eb', borderColor: '#d1d5db', borderWidth: 1 }, { label: '使用Cloudflare后 (ms)', data: [120, 80, 50, 150, 280, 180], backgroundColor: '#F38020', borderColor: '#ea580c', borderWidth: 1 } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: '加载时间 (毫秒)' } } } } }); const regionCtx = document.getElementById('regionChart').getContext('2d'); new Chart(regionCtx, { type: 'line', data: { labels: ['东京', '新加坡', '伦敦', '纽约', '洛杉矶', '悉尼', '圣保罗'], datasets: [ { label: '平均响应时间 (ms)', data: [45, 52, 38, 25, 30, 65, 85], fill: false, backgroundColor: '#F38020', borderColor: '#F38020', tension: 0.3, pointRadius: 5, pointBackgroundColor: '#F38020' } ] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'top' } }, scales: { y: { beginAtZero: true, title: { display: true, text: '响应时间 (毫秒)' } } } } }); document.querySelectorAll('a[href^="#"]').forEach(anchor => { anchor.addEventListener('click', function(e) { e.preventDefault(); document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }); }); window.addEventListener('scroll', function() { const header = document.querySelector('header'); if (window.scrollY > 50) { header.classList.add('py-2'); header.classList.remove('py-4'); header.classList.add('shadow-md'); } else { header.classList.add('py-4'); header.classList.remove('py-2'); header.classList.remove('shadow-md'); } }); }); </script> </body> </html>`;
					return new Response(successHtml, { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
				}
				if (url.pathname.toLowerCase().includes(`/${subPath}`)) {
					return await handleSubscriptionRequest(request, authToken);
				}
			}
			return new Response('Not Found', { status: 404 });
		} catch (err) {
			return new Response(err.toString(), { status: 500 });
		}
	},
};

async function handleSubscriptionRequest(request, uuid) {
    const url = new URL(request.url);
    const finalLinks = [];
    const workerDomain = url.hostname;

    const nativeList = [{ ip: workerDomain, isp: '原生地址' }];
    finalLinks.push(...generateLinksFromSource(nativeList, uuid, workerDomain));

    const domainList = directDomains.map(d => ({ ip: d.domain, isp: d.name || d.domain }));
    finalLinks.push(...generateLinksFromSource(domainList, uuid, workerDomain));

    const dynamicIPList = await fetchDynamicIPs();
    if (dynamicIPList.length > 0) {
        finalLinks.push(...generateLinksFromSource(dynamicIPList, uuid, workerDomain));
    }

    const subscriptionContent = btoa(finalLinks.join('\n'));
    
    return new Response(subscriptionContent, {
        headers: { 
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        },
    });
}

function generateLinksFromSource(list, uuid, workerDomain) {
    const httpsPorts = [443, 2053, 2083, 2087, 2096, 8443];
    const httpPorts = [80, 8080, 8880, 2052, 2082, 2086, 2095];
    const links = [];
    const wsPath = encodeURIComponent('/?ed=2048');
    const proto = 'v' + 'l' + 'e' + 's' + 's';

    list.forEach(item => {
        const nodeNameBase = item.isp.replace(/\s/g, '_');
        const safeIP = item.ip.includes(':') ? `[${item.ip}]` : item.ip;

        httpsPorts.forEach(port => {
            const wsNodeName = `${nodeNameBase}-${port}-WS-TLS`;
            
            const wsParams = new URLSearchParams({ 
                encryption: 'none', 
                security: 'tls', 
                sni: workerDomain, 
                fp: 'firefox', 
                type: 'ws', 
                host: workerDomain, 
                path: wsPath,
                alpn: 'h3,h2,http/1.1',
                ech: 'cloudflare-ech.com+https://223.6.6.6/dns-query'
            });
            links.push(`${proto}://${uuid}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
        });

        httpPorts.forEach(port => {
            const wsNodeName = `${nodeNameBase}-${port}-WS`;

            const wsParams = new URLSearchParams({
                encryption: 'none',
                security: 'none',
                type: 'ws',
                host: workerDomain,
                path: wsPath
            });
            links.push(`${proto}://${uuid}@${safeIP}:${port}?${wsParams.toString()}#${encodeURIComponent(wsNodeName)}`);
        });
    });
    return links;
}

async function fetchDynamicIPs() {
    const v4Url1 = "https://www.wetest.vip/page/cloudflare/address_v4.html";
    const v6Url1 = "https://www.wetest.vip/page/cloudflare/address_v6.html";
    let results = [];

    try {
        const [ipv4List, ipv6List] = await Promise.all([
            fetchAndParseWetest(v4Url1),
            fetchAndParseWetest(v6Url1)
        ]);
        results = [...ipv4List, ...ipv6List];
        if (results.length > 0) {
            console.log(`Successfully fetched ${results.length} IPs from wetest.vip`);
            return results;
        }
    } catch (e) {
        console.error("Failed to fetch from wetest.vip:", e);
    }

    console.log("wetest.vip failed, trying fallback IP source...");
    const fallbackUrl = "https://stock.hostmonit.com/CloudFlareYes";
    try {
        const response = await fetch(fallbackUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!response.ok) {
            console.error(`Fallback source failed with status: ${response.status}`);
            return [];
        }
        const html = await response.text();
        const rowRegex = /<tr><td>([\d.:a-fA-F]+)<\/td><td>.*?<\/td><td>.*?<\/td><td>.*?<\/td><td>(.*?)<\/td>.*?<\/tr>/g;
        
        let match;
        while ((match = rowRegex.exec(html)) !== null) {
            if (match[1] && match[2]) {
                results.push({
                    ip: match[1].trim(),
                    isp: match[2].trim().replace(/\s/g, '')
                });
            }
        }

        if (results.length > 0) {
             console.log(`Successfully fetched ${results.length} IPs from fallback source.`);
        } else {
            console.warn(`Warning: Could not parse any IPs from fallback source. The site structure might have changed.`);
        }
       
        return results;
    } catch (e) {
        console.error("Failed to fetch from fallback source:", e);
        return [];
    }
}


async function fetchAndParseWetest(url) {
    try {
        const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!response.ok) {
            console.error(`Failed to fetch ${url}, status: ${response.status}`);
            return [];
        }
        const html = await response.text();
        const results = [];
        const rowRegex = /<tr[\s\S]*?<\/tr>/g;
        const cellRegex = /<td data-label="线路名称">(.+?)<\/td>[\s\S]*?<td data-label="优选地址">([\d.:a-fA-F]+)<\/td>/;

        let match;
        while ((match = rowRegex.exec(html)) !== null) {
            const rowHtml = match[0];
            const cellMatch = rowHtml.match(cellRegex);
            if (cellMatch && cellMatch[1] && cellMatch[2]) {
                results.push({
                    isp: cellMatch[1].trim().replace(/<.*?>/g, ''),
                    ip: cellMatch[2].trim()
                });
            }
        }
        
        if (results.length === 0) {
            console.warn(`Warning: Could not parse any IPs from ${url}. The site structure might have changed.`);
        }

        return results;
    } catch (error) {
        console.error(`Error parsing ${url}:`, error);
        return [];
    }
}

async function handleWsRequest(request) {
    const wsPair = new WebSocketPair();
    const [clientSock, serverSock] = Object.values(wsPair);
    serverSock.accept();

    let remoteConnWrapper = { socket: null };
    let isDnsQuery = false;

    const earlyData = request.headers.get('sec-websocket-protocol') || '';
    const readable = makeReadableStream(serverSock, earlyData);

    readable.pipeTo(new WritableStream({
        async write(chunk) {
            if (isDnsQuery) return await forwardUDP(chunk, serverSock, null);
            if (remoteConnWrapper.socket) {
                const writer = remoteConnWrapper.socket.writable.getWriter();
                await writer.write(chunk);
                writer.releaseLock();
                return;
            }
            const { hasError, message, addressType, port, hostname, rawIndex, version, isUDP } = parseWsPacketHeader(chunk, authToken);
            if (hasError) throw new Error(message);
            if (isUDP) {
                if (port === 53) isDnsQuery = true;
                else throw new Error(E_UDP_DNS_ONLY);
            }
            const respHeader = new Uint8Array([version[0], 0]);
            const rawData = chunk.slice(rawIndex);
            if (isDnsQuery) return forwardUDP(rawData, serverSock, respHeader);
            await forwardTCP(addressType, hostname, port, rawData, serverSock, respHeader, remoteConnWrapper);
        },
    })).catch((err) => { console.log('WS Stream Error:', err); });

    return new Response(null, { status: 101, webSocket: clientSock });
}

async function forwardTCP(addrType, host, portNum, rawData, ws, respHeader, remoteConnWrapper) {
    async function connectAndSend(address, port) {
        const remoteSock = isSocksEnabled ?
            await establishSocksConnection(addrType, address, port) :
            connect({ hostname: address, port: port });
        const writer = remoteSock.writable.getWriter();
        await writer.write(rawData);
        writer.releaseLock();
        return remoteSock;
    }
    async function retryConnection() {
        const newSocket = isSocksEnabled ?
            await connectAndSend(host, portNum) :
            await connectAndSend(fallbackAddress || host, parseInt(fallbackPort, 10) || portNum);
        remoteConnWrapper.socket = newSocket;
        newSocket.closed.catch(() => {}).finally(() => closeSocketQuietly(ws));
        connectStreams(newSocket, ws, respHeader, null);
    }
    try {
        const initialSocket = await connectAndSend(host, portNum);
        remoteConnWrapper.socket = initialSocket;
        connectStreams(initialSocket, ws, respHeader, retryConnection);
    } catch (err) {
        console.log('Initial connection failed, trying fallback:', err);
        retryConnection();
    }
}

function parseWsPacketHeader(chunk, token) {
	if (chunk.byteLength < 24) return { hasError: true, message: E_INVALID_DATA };
	const version = new Uint8Array(chunk.slice(0, 1));
	if (formatIdentifier(new Uint8Array(chunk.slice(1, 17))) !== token) return { hasError: true, message: E_INVALID_USER };
	const optLen = new Uint8Array(chunk.slice(17, 18))[0];
	const cmd = new Uint8Array(chunk.slice(18 + optLen, 19 + optLen))[0];
	let isUDP = false;
	if (cmd === 1) {} else if (cmd === 2) { isUDP = true; } else { return { hasError: true, message: E_UNSUPPORTED_CMD }; }
	const portIdx = 19 + optLen;
	const port = new DataView(chunk.slice(portIdx, portIdx + 2)).getUint16(0);
	let addrIdx = portIdx + 2, addrLen = 0, addrValIdx = addrIdx + 1, hostname = '';
	const addressType = new Uint8Array(chunk.slice(addrIdx, addrValIdx))[0];
	switch (addressType) {
		case ADDRESS_TYPE_IPV4: addrLen = 4; hostname = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + addrLen)).join('.'); break;
		case ADDRESS_TYPE_URL: addrLen = new Uint8Array(chunk.slice(addrValIdx, addrValIdx + 1))[0]; addrValIdx += 1; hostname = new TextDecoder().decode(chunk.slice(addrValIdx, addrValIdx + addrLen)); break;
		case ADDRESS_TYPE_IPV6: addrLen = 16; const ipv6 = []; const ipv6View = new DataView(chunk.slice(addrValIdx, addrValIdx + addrLen)); for (let i = 0; i < 8; i++) ipv6.push(ipv6View.getUint16(i * 2).toString(16)); hostname = ipv6.join(':'); break;
		default: return { hasError: true, message: `${E_INVALID_ADDR_TYPE}: ${addressType}` };
	}
	if (!hostname) return { hasError: true, message: `${E_EMPTY_ADDR}: ${addressType}` };
	return { hasError: false, addressType, port, hostname, isUDP, rawIndex: addrValIdx + addrLen, version };
}

function makeReadableStream(socket, earlyDataHeader) {
	let cancelled = false;
	return new ReadableStream({
		start(controller) {
			socket.addEventListener('message', (event) => { if (!cancelled) controller.enqueue(event.data); });
			socket.addEventListener('close', () => { if (!cancelled) { closeSocketQuietly(socket); controller.close(); } });
			socket.addEventListener('error', (err) => controller.error(err));
			const { earlyData, error } = base64ToArray(earlyDataHeader);
			if (error) controller.error(error); else if (earlyData) controller.enqueue(earlyData);
		},
		cancel() { cancelled = true; closeSocketQuietly(socket); }
	});
}

async function connectStreams(remoteSocket, webSocket, headerData, retryFunc) {
	let header = headerData, hasData = false;
	await remoteSocket.readable.pipeTo(
		new WritableStream({
			async write(chunk, controller) {
				hasData = true;
				if (webSocket.readyState !== 1) controller.error(E_WS_NOT_OPEN);
				if (header) { webSocket.send(await new Blob([header, chunk]).arrayBuffer()); header = null; } 
                else { webSocket.send(chunk); }
			},
			abort(reason) { console.error("Readable aborted:", reason); },
		})
	).catch((error) => { console.error("Stream connection error:", error); closeSocketQuietly(webSocket); });
	if (!hasData && retryFunc) retryFunc();
}

async function forwardUDP(udpChunk, webSocket, respHeader) {
	try {
		const tcpSocket = connect({ hostname: '8.8.4.4', port: 53 });
		let vlessHeader = respHeader;
		const writer = tcpSocket.writable.getWriter();
		await writer.write(udpChunk);
		writer.releaseLock();
		await tcpSocket.readable.pipeTo(new WritableStream({
			async write(chunk) {
				if (webSocket.readyState === 1) {
					if (vlessHeader) { webSocket.send(await new Blob([vlessHeader, chunk]).arrayBuffer()); vlessHeader = null; } 
                    else { webSocket.send(chunk); }
				}
			},
		}));
	} catch (error) { console.error(`DNS forward error: ${error.message}`); }
}

async function establishSocksConnection(addrType, address, port) {
	const { username, password, hostname, socksPort } = parsedSocks5Config;
	const socket = connect({ hostname, port: socksPort });
	const writer = socket.writable.getWriter();
	await writer.write(new Uint8Array(username ? [5, 2, 0, 2] : [5, 1, 0]));
	const reader = socket.readable.getReader();
	let res = (await reader.read()).value;
	if (res[0] !== 5 || res[1] === 255) throw new Error(E_SOCKS_NO_METHOD);
	if (res[1] === 2) {
		if (!username || !password) throw new Error(E_SOCKS_AUTH_NEEDED);
		const encoder = new TextEncoder();
		const authRequest = new Uint8Array([1, username.length, ...encoder.encode(username), password.length, ...encoder.encode(password)]);
		await writer.write(authRequest);
		res = (await reader.read()).value;
		if (res[0] !== 1 || res[1] !== 0) throw new Error(E_SOCKS_AUTH_FAIL);
	}
	const encoder = new TextEncoder(); let DSTADDR;
	switch (addrType) {
		case ADDRESS_TYPE_IPV4: DSTADDR = new Uint8Array([1, ...address.split('.').map(Number)]); break;
		case ADDRESS_TYPE_URL: DSTADDR = new Uint8Array([3, address.length, ...encoder.encode(address)]); break;
		case ADDRESS_TYPE_IPV6: DSTADDR = new Uint8Array([4, ...address.split(':').flatMap(x => [parseInt(x.slice(0, 2), 16), parseInt(x.slice(2), 16)])]); break;
		default: throw new Error(E_INVALID_ADDR_TYPE);
	}
	await writer.write(new Uint8Array([5, 1, 0, ...DSTADDR, port >> 8, port & 255]));
	res = (await reader.read()).value;
	if (res[1] !== 0) throw new Error(E_SOCKS_CONN_FAIL);
	writer.releaseLock(); reader.releaseLock();
	return socket;
}

function parseSocksConfig(address) {
	let [latter, former] = address.split("@").reverse(); let username, password, hostname, socksPort;
	if (former) { const formers = former.split(":"); if (formers.length !== 2) throw new Error(E_INVALID_SOCKS_ADDR);[username, password] = formers; }
	const latters = latter.split(":"); socksPort = Number(latters.pop()); if (isNaN(socksPort)) throw new Error(E_INVALID_SOCKS_ADDR);
	hostname = latters.join(":"); if (hostname.includes(":") && !/^\[.*\]$/.test(hostname)) throw new Error(E_INVALID_SOCKS_ADDR);
	return { username, password, hostname, socksPort };
}

function base64ToArray(b64Str) {
	if (!b64Str) return { error: null };
	try { b64Str = b64Str.replace(/-/g, '+').replace(/_/g, '/'); return { earlyData: Uint8Array.from(atob(b64Str), (c) => c.charCodeAt(0)).buffer, error: null }; } 
    catch (error) { return { error }; }
}

function isValidFormat(uuid) { return /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid); }
function closeSocketQuietly(socket) { try { if (socket.readyState === 1 || socket.readyState === 2) socket.close(); } catch (error) {} }

const hexTable = Array.from({ length: 256 }, (v, i) => (i + 256).toString(16).slice(1));
function formatIdentifier(arr, offset = 0) {
	const id = (hexTable[arr[offset]]+hexTable[arr[offset+1]]+hexTable[arr[offset+2]]+hexTable[arr[offset+3]]+"-"+hexTable[arr[offset+4]]+hexTable[arr[offset+5]]+"-"+hexTable[arr[offset+6]]+hexTable[arr[offset+7]]+"-"+hexTable[arr[offset+8]]+hexTable[arr[offset+9]]+"-"+hexTable[arr[offset+10]]+hexTable[arr[offset+11]]+hexTable[arr[offset+12]]+hexTable[arr[offset+13]]+hexTable[arr[offset+14]]+hexTable[arr[offset+15]]).toLowerCase();
	if (!isValidFormat(id)) throw new TypeError(E_INVALID_ID_STR);
	return id;
}
