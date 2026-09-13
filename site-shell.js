(() => {
  const header = document.querySelector('header.header');
  if (!header) return;

  const navItems = [
    ['首页', 'index.html'],
    ['留学服务', 'package.html'],
    ['职业发展', 'career.html'],
    ['案例库', 'cases.html'],
    ['关于我们', 'about.html']
  ];
  const toolItems = [
    ['背景评估', 'evaluator.html'],
    ['申请时间线', 'timeline.html'],
    ['费用计算', 'calculator.html']
  ];

  const currentPage = location.pathname.split('/').pop() || 'index.html';
  const links = navItems.map(([label, href]) => {
    const active = currentPage === href;
    return `<a href="${href}" class="${active ? 'active' : ''}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');
  const toolsActive = toolItems.some(([, href]) => currentPage === href);
  const toolLinks = toolItems.map(([label, href]) => {
    const active = currentPage === href;
    return `<a href="${href}" class="${active ? 'active' : ''}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');
  const desktopLinks = `${links}<div class="site-nav-dropdown${toolsActive ? ' active' : ''}"><button type="button" aria-haspopup="true">申请工具<span aria-hidden="true">⌄</span></button><div class="site-nav-dropdown-menu">${toolLinks}</div></div>`;
  const mobileLinks = `${links}<div class="site-mobile-link-group"><span>申请工具</span>${toolLinks}</div>`;

  header.innerHTML = `
    <div class="container nav-wrap site-nav-wrap">
      <a href="index.html" class="logo" aria-label="DreamBridge 首页">Dream<span>Bridge</span></a>
      <nav class="nav-links site-desktop-nav" aria-label="主导航">${desktopLinks}</nav>
      <div class="site-nav-actions">
        <button class="theme-toggle" id="themeToggle" type="button" aria-label="切换深色模式"><span class="site-theme-icon" aria-hidden="true"></span></button>
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
      <nav class="site-mobile-links" aria-label="移动端导航">${mobileLinks}</nav>
      <a class="site-mobile-primary-action" href="evaluator.html#evaluator">免费背景评估</a>
      <button class="site-mobile-consult" type="button" onclick="openQr()">微信咨询：xxr13365810586</button>
    </div>
  `;
  document.body.appendChild(mobileMenu);

  if (!document.querySelector('.site-mobile-primary')) {
    const mobilePrimary = document.createElement('div');
    mobilePrimary.className = 'site-mobile-primary';
    mobilePrimary.innerHTML = `
      <button class="site-mobile-primary-toggle" id="siteMobilePrimaryToggle" type="button" aria-label="打开申请工具" aria-expanded="false" aria-controls="siteMobileActions">
        <span><strong>从哪里开始？</strong><small>评估、案例匹配或人工咨询</small></span>
        <b>选择工具</b>
      </button>
      <div class="site-mobile-actions" id="siteMobileActions" aria-hidden="true">
        <div class="site-mobile-actions-head">
          <span><strong>选择下一步</strong><small>所有工具均可免费使用</small></span>
          <button type="button" data-mobile-action="close" aria-label="关闭申请工具">×</button>
        </div>
        <a href="evaluator.html#evaluator"><strong>背景评估</strong><small>根据 4 项背景匹配相似录取</small></a>
        <a href="cases.html"><strong>查看案例库</strong><small>按地区、学校和专业筛选案例</small></a>
        <button type="button" data-mobile-action="assistant"><strong>申请助手</strong><small>使用案例匹配与申请信息导航</small></button>
        <button type="button" data-mobile-action="wechat"><strong>微信人工咨询</strong><small>xxr13365810586</small></button>
      </div>
    `;
    document.body.appendChild(mobilePrimary);
  }

  const toggle = document.getElementById('siteMenuToggle');
  const menu = document.getElementById('siteMobileMenu');
  const closeButton = document.getElementById('siteMobileClose');
  const themeToggle = document.getElementById('themeToggle');
  const mobilePrimary = document.querySelector('.site-mobile-primary');
  const mobilePrimaryToggle = document.getElementById('siteMobilePrimaryToggle');
  const mobileActions = document.getElementById('siteMobileActions');
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
    if (open) setMobileActions(false);
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

  function setMobileActions(open) {
    if (!mobileActions || !mobilePrimaryToggle) return;
    mobileActions.classList.toggle('open', open);
    mobilePrimary.classList.toggle('actions-open', open);
    mobilePrimaryToggle.setAttribute('aria-expanded', String(open));
    mobileActions.setAttribute('aria-hidden', String(!open));
  }

  mobilePrimaryToggle?.addEventListener('click', () => {
    setMobileActions(!mobileActions.classList.contains('open'));
  });
  mobileActions?.addEventListener('click', event => {
    const action = event.target.closest('[data-mobile-action]')?.dataset.mobileAction;
    if (event.target.closest('a')) setMobileActions(false);
    if (action === 'close') setMobileActions(false);
    if (action === 'wechat') {
      setMobileActions(false);
      if (typeof window.openQr === 'function') window.openQr();
    }
    if (action === 'assistant') {
      setMobileActions(false);
      const assistantButton = document.querySelector('.db-assistant-fab');
      if (assistantButton) assistantButton.click();
    }
  });

  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  closeButton.addEventListener('click', () => setMenu(false));
  menu.addEventListener('click', event => {
    if (event.target === menu || event.target.closest('.site-mobile-links a, .site-mobile-primary-action, .site-mobile-consult')) setMenu(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
    if (event.key === 'Escape') setMobileActions(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menu.classList.contains('open')) setMenu(false);
  });

  document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    if (main && !document.querySelector('.site-admission-broadcast')) {
      const broadcast = document.createElement('section');
      broadcast.className = 'site-admission-broadcast';
      broadcast.setAttribute('aria-label', '2027 Fall 提前批录取捷报');
      broadcast.innerHTML = `
        <div class="container">
          <div class="site-broadcast-shell">
            <span class="site-broadcast-label">27 Fall 提前批捷报</span>
            <div class="site-broadcast-viewport">
              <div class="site-broadcast-track">
                <div class="site-broadcast-sequence">
                  <span class="site-broadcast-item"><span class="site-broadcast-dot">●</span><strong>中山大学 K 同学</strong><b>香港大学</b>商业人工智能理学硕士 + 市场营销理学硕士</span>
                  <span class="site-broadcast-item"><span class="site-broadcast-dot">●</span><strong>海外本科 C 同学</strong><b>新加坡国立大学</b>可持续发展数据科学理学硕士</span>
                  <span class="site-broadcast-item"><strong>2 位学生 · 3 枚 Offer</strong>录取材料均已核验</span>
                </div>
                <div class="site-broadcast-sequence" aria-hidden="true">
                  <span class="site-broadcast-item"><span class="site-broadcast-dot">●</span><strong>中山大学 K 同学</strong><b>香港大学</b>商业人工智能理学硕士 + 市场营销理学硕士</span>
                  <span class="site-broadcast-item"><span class="site-broadcast-dot">●</span><strong>海外本科 C 同学</strong><b>新加坡国立大学</b>可持续发展数据科学理学硕士</span>
                  <span class="site-broadcast-item"><strong>2 位学生 · 3 枚 Offer</strong>录取材料均已核验</span>
                </div>
              </div>
            </div>
            <a class="site-broadcast-action" href="evaluator.html#evaluator">咨询 27 Fall →</a>
          </div>
        </div>
      `;

      const mainChildren = Array.from(main.children);
      const preferredAnchor = currentPage === 'index.html'
        ? mainChildren.find(node => node.classList.contains('decision-path'))
        : mainChildren.find(node => node.classList.contains('hero') || node.classList.contains('page-title'));
      if (preferredAnchor) preferredAnchor.insertAdjacentElement('afterend', broadcast);
      else main.prepend(broadcast);
    }

    fetch('cases.json', { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error('案例数据加载失败');
        return response.json();
      })
      .then(cases => {
        if (!Array.isArray(cases)) return;
        const count = cases.length;
        document.querySelectorAll('[data-case-count]').forEach(node => {
          node.textContent = String(count);
          node.dataset.count = String(count);
        });
        document.querySelectorAll('[data-case-count-text]').forEach(node => {
          const suffix = node.dataset.caseCountSuffix || ' 条真实案例';
          node.textContent = `${count}${suffix}`;
        });
      })
      .catch(() => {});

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
    if (!footer.id) footer.id = 'contact';
    const year = new Date().getFullYear();
    footer.innerHTML = `
      <div class="container">
        <div class="site-footer-grid">
          <div>
            <a href="index.html" class="logo" aria-label="DreamBridge 首页">Dream<span>Bridge</span></a>
            <p class="site-footer-brand-copy">DreamBridge 成立于 2022 年，是一家面向年轻人的教育与职业发展服务机构。</p>
            <button class="site-consult-btn" type="button" onclick="openQr()">添加微信咨询</button>
          </div>
          <div>
            <h2 class="site-footer-title">业务方向</h2>
            <nav class="site-footer-links" aria-label="业务方向">
              <a href="package.html">留学申请</a>
              <a href="package.html#ielts-training">语言培训</a>
              <a href="career.html">职业发展</a>
              <a href="about.html#what-we-do">考公考编</a>
            </nav>
          </div>
          <div>
            <h2 class="site-footer-title">快速链接</h2>
            <nav class="site-footer-links site-footer-links--quick" aria-label="快速链接">
              <a href="about.html">关于我们</a>
              <a href="cases.html">真实案例</a>
              <a href="evaluator.html">背景评估</a>
              <a href="#contact">联系我们</a>
            </nav>
            <h2 class="site-footer-title site-footer-contact-title">联系我们</h2>
            <div class="site-footer-contact">
              <a href="mailto:496680190@qq.com">496680190@qq.com</a>
              <span>微信：xxr13365810586</span>
              <button type="button" onclick="openQr()">查看微信二维码</button>
            </div>
          </div>
        </div>
        <div class="site-footer-company" id="company-info">
          <p><strong>公司名称</strong><span>长沙市芯鱼国际教育咨询有限公司</span></p>
          <p><strong>注册地址</strong><span>湖南省长沙市岳麓区岳麓街道潇湘中路328号麓枫和苑33号栋湖南大学湘江新区大学生创新创业园1楼182号</span></p>
        </div>
        <div class="site-footer-bottom">
          <span>&copy; ${year} DreamBridge 教育与职业发展</span>
          <span>把复杂选择，变成清晰路径。</span>
        </div>
      </div>
    `;
  });
})();
