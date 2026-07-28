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
        <a class="site-primary-action" href="evaluator.html#evaluator">免费背景评估</a>
        <button class="site-menu-toggle" id="siteMenuToggle" type="button" aria-label="打开导航菜单" aria-expanded="false" aria-controls="siteMobileMenu"><span></span></button>
      </div>
    </div>
  `;

  // 菜单必须挂在 body 下。若作为 fixed header 的子元素，
  // iOS/微信浏览器在 header 启用 backdrop-filter 后会把它限制在 header 高度内。
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'site-mobile-menu';
  mobileMenu.id = 'siteMobileMenu';
  mobileMenu.setAttribute('aria-hidden', 'true');
  mobileMenu.innerHTML = `
    <div class="site-mobile-panel" role="dialog" aria-modal="true" aria-label="网站导航">
      <button class="site-mobile-close" id="siteMobileClose" type="button" aria-label="关闭导航菜单">×</button>
      <nav class="site-mobile-links" aria-label="移动端导航">${links}</nav>
      <a class="site-mobile-primary-action" href="evaluator.html#evaluator">免费背景评估</a>
      <button class="site-mobile-consult" type="button" onclick="openQr()">微信咨询：xxr13365810586</button>
    </div>
  `;
  document.body.appendChild(mobileMenu);

  if (!document.querySelector('.site-mobile-primary')) {
    const mobilePrimary = document.createElement('a');
    mobilePrimary.className = 'site-mobile-primary';
    mobilePrimary.href = 'evaluator.html#evaluator';
    mobilePrimary.setAttribute('aria-label', '免费背景评估，30秒匹配相似案例');
    mobilePrimary.innerHTML = '<span><strong>不确定能申请什么学校？</strong><small>30秒匹配相似录取案例</small></span><b>免费评估</b>';
    document.body.appendChild(mobilePrimary);
  }

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
    document.body.classList.toggle('site-menu-open', open);
    document.documentElement.classList.toggle('site-menu-open', open);

    if (open) {
      closeButton.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  closeButton.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', event => {
    if (event.target === menu || event.target.closest('.site-mobile-links a, .site-mobile-primary-action, .site-mobile-consult')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('open')) setMenu(false);
  });

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.to-top').forEach(button => {
      button.setAttribute('aria-label', '返回页面顶部');
      button.setAttribute('title', '返回顶部');
    });
    document.querySelectorAll('.qr-modal').forEach(modal => {
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', '微信咨询');
    });
    document.querySelectorAll('.qr-close').forEach(button => {
      button.setAttribute('aria-label', '关闭微信二维码');
    });

    const footer = document.querySelector('footer.footer');
    if (!footer) return;
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <div class="site-footer-grid">
          <div>
            <a href="index.html" class="logo" aria-label="DreamBridge 首页">Dream<span>Bridge</span></a>
            <p class="site-footer-brand-copy">专注英港新澳留学申请，累计服务 500+ 学生，以真实案例、清晰流程和透明服务帮助学生完成选校与申请。</p>
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
