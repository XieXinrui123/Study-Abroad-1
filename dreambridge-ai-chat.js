/**
 * DreamBridge 智能申请助手
 * 纯前端规则 + cases.json 真实案例匹配，不调用大模型或外部接口。
 */
(function () {
  'use strict';

  const CONFIG = {
    name: 'DreamBridge 智能申请助手',
    wechat: 'xxr13365810586',
    caseUrl: 'cases.json',
    verifiedAt: '2026-07-28'
  };

  const INFO_PAGES = {
    materials: {
      eyebrow: '申请准备',
      title: '先准备不会频繁变化的核心材料',
      intro: '不同学校和专业要求不完全相同，下面适合作为第一轮检查清单。',
      items: [
        ['学术材料', '中英文成绩单、在读证明或毕业证与学位证'],
        ['个人材料', '护照、简历，以及项目要求的个人陈述'],
        ['推荐材料', '按项目要求准备推荐人信息或推荐信'],
        ['补充材料', '语言成绩、作品集、实习或科研证明等'],
        ['递交前复核', '逐项对照目标项目官网，确认格式、字数和截止时间']
      ],
      links: [
        ['查看申请时间线', 'timeline.html'],
        ['查看服务套餐', 'package.html']
      ],
      note: '材料数量、语言门槛和推荐信形式以目标项目当年官网为准。'
    },
    timeline: {
      eyebrow: '时间规划',
      title: '按入学年份和地区生成时间线',
      intro: '院校开放和截止时间每年都会变化，因此助手不写死统一月份。',
      items: [
        ['确定目标', '先明确入学年份、申请地区与专业方向'],
        ['倒排节点', '从目标项目截止日期反推语言、文书和推荐信'],
        ['分批递交', '滚动录取项目尽早准备，分轮项目按官网批次安排'],
        ['保留复核', '递交前再次检查项目网页与申请系统']
      ],
      links: [['生成我的时间线', 'timeline.html']],
      note: '网站时间线用于规划，不替代院校官网公布的正式截止日期。'
    },
    cost: {
      eyebrow: '费用预算',
      title: '不要用一个固定数字代表整个国家',
      intro: '总费用会受到学校、专业、城市、学制、住宿和汇率影响。',
      items: [
        ['学费', '以项目官网当学年学费为基础'],
        ['生活费', '重点区分城市、住宿类型和个人消费'],
        ['一次性支出', '签证、保险、体检、机票和留位费等'],
        ['预算缓冲', '为汇率变化和临时支出预留空间']
      ],
      links: [['打开费用计算器', 'calculator.html']],
      note: '计算结果是规划参考，付款前请以学校、签证部门和服务机构的最新金额为准。'
    },
    policy: {
      eyebrow: '就业与政策',
      title: '只展示能够追溯到官方来源的政策',
      intro: '落户、补贴、免税购车和毕业后工签都可能调整，不根据单一排名直接承诺结果。',
      items: [
        ['回国政策', '核对学历、学习经历、单位、合同、社保和申请时点'],
        ['海外工签', '先确认合法工作期限，再评估岗位机会'],
        ['求职准备', '从目标岗位需要的技能和成果证据倒推准备'],
        ['最终判断', '以办理部门、移民部门或用人单位当期规则为准']
      ],
      links: [['查看已核验就业指南', 'career.html']],
      note: `政策摘要最后核验于 ${CONFIG.verifiedAt}。`
    },
    school: {
      eyebrow: '初步定位',
      title: '用真实案例辅助判断，不输出虚假录取概率',
      intro: '学校、专业、均分、课程匹配和经历都会影响结果。建议先做背景评估，再看相似案例。',
      items: [
        ['第一步', '填写本科背景、均分、专业和目标地区'],
        ['第二步', '查看系统匹配出的真实录取案例'],
        ['第三步', '结合项目官网要求形成冲刺、匹配和相对稳妥的备选'],
        ['重要提醒', '历史案例只能提供参考，不代表未来录取承诺']
      ],
      links: [
        ['做背景初评', 'evaluator.html'],
        ['开始匹配案例', '#match']
      ],
      note: '助手不会使用“必录、保录、成功率XX%”等无法验证的表述。'
    },
    service: {
      eyebrow: '服务咨询',
      title: '先了解服务范围，再决定是否咨询',
      intro: '你可以先查看不同服务方式和交付内容，不需要在助手里提交敏感个人信息。',
      items: [
        ['DIY', '适合已有规划、主要需要工具和阶段性支持的学生'],
        ['半DIY', '适合希望在关键环节获得专业协助的学生'],
        ['全流程', '适合希望系统推进选校、材料与申请执行的学生']
      ],
      links: [
        ['查看服务套餐', 'package.html'],
        ['联系人工顾问', '#contact']
      ],
      note: '具体服务内容与价格以套餐页面和双方确认的信息为准。'
    }
  };

  const INTENTS = [
    { page: 'materials', keywords: ['材料', '资料', '文书', '推荐信', '简历', 'ps', 'cv', '成绩单'] },
    { page: 'timeline', keywords: ['时间', '几月', '什么时候', '申请季', '截止', 'deadline', '规划'] },
    { page: 'cost', keywords: ['费用', '预算', '多少钱', '学费', '生活费', '花费', '留位费'] },
    { page: 'policy', keywords: ['就业', '工作', '工签', '落户', '补贴', '免税', '考公', '大厂', '签证'] },
    { page: 'school', keywords: ['选校', '定位', '能申', '学校', '录取', '案例', 'gpa', '均分'] },
    { page: 'service', keywords: ['服务', '收费', '套餐', '中介', '顾问', '微信', '联系'] }
  ];

  const MAJOR_GROUPS = {
    '计算机与数据': ['计算机', '软件', '人工智能', '数据', '信息系统', '网络', '算法', 'cs', 'ai'],
    '电子与工程': ['电子', '电气', '通信', '自动化', '工程', '机械', '材料', '土木', '机器人', '微电子'],
    '金融与经济': ['金融', '经济', '会计', '财务', '商业', '管理', '市场', '审计', '贸易'],
    '传媒与社科': ['传媒', '传播', '社会', '新闻', '公共', '政策', '国际关系', '心理'],
    '教育与语言': ['教育', '英语', '语言', '翻译', 'tesol', '文学'],
    '生命与医学': ['生物', '医学', '药学', '化学', '食品', '环境', '护理', '健康'],
    '艺术与设计': ['艺术', '设计', '建筑', '音乐', '舞蹈', '电影', '游戏']
  };

  let isOpen = false;
  let casesCache = null;
  let currentView = 'home';
  let lastFocused = null;

  function init() {
    if (document.getElementById('db-assistant')) return;
    injectStyles();
    createWidget();
    bindEvents();
  }

  function createWidget() {
    const root = document.createElement('div');
    root.id = 'db-assistant';
    root.innerHTML = `
      <button class="db-assistant-fab" id="dbAssistantFab" type="button" aria-label="打开智能申请助手" aria-expanded="false">
        <span aria-hidden="true">✦</span>
        <span>申请助手</span>
      </button>
      <section class="db-assistant-panel" id="dbAssistantPanel" aria-label="${CONFIG.name}" aria-hidden="true">
        <header class="db-assistant-header">
          <div class="db-assistant-brand">
            <span class="db-assistant-avatar" aria-hidden="true">DB</span>
            <div>
              <strong>${CONFIG.name}</strong>
              <span><i></i> 本地规则运行 · 无大模型费用</span>
            </div>
          </div>
          <button class="db-assistant-close" type="button" data-db-action="close" aria-label="关闭助手">×</button>
        </header>
        <div class="db-assistant-body" id="dbAssistantBody"></div>
        <footer class="db-assistant-footer">
          <span>不上传你的背景信息</span>
          <button type="button" data-db-action="clear">清除本次填写</button>
        </footer>
      </section>
      <div class="db-assistant-toast" id="dbAssistantToast" role="status" aria-live="polite"></div>
    `;
    document.body.appendChild(root);
    renderHome();
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.id = 'db-assistant-styles';
    style.textContent = `
      #db-assistant { --db-blue:#2563eb; --db-blue-dark:#1d4ed8; --db-ink:#12223a; --db-muted:#607086; --db-line:#e2e8f0; --db-soft:#f4f8fd; --db-white:#fff; font-family:Inter,system-ui,-apple-system,"Segoe UI",sans-serif; }
      .db-assistant-fab { position:fixed; right:22px; bottom:22px; z-index:990; display:flex; align-items:center; gap:8px; min-height:48px; padding:0 18px; border:0; border-radius:999px; color:#fff; background:linear-gradient(135deg,var(--db-blue),var(--db-blue-dark)); box-shadow:0 12px 30px rgba(37,99,235,.32); font:800 14px/1 inherit; cursor:pointer; transition:transform .2s ease,opacity .2s ease; }
      .db-assistant-fab:hover { transform:translateY(-2px); }
      .db-assistant-fab[aria-expanded="true"] { opacity:0; pointer-events:none; transform:translateY(10px); }
      .db-assistant-panel { position:fixed; right:22px; bottom:22px; z-index:991; width:min(410px,calc(100vw - 28px)); height:min(680px,calc(100dvh - 44px)); display:flex; flex-direction:column; overflow:hidden; border:1px solid rgba(148,163,184,.28); border-radius:22px; color:var(--db-ink); background:var(--db-white); box-shadow:0 24px 70px rgba(15,23,42,.24); opacity:0; visibility:hidden; transform:translateY(18px) scale(.98); transform-origin:bottom right; transition:opacity .22s ease,transform .22s ease,visibility .22s; }
      .db-assistant-panel.open { opacity:1; visibility:visible; transform:none; }
      .db-assistant-header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:17px 18px; color:#fff; background:linear-gradient(135deg,#102542,#1e4d8b); }
      .db-assistant-brand { display:flex; align-items:center; gap:11px; min-width:0; }
      .db-assistant-avatar { width:38px; height:38px; display:grid; place-items:center; flex:0 0 auto; border-radius:12px; color:#0f2746; background:#dff7ec; font-size:12px; font-weight:900; }
      .db-assistant-brand strong { display:block; font-size:14px; line-height:1.3; }
      .db-assistant-brand span { display:flex; align-items:center; gap:6px; margin-top:4px; color:rgba(255,255,255,.72); font-size:10px; }
      .db-assistant-brand i { width:6px; height:6px; border-radius:50%; background:#34d399; }
      .db-assistant-close { width:36px; height:36px; display:grid; place-items:center; flex:0 0 auto; border:0; border-radius:10px; color:#fff; background:rgba(255,255,255,.1); font:400 24px/1 inherit; cursor:pointer; }
      .db-assistant-body { flex:1; overflow-y:auto; overscroll-behavior:contain; padding:20px; background:linear-gradient(180deg,#f8fbff,#fff 34%); }
      .db-assistant-footer { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:10px 16px; border-top:1px solid var(--db-line); color:var(--db-muted); background:#fff; font-size:10px; }
      .db-assistant-footer button { padding:4px; border:0; color:var(--db-blue); background:none; font:700 10px/1 inherit; cursor:pointer; }
      .db-assistant-kicker { color:var(--db-blue); font-size:11px; font-weight:900; letter-spacing:.08em; }
      .db-assistant-title { margin:7px 0 8px; color:var(--db-ink); font-size:21px; line-height:1.28; }
      .db-assistant-intro { margin:0; color:var(--db-muted); font-size:13px; line-height:1.7; }
      .db-assistant-proof { display:flex; flex-wrap:wrap; gap:7px; margin:14px 0 18px; }
      .db-assistant-proof span { padding:6px 9px; border:1px solid #dbe8f7; border-radius:999px; color:#315276; background:#f6faff; font-size:10px; font-weight:800; }
      .db-assistant-grid { display:grid; grid-template-columns:1fr 1fr; gap:9px; }
      .db-assistant-tile { min-height:86px; padding:13px; text-align:left; border:1px solid var(--db-line); border-radius:14px; color:var(--db-ink); background:#fff; cursor:pointer; transition:border-color .15s ease,transform .15s ease,box-shadow .15s ease; }
      .db-assistant-tile:hover { transform:translateY(-2px); border-color:#93b4e4; box-shadow:0 8px 20px rgba(37,99,235,.08); }
      .db-assistant-tile b { display:block; margin-bottom:4px; font-size:13px; }
      .db-assistant-tile span { color:var(--db-muted); font-size:11px; line-height:1.45; }
      .db-assistant-search { display:flex; gap:8px; margin-top:15px; }
      .db-assistant-search input,.db-assistant-field input,.db-assistant-field select { width:100%; min-height:42px; padding:10px 12px; border:1px solid var(--db-line); border-radius:11px; color:var(--db-ink); background:#fff; font:13px/1.2 inherit; outline:none; }
      .db-assistant-search input:focus,.db-assistant-field input:focus,.db-assistant-field select:focus { border-color:var(--db-blue); box-shadow:0 0 0 3px rgba(37,99,235,.1); }
      .db-assistant-icon-btn { width:44px; flex:0 0 44px; border:0; border-radius:11px; color:#fff; background:var(--db-blue); font-size:18px; cursor:pointer; }
      .db-assistant-back { display:inline-flex; align-items:center; gap:5px; margin:0 0 14px; padding:0; border:0; color:var(--db-blue); background:none; font:800 12px/1 inherit; cursor:pointer; }
      .db-assistant-list { display:grid; gap:9px; margin:17px 0; }
      .db-assistant-list-item { padding:12px 13px; border:1px solid var(--db-line); border-radius:12px; background:#fff; }
      .db-assistant-list-item b { display:block; margin-bottom:3px; font-size:12px; }
      .db-assistant-list-item span { color:var(--db-muted); font-size:11px; line-height:1.55; }
      .db-assistant-actions { display:flex; flex-wrap:wrap; gap:8px; margin-top:16px; }
      .db-assistant-action { display:inline-flex; align-items:center; justify-content:center; min-height:38px; padding:9px 12px; border:1px solid #bfd3ef; border-radius:10px; color:var(--db-blue); background:#f7fbff; font:800 11px/1 inherit; text-decoration:none; cursor:pointer; }
      .db-assistant-action.primary { border-color:var(--db-blue); color:#fff; background:var(--db-blue); }
      .db-assistant-note { margin-top:15px; padding:11px 12px; border-left:3px solid #f59e0b; border-radius:8px; color:#7c4a03; background:#fffbeb; font-size:10px; line-height:1.6; }
      .db-assistant-form { display:grid; grid-template-columns:1fr 1fr; gap:11px; margin-top:17px; }
      .db-assistant-field { display:flex; flex-direction:column; gap:6px; }
      .db-assistant-field.full { grid-column:1/-1; }
      .db-assistant-field label { color:var(--db-ink); font-size:11px; font-weight:800; }
      .db-assistant-form-submit { grid-column:1/-1; min-height:43px; border:0; border-radius:11px; color:#fff; background:linear-gradient(135deg,var(--db-blue),var(--db-blue-dark)); font:800 13px/1 inherit; cursor:pointer; }
      .db-assistant-form-hint { grid-column:1/-1; margin:0; color:var(--db-muted); font-size:10px; line-height:1.5; }
      .db-assistant-results { display:grid; gap:10px; margin-top:16px; }
      .db-case-card { padding:13px; border:1px solid var(--db-line); border-radius:14px; background:#fff; }
      .db-case-top { display:flex; align-items:flex-start; justify-content:space-between; gap:10px; }
      .db-case-top strong { font-size:13px; }
      .db-case-match { flex:0 0 auto; padding:4px 7px; border-radius:999px; color:#047857; background:#ecfdf5; font-size:9px; font-weight:900; }
      .db-case-meta { margin:5px 0 8px; color:var(--db-muted); font-size:10px; line-height:1.55; }
      .db-case-reasons { margin-bottom:8px; color:#315276; font-size:10px; font-weight:700; }
      .db-case-offer { padding:6px 0; border-top:1px solid #edf2f7; color:var(--db-ink); font-size:10px; line-height:1.45; }
      .db-assistant-empty { margin-top:16px; padding:16px; border:1px dashed #b8c8dc; border-radius:14px; color:var(--db-muted); text-align:center; font-size:11px; line-height:1.65; }
      .db-assistant-toast { position:fixed; right:24px; bottom:92px; z-index:995; max-width:280px; padding:10px 14px; border-radius:10px; color:#fff; background:#12223a; font-size:11px; opacity:0; transform:translateY(8px); pointer-events:none; transition:.2s ease; }
      .db-assistant-toast.show { opacity:1; transform:none; }
      .dark .db-assistant-panel { --db-ink:#e7effa; --db-muted:#9bb0c8; --db-line:#29405e; --db-soft:#132238; --db-white:#121f31; border-color:#29405e; }
      .dark .db-assistant-body { background:linear-gradient(180deg,#0f1b2c,#121f31 34%); }
      .dark .db-assistant-tile,.dark .db-assistant-list-item,.dark .db-case-card,.dark .db-assistant-search input,.dark .db-assistant-field input,.dark .db-assistant-field select,.dark .db-assistant-footer { background:#121f31; }
      .dark .db-assistant-proof span,.dark .db-assistant-action { color:#9fc4ff; background:#172a43; border-color:#294b74; }
      .dark .db-assistant-note { color:#fde68a; background:rgba(120,53,15,.26); }
      .dark .db-case-match { color:#6ee7b7; background:rgba(6,78,59,.42); }
      .dark .db-case-reasons { color:#9fc4ff; }
      @media (max-width:520px) {
        .db-assistant-fab { right:16px; bottom:76px; min-height:46px; padding:0 15px; }
        .db-assistant-panel { inset:auto 0 0; width:100%; height:min(720px,calc(100dvh - 54px)); border-radius:22px 22px 0 0; transform-origin:bottom center; }
        .db-assistant-body { padding:18px 16px; }
        .db-assistant-footer { padding-bottom:max(10px,env(safe-area-inset-bottom)); }
        .db-assistant-toast { right:16px; bottom:82px; }
      }
      @media (max-width:360px) { .db-assistant-grid,.db-assistant-form { grid-template-columns:1fr; } .db-assistant-field.full,.db-assistant-form-submit,.db-assistant-form-hint { grid-column:auto; } }
      @media (prefers-reduced-motion:reduce) { .db-assistant-fab,.db-assistant-panel,.db-assistant-tile,.db-assistant-toast { transition:none!important; } }
    `;
    document.head.appendChild(style);
  }

  function bindEvents() {
    const root = document.getElementById('db-assistant');
    root.addEventListener('click', handleClick);
    root.addEventListener('submit', handleSubmit);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && isOpen) closeAssistant();
    });
  }

  function handleClick(event) {
    const trigger = event.target.closest('[data-db-action]');
    if (!trigger) {
      if (event.target.closest('#dbAssistantFab')) openAssistant();
      return;
    }
    const action = trigger.dataset.dbAction;
    if (action === 'close') closeAssistant();
    else if (action === 'home') renderHome();
    else if (action === 'match') renderMatcher();
    else if (action === 'clear') clearProfile();
    else if (action === 'contact') showContact();
    else if (action === 'copy-wechat') copyWechat();
    else if (INFO_PAGES[action]) renderInfo(action);
  }

  function handleSubmit(event) {
    if (event.target.id === 'dbAssistantSearch') {
      event.preventDefault();
      const input = event.target.elements.question;
      routeQuestion(input.value);
      return;
    }
    if (event.target.id === 'dbCaseMatcher') {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      saveProfile(data);
      renderMatches(data);
    }
  }

  function openAssistant() {
    isOpen = true;
    lastFocused = document.activeElement;
    const panel = document.getElementById('dbAssistantPanel');
    const fab = document.getElementById('dbAssistantFab');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    if (casesCache === null) loadCases().then(updateCaseCount);
    setTimeout(() => panel.querySelector('button,input,select,a')?.focus(), 40);
  }

  function closeAssistant() {
    isOpen = false;
    const panel = document.getElementById('dbAssistantPanel');
    const fab = document.getElementById('dbAssistantFab');
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function renderHome() {
    currentView = 'home';
    const count = Array.isArray(casesCache) ? casesCache.length : null;
    setBody(`
      <div class="db-assistant-kicker">零 API 成本</div>
      <h2 class="db-assistant-title">从真实案例和可靠入口开始</h2>
      <p class="db-assistant-intro">我不是大模型，不会编造答案。你可以按目标选择功能，也可以输入一个简短问题。</p>
      <div class="db-assistant-proof">
        <span id="dbAssistantCaseCount">${count ? `${count} 条真实案例` : '案例库动态同步'}</span>
        <span>本地规则匹配</span>
        <span>不上传背景</span>
      </div>
      <div class="db-assistant-grid">
        ${tile('match', '找相似案例', '填写4项背景，匹配真实录取结果')}
        ${tile('school', '背景初步定位', '先评估，再形成申请梯度')}
        ${tile('materials', '申请材料', '查看第一轮准备清单')}
        ${tile('timeline', '申请时间线', '按年份和地区倒排节点')}
        ${tile('cost', '费用预算', '按城市、学制和专业估算')}
        ${tile('policy', '就业与政策', '查看已核验官方来源')}
      </div>
      <form class="db-assistant-search" id="dbAssistantSearch">
        <input name="question" type="search" maxlength="80" aria-label="输入留学问题" placeholder="例如：材料、费用、落户、选校…" autocomplete="off">
        <button class="db-assistant-icon-btn" type="submit" aria-label="查找答案">→</button>
      </form>
      <div class="db-assistant-actions">
        <button class="db-assistant-action" type="button" data-db-action="service">了解服务</button>
        <button class="db-assistant-action" type="button" data-db-action="contact">联系人工顾问</button>
      </div>
    `);
  }

  function tile(action, title, description) {
    return `<button class="db-assistant-tile" type="button" data-db-action="${action}"><b>${title}</b><span>${description}</span></button>`;
  }

  function renderInfo(key) {
    currentView = key;
    const page = INFO_PAGES[key];
    const items = page.items.map(item => `<div class="db-assistant-list-item"><b>${escapeHtml(item[0])}</b><span>${escapeHtml(item[1])}</span></div>`).join('');
    const links = page.links.map(link => {
      if (link[1] === '#match') return `<button class="db-assistant-action primary" type="button" data-db-action="match">${escapeHtml(link[0])}</button>`;
      if (link[1] === '#contact') return `<button class="db-assistant-action" type="button" data-db-action="contact">${escapeHtml(link[0])}</button>`;
      return `<a class="db-assistant-action${page.links.indexOf(link) === 0 ? ' primary' : ''}" href="${escapeAttr(link[1])}">${escapeHtml(link[0])}</a>`;
    }).join('');
    setBody(`
      ${backButton()}
      <div class="db-assistant-kicker">${escapeHtml(page.eyebrow)}</div>
      <h2 class="db-assistant-title">${escapeHtml(page.title)}</h2>
      <p class="db-assistant-intro">${escapeHtml(page.intro)}</p>
      <div class="db-assistant-list">${items}</div>
      <div class="db-assistant-actions">${links}</div>
      <div class="db-assistant-note">${escapeHtml(page.note)}</div>
    `);
  }

  function renderMatcher() {
    currentView = 'match';
    const saved = readProfile();
    setBody(`
      ${backButton()}
      <div class="db-assistant-kicker">真实案例匹配</div>
      <h2 class="db-assistant-title">填写4项背景，查看相似录取</h2>
      <p class="db-assistant-intro">系统只比较案例相似度，不预测录取概率。</p>
      <form class="db-assistant-form" id="dbCaseMatcher">
        <div class="db-assistant-field">
          <label for="dbTier">本科层次</label>
          <select id="dbTier" name="tier" required>
            ${options(['', '985', '211', '双非', '海外本科'], saved.tier, '请选择')}
          </select>
        </div>
        <div class="db-assistant-field">
          <label for="dbGpa">均分 / GPA</label>
          <input id="dbGpa" name="gpa" value="${escapeAttr(saved.gpa || '')}" placeholder="如 83 或 3.5/4" required>
        </div>
        <div class="db-assistant-field full">
          <label for="dbMajor">本科专业</label>
          <input id="dbMajor" name="major" value="${escapeAttr(saved.major || '')}" placeholder="如 计算机、金融、传媒" required>
        </div>
        <div class="db-assistant-field full">
          <label for="dbCountry">目标地区</label>
          <select id="dbCountry" name="country" required>
            ${options(['', '英国', '香港', '新加坡', '澳大利亚', '新西兰', '澳门'], saved.country, '请选择')}
          </select>
        </div>
        <p class="db-assistant-form-hint">这些信息仅保存在当前浏览器会话，关闭标签页后会清除。</p>
        <button class="db-assistant-form-submit" type="submit">匹配真实案例</button>
      </form>
      <div id="dbMatchResults" aria-live="polite"></div>
    `);
  }

  async function renderMatches(profile) {
    const target = document.getElementById('dbMatchResults');
    target.innerHTML = '<div class="db-assistant-empty">正在读取案例库并计算相似度…</div>';
    const cases = await loadCases();
    if (!cases.length) {
      target.innerHTML = `<div class="db-assistant-empty">当前环境暂时无法读取案例库。<br><a class="db-assistant-action" href="cases.html">直接打开案例库</a></div>`;
      return;
    }
    const normalizedProfile = { ...profile, gpaValue: parseGpa(profile.gpa), majorGroup: majorGroup(profile.major) };
    const ranked = cases
      .map(item => ({ item, ...scoreCase(item, normalizedProfile) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || Number(b.item.entry_year || 0) - Number(a.item.entry_year || 0))
      .slice(0, 3);

    if (!ranked.length) {
      target.innerHTML = '<div class="db-assistant-empty">暂时没有足够相似的案例。可以调整目标地区，或到完整案例库继续筛选。</div>';
      return;
    }

    target.innerHTML = `
      <div class="db-assistant-results">
        ${ranked.map(renderCaseCard).join('')}
      </div>
      <div class="db-assistant-note">相似案例是历史参考，不构成录取承诺；最终要求请以目标项目官网为准。</div>
      <div class="db-assistant-actions">
        <a class="db-assistant-action primary" href="cases.html">查看完整案例库</a>
        <button class="db-assistant-action" type="button" data-db-action="contact">让顾问进一步分析</button>
      </div>
    `;
  }

  function scoreCase(item, profile) {
    let score = 0;
    const reasons = [];
    if (item.tier === profile.tier) {
      score += 35;
      reasons.push('本科层次相同');
    }
    const itemCountries = String(item.country || '');
    if (itemCountries.includes(profile.country)) {
      score += 25;
      reasons.push('申请地区一致');
    }
    const itemGpa = parseGpa(item.gpa);
    if (Number.isFinite(itemGpa) && Number.isFinite(profile.gpaValue)) {
      const diff = Math.abs(itemGpa - profile.gpaValue);
      if (diff <= 2) {
        score += 22;
        reasons.push('成绩非常接近');
      } else if (diff <= 5) {
        score += 16;
        reasons.push('成绩区间接近');
      } else if (diff <= 10) {
        score += 8;
      }
    }
    const itemMajor = String(item.student_major || '');
    const itemGroup = majorGroup(itemMajor);
    if (normalize(itemMajor).includes(normalize(profile.major)) || normalize(profile.major).includes(normalize(itemMajor))) {
      score += 18;
      reasons.push('本科专业接近');
    } else if (profile.majorGroup && itemGroup === profile.majorGroup) {
      score += 13;
      reasons.push('属于相近专业方向');
    }
    return { score: Math.min(score, 100), reasons };
  }

  function renderCaseCard(result) {
    const item = result.item;
    const label = result.score >= 78 ? '高度相似' : result.score >= 58 ? '较为相似' : '可作参考';
    const offers = (item.offers || []).slice(0, 3).map(offer =>
      `<div class="db-case-offer"><b>${escapeHtml(offer.school || '院校待更新')}</b> · ${escapeHtml(offer.major || '专业待更新')} · ${escapeHtml(offer.rank || '')}</div>`
    ).join('');
    return `
      <article class="db-case-card">
        <div class="db-case-top">
          <strong>案例 #${escapeHtml(String(item.id))} · ${escapeHtml(item.student_school || '本科院校未公开')}</strong>
          <span class="db-case-match">${label}</span>
        </div>
        <div class="db-case-meta">${escapeHtml(item.tier || '')} · ${escapeHtml(item.student_major || '')} · ${escapeHtml(item.gpa || '成绩未填写')} · ${escapeHtml(String(item.entry_year || ''))}入学</div>
        <div class="db-case-reasons">${escapeHtml(result.reasons.slice(0, 3).join(' · ') || '综合背景参考')}</div>
        ${offers || '<div class="db-case-offer">Offer 信息待更新</div>'}
      </article>
    `;
  }

  function routeQuestion(raw) {
    const text = normalize(raw);
    if (!text) {
      showToast('请先输入一个问题');
      return;
    }
    const ranked = INTENTS.map(intent => ({
      page: intent.page,
      score: intent.keywords.reduce((sum, keyword) => sum + (text.includes(normalize(keyword)) ? 1 : 0), 0)
    })).sort((a, b) => b.score - a.score);
    if (ranked[0].score > 0) {
      if (ranked[0].page === 'school' && (text.includes('案例') || text.includes('录取'))) renderMatcher();
      else renderInfo(ranked[0].page);
      return;
    }
    renderUnknown(raw);
  }

  function renderUnknown(raw) {
    currentView = 'unknown';
    setBody(`
      ${backButton()}
      <div class="db-assistant-kicker">没有可靠匹配</div>
      <h2 class="db-assistant-title">我暂时无法准确回答这个问题</h2>
      <p class="db-assistant-intro">你问的是“${escapeHtml(raw)}”。为了避免编造答案，请从下面选择最接近的方向。</p>
      <div class="db-assistant-grid" style="margin-top:17px;">
        ${tile('match', '相似案例', '从真实案例库查找')}
        ${tile('materials', '申请材料', '查看准备清单')}
        ${tile('cost', '费用预算', '打开预算工具')}
        ${tile('policy', '政策就业', '查看核验来源')}
      </div>
      <div class="db-assistant-actions"><button class="db-assistant-action" type="button" data-db-action="contact">转人工顾问</button></div>
    `);
  }

  function showContact() {
    currentView = 'contact';
    setBody(`
      ${backButton()}
      <div class="db-assistant-kicker">人工咨询</div>
      <h2 class="db-assistant-title">需要个性化判断时，再联系顾问</h2>
      <p class="db-assistant-intro">微信号：<strong>${CONFIG.wechat}</strong></p>
      <div class="db-assistant-list">
        <div class="db-assistant-list-item"><b>建议提前准备</b><span>本科院校、均分、专业、语言成绩、目标地区和入学年份</span></div>
        <div class="db-assistant-list-item"><b>隐私提醒</b><span>首次沟通不需要发送身份证、护照或银行卡等敏感信息</span></div>
      </div>
      <div class="db-assistant-actions">
        <button class="db-assistant-action primary" type="button" data-db-action="copy-wechat">复制微信号</button>
        <button class="db-assistant-action" type="button" id="dbOpenQr">查看二维码</button>
      </div>
    `);
    document.getElementById('dbOpenQr')?.addEventListener('click', () => {
      if (typeof window.openQr === 'function') {
        closeAssistant();
        window.openQr();
      } else {
        copyWechat();
      }
    });
  }

  function setBody(html) {
    const body = document.getElementById('dbAssistantBody');
    body.innerHTML = html;
    body.scrollTop = 0;
  }

  function backButton() {
    return '<button class="db-assistant-back" type="button" data-db-action="home">← 返回功能首页</button>';
  }

  function options(values, selected, placeholder) {
    return values.map((value, index) => {
      const label = index === 0 ? placeholder : value;
      return `<option value="${escapeAttr(value)}"${value === selected ? ' selected' : ''}>${escapeHtml(label)}</option>`;
    }).join('');
  }

  async function loadCases() {
    if (Array.isArray(casesCache)) return casesCache;
    try {
      const response = await fetch(new URL(CONFIG.caseUrl, document.baseURI), { cache: 'no-store' });
      if (!response.ok) throw new Error('案例库读取失败');
      const data = await response.json();
      casesCache = Array.isArray(data) ? data : [];
    } catch {
      casesCache = [];
    }
    return casesCache;
  }

  function updateCaseCount(cases) {
    const counter = document.getElementById('dbAssistantCaseCount');
    if (!counter) return;
    counter.textContent = cases.length ? `${cases.length} 条真实案例` : '案例库暂不可用';
  }

  function parseGpa(value) {
    const text = String(value || '').trim();
    const fraction = text.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/);
    if (fraction) {
      const numerator = Number(fraction[1]);
      const denominator = Number(fraction[2]);
      return denominator > 0 ? (numerator / denominator) * 100 : NaN;
    }
    const match = text.match(/\d+(?:\.\d+)?/);
    if (!match) return NaN;
    const number = Number(match[0]);
    if (number <= 4.5) return (number / 4) * 100;
    if (number <= 5) return (number / 5) * 100;
    return number;
  }

  function majorGroup(major) {
    const text = normalize(major);
    for (const [group, keywords] of Object.entries(MAJOR_GROUPS)) {
      if (keywords.some(keyword => text.includes(normalize(keyword)))) return group;
    }
    return '';
  }

  function normalize(value) {
    return String(value || '').toLowerCase().replace(/[\s，。、“”‘’：:；;（）()/_-]+/g, '');
  }

  function saveProfile(profile) {
    try { sessionStorage.setItem('dreambridge-assistant-profile', JSON.stringify(profile)); } catch {}
  }

  function readProfile() {
    try { return JSON.parse(sessionStorage.getItem('dreambridge-assistant-profile') || '{}'); } catch { return {}; }
  }

  function clearProfile() {
    try { sessionStorage.removeItem('dreambridge-assistant-profile'); } catch {}
    if (currentView === 'match') renderMatcher();
    showToast('本次填写已清除');
  }

  async function copyWechat() {
    try {
      await navigator.clipboard.writeText(CONFIG.wechat);
      showToast('微信号已复制');
    } catch {
      showToast(`微信号：${CONFIG.wechat}`);
    }
  }

  function showToast(message) {
    const toast = document.getElementById('dbAssistantToast');
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = String(value ?? '');
    return div.innerHTML;
  }

  function escapeAttr(value) {
    return escapeHtml(value).replace(/"/g, '&quot;');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
