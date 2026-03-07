import { connect } from 'cloudflare:sockets';
let 我的VL密钥 = '2a1b6956-7637-4ce9-9553-80c352648068';
let 默认反代IP = 'pyip.ygkkk.dpdns.org';
const 主页HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Powered by Cloudflare | 全球领先的云网络平台</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        cloudflare: {
                            blue: '#F38020',
                            dark: '#16181C',
                            light: '#F7FAFC',
                            gray: '#6E7681',
                        },
                    },
                    fontFamily: {
                        sans: ['Inter', 'system-ui', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <style type="text/tailwindcss">
        @layer utilities {
            .content-auto {
                content-visibility: auto;
            }
            .text-shadow {
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .bg-gradient-cf {
                background: linear-gradient(135deg, #16181C 0%, #2A2E35 100%);
            }
        }
    </style>
</head>
<body class="bg-cloudflare-light font-sans text-cloudflare-dark antialiased">
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i>
                <span class="text-xl font-bold">Cloudflare Power</span>
            </div>
            <nav class="hidden md:flex space-x-8">
                <a href="#features" class="font-medium hover:text-cloudflare-blue transition-colors">核心特性</a>
                <a href="#performance" class="font-medium hover:text-cloudflare-blue transition-colors">性能数据</a>
                <a href="#protection" class="font-medium hover:text-cloudflare-blue transition-colors">安全防护</a>
                <a href="#global" class="font-medium hover:text-cloudflare-blue transition-colors">全球网络</a>
            </nav>
            <button class="bg-cloudflare-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg">立即使用</button>
        </div>
    </header>

    <section class="bg-gradient-cf text-white py-20 md:py-32">
        <div class="container mx-auto px-4">
            <div class="max-w-3xl mx-auto text-center">
                <h1 class="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-tight text-shadow mb-6">由 Cloudflare 强力驱动</h1>
                <p class="text-xl text-gray-200 mb-10">全球 300+ 城市节点，99.99% 可用性，为你的网站提供极致性能与顶级安全防护</p>
                <div class="flex flex-col sm:flex-row justify-center gap-4">
                    <button class="bg-cloudflare-blue text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl">查看性能报告</button>
                    <button class="bg-white/10 text-white border border-white/30 px-8 py-3 rounded-lg text-lg font-medium hover:bg-white/20 transition-all backdrop-blur-sm">了解更多</button>
                </div>
                <div class="mt-16 flex flex-wrap justify-center gap-4">
                    <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-bolt-lightning text-cloudflare-blue"></i><span>全球CDN加速</span></div>
                    <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-shield-virus text-cloudflare-blue"></i><span>DDoS防护</span></div>
                    <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-lock text-cloudflare-blue"></i><span>SSL/TLS加密</span></div>
                    <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-globe text-cloudflare-blue"></i><span>300+ 数据中心</span></div>
                    <div class="bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2"><i class="fa-solid fa-code text-cloudflare-blue"></i><span>边缘计算</span></div>
                </div>
            </div>
        </div>
    </section>

    <section id="features" class="py-20">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">Cloudflare 核心优势</h2>
                <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">一站式解决网站性能、安全、可靠性问题，无需复杂配置</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-rocket text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">极速CDN</h3>
                    <p class="text-cloudflare-gray">智能缓存策略，全球节点就近分发，页面加载速度提升90%以上</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">全面安全防护</h3>
                    <p class="text-cloudflare-gray">内置DDoS防护、WAF、Bot管理，全方位抵御各类网络攻击</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-infinity text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">99.99% 可用性</h3>
                    <p class="text-cloudflare-gray">全球分布式网络架构，单点故障不影响整体服务，保障业务持续在线</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-lock text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">免费SSL证书</h3>
                    <p class="text-cloudflare-gray">一键启用HTTPS，自动续期，支持TLS 1.3，保障数据传输安全</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-gears text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">边缘计算</h3>
                    <p class="text-cloudflare-gray">Workers 运行时环境，在全球边缘节点执行代码，降低延迟</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-gray-100">
                    <div class="w-14 h-14 bg-orange-50 rounded-lg flex items-center justify-center mb-6"><i class="fa-solid fa-chart-line text-2xl text-cloudflare-blue"></i></div>
                    <h3 class="text-xl font-bold mb-3">实时分析</h3>
                    <p class="text-cloudflare-gray">详细的流量、性能、安全数据统计，帮助优化网站体验</p>
                </div>
            </div>
        </div>
    </section>

    <section id="performance" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">性能数据可视化</h2>
                <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">使用 Cloudflare 前后的性能对比，数据一目了然</p>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold mb-4">页面加载速度对比 (ms)</h3>
                    <div class="h-80"><canvas id="speedChart"></canvas></div>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h3 class="text-xl font-bold mb-4">全球各地区响应时间 (ms)</h3>
                    <div class="h-80"><canvas id="regionChart"></canvas></div>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div class="text-4xl font-bold text-cloudflare-blue mb-2">99.99%</div>
                    <p class="text-cloudflare-gray">网络可用性</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div class="text-4xl font-bold text-cloudflare-blue mb-2">85%</div>
                    <p class="text-cloudflare-gray">带宽节省率</p>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 text-center">
                    <div class="text-4xl font-bold text-cloudflare-blue mb-2">300+</div>
                    <p class="text-cloudflare-gray">全球数据中心</p>
                </div>
            </div>
        </div>
    </section>

    <section id="protection" class="py-20">
        <div class="container mx-auto px-4">
            <div class="max-w-5xl mx-auto">
                <div class="text-center mb-16">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">企业级安全防护</h2>
                    <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">从基础的DDoS防护到高级的Bot管理，全方位保障网站安全</p>
                </div>
                <div class="relative">
                    <div class="bg-cloudflare-dark rounded-2xl p-8 text-white mb-12">
                        <div class="flex flex-col md:flex-row items-center gap-8">
                            <div class="md:w-1/2">
                                <h3 class="text-2xl font-bold mb-4">智能威胁识别与拦截</h3>
                                <ul class="space-y-4">
                                    <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Layer 3/4/7 DDoS 防护，自动缓解各类攻击</span></li>
                                    <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Web应用防火墙(WAF)，防护SQL注入、XSS等攻击</span></li>
                                    <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Bot管理，识别并拦截恶意爬虫和自动化攻击</span></li>
                                    <li class="flex items-start gap-3"><i class="fa-solid fa-check-circle text-cloudflare-blue mt-1"></i><span>Rate Limiting，防止暴力破解和API滥用</span></li>
                                </ul>
                            </div>
                            <div class="md:w-1/2"><img src="https://picsum.photos/seed/cloudflare-sec/600/400" alt="Cloudflare 安全防护" class="rounded-lg shadow-xl w-full"></div>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6 -mt-20 mx-4 relative z-10">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                            <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">100Tbps+</div><p class="text-cloudflare-gray">DDoS防护容量</p></div>
                            <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">76B+</div><p class="text-cloudflare-gray">每月拦截威胁</p></div>
                            <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">99.9%</div><p class="text-cloudflare-gray">Bot识别准确率</p></div>
                            <div><div class="text-3xl font-bold text-cloudflare-blue mb-2">0秒</div><p class="text-cloudflare-gray">攻击缓解延迟</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="global" class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold mb-4">全球分布式网络</h2>
                <p class="text-cloudflare-gray text-lg max-w-2xl mx-auto">遍布全球300+城市的边缘节点，让你的内容离用户更近</p>
            </div>
            <div class="bg-white rounded-xl shadow-lg p-6">
                <div class="aspect-w-16 aspect-h-9 mb-8"><img src="https://picsum.photos/seed/cloudflare-map/1200/675" alt="Cloudflare 全球网络地图" class="rounded-lg w-full h-auto"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center"><i class="fa-solid fa-globe-americas text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">覆盖范围</h3><p class="text-cloudflare-gray">遍布全球200+国家和地区，300+城市节点，覆盖所有主要互联网市场</p></div>
                    <div class="text-center"><i class="fa-solid fa-network-wired text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">网络质量</h3><p class="text-cloudflare-gray">直连全球顶级运营商，低延迟、高带宽，保障最佳用户体验</p></div>
                    <div class="text-center"><i class="fa-solid fa-server text-4xl text-cloudflare-blue mb-4"></i><h3 class="text-xl font-bold mb-2">弹性扩展</h3><p class="text-cloudflare-gray">自动扩缩容，无需人工干预，轻松应对流量峰值和突发访问</p></div>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-cloudflare-dark text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4"><i class="fa-solid fa-shield-halved text-2xl text-cloudflare-blue"></i><span class="text-xl font-bold">Cloudflare Power</span></div>
                    <p class="text-gray-400 mb-4">让互联网更快速、更安全、更可靠</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-github"></i></a>
                        <a href="#" class="text-gray-400 hover:text-cloudflare-blue transition-colors"><i class="fa-brands fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-4">产品</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">CDN</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">DDoS防护</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">WAF</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Workers</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">R2存储</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-4">资源</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">文档</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">开发者平台</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">状态页面</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">博客</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">社区</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-4">公司</h4>
                    <ul class="space-y-2">
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">关于我们</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">客户案例</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">合作伙伴</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">招贤纳士</a></li>
                        <li><a href="#" class="text-gray-400 hover:text-white transition-colors">联系我们</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-500 mb-4 md:mb-0">© 2025 Cloudflare Power. All rights reserved.</p>
                <div class="flex space-x-6">
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">隐私政策</a>
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">服务条款</a>
                    <a href="#" class="text-gray-500 hover:text-white transition-colors">Cookie 设置</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const speedCtx = document.getElementById('speedChart').getContext('2d');
            new Chart(speedCtx, {
                type: 'bar',
                data: {
                    labels: ['亚太地区', '欧洲', '北美', '南美', '非洲', '中东'],
                    datasets: [
                        {
                            label: '使用Cloudflare前 (ms)',
                            data: [850, 620, 450, 780, 950, 720],
                            backgroundColor: '#e5e7eb',
                            borderColor: '#d1d5db',
                            borderWidth: 1
                        },
                        {
                            label: '使用Cloudflare后 (ms)',
                            data: [120, 80, 50, 150, 280, 180],
                            backgroundColor: '#F38020',
                            borderColor: '#ea580c',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        },
                        tooltip: {
                            mode: 'index',
                            intersect: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '加载时间 (毫秒)'
                            }
                        }
                    }
                }
            });

            const regionCtx = document.getElementById('regionChart').getContext('2d');
            new Chart(regionCtx, {
                type: 'line',
                data: {
                    labels: ['东京', '新加坡', '伦敦', '纽约', '洛杉矶', '悉尼', '圣保罗'],
                    datasets: [
                        {
                            label: '平均响应时间 (ms)',
                            data: [45, 52, 38, 25, 30, 65, 85],
                            fill: false,
                            backgroundColor: '#F38020',
                            borderColor: '#F38020',
                            tension: 0.3,
                            pointRadius: 5,
                            pointBackgroundColor: '#F38020'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '响应时间 (毫秒)'
                            }
                        }
                    }
                }
            });

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });

            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('py-2');
                    header.classList.remove('py-4');
                    header.classList.add('shadow-md');
                } else {
                    header.classList.add('py-4');
                    header.classList.remove('py-2');
                    header.classList.remove('shadow-md');
                }
            });
        });
    </script>
</body>
</html>`;
export default {
  async fetch(访问请求) {
    if (访问请求.headers.get('Upgrade') === 'websocket') {
      const 读取路径 = decodeURIComponent(访问请求.url.replace(/^https?:\/\/[^/]+/, ''));
      const 当前反代IP = 读取路径.match(/ip=([^&]+)/)?.[1] || 默认反代IP;
      const [客户端, WS接口] = Object.values(new WebSocketPair());
      WS接口.accept();
      启动传输管道(WS接口, 当前反代IP);
      return new Response(null, { status: 101, webSocket: 客户端 });
    } 
    else {
      const 请求URL = new URL(访问请求.url);
      const 部署域名 = 请求URL.hostname;
      const 请求路径 = 请求URL.pathname;
      const 节点路径 = '/sub';
      if (请求路径 === '/' || 请求路径 === '') {
        return new Response(主页HTML, {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' }
        });
      }
      else if (请求路径 === 节点路径) {
        return new Response(`部署成功！
你的UUID: ${我的VL密钥}
你的部署域名：${部署域名}
你的反代ip：${默认反代IP}
默认节点：
vless://${我的VL密钥}@${部署域名}:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#${部署域名}
vless://${我的VL密钥}@108.162.192.0:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#sg 新加坡 SG
vless://${我的VL密钥}@108.162.198.0:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#jp 日本 JP
vless://${我的VL密钥}@104.18.0.0:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#us 美国 US
vless://${我的VL密钥}@104.26.0.0:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#de 德国 DE
vless://${我的VL密钥}@188.114.96.0:443?encryption=none&security=tls&sni=${部署域名}&fp=chrome&alpn=h3%2Ch2%2Chttp%2F1.1&insecure=0&allowInsecure=0&ech=cloudflare-ech.com%2Bhttps%3A%2F%2Fdns.alidns.com%2Fdns-query&type=ws&host=${部署域名}&path=pyip%3D${默认反代IP}#nl 荷兰 NL
更多节点使用手搓节点生成器： http://ip.cloudip.ggff.net`, {
          status: 200,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
      else {
        return new Response('404 Not Found', {
          status: 404,
          headers: { 'Content-Type': 'text/plain; charset=utf-8' }
        });
      }
    }
  }
};
async function 启动传输管道(WS接口, 反代IP) {
  let 识别地址类型, 访问地址, 地址长度, 首包数据 = false, 首包处理完成 = null, 传输数据, 读取数据, 传输队列 = Promise.resolve();
  let TCP接口;
  try {
    WS接口.addEventListener('message', async event => {
      if (!首包数据) {
        首包数据 = true;
        首包处理完成 = 解析首包数据(event.data, 反代IP);
        传输队列 = 传输队列.then(() => 首包处理完成).catch(e => { throw (e) });
      } else {
        await 首包处理完成;
        传输队列 = 传输队列.then(() => 传输数据.write(event.data)).catch(e => { throw (e) });
      }
    });
    async function 解析首包数据(首包数据, 反代IP) {
      const 二进制数据 = new Uint8Array(首包数据);
      const 协议头 = 二进制数据[0];
      const 验证VL的密钥 = (a, i = 0) => [...a.slice(i, i + 16)].map(b => b.toString(16).padStart(2, '0')).join('').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
      if (验证VL的密钥(二进制数据.slice(1, 17)) !== 我的VL密钥) throw new Error('UUID验证失败');
      const 提取端口索引 = 18 + 二进制数据[17] + 1;
      const 访问端口 = new DataView(二进制数据.buffer, 提取端口索引, 2).getUint16(0);
      const 提取地址索引 = 提取端口索引 + 2;
      识别地址类型 = 二进制数据[提取地址索引];
      let 地址信息索引 = 提取地址索引 + 1;
      switch (识别地址类型) {
        case 1:
          地址长度 = 4;
          访问地址 = 二进制数据.slice(地址信息索引, 地址信息索引 + 地址长度).join('.');
          break;
        case 2:
          地址长度 = 二进制数据[地址信息索引];
          地址信息索引 += 1;
          访问地址 = new TextDecoder().decode(二进制数据.slice(地址信息索引, 地址信息索引 + 地址长度));
          break;
        case 3:
          地址长度 = 16;
          const ipv6 = [];
          const 读取IPV6地址 = new DataView(二进制数据.buffer, 地址信息索引, 16);
          for (let i = 0; i < 8; i++) ipv6.push(读取IPV6地址.getUint16(i * 2).toString(16));
          访问地址 = ipv6.join(':');
          break;
        default:
          throw new Error('无效的访问地址');
      }
      try {
        if (识别地址类型 === 3) {
          const 转换IPV6地址 = `[${访问地址}]`;
          TCP接口 = connect({ hostname: 转换IPV6地址, port: 访问端口 });
        } else {
          TCP接口 = connect({ hostname: 访问地址, port: 访问端口 });
        }
        await TCP接口.opened;
      } catch {
        if (!反代IP) throw new Error('直连失败且未配置反代IP');
        const [反代IP地址, 反代IP端口 = 443] = 反代IP.split(':');
        TCP接口 = connect({ hostname: 反代IP地址, port: Number(反代IP端口) });
        await TCP接口.opened;
      }
      传输数据 = TCP接口.writable.getWriter();
      读取数据 = TCP接口.readable.getReader();
      const 写入初始数据 = 二进制数据.slice(地址信息索引 + 地址长度);
      if (写入初始数据.length > 0) try { await 传输数据.write(写入初始数据) } catch (e) { throw (e) };
      WS接口.send(new Uint8Array([协议头, 0]));
      启动回传管道();
    }
    async function 启动回传管道() {
      while (true) {
        await 传输队列;
        const { done: 流结束, value: 返回数据 } = await 读取数据.read();
        if (返回数据 && 返回数据.length > 0) {
          传输队列 = 传输队列.then(() => WS接口.send(返回数据)).catch(e => { throw (e) });
        }
        if (流结束) break;
      }
      throw new Error('传输完成');
    }
  } catch (e) {
    try { await TCP接口?.close?.() } catch {};
    try { WS接口?.close?.() } catch {};
  }
}
