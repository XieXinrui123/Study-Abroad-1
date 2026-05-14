/**
 * DreamBridge AI Chat Widget
 * 整合留学skill知识库的浮动客服组件
 */

(function() {
  'use strict';

  // ===== 配置 =====
  const CONFIG = {
    name: 'DreamBridge 留学顾问',
    avatar: '💼',
    welcomeMsg: 'Hi，我是DreamBridge的AI留学顾问！关于英国、澳洲、香港、新加坡、新西兰的留学问题，都可以问我～',
    theme: {
      primary: '#2563EB',
      primaryDark: '#1D4ED8',
      accent: '#F59E0B',
      bg: '#ffffff',
      surface: '#f7fbff',
      text: '#12223a',
      textSecondary: '#607086',
      border: '#E2E8F0',
      shadow: '0 12px 40px rgba(15,23,42,0.14), 0 4px 12px rgba(15,23,42,0.06)'
    }
  };

  // ===== 知识库FAQ =====
  const FAQS = [
    {
      q: ['免费申请', '零中介费', '怎么收费', '收费'],
      a: '我们英国、澳洲、新西兰合作院校（QS前150）都是<strong>零中介费申请</strong>的！你要看看这些国家有哪些适合你的学校吗？',
      tags: ['费用'],
      followUp: ['showCountries']
    },
    {
      q: ['我的背景能申什么学校', '选校', '定位', '能申到什么'],
      a: '选校定位需要看你的院校背景（985/211/双非）、GPA、专业、雅思分数、以及想去的地区。你可以告诉我这些信息，我帮你匹配相似的成功案例！',
      tags: ['选校'],
      followUp: ['askBackground']
    },
    {
      q: ['案例', '录取案例', '成功案例', '往年'],
      a: '我们有<strong>500+真实录取案例</strong>！涵盖985/211/双非/海本各类背景。你可以点击右下角的「查看案例」去我们的案例库按条件筛选，或者直接告诉我你的背景，我帮你找相似案例。',
      tags: ['案例'],
      followUp: ['showCases']
    },
    {
      q: ['费用', '留学要花多少钱', '预算', '多少钱', '花费'],
      a: '费用因国家和专业差异很大：<br>🇬🇧 <strong>英国</strong>：硕士1年，总费用35-70万<br>🇦🇺 <strong>澳洲</strong>：硕士1-2年，一年费用40-55万<br>🇭🇰 <strong>香港</strong>：硕士1年，总费用35-60万<br>🇸🇬 <strong>新加坡</strong>：硕士1-2年，总费用30-50万<br>🇳🇿 <strong>新西兰</strong>：硕士1-2年，一年费用35-40万<br><br>你可以用我们的「费用计算器」精准估算！',
      tags: ['费用'],
      followUp: ['showCalculator']
    },
    {
      q: ['雅思', '语言成绩', '托福', 'PTE', '语言'],
      a: '各地区语言要求：<br>• <strong>英国</strong>：雅思6.5（单项6.0），可后补<br>• <strong>澳洲</strong>：雅思6.5（单项6.0），接受PTE<br>• <strong>香港</strong>：雅思6-7.0，带语言申请优势大<br>• <strong>新加坡</strong>：雅思6-7.0<br>• <strong>新西兰</strong>：雅思6.5（单项6.0）<br><br>如果还没考，建议尽快准备，香港的申请9-10月就开了！',
      tags: ['语言'],
      followUp: []
    },
    {
      q: ['时间', '申请时间', '什么时候申请', 'timeline', '规划'],
      a: '以2026 Fall入学为例：<br>• <strong>现在-8月</strong>：考雅思、准备文书<br>• <strong>9-11月</strong>：开放申请，尽早递交（滚动录取先到先得）<br>• <strong>12-次年2月</strong>：面试、等offer<br>• <strong>3-5月</strong>：比较offer、交留位费<br>• <strong>6-8月</strong>：办签证、找住宿<br><br>需要我帮你生成一份专属时间线吗？',
      tags: ['时间'],
      followUp: ['showTimeline']
    },
    {
      q: ['文书', 'PS', '推荐信', '简历', 'CV'],
      a: '文书是申请的灵魂！我们的服务包含：<br>• 个人陈述（PS）撰写与润色<br>• 推荐信（RL）指导<br>• 简历（CV）优化<br>• 作品集指导（如需）<br><br>关键是不要模板化，要有你的个人故事。需要文书指导的话，可以咨询我们的专业导师～',
      tags: ['文书'],
      followUp: ['askContact']
    },
    {
      q: ['签证', '学生签', 'VISA'],
      a: '各地区的签证我们都可以协助办理：<br>• <strong>英国</strong>：Student Route签证，需CAS+资金证明（存满28天）+肺结核检测<br>• <strong>澳洲</strong>：Subclass 500，需COE+GTE陈述+OSHC保险<br>• <strong>香港</strong>：由学校代为申请入境许可<br>• <strong>新西兰</strong>：学生签证，需资金证明+体检<br><br>签证材料复杂，建议提前2-3个月准备！',
      tags: ['签证'],
      followUp: []
    },
    {
      q: ['香港', 'HK', '港大', '港中文', '港科大'],
      a: '香港优势：<br>• 学制短（硕士1年），总费用相对低<br>• 地理位置近，文化适应快<br>• QS排名高，回国认可度极高<br>• 毕业后有IANG签证可留港工作<br><br>港三（HKU/CUHK/HKUST）偏好985/211，GPA85+比较有竞争力。想具体了解香港申请吗？',
      tags: ['香港'],
      followUp: ['showHKInfo']
    },
    {
      q: ['英国', 'UK', '曼大', 'UCL', '爱丁堡', '格拉斯哥'],
      a: '英国优势：<br>• 硕士仅1年，时间成本低<br>• PSW签证恢复，毕业后可留英2年工作<br>• 学校选择多，QS前100密集<br>• 我们的合作院校<strong>零中介费申请</strong><br><br>G5和王曼爱华竞争激烈，但格拉斯哥、利兹、南安普顿等对双非更友好。想了解你能申哪些英国学校？',
      tags: ['英国'],
      followUp: ['showUKInfo']
    },
    {
      q: ['澳洲', '澳大利亚', '悉尼', '墨尔本'],
      a: '澳洲优势：<br>• 毕业工签长（本科2年/硕士3年/博士4年）<br>• 技术移民政策友好<br>• 气候宜人，生活环境好<br>• 我们的八大合作院校<strong>零中介费申请</strong><br><br>八大门槛逐年提高，但相比英国香港，澳洲对双非更友好，均分75+就有机会。',
      tags: ['澳洲'],
      followUp: ['showAUInfo']
    },
    {
      q: ['新西兰'],
      a: '新西兰优势：<br>• 移民政策最友好（绿色清单职业）<br>• 毕业后3年工签<br>• 费用相对较低（硕士总费用25-35万）<br>• 自然环境优美，生活质量高<br>• 8所公立大学全部<strong>零中介费申请</strong><br><br>适合预算有限又想移民的同学！',
      tags: ['新西兰'],
      followUp: []
    },
    {
      q: ['新加坡', 'NUS', 'NTU', '新国立'],
      a: '新加坡优势：<br>• NUS/NTU亚洲顶尖，QS排名稳居前20<br>• 地理位置近，安全指数高<br>• 就业率高，实习机会丰富<br>• 公立大学名额有限，竞争激烈<br><br>偏好985/211背景，GPA85+比较有竞争力。你有具体想申的专业吗？',
      tags: ['新加坡'],
      followUp: []
    },
    {
      q: ['移民', '留下工作', '工签', '工作签证', 'PSW'],
      a: '各地区毕业后工签对比：<br>• <strong>英国</strong>：PSW 2年（博士3年），留英难度较高<br>• <strong>澳洲</strong>：工签2-4年，技术移民清单丰富<br>• <strong>新西兰</strong>：3年工签，移民政策最宽松<br>• <strong>香港</strong>：IANG签证，可留港工作<br><br>如果目标是移民，澳洲和新西兰是最优选择。',
      tags: ['移民'],
      followUp: []
    }
  ];

  // ===== 快捷入口按钮 =====
  const QUICK_ACTIONS = [
    { label: '免费申请?', icon: '💰', action: 'askFree' },
    { label: '我的背景能申哪', icon: '🎯', action: 'askBackground' },
    { label: '费用多少', icon: '💳', action: 'askCost' },
    { label: '查看案例', icon: '📊', action: 'showCases' }
  ];

  // ===== DOM构建 =====
  function createWidget() {
    const widget = document.createElement('div');
    widget.id = 'db-chat-widget';
    widget.innerHTML = `
      <!-- 浮动按钮 -->
      <button class="db-chat-fab" id="dbChatFab" title="AI留学咨询">
        <span class="db-chat-fab-icon">💬</span>
        <span class="db-chat-fab-text">AI咨询</span>
        <span class="db-chat-fab-pulse"></span>
      </button>

      <!-- 聊天窗口 -->
      <div class="db-chat-window" id="dbChatWindow">
        <!-- 头部 -->
        <div class="db-chat-header">
          <div class="db-chat-header-info">
            <span class="db-chat-avatar">${CONFIG.avatar}</span>
            <div>
              <div class="db-chat-name">${CONFIG.name}</div>
              <div class="db-chat-status">● 在线</div>
            </div>
          </div>
          <div class="db-chat-header-actions">
            <button class="db-chat-btn-icon" id="dbChatMinimize" title="最小化">─</button>
            <button class="db-chat-btn-icon" id="dbChatClose" title="关闭">✕</button>
          </div>
        </div>

        <!-- 消息区域 -->
        <div class="db-chat-body" id="dbChatBody">
          <!-- 欢迎消息 -->
          <div class="db-chat-msg bot">
            <span class="db-chat-msg-avatar">${CONFIG.avatar}</span>
            <div class="db-chat-msg-bubble">
              <div class="db-chat-msg-text">${CONFIG.welcomeMsg}</div>
            </div>
          </div>
          <!-- 快捷按钮 -->
          <div class="db-chat-quick-actions" id="dbChatQuickActions"></div>
        </div>

        <!-- 输入区域 -->
        <div class="db-chat-footer">
          <div class="db-chat-input-wrap">
            <input type="text" class="db-chat-input" id="dbChatInput" placeholder="输入你的留学问题..." autocomplete="off">
            <button class="db-chat-send" id="dbChatSend" title="发送">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
          </div>
          <div class="db-chat-footer-note">AI助手仅供参考，具体方案请咨询专业顾问</div>
        </div>
      </div>

      <!-- Toast提示 -->
      <div class="db-chat-toast" id="dbChatToast"></div>
    `;
    document.body.appendChild(widget);
  }

  // ===== 样式注入 =====
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      /* ===== 浮动按钮 ===== */
      .db-chat-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 22px;
        background: linear-gradient(135deg, ${CONFIG.theme.primary}, ${CONFIG.theme.primaryDark});
        color: #fff;
        border: none;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(37,99,235,0.35);
        transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
        font-family: Inter, system-ui, sans-serif;
      }
      .db-chat-fab:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 32px rgba(37,99,235,0.4);
      }
      .db-chat-fab:active { transform: scale(0.96); }
      .db-chat-fab.hidden { transform: scale(0); opacity: 0; pointer-events: none; }
      .db-chat-fab-icon { font-size: 18px; }
      .db-chat-fab-text { letter-spacing: 0.5px; }
      .db-chat-fab-pulse {
        position: absolute;
        inset: -4px;
        border-radius: 999px;
        border: 2px solid ${CONFIG.theme.primary};
        opacity: 0;
        animation: dbPulse 2s ease-out infinite;
      }
      @keyframes dbPulse {
        0% { transform: scale(1); opacity: 0.5; }
        100% { transform: scale(1.15); opacity: 0; }
      }

      /* ===== 聊天窗口 ===== */
      .db-chat-window {
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 400px;
        max-width: calc(100vw - 48px);
        height: 580px;
        max-height: calc(100vh - 120px);
        background: ${CONFIG.theme.bg};
        border-radius: 20px;
        box-shadow: ${CONFIG.theme.shadow};
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 1001;
        transform: scale(0.9) translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
        font-family: Inter, system-ui, -apple-system, 'PingFang SC', sans-serif;
      }
      .db-chat-window.open {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      /* ===== 头部 ===== */
      .db-chat-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background: linear-gradient(135deg, ${CONFIG.theme.primary}, ${CONFIG.theme.primaryDark});
        color: #fff;
        flex-shrink: 0;
      }
      .db-chat-header-info {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .db-chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: grid;
        place-items: center;
        font-size: 20px;
        flex-shrink: 0;
      }
      .db-chat-name {
        font-size: 15px;
        font-weight: 700;
        line-height: 1.3;
      }
      .db-chat-status {
        font-size: 11px;
        color: rgba(255,255,255,0.75);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .db-chat-header-actions {
        display: flex;
        gap: 4px;
      }
      .db-chat-btn-icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        background: rgba(255,255,255,0.1);
        border: none;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        display: grid;
        place-items: center;
        transition: all 0.15s;
      }
      .db-chat-btn-icon:hover { background: rgba(255,255,255,0.2); }

      /* ===== 消息区域 ===== */
      .db-chat-body {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        background: ${CONFIG.theme.surface};
      }
      .db-chat-body::-webkit-scrollbar { width: 4px; }
      .db-chat-body::-webkit-scrollbar-track { background: transparent; }
      .db-chat-body::-webkit-scrollbar-thumb { background: ${CONFIG.theme.border}; border-radius: 2px; }

      /* 消息气泡 */
      .db-chat-msg {
        display: flex;
        gap: 10px;
        max-width: 92%;
        animation: dbMsgIn 0.3s cubic-bezier(0.16,1,0.3,1);
      }
      .db-chat-msg.bot { align-self: flex-start; }
      .db-chat-msg.user { align-self: flex-end; flex-direction: row-reverse; }
      @keyframes dbMsgIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .db-chat-msg-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: ${CONFIG.theme.primaryLight};
        display: grid;
        place-items: center;
        font-size: 16px;
        flex-shrink: 0;
      }
      .db-chat-msg.user .db-chat-msg-avatar {
        background: ${CONFIG.theme.primary};
        color: #fff;
      }
      .db-chat-msg-bubble {
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 13px;
        line-height: 1.75;
        max-width: calc(100% - 42px);
      }
      .db-chat-msg.bot .db-chat-msg-bubble {
        background: #fff;
        border: 1px solid ${CONFIG.theme.border};
        color: ${CONFIG.theme.text};
        border-bottom-left-radius: 4px;
      }
      .db-chat-msg.user .db-chat-msg-bubble {
        background: linear-gradient(135deg, ${CONFIG.theme.primary}, ${CONFIG.theme.primaryDark});
        color: #fff;
        border-bottom-right-radius: 4px;
      }
      .db-chat-msg-text strong {
        color: ${CONFIG.theme.primaryDark};
        font-weight: 700;
      }
      .db-chat-msg.user .db-chat-msg-text strong { color: #fff; }

      /* 快捷按钮 */
      .db-chat-quick-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 4px;
      }
      .db-chat-quick-btn {
        padding: 8px 14px;
        border-radius: 999px;
        border: 1px solid ${CONFIG.theme.border};
        background: #fff;
        color: ${CONFIG.theme.textSecondary};
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.15s;
        display: flex;
        align-items: center;
        gap: 4px;
        font-family: inherit;
      }
      .db-chat-quick-btn:hover {
        border-color: ${CONFIG.theme.primary};
        color: ${CONFIG.theme.primary};
        background: ${CONFIG.theme.surface};
      }

      /* CTA链接按钮 */
      .db-chat-cta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .db-chat-cta-btn {
        padding: 8px 16px;
        border-radius: 10px;
        background: linear-gradient(135deg, ${CONFIG.theme.accent}, #D97706);
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.15s;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: none;
        cursor: pointer;
        font-family: inherit;
      }
      .db-chat-cta-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(245,158,11,0.3);
      }
      .db-chat-cta-btn.secondary {
        background: ${CONFIG.theme.surface};
        color: ${CONFIG.theme.primary};
        border: 1px solid ${CONFIG.theme.border};
      }
      .db-chat-cta-btn.secondary:hover {
        background: ${CONFIG.theme.primaryLight};
      }

      /* 输入中动画 */
      .db-chat-typing {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 14px 16px;
      }
      .db-chat-typing-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: ${CONFIG.theme.textSecondary};
        animation: dbTyping 1.4s ease-in-out infinite;
      }
      .db-chat-typing-dot:nth-child(2) { animation-delay: 0.2s; }
      .db-chat-typing-dot:nth-child(3) { animation-delay: 0.4s; }
      @keyframes dbTyping {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-6px); opacity: 1; }
      }

      /* ===== 底部输入 ===== */
      .db-chat-footer {
        padding: 12px 16px 10px;
        border-top: 1px solid ${CONFIG.theme.border};
        background: #fff;
        flex-shrink: 0;
      }
      .db-chat-input-wrap {
        display: flex;
        gap: 8px;
        align-items: center;
      }
      .db-chat-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid ${CONFIG.theme.border};
        border-radius: 12px;
        font-size: 13px;
        outline: none;
        transition: all 0.15s;
        color: ${CONFIG.theme.text};
        font-family: inherit;
      }
      .db-chat-input:focus {
        border-color: ${CONFIG.theme.primary};
        box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
      }
      .db-chat-input::placeholder { color: ${CONFIG.theme.textTertiary || '#8a9bb0'}; }
      .db-chat-send {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: linear-gradient(135deg, ${CONFIG.theme.primary}, ${CONFIG.theme.primaryDark});
        color: #fff;
        border: none;
        display: grid;
        place-items: center;
        cursor: pointer;
        transition: all 0.15s;
        flex-shrink: 0;
      }
      .db-chat-send:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(37,99,235,0.3);
      }
      .db-chat-footer-note {
        text-align: center;
        font-size: 10px;
        color: ${CONFIG.theme.textSecondary};
        margin-top: 8px;
        opacity: 0.7;
      }

      /* ===== Toast ===== */
      .db-chat-toast {
        position: fixed;
        bottom: 100px;
        right: 24px;
        padding: 12px 20px;
        background: ${CONFIG.theme.text};
        color: #fff;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 600;
        z-index: 1002;
        transform: translateY(20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s;
        box-shadow: ${CONFIG.theme.shadow};
      }
      .db-chat-toast.show {
        transform: translateY(0);
        opacity: 1;
      }

      /* ===== 响应式 ===== */
      @media (max-width: 480px) {
        .db-chat-window {
          bottom: 0;
          right: 0;
          left: 0;
          width: 100%;
          max-width: 100%;
          height: calc(100vh - 70px);
          max-height: calc(100vh - 70px);
          border-radius: 20px 20px 0 0;
        }
        .db-chat-fab {
          bottom: 16px;
          right: 16px;
          padding: 12px 18px;
        }
        .db-chat-fab-text { display: none; }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== 核心逻辑 =====
  let isOpen = false;
  let messageHistory = [];

  function init() {
    injectStyles();
    createWidget();
    bindEvents();
    renderQuickActions();
  }

  function bindEvents() {
    const fab = document.getElementById('dbChatFab');
    const window_ = document.getElementById('dbChatWindow');
    const minimize = document.getElementById('dbChatMinimize');
    const close = document.getElementById('dbChatClose');
    const input = document.getElementById('dbChatInput');
    const send = document.getElementById('dbChatSend');

    fab.addEventListener('click', () => toggleChat());
    minimize.addEventListener('click', () => toggleChat(false));
    close.addEventListener('click', () => toggleChat(false));
    
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    send.addEventListener('click', handleSend);
  }

  function toggleChat(force) {
    isOpen = force !== undefined ? force : !isOpen;
    const window_ = document.getElementById('dbChatWindow');
    const fab = document.getElementById('dbChatFab');
    
    if (isOpen) {
      window_.classList.add('open');
      fab.classList.add('hidden');
      setTimeout(() => document.getElementById('dbChatInput').focus(), 300);
      
      // 首次打开显示引导
      if (messageHistory.length === 0) {
        setTimeout(() => {
          addBotMessage('你可以问我：<br>• 「免费申请」了解零中介费政策<br>• 「我的背景能申什么学校」做选校定位<br>• 「费用多少」查看留学预算<br>• 「查看案例」浏览真实录取案例', [
            { label: '免费咨询', action: 'askContact' }
          ]);
        }, 1500);
      }
    } else {
      window_.classList.remove('open');
      fab.classList.remove('hidden');
    }
  }

  function renderQuickActions() {
    const container = document.getElementById('dbChatQuickActions');
    container.innerHTML = QUICK_ACTIONS.map(btn => 
      `<button class="db-chat-quick-btn" data-action="${btn.action}">${btn.icon} ${btn.label}</button>`
    ).join('');
    
    container.querySelectorAll('.db-chat-quick-btn').forEach(btn => {
      btn.addEventListener('click', () => handleQuickAction(btn.dataset.action));
    });
  }

  function handleQuickAction(action) {
    switch(action) {
      case 'askFree':
        handleUserMessage('你们怎么收费？');
        break;
      case 'askBackground':
        handleUserMessage('我的背景能申什么学校？');
        break;
      case 'askCost':
        handleUserMessage('留学要花多少钱？');
        break;
      case 'showCases':
        handleUserMessage('我想看看案例');
        break;
      case 'askContact':
        addBotMessage('你可以通过以下方式联系我们的专业顾问：<br><br>📧 邮箱：496680190@qq.com<br>💬 微信：xxr13365810586<br><br>我们的顾问会根据你的具体情况，给出个性化的选校方案和申请规划～', [
          { label: '添加微信咨询', url: 'javascript:openQr()' }
        ]);
        break;
      case 'showCountries':
        addBotMessage('我们零中介费覆盖的国家和学校档次：<br><br>🇬🇧 <strong>英国</strong>：QS前150主流院校<br>🇦🇺 <strong>澳洲</strong>：八大及其他QS前150院校<br>🇳🇿 <strong>新西兰</strong>：8所公立大学<br><br>这些学校质量都有保障，我们免费帮你申请！', [
          { label: '查看服务套餐', url: 'package.html' },
          { label: '免费咨询', action: 'askContact' }
        ]);
        break;
      case 'showCalculator':
        addBotMessage('推荐你使用我们的「费用计算器」，可以根据你的目标地区、专业、城市精准估算留学总费用！', [
          { label: '打开费用计算器', url: 'calculator.html' }
        ]);
        break;
      case 'showTimeline':
        addBotMessage('需要的话可以用我们的「申请时间线」工具，选择你的目标入学年份和地区，一键生成专属申请规划！', [
          { label: '生成时间线', url: 'timeline.html' }
        ]);
        break;
      case 'showHKInfo':
        addBotMessage('香港硕士申请要求：<br>• <strong>港三</strong>（HKU/CUHK/HKUST）：偏好985/211，GPA 85+<br>• <strong>港城大/港理工</strong>：211/双非80+有机会<br>• <strong>雅思</strong>：6.5-7.0<br>• <strong>申请时间</strong>：9-10月开放，先到先得<br><br>需要具体学校的申请要求吗？');
        break;
      case 'showUKInfo':
        addBotMessage('英国硕士申请要求：<br>• <strong>G5</strong>：985/211，GPA 88+<br>• <strong>王曼爱华</strong>：985/211 GPA 82+，双非85+<br>• <strong>QS前100</strong>：均分75-80有机会<br>• <strong>雅思</strong>：6.5（单项6.0），可后补<br>• <strong>优势</strong>：1年学制，零中介费申请<br><br>你的均分和本科院校是？');
        break;
      case 'showAUInfo':
        addBotMessage('澳洲硕士申请要求：<br>• <strong>墨尔本大学</strong>：偏好985/211，均分80+<br>• <strong>悉尼/新南</strong>：211均分75+，双非80+<br>• <strong>八大</strong>：双非均分70-75也有机会<br>• <strong>雅思</strong>：6.5（单项6.0），接受PTE<br>• <strong>优势</strong>：工签2-3年，零中介费申请<br><br>想去哪所学校？');
        break;
      default:
        addBotMessage('这个问题比较个性化，建议你添加我们顾问的微信（xxr13365810586）详细聊聊，会根据你的具体情况给出最优方案～', [
          { label: '添加微信咨询', url: 'javascript:openQr()' }
        ]);
    }
  }

  function handleSend() {
    const input = document.getElementById('dbChatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    handleUserMessage(text);
  }

  function handleUserMessage(text) {
    addUserMessage(text);
    messageHistory.push({ role: 'user', text });

    showTyping();

    setTimeout(() => {
      hideTyping();
      const reply = findReply(text);
      addBotMessage(reply.text, reply.actions);
      messageHistory.push({ role: 'bot', text: reply.text });
    }, 600 + Math.random() * 800);
  }

  function findReply(text) {
    const lower = text.toLowerCase();
    
    for (const faq of FAQS) {
      for (const keyword of faq.q) {
        if (lower.includes(keyword.toLowerCase())) {
          return {
            text: faq.a,
            actions: buildActions(faq.followUp)
          };
        }
      }
    }

    // 模糊匹配
    if (lower.includes('你好') || lower.includes('hi') || lower.includes('hello')) {
      return {
        text: '你好呀！我是DreamBridge的AI留学顾问～请问有什么留学方面的问题想咨询吗？',
        actions: buildActions(['askFree', 'askBackground', 'askCost'])
      };
    }
    if (lower.includes('谢谢') || lower.includes('感谢')) {
      return {
        text: '不客气！有问题随时来问我～也可以加我们顾问微信（xxr13365810586）一对一详细聊 😊',
        actions: [{ label: '添加微信', action: 'askContact' }]
      };
    }

    // 默认回复
    return {
      text: '这个问题比较个性化，我建议你：<br><br>1. 看看我们的<strong>案例库</strong>，找相似背景的案例参考<br>2. 用<strong>智能评估</strong>工具，30秒获取选校定位<br>3. 直接添加顾问微信，一对一详细咨询<br><br>你想怎么继续？',
      actions: buildActions(['showCases', 'askContact'])
    };
  }

  function buildActions(actions) {
    if (!actions || actions.length === 0) return [];
    const map = {
      showCountries: { label: '查看覆盖国家', action: 'showCountries' },
      askBackground: { label: '做选校定位', action: 'askBackground' },
      showCases: { label: '查看案例库', url: 'cases.html' },
      showCalculator: { label: '费用计算器', url: 'calculator.html' },
      showTimeline: { label: '申请时间线', url: 'timeline.html' },
      askContact: { label: '免费咨询', action: 'askContact' },
      showHKInfo: { label: '了解香港申请', action: 'showHKInfo' },
      showUKInfo: { label: '了解英国申请', action: 'showUKInfo' },
      showAUInfo: { label: '了解澳洲申请', action: 'showAUInfo' }
    };
    return actions.map(a => map[a]).filter(Boolean);
  }

  function addUserMessage(text) {
    const body = document.getElementById('dbChatBody');
    const div = document.createElement('div');
    div.className = 'db-chat-msg user';
    div.innerHTML = `
      <span class="db-chat-msg-avatar">👤</span>
      <div class="db-chat-msg-bubble">
        <div class="db-chat-msg-text">${escapeHtml(text)}</div>
      </div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function addBotMessage(html, actions) {
    const body = document.getElementById('dbChatBody');
    const div = document.createElement('div');
    div.className = 'db-chat-msg bot';
    
    let actionsHtml = '';
    if (actions && actions.length > 0) {
      actionsHtml = '<div class="db-chat-cta-row">' +
        actions.map(a => {
          if (a.url) {
            return `<a class="db-chat-cta-btn${a.url.startsWith('javascript') ? ' secondary' : ''}" href="${a.url}" ${!a.url.startsWith('javascript') ? 'target="_blank"' : ''}>${a.label} →</a>`;
          }
          return `<button class="db-chat-cta-btn secondary" data-action="${a.action}">${a.label} →</button>`;
        }).join('') +
      '</div>';
    }

    div.innerHTML = `
      <span class="db-chat-msg-avatar">${CONFIG.avatar}</span>
      <div class="db-chat-msg-bubble">
        <div class="db-chat-msg-text">${html}</div>
        ${actionsHtml}
      </div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;

    // 绑定CTA按钮事件
    div.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', () => handleQuickAction(btn.dataset.action));
    });
  }

  function showTyping() {
    const body = document.getElementById('dbChatBody');
    const div = document.createElement('div');
    div.className = 'db-chat-msg bot';
    div.id = 'dbChatTyping';
    div.innerHTML = `
      <span class="db-chat-msg-avatar">${CONFIG.avatar}</span>
      <div class="db-chat-msg-bubble">
        <div class="db-chat-typing">
          <div class="db-chat-typing-dot"></div>
          <div class="db-chat-typing-dot"></div>
          <div class="db-chat-typing-dot"></div>
        </div>
      </div>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('dbChatTyping');
    if (el) el.remove();
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // ===== 初始化 =====
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
