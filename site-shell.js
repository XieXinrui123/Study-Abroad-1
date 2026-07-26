(() => {
  const header = document.querySelector('header.header');
  if (!header) return;

  const navItems = [
    ['首页', 'index.html'],
    ['服务套餐', 'package.html'],
    ['案例库', 'cases.html'],
    ['背景评估', 'evaluator.html'],
    ['时间线', 'timeline.html'],
    ['费用计算', 'calculator.html'],
    ['就业指南', 'career.html']
  ];

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const links = navItems.map(([label, href]) => {
    const active = currentPage === href;
    return `<a href="${href}" class="${active ? 'active' : ''}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');

  header.innerHTML = `
    <div class="container nav-wrap site-nav-wrap">
      <a href="index.html" class="logo" aria-label="DreamBridge 首页">Dream<span>Bridge</span></a>
      <nav class="nav-links site-desktop-nav" aria-label="主导航">${links}</nav>
      <div class="site-nav-actions">
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="切换深色模式">🌓</button>
        <button class="site-consult-btn" type="button" onclick="openQr()">微信咨询</button>
        <button class="site-menu-toggle" id="siteMenuToggle" type="button" aria-label="打开导航菜单" aria-expanded="false" aria-controls="siteMobileMenu"><span></span></button>
      </div>
    </div>
    <div class="site-mobile-menu" id="siteMobileMenu" aria-hidden="true">
      <div class="site-mobile-panel">
        <button class="site-mobile-close" id="siteMobileClose" type="button" aria-label="关闭导航菜单">×</button>
        <nav class="site-mobile-links" aria-label="移动端导航">${links}</nav>
        <button class="site-mobile-consult" type="button" onclick="openQr()">添加微信咨询</button>
      </div>
    </div>
  `;

  const toggle = document.getElementById('siteMenuToggle');
  const menu = document.getElementById('siteMobileMenu');
  const closeButton = document.getElementById('siteMobileClose');
  const themeToggle = document.getElementById('themeToggle');
  let savedTheme = '';
  try { savedTheme = localStorage.getItem('dreambridge-theme') || ''; } catch {}
  if (savedTheme === 'dark') document.body.classList.add('dark');

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    try {
      localStorage.setItem('dreambridge-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    } catch {}
  });

  function setMenu(open) {
    toggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  closeButton.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', event => {
    if (event.target === menu || event.target.closest('.site-mobile-links a')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMenu(false);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const footer = document.querySelector('footer.footer');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <div class="site-footer-grid">
          <div>
            <a href="index.html" class="logo" aria-label="DreamBridge 首页">Dream<span>Bridge</span></a>
            <p class="site-footer-brand-copy">专注英港新澳留学申请，以真实案例、清晰流程和透明服务帮助学生完成选校与申请。</p>
            <button class="site-consult-btn" type="button" onclick="openQr()">添加微信咨询</button>
          </div>
          <div>
            <h2 class="site-footer-title">网站导航</h2>
            <nav class="site-footer-links" aria-label="页脚导航">${links}</nav>
          </div>
          <div>
            <h2 class="site-footer-title">联系我们</h2>
            <div class="site-footer-contact">
              <a href="mailto:496680190@qq.com">496680190@qq.com</a>
              <span>微信：xxr13365810586</span>
              <button type="button" onclick="openQr()">查看微信二维码</button>
            </div>
          </div>
        </div>
        <div class="site-footer-bottom">
          <span>&copy; ${year} DreamBridge 留学服务</span>
          <span>历史案例仅供申请规划参考，具体结果因个人背景与院校政策而异。</span>
        </div>
      </div>
    `;
  });
})();
