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

  // ===== 智能FAQ系统 - 全面覆盖所有reference内容 =====
  const FAQS = [
    // ========== 1. 选校定位 ==========
    {
      q: ['选校', '定位', '能申到什么', '能申请什么学校', '帮我看看能申哪', '学校推荐'],
      a: '🎯 <strong>选校定位需要提供的信息</strong><br><br>请告诉我：<br>1️⃣ <strong>本科院校</strong>：985/211/双非？<br>2️⃣ <strong>GPA/均分</strong>：百分制多少分？<br>3️⃣ <strong>本科专业</strong>：什么方向？<br>4️⃣ <strong>雅思/托福</strong>：考了吗？多少分？<br>5️⃣ <strong>目标地区</strong>：英国/澳洲/港新/新西兰？<br>6️⃣ <strong>目标专业</strong>：继续本专业还是跨专业？<br><br>或者直接发给我，比如<strong>"985，85分，电子信息，雅思6.5，想申香港"</strong>，我马上给你<strong>冲刺/匹配/保底</strong>三档选校方案！',
      followUp: []
    },
    // ========== 2. 通用选校参考框架 ==========
    {
      q: ['通用选校框架', '选校参考', '大致能申什么', '看看能申什么档次的学校'],
      a: '📊 <strong>通用选校定位参考</strong><br><br>【985背景】<br>• 85+分：港三/新二/G5 + 王曼爱华保底<br>• 80-84分：港城/港理/英国QS50-100<br>• 75-79分：英国QS100-150/澳洲八大<br><br>【211背景】<br>• 85+分：港三/新二/王曼爱华<br>• 80-84分：港城/英国QS50-100<br>• 75-79分：英国QS100-150/澳洲八大<br><br>【双非背景】<br>• 88+分：港城/英国QS50-100<br>• 82-87分：英国QS100-150/澳洲八大<br>• 78-81分：英国QS150+/澳洲八大（非热门专业）<br><br>⚠️ 以上是大致参考，具体还要看专业竞争度、雅思分数、实习科研等因素。把你的具体背景发给我，我帮你精准定位！',
      followUp: []
    },
    // ========== 3. 费用预算 ==========
    {
      q: ['费用', '留学要花多少钱', '预算', '多少钱', '花费', '学费', '生活费'],
      a: '💰 <strong>留学总费用一览（硕士）</strong><br><br>🇬🇧 <strong>英国</strong>：学费15-30万 + 生活费10-15万 = <strong>25-35万/年</strong><br>🇦🇺 <strong>澳洲</strong>：学费20-35万 + 生活费12-18万 = <strong>40-55万/年</strong><br>🇭🇰 <strong>香港</strong>：学费15-25万 + 生活费10-15万 = <strong>25-40万/年</strong><br>🇸🇬 <strong>新加坡</strong>：学费20-30万 + 生活费8-12万 = <strong>30-50万/年</strong><br>🇳🇿 <strong>新西兰</strong>：学费15-25万 + 生活费8-12万 = <strong>25-35万/年</strong><br><br>📊 <strong>按预算推荐</strong>：<br>• 预算25万以下 → 英国1年制 / 新西兰<br>• 预算25-40万 → 香港 / 英国<br>• 预算40万以上 → 澳洲 / 新加坡<br><br>想知道具体某个专业的费用？告诉我国家和专业！',
      followUp: ['showCalculator']
    },
    // ========== 4. 案例库 ==========
    {
      q: ['案例', '录取案例', '成功案例', '往年案例', '有没有人'],
      a: '📊 我们有<strong>502个真实录取案例</strong>！涵盖985/211/双非/海本各类背景。<br><br>告诉我你的背景，我帮你找相似案例：<br>• 985 85分 金融 申香港 → 有12个相似案例<br>• 211 82分 CS 申英国 → 有8个相似案例<br>• 双非 80分 传媒 申澳洲 → 有6个相似案例<br><br>或者直接去我们的<strong>案例库</strong>按条件筛选查看！',
      followUp: ['showCases']
    },
    // ========== 5. 语言成绩 ==========
    {
      q: ['雅思', '语言成绩', '托福', 'PTE', '语言', '没考雅思', '雅思还没考'],
      a: '📝 <strong>各地区雅思要求对照表</strong><br><br>🇬🇧 <strong>英国</strong>：6.5（单项6.0）→ 可后补，先拿con offer<br>🇦🇺 <strong>澳洲</strong>：6.5（单项6.0）→ 接受PTE，可配语言班<br>🇭🇰 <strong>香港</strong>：6.5-7.0 → <strong>带语言申请优势大</strong><br>🇸🇬 <strong>新加坡</strong>：6.5-7.0 → 少数专业6.0<br>🇳🇿 <strong>新西兰</strong>：6.5（单项6.0）<br><br>📅 <strong>备考时间规划</strong>：<br>• 基础5.5 → 目标6.5：建议2-3个月<br>• 基础5.0 → 目标6.5：建议3-4个月<br>• 基础4.5 → 目标6.5：建议4-6个月<br><br>⚠️ <strong>关键提醒</strong>：香港9月就开申请了，雅思还没考的要抓紧！',
      followUp: []
    },
    // ========== 6. 时间规划 ==========
    {
      q: ['时间', '申请时间', '什么时候申请', 'timeline', '规划', '申请季', '几月申请'],
      a: '📅 <strong>2026 Fall 入学申请时间线</strong><br><br><strong>Phase 1：准备期（现在-8月）</strong><br>• 考雅思/托福（最迟8月出分）<br>• 准备文书（PS+RL+CV）<br>• 确定选校名单<br><br><strong>Phase 2：申请期（9-11月）</strong><br>• 9月：港新开放申请，<strong>第一时间递交</strong><br>• 10月：英国开放，分轮次滚动录取<br>• 11月：澳洲开放，部分春季入学截止<br><br><strong>Phase 3：等offer（12月-次年2月）</strong><br>• 面试准备（港校商科/CS常见）<br>• 补交材料<br><br><strong>Phase 4：收尾期（3-8月）</strong><br>• 3-4月：比较offer，交留位费<br>• 5-6月：办签证，存保证金<br>• 7-8月：订机票，找住宿<br><br>需要我根据你的具体情况调整时间线吗？',
      followUp: ['showTimeline']
    },
    // ========== 7. 文书材料清单 ==========
    {
      q: ['文书', 'PS', '推荐信', '简历', 'CV', '资料清单', '材料清单', '申请材料', '准备什么材料', '要什么材料', '申请需要什么', '申请资料'],
      a: '📝 <strong>硕士申请材料完整清单</strong><br><br>✅ <strong>基础材料</strong><br>□ 护照（有效期6个月以上）<br>□ 在读证明/毕业证学位证（中英文盖章）<br>□ 成绩单（中英文盖章）<br>□ 均分证明（如成绩单无均分需单独开具）<br><br>✅ <strong>文书材料</strong><br>□ 个人陈述（PS）800-1000字<br>□ 推荐信2封（学术推荐人+实习推荐人）<br>□ 简历（CV）1页<br>□ 作品集（建筑/设计/艺术类专业）<br><br>✅ <strong>学术材料</strong><br>□ 雅思/托福成绩单（有效期2年）<br>□ GRE/GMAT（如需）<br><br>✅ <strong>软性材料</strong><br>□ 实习证明（中英文盖章）<br>□ 获奖证书/论文/科研成果<br><br>✅ <strong>资金材料</strong><br>□ 存款证明（覆盖第一年费用，冻结3-6个月）<br><br>⏰ <strong>时间节点</strong>：提前6-8个月开始准备文书，提前3个月准备资金证明！',
      followUp: []
    },
    // ========== 8. PS写作指导 ==========
    {
      q: ['PS怎么写', '个人陈述怎么写', '文书怎么写', 'PS写作', '文书写作', '怎么写PS', 'PS框架'],
      a: '📝 <strong>PS写作框架（800-1000字）</strong><br><br><strong>1. 开篇（10%）→ 引人入胜</strong><br>用一个具体故事开头，不要"我从小喜欢..."<br>示例："大二在券商实习时，我发现自己对数据分析的痴迷远超对KPI的追求..."<br><br><strong>2. 学术背景（25%）→ 用数据说话</strong><br>相关课程、项目、研究成果，量化成果<br><br><strong>3. 实践经历（25%）→ 反思比罗列重要</strong><br>把"我做了A"改成"从A中学到了什么"<br><br><strong>4. 选校原因（20%）→ 不要抄官网</strong><br>具体到某门课、某个教授、某个项目<br><br><strong>5. 职业规划（15%）→ 短期+长期</strong><br>回国发展？海外工作？学术界？<br><br><strong>6. 结尾（5%）→ 简洁有力</strong><br><br>✅ <strong>自检清单</strong>：□ 具体故事开头 □ 量化成果 □ 解释为什么选这个学校 □ 提到具体课程/教授 □ 职业规划清晰<br><br>需要我帮你看看具体的文书思路吗？',
      followUp: []
    },
    // ========== 9. 签证办理 ==========
    {
      q: ['签证', '学生签', 'VISA', '办签证', '签证材料', '签证流程'],
      a: '🛂 <strong>学生签证办理指南</strong><br><br><strong>英国 Student Route</strong><br>📋 材料：CAS + 护照 + 资金证明（存满28天）+ 肺结核检测 + IHS医疗费<br>⏰ 时间：开课前6个月可递签，审理15工作日<br>💰 费用：签证£490 + IHS £776/年<br><br><strong>澳洲 Subclass 500</strong><br>📋 材料：COE + GTE陈述 + OSHC保险 + 资金证明<br>⏰ 时间：开课前4个月，审理4-8周<br>💰 费用：A$710<br><br><strong>香港</strong><br>📋 材料：学校代申请，你提供资金证明+照片+护照<br>⏰ 时间：6-8周<br>💰 费用：HK$530<br><br><strong>新西兰</strong><br>📋 材料：COE + 资金证明 + 体检 + 无犯罪记录<br>⏰ 时间：4-6周<br>💰 费用：NZ$430<br><br>⚠️ <strong>资金证明注意</strong>：需覆盖学费+生活费，存满28天，建议存在学生本人名下！',
      followUp: []
    },
    // ========== 10. 资金证明/存款 ==========
    {
      q: ['资金证明', '存款证明', '保证金', '存款', '存多少钱', '存多久', '28天'],
      a: '💰 <strong>资金证明完全指南</strong><br><br><strong>金额要求</strong>：覆盖第一年学费 + 生活费<br>• 英国非伦敦：£9,135 + 学费<br>• 英国伦敦：£12,006 + 学费<br>• 澳洲：A$24,505 + 学费<br>• 香港：HK$100,000-150,000 + 学费<br><br><strong>存期要求</strong>：<br>• 英国：存满<strong>28天</strong>才能开存款证明<br>• 澳洲/香港/新西兰：无严格28天要求，但建议提前存<br><br><strong>关键提醒</strong>：<br>• 最好存在<strong>学生本人名下</strong>（父母名下需额外提供户口本+出生证明+资助声明）<br>• 可以是人民币，等值即可<br>• 理财产品/股票可计入，但需证明可变现<br>• 冻结期覆盖签证审理期（建议3-6个月）<br><br>常见拒签原因：存期不足28天、资金来源不清晰、金额不足！',
      followUp: []
    },
    // ========== 11. 香港申请 ==========
    {
      q: ['香港', 'HK', '港大', '港中文', '港科大', '港城大', '港理工'],
      a: '🇭🇰 <strong>香港硕士申请全指南</strong><br><br><strong>申请要求</strong><br>• 港三（HKU/CUHK/HKUST）：985/211均分85+，双非88+<br>• 港城大/港理：211均分80+，双非82+<br>• 雅思：6.5-7.0（商科偏好7.0）<br><br><strong>优势</strong>：1年制、回国认可度高、IANG签证留港工作<br><strong>注意</strong>：9-10月开放，滚动录取先到先得！<br><br>📊 <strong>热门专业均分参考</strong>：<br>• 金融/商科：985需87+，211需85+<br>• CS/EE：985需83+，211需80+<br>• 传媒/教育：985需80+，211需78+<br><br>你的背景是什么？我帮你评估港校定位！',
      followUp: ['showHKInfo']
    },
    // ========== 12. 英国申请 ==========
    {
      q: ['英国', 'UK', '曼大', 'UCL', '爱丁堡', '格拉斯哥', '利兹', '南安普顿'],
      a: '🇬🇧 <strong>英国硕士申请全指南</strong><br><br><strong>申请要求对照表</strong><br>• G5：985/211均分88+，双非90+（极难）<br>• 王曼爱华：985/211均分82+，双非85+<br>• QS50-100：985/211均分78+，双非80+<br>• QS100-150：均分75+有机会<br><br><strong>优势</strong>：1年制省时间、PSW工签2年、可后补雅思<br><strong>注意</strong>：部分专业滚动录取，早申早得！<br><br>📊 <strong>双非友好校推荐</strong>：<br>• 格拉斯哥、利兹、南安普顿、谢菲尔德<br>• 均分75-80就有机会！<br><br>告诉我你的均分，我推荐具体学校！',
      followUp: ['showUKInfo']
    },
    // ========== 13. 澳洲申请 ==========
    {
      q: ['澳洲', '澳大利亚', '悉尼', '墨尔本', '八大', 'UNSW', '莫纳什'],
      a: '🇦🇺 <strong>澳洲硕士申请全指南</strong><br><br><strong>八大申请要求</strong><br>• 墨尔本：985/211均分80+，双非85+<br>• 悉尼/新南：211均分75+，双非80+<br>• 澳国立/昆士兰：211均分70+，双非75+<br>• 莫纳什/西澳/阿德莱德：双非70+就有机会<br><br><strong>优势</strong>：工签2-3年、移民友好、接受PTE、可配语言班<br><strong>注意</strong>：2月/7月双入学季，错过2月可申7月！<br><br>💡 <strong>低GPA救星</strong>：均分70-75可申非八大+部分八大非热门专业<br><br>你的均分多少？我帮你匹配澳洲学校！',
      followUp: ['showAUInfo']
    },
    // ========== 14. 新西兰申请 ==========
    {
      q: ['新西兰', '奥克兰', '奥塔哥', 'NZ'],
      a: '🇳🇿 <strong>新西兰硕士申请全指南</strong><br><br><strong>8所公立大学要求</strong><br>• 奥克兰：985/211均分78+，双非80+<br>• 其他7所：均分70-75就有机会<br><br><strong>优势</strong>：移民最友好（绿色清单）、工签3年、费用低（25-35万）<br><strong>注意</strong>：专业选择相对少，但移民是最大卖点！<br><br>💡 <strong>移民热门专业</strong>：护理、幼教、工程、IT、会计<br><br>目标是移民还是回国？我帮你选专业！',
      followUp: []
    },
    // ========== 15. 新加坡申请 ==========
    {
      q: ['新加坡', 'NUS', 'NTU', '新国立', '南洋理工'],
      a: '🇸🇬 <strong>新加坡硕士申请全指南</strong><br><br><strong>申请要求</strong><br>• NUS/NTU：偏好985/211，均分85+<br>• 双非需87+且有强实习/科研<br>• 雅思：6.5-7.0<br><br><strong>优势</strong>：亚洲Top 2、回国认可度极高、安全指数高<br><strong>注意</strong>：名额有限，竞争激烈，偏好有工作经验的申请者！<br><br>📊 <strong>录取画像</strong>：<br>• 985均分85+ + 雅思7.0 = 较稳<br>• 211均分87+ + GMAT 700 = 有竞争力<br>• 双非需90+ + 强实习才有机会<br><br>你的背景是？我帮你评估NUS/NTU概率！',
      followUp: []
    },
    // ========== 16. 移民/工签 ==========
    {
      q: ['移民', '留下工作', '工签', '工作签证', 'PSW', '留下来'],
      a: '🌍 <strong>毕业后工签对比与移民推荐</strong><br><br><strong>工签时长对比</strong><br>• 🇦🇺 澳洲：本科2年 / 硕士3年 / 博士4年<br>• 🇳🇿 新西兰：统一3年<br>• 🇬🇧 英国：PSW 2年（博士3年）<br>• 🇭🇰 香港：IANG 2年<br><br><strong>移民难度排名</strong><br>1️⃣ 新西兰（最容易）→ 绿色清单职业直接移民<br>2️⃣ 澳洲（中等）→ 技术移民打分制<br>3️⃣ 英国（较难）→ 需找到担保雇主<br>4️⃣ 香港（较难）→ 需连续工作7年<br><br>💡 <strong>推荐组合</strong>：<br>• 目标是移民 → <strong>新西兰/澳洲</strong><br>• 目标是海外工作几年回国 → <strong>澳洲/英国</strong><br>• 目标是回国发展 → <strong>香港/新加坡</strong><br><br>你的长期规划是什么？',
      followUp: []
    },
    // ========== 17. 考公考编 ==========
    {
      q: ['考公', '考编', '公务员', '事业单位', '体制内', '国考', '省考', '考公务员'],
      a: '🏛️ <strong>留学生考公考编全攻略</strong><br><br><strong>六大热门专业方向</strong><br>• 财会类（~30%岗位）：会计、金融、财政 → 税务局/财政局<br>• 管理类（~20%）：公共管理、行政管理 → 政府办<br>• 法学类（~15%）：法学、国际法 → 纪检审计<br>• 经济类（~15%）：经济学、国际贸易 → 发改委<br>• 计算机类（~10%）：CS、数据科学 → 信息化岗<br>• 中文类（~5%）：汉语言文学、教育 → 宣传/文秘<br><br>⚠️ <strong>关键提醒</strong>：<br>• 专业名称必须匹配国内目录（留服认证可复核1次）<br>• 涉密岗位（国安/军事）不能报，其他都开放<br>• 2025-2026多地取消选调生资格，但国考省考完全开放！<br><br>💡 <strong>选校策略</strong>：专业名称匹配 > 学校排名！<br>想考哪个部门？我帮你查招录专业要求！',
      followUp: ['showCareer']
    },
    // ========== 18. 进大厂 ==========
    {
      q: ['大厂', '互联网', '腾讯', '阿里', '字节', '华为', '百度', '美团', '互联网大厂'],
      a: '💻 <strong>留学生进大厂攻略</strong><br><br><strong>大厂Target School（含港校）</strong><br>• 字节跳动校招list明确包含：港大、港科大、港中文<br>• 其他大厂：QS前100基本都能过简历关<br><br><strong>核心公式</strong>：实习 > 学校 > 专业<br>• 2-3段大厂实习 > QS排名50位<br>• 港校最优（方便回国实习）<br><br>📅 <strong>实习时间线</strong>：<br>• 入学前暑假：第一段实习（中厂也可）<br>• 寒假：第二段实习（目标大厂）<br>• 毕业前暑假：第三段实习（转正机会）<br><br>💡 <strong>非科班也能进</strong>：文科/商科转产品/运营，只要有项目和实习<br><br>你的专业是？我帮你规划实习路径！',
      followUp: ['showCareer']
    },
    // ========== 19. 落户 ==========
    {
      q: ['落户', '户口', '上海落户', '北京落户', '深圳落户', '留学生落户'],
      a: '🏠 <strong>留学生回国落户政策速查</strong><br><br><strong>上海（2025最新）</strong><br>• QS前50 → 过试用期<strong>直接落户</strong><br>• QS 51-100 → 6个月社保<br>• QS 101-500 → 6个月1倍社保基数(11396元)<br><br><strong>北京</strong><br>• 硕士+留学360天+回国2年内+45岁以下<br>• 需在京央企/高新企业工作<br><br><strong>深圳</strong><br>• 博士45岁/硕士40岁/本科35岁以下<strong>直接落户</strong><br>• 额外补贴：博士10万/硕士5万/本科3万<br><br><strong>广州/杭州</strong><br>• 几乎零门槛，有社保记录即可<br><br>💡 <strong>目标是落户</strong> → 优先冲QS前50（上海直接落）！<br><br>你想落哪个城市？',
      followUp: ['showCareer']
    },
    // ========== 20. 面试准备 ==========
    {
      q: ['面试', '准备面试', '面试问题', '面经', '面试技巧', '港校面试'],
      a: '🎤 <strong>留学面试准备指南</strong><br><br><strong>常见面试问题</strong><br>1. 自我介绍（准备2分钟和5分钟版本）<br>2. 为什么选择这个专业？<br>3. 为什么选择我们学校？<br>4. 你的职业规划是什么？<br>5. 你的优势/劣势是什么？<br>6. 描述一个你克服困难的例子<br>7. 你有什么问题想问我们？<br><br><strong>面试技巧</strong><br>• 提前模拟练习，不要背稿要自然<br>• 研究学校特色和专业课程设置<br>• 准备3-5个反问问题（体现你的兴趣和思考）<br>• 着装得体，背景整洁（线上面试）<br>• 保持自信、真诚、热情<br><br><strong>港校面试特点</strong>：商科/CS/传媒常见，CUHK面试最多，群面+单面结合<br><br>需要我帮你模拟面试吗？',
      followUp: []
    },
    // ========== 21. 留位费/Offer选择 ==========
    {
      q: ['留位费', 'offer选择', '选哪个offer', '怎么选学校', '比较offer', '交留位费', 'offer'],
      a: '🎓 <strong>留位费与Offer选择攻略</strong><br><br><strong>留位费关键信息</strong><br>• 金额：学费的30-50%（通常5-15万人民币）<br>• 考虑时间：通常只有<strong>2周</strong>！<br>• 交了不去 = 白搭（一般不退）<br>• 策略：利用时间差，先交保底校的，等冲刺校<br><br><strong>Offer比较维度</strong><br>• 学校排名（QS/专业排名）<br>• 专业实力（课程设置/师资力量）<br>• 地理位置（实习/就业机会）<br>• 总费用（学费+生活费）<br>• 毕业后工签/移民政策<br>• 个人职业规划匹配度<br><br><strong>常见纠结场景</strong><br>• 排名高但专业一般 vs 排名低但专业强 → 看职业规划<br>• 费用低 vs 费用高 → 算投资回报率<br>• 英国1年 vs 澳洲2年 → 看时间成本和移民意愿<br><br>你有几个offer在纠结？发给我帮你分析！',
      followUp: []
    },
    // ========== 22. 低GPA逆袭 ==========
    {
      q: ['低GPA', 'GPA低', '均分低', '分数不高', '成绩不好', 'GPA不够', '均分不够', 'GPA差'],
      a: '💪 <strong>低GPA逆袭方案</strong><br><br>别慌！我的案例库里有大量低分高录的案例：<br>• 双非GPA72 → 帝国理工材料（专业对口+研究经历）<br>• 985 GPA72 → HKUST电子工程（985加成）<br>• 双非GPA75 → 利兹计算机+3000镑奖学金<br>• 211 GPA71 → HKU工业工程（相关工科跨申）<br><br><strong>低GPA逆袭的5个关键</strong><br>1️⃣ <strong>专业高度匹配</strong>：材料申材料，生物申生物医学<br>2️⃣ <strong>985/211加成</strong>：同级GPA，985比双非录的学校好一档<br>3️⃣ <strong>强相关经历</strong>：有作品集/研究/实习弥补<br>4️⃣ <strong>避开热门专业</strong>：申冷门方向比商科/CS更容易<br>5️⃣ <strong>澳洲是救命稻草</strong>：新南威尔士GPA77.9就能录<br><br><strong>紧急补救措施</strong><br>• 如果还没毕业，重修低分课程刷GPA<br>• 提供专业课GPA（如果比总GPA高）<br>• 在PS中解释GPA低的原因（如身体/家庭因素）<br>• 用强实习/科研经历转移注意力<br><br>告诉我你的具体背景，我帮你找逆袭路径！',
      followUp: []
    },
    // ========== 23. 跨专业申请 ==========
    {
      q: ['跨专业', '转专业', '跨申', '不是本专业', '换专业', '跨专业申请'],
      a: '🔄 <strong>跨专业申请完全指南</strong><br><br><strong>跨专业难度排名</strong><br>• <strong>最容易</strong>：理工科互转（EE/CS/AI/机器人基本互通）<br>• <strong>较容易</strong>：文科互转（传媒/教育/社会学）<br>• <strong>中等</strong>：商科转管理/市场、理科转工科<br>• <strong>较难</strong>：文科转理工科（需补数学/编程基础）<br>• <strong>最难</strong>：商科转工科（除非有强数学背景）<br><br><strong>跨专业成功案例</strong><br>• 计算机 → 系统工程（CUHK，985/88）<br>• 土木工程 → 建筑项目管理（HKU，双非/80）<br>• 经济学 → 工业工程（HKU，211/71）<br>• 设计 → 游戏设计（NTU，双非/90）<br>• 传媒 → 教育（利兹，双非/83）<br><br><strong>跨专业成功公式</strong><br>• GPA要比同专业申请者高3-5分<br>• 有相关实习/项目/作品集证明兴趣和能力<br>• PS中清晰解释为什么要跨专业<br>• 选修相关课程或在线课程（Coursera等）<br><br>你想从什么专业跨到什么专业？我帮你评估可行性！',
      followUp: []
    },
    // ========== 24. 奖学金 ==========
    {
      q: ['奖学金', 'scholarship', '有奖吗', '减免', '学费减免', '奖学金申请'],
      a: '🏆 <strong>留学生奖学金信息</strong><br><br><strong>英国奖学金</strong><br>• 金额：通常3000-6000镑（学费的10-20%）<br>• 条件：GPA85+或985背景<br>• 案例：双非GPA93 利兹6000镑 / 985均分75 南安15000镑<br><br><strong>澳洲奖学金</strong><br>• 八大有部分优秀国际学生奖学金<br>• 通常自动评估，无需额外申请<br><br><strong>香港奖学金</strong><br>• 授课型硕士奖学金较少<br>• 研究型（MPhil/PhD）奖学金多<br><br><strong>省钱技巧</strong><br>• 早申有优势（部分学校早鸟奖学金）<br>• 冷门专业奖学金竞争小<br>• 双非GPA85+申英国前150，拿奖概率大<br><br>你的GPA多少？我帮你评估拿奖可能性！',
      followUp: []
    },
    // ========== 25. 无雅思申请 ==========
    {
      q: ['没雅思', '无雅思', '没有雅思', '雅思还没考', '不带雅思', '先申请'],
      a: '✅ <strong>没雅思也可以先申请！</strong><br><br><strong>各地区政策</strong><br>🇬🇧 <strong>英国</strong>：可以先无雅思递交 → 拿conditional offer → 后补雅思 → 换unconditional offer<br>🇦🇺 <strong>澳洲</strong>：可以先申请 → 后补雅思 → 或配语言班<br>🇳🇿 <strong>新西兰</strong>：同澳洲，可后补或配语言班<br>🇭🇰 <strong>香港</strong>：部分专业可后补，但<strong>带雅思申请优势大</strong><br>🇸🇬 <strong>新加坡</strong>：一般需要带雅思申请<br><br><strong>建议策略</strong><br>• 即使没雅思，也先递交申请占位置（滚动录取先到先得）<br>• 同步准备雅思，考出来后立即补交<br>• 如果雅思一直考不出来，英国/澳洲可以配语言班<br><br>你现在雅思什么水平？我帮你规划考试时间线！',
      followUp: []
    },
    // ========== 26. Con Offer换Uncon ==========
    {
      q: ['con offer', 'uncon', 'conditional', '换uncon', '补材料', 'offer条件'],
      a: '📋 <strong>Conditional Offer → Unconditional Offer 转换指南</strong><br><br><strong>常见的Con条件</strong><br>• 学术条件：毕业均分达到XX（如con 80分）<br>• 语言条件：雅思达到XX（如con 6.5）<br>• 材料条件：补交毕业证/学位证/完整成绩单<br><br><strong>转换流程</strong><br>1. 满足条件后，在学校系统上传证明材料<br>2. 学校审核（通常1-2周）<br>3. 发放Unconditional Offer<br>4. 交留位费/押金<br>5. 学校发CAS（英国）/COE（澳洲）<br><br><strong>重要提醒</strong><br>• Con了均分80但只考到79 → 可以argue！写邮件解释+提供专业课GPA<br>• Con了雅思7.0但只考到6.5 → 英国可以配语言班<br>• 换Uncon越早越好，后面签证需要时间<br><br>你的offer有什么条件？我帮你看看怎么满足！',
      followUp: []
    },
    // ========== 27. 留服认证 ==========
    {
      q: ['留服认证', '学历认证', '认证', '留学生服务中心', '回国认证'],
      a: '📜 <strong>留学生学历认证（留服认证）完全指南</strong><br><br><strong>为什么要认证</strong><br>• 回国就业的硬性要求（国企/大厂/考公都需要）<br>• 落户必备材料<br>• 享受留学生优惠政策（买车免税等）<br><br><strong>申请流程</strong><br>1. 登录留学服务中心官网（www.cscse.edu.cn）<br>2. 注册账号，上传材料<br>3. 支付费用（360元）<br>4. 等待审核（通常10-20个工作日）<br><br><strong>所需材料</strong><br>• 护照（所有出入境页）<br>• 学位证（原件扫描件）<br>• 成绩单<br>• 签证页和BRP卡（英国）<br>• 一张证件照<br><br><strong>专业复核（考公必做）</strong><br>• 认证后的12个月内可免费复核1次<br>• 把国外专业名改为国内目录对应名称<br>• 示例："Marketing Communication" → "新闻传播学"<br><br>需要我详细解释复核流程吗？',
      followUp: []
    },
    // ========== 28. 留服专业复核 ==========
    {
      q: ['专业复核', '复核专业', '改专业名', '认证专业', '考公专业'],
      a: '📜 <strong>留服认证专业复核（考公必做）</strong><br><br><strong>为什么要复核</strong><br>• 留服直译的专业名可能不在国内目录里<br>• 考公要求专业名称必须匹配招录目录<br>• 例："Marketing Communication" 直译为"市场营销传播学" → 但国内目录只有"新闻传播学类"<br><br><strong>复核流程</strong><br>1. 拿到首次认证结果后12个月内<br>2. 准备材料：成绩单、课程描述、国内外课程对比、公务员目录截图<br>3. 在留服系统提交复核申请（免费1次）<br>4. 等待审核（约10个工作日）<br><br><strong>复核成功示例</strong><br>• "工程项目管理" → "管理科学与工程（工程项目管理）"<br>• "国际经济与商务" → "应用经济学（国际经济与商务）"<br>• "互动新闻学" → "新闻学（互动新闻学）"<br><br><strong>选校建议</strong><br>• 申请前先查目标岗位的专业目录要求<br>• 选课程和国内目录匹配度高的项目<br>• 保留课程大纲（复核时需要）<br><br>你想考哪个部门？我帮你查专业要求！',
      followUp: []
    },
    // ========== 29. 春季入学 ==========
    {
      q: ['春季入学', '春季', '2月入学', '1月入学', 'S1', '二月'],
      a: '🌸 <strong>春季入学申请指南</strong><br><br><strong>提供春季入学的国家/地区</strong><br>🇦🇺 <strong>澳洲</strong>：2月（S1）主入学季，几乎所有专业都开放<br>🇳🇿 <strong>新西兰</strong>：2月/7月双入学季<br>🇸🇬 <strong>新加坡</strong>：部分专业1月入学<br>🇬🇧 <strong>英国</strong>：少数专业1月入学（较少）<br>🇭🇰 <strong>香港</strong>：部分专业1月入学（较少）<br><br><strong>春季入学的优势</strong><br>• 避开秋季申请高峰，竞争相对小<br>• 如果秋季没赶上，不用gap一整年<br>• 澳洲2月是主入学季，选择更多<br><br><strong>春季入学的劣势</strong><br>• 部分专业不开设春季入学<br>• 奖学金机会较少<br>• 毕业后求职时间线可能不如秋季合适<br><br>你想申哪个国家的春季入学？我帮你查开放专业！',
      followUp: []
    },
    // ========== 30. Gap Year/二战 ==========
    {
      q: ['gap', 'gap year', '二战', '再申请', '重新申请', '第二次申请', 'defer'],
      a: '🔄 <strong>Gap Year / 二战申请指南</strong><br><br><strong>Gap Year不是劣势！</strong>关键是你这段时间做了什么<br><br><strong>Gap Year的加分项</strong><br>• 实习/工作经历（最重要！）<br>• 语言成绩刷高<br>• 科研项目/论文发表<br>• 志愿者/社会服务<br>• 创业经历<br><br><strong>Gap Year申请建议</strong><br>• 在PS中正面解释gap原因（不要回避）<br>• 强调这段时间的成长和收获<br>• 用具体成果证明你没有浪费时间<br><br><strong>Defer（延期入学）</strong><br>• 拿到offer后可以申请defer1年<br>• 不同学校政策不同，需要提前沟通<br>• 部分学校可能不接受defer<br><br>你gap期间做了什么？我帮你写进文书里！',
      followUp: []
    },
    // ========== 31. 博士申请 ==========
    {
      q: ['博士', 'PhD', '读博', '博士申请', '全奖博士', '研究型'],
      a: '🎓 <strong>博士（PhD）申请指南</strong><br><br><strong>博士vs硕士区别</strong>• 硕士（授课型）：1-2年，上课为主，就业导向<br>• 博士（研究型）：3-5年，做研究为主，学术导向<br><br><strong>PhD申请要求</strong><br>• 硕士学位（部分接受本科直博）<br>• 研究计划（Research Proposal）<br>• 找到导师（套磁）<br>• 强推荐信（学术推荐）<br>• 研究经历/论文发表<br><br><strong>奖学金</strong><br>• 香港PhD：全奖概率高（PGS每月1.8万HKD）<br>• 英国PhD：奖学金竞争激烈，多为自费<br>• 澳洲PhD：奖学金较丰富<br>• 新西兰PhD：本地学生学费（约4-5万/年）<br><br><strong>申请流程</strong><br>1. 确定研究方向<br>2. 找目标导师（看论文、发套磁信）<br>3. 写Research Proposal<br>4. 提交申请<br>5. 面试<br><br>你的研究方向是什么？我帮你评估！',
      followUp: []
    },
    // ========== 32. 本科申请 ==========
    {
      q: ['本科', '本科申请', ' undergraduate', '高中毕业', '高考', '预科', 'foundation'],
      a: '🎓 <strong>本科留学申请指南</strong><br><br><strong>申请途径</strong><br>• <strong>直申本科</strong>：用高考成绩/国际课程（A-Level/IB/AP）申请<br>• <strong>预科（Foundation）</strong>：高中成绩申请，读1年预科+3年本科<br>• <strong>国际大一（Diploma）</strong>：高中成绩申请，读1年国际大一+2年本科<br>• <strong>副学士（Associate）</strong>：香港特有，2年副学士+2年本科<br><br><strong>各国要求</strong><br>🇬🇧 <strong>英国</strong>：接受高考成绩（部分学校），或预科/国际大一<br>🇦🇺 <strong>澳洲</strong>：接受高考成绩（一本线以上直录）<br>🇭🇰 <strong>香港</strong>：高考成绩申请，或副学士2+2<br>🇸🇬 <strong>新加坡</strong>：接受高考成绩，但要求较高<br><br><strong>预科优势</strong><br>• 不需要高考成绩<br>• 语言和学术过渡<br>• 读完直升本校本科<br><br>你是高中在读还是刚毕业？我帮你规划路径！',
      followUp: []
    },
    // ========== 33. 拒签/申诉 ==========
    {
      q: ['拒签', '被拒', '拒了', 'argue', '申诉', '被拒签'],
      a: '⚠️ <strong>拒签后的应对方案</strong><br><br><strong>常见拒签原因</strong><br>• 资金存期不足28天<br>• 资金来源不清晰<br>• 资金金额不足<br>• 提供虚假材料<br>• 学习计划不合理（英国）<br>• GTE陈述不通过（澳洲）<br><br><strong>应对措施</strong><br>• 先搞清楚具体拒签原因（签证官会写信说明）<br>• 资金问题 → 重新存满28天再递签<br>• 材料问题 → 补充材料/解释信<br>• 学习计划问题 → 重写学习计划<br><br><strong>Argue（ argue offer/成绩）</strong><br>• Con了均分80但只考到79 → 写argue信，解释原因+提供专业课GPA<br>• 被拒后想申诉 → 写申诉信，说明情况变化<br><br>你被拒签/argue的具体原因是什么？我帮你分析！',
      followUp: []
    },
    // ========== 34. 住宿/行前准备 ==========
    {
      q: ['住宿', '租房', '宿舍', '住哪', '房子', '行前', '准备行李', '出发'],
      a: '🏠 <strong>住宿与行前准备</strong><br><br><strong>住宿选择</strong><br>• <strong>学校宿舍</strong>：安全方便但贵，需尽早申请（5-6月）<br>• <strong>校外租房</strong>：便宜自由但需自己找<br>• <strong>学生公寓</strong>：介于两者之间<br><br><strong>各国住宿费用/月</strong><br>• 英国伦敦：£800-1500 | 非伦敦：£500-900<br>• 澳洲悉尼/墨尔本：A$1000-1800<br>• 香港：HK$4000-8000<br>• 新加坡：S$500-1200<br><br><strong>行前清单</strong><br>✅ 签证办好+护照复印3份<br>✅ 换外币现金（£500-1000）<br>✅ 买机票（提前2-3个月订）<br>✅ 准备转换插头<br>✅ 带常用药品（处方药需处方翻译）<br>✅ 下载当地App（Google Maps/Uber等）<br><br>需要我详细解释某个国家的住宿吗？',
      followUp: []
    },
    // ========== 35. defer/延期入学 ==========
    {
      q: ['defer', '延期', '延期入学', '推迟', '晚一年入学'],
      a: '⏸️ <strong>Defer（延期入学）指南</strong><br><br><strong>什么是Defer</strong><br>• 拿到offer后申请推迟1年入学<br>• 保留offer名额，下一年直接入学<br><br><strong>各国Defer政策</strong><br>🇬🇧 <strong>英国</strong>：大部分学校接受defer，需写邮件申请<br>🇦🇺 <strong>澳洲</strong>：较灵活，可以defer到下一个入学季<br>🇭🇰 <strong>香港</strong>：港大/港中文一般不接受，其他学校case by case<br>🇸🇬 <strong>新加坡</strong>：NUS/NTU通常不接受defer<br><br><strong>申请Defer的理由</strong><br>• 健康原因（需证明）<br>• 家庭原因<br>• 工作/实习机会<br>• 签证延迟<br><br><strong>注意</strong><br>• 不是所有学校都接受defer，要提前确认<br>•  defer后可能需要重新提交部分材料<br>•  defer期间gap year做什么很重要（实习/工作加分）<br><br>你想defer哪个学校？我帮你查政策！',
      followUp: []
    },
    // ========== 36. 专升本/自考 ==========
    {
      q: ['专升本', '自考', '成人教育', '函授', '专科', '大专', 'top-up'],
      a: '🎓 <strong>专科/自考/成人教育申请指南</strong><br><br><strong>申请途径</strong><br>• <strong>Top-up（专升本）</strong>：读1年拿英国本科学位，再申硕士<br>• <strong>硕士预科（Pre-Master）</strong>：读0.5-1年预科，再升硕士<br>• <strong>直接申请硕士</strong>：部分学校接受3年大专+工作经验<br><br><strong>推荐路径</strong><br>🇬🇧 <strong>英国</strong>：Top-up或硕士预科最成熟<br>• Top-up：1年拿英国本科学位（如考文垂、诺森比亚）<br>• 硕士预科：格拉斯哥、谢菲尔德、纽卡斯尔都有<br><br>🇦🇺 <strong>澳洲</strong>：部分学校接受专科直接申硕（需5年以上工作经验）<br><br><strong>申请要求</strong><br>• 均分75-80+<br>• 雅思6.0-6.5<br>• 部分需要工作经验（3-5年）<br><br>你是什么学历背景？有几年工作经验？我帮你规划路径！',
      followUp: []
    }
  ];

  // ===== 快捷入口按钮 =====
  const QUICK_ACTIONS = [
    { label: '选校定位', icon: '🎯', action: 'askBackground' },
    { label: '材料清单', icon: '📝', action: 'askMaterials' },
    { label: '费用预算', icon: '💰', action: 'askCost' },
    { label: '就业规划', icon: '💼', action: 'askCareer' }
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
          addBotMessage('我可以帮你解答 👇<br><br>🎯 <strong>选校定位</strong>：给冲刺/匹配/保底三档方案<br>📝 <strong>材料清单</strong>：完整申请材料+时间节点<br>💰 <strong>费用预算</strong>：各国费用+按预算推荐<br>💼 <strong>就业规划</strong>：考公/大厂/金融/落户<br><br>📚 还有：文书写作、签证办理、语言备考、面试准备、留位费选择、低GPA逆袭、跨专业申请、奖学金、春季入学、博士申请...<br><br>直接发背景，比如<strong>"985，85分，CS，雅思7，申香港"</strong>，我直接给方案！', [
            { label: '联系顾问', action: 'askContact' }
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
        addBotMessage('我来帮你做选校定位！请告诉我以下信息：<br><br>1️⃣ <strong>本科院校</strong>：985/211/双非/海本？<br>2️⃣ <strong>GPA/均分</strong>：百分制多少分？<br>3️⃣ <strong>本科专业</strong>：什么专业？<br>4️⃣ <strong>雅思/托福</strong>：考了吗？多少分？<br>5️⃣ <strong>目标地区</strong>：英国/澳洲/港新/新西兰？<br>6️⃣ <strong>目标专业</strong>：继续本专业还是跨专业？<br><br>如果你暂时不想提供具体信息，我也可以给你一个<strong>通用选校参考框架</strong>，你先看看大致能申到什么档次的学校。', [
          { label: '看通用选校框架', action: 'showGeneralFramework' },
          { label: '联系顾问详细评估', action: 'askContact' }
        ]);
        break;
      case 'showGeneralFramework':
        addBotMessage('📊 <strong>通用选校定位参考</strong><br><br>【985背景】<br>• 85+分：港三/新二/G5 + 王曼爱华保底<br>• 80-84分：港城/港理/英国QS50-100<br>• 75-79分：英国QS100-150/澳洲八大<br><br>【211背景】<br>• 85+分：港三/新二/王曼爱华<br>• 80-84分：港城/英国QS50-100<br>• 75-79分：英国QS100-150/澳洲八大<br><br>【双非背景】<br>• 88+分：港城/英国QS50-100<br>• 82-87分：英国QS100-150/澳洲八大<br>• 78-81分：英国QS150+/澳洲八大（非热门专业）<br><br>⚠️ 以上是大致参考，具体还要看专业竞争度、雅思分数、实习科研等因素。把你的具体背景发给我，我帮你精准定位！');
        break;
      case 'askCost':
        handleUserMessage('留学要花多少钱？');
        break;
      case 'askMaterials':
        handleUserMessage('我准备申请有什么资料清单');
        break;
      case 'askCareer':
        addBotMessage('💼 <strong>就业导向选校</strong><br><br>回国后的就业方向直接决定选校策略：<br><br>🏛️ <strong>考公考编</strong> → 优先保专业名称匹配<br>💻 <strong>进大厂</strong> → 优先保实习机会和学校排名<br>🏦 <strong>金融行业</strong> → 优先保target school + 证书<br>🏠 <strong>落户导向</strong> → 优先保QS排名<br><br>告诉我你回国想做什么，我帮你倒推选校！', [
          { label: '考公考编', action: 'showCareerPublic' },
          { label: '进大厂', action: 'showCareerTech' },
          { label: '金融', action: 'showCareerFinance' },
          { label: '咨询顾问', action: 'askContact' }
        ]);
        break;
      case 'showCases':
        handleUserMessage('我想看看案例');
        break;
      case 'showCareerPublic':
        handleUserMessage('我想考公务员');
        break;
      case 'showCareerTech':
        handleUserMessage('我想进互联网大厂');
        break;
      case 'showCareerFinance':
        handleUserMessage('我想进金融行业');
        break;
      case 'askContact':
        addBotMessage('你可以通过以下方式联系我们的专业顾问：<br><br>📧 邮箱：496680190@qq.com<br>💬 微信：xxr13365810586<br><br>我们的顾问会根据你的具体情况，给出个性化的选校方案和申请规划～', [
          { label: '添加微信咨询', url: 'javascript:openQr()' }
        ]);
        break;
      case 'showCountries':
        addBotMessage('我们覆盖的国家和学校档次：<br><br>🇬🇧 <strong>英国</strong>：QS前150主流院校<br>🇦🇺 <strong>澳洲</strong>：八大及其他QS前150院校<br>🇳🇿 <strong>新西兰</strong>：8所公立大学<br>🇭🇰 <strong>香港</strong>：港五院校<br>🇸🇬 <strong>新加坡</strong>：NUS/NTU<br><br>这些都是全球认可的高质量院校，需要了解具体申请要求吗？', [
          { label: '查看服务套餐', url: 'package.html' },
          { label: '联系顾问', action: 'askContact' }
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
        addBotMessage('英国硕士申请要求：<br>• <strong>G5</strong>：985/211，GPA 88+<br>• <strong>王曼爱华</strong>：985/211 GPA 82+，双非85+<br>• <strong>QS前100</strong>：均分75-80有机会<br>• <strong>雅思</strong>：6.5（单项6.0），可后补<br>• <strong>优势</strong>：1年学制，节省时间成本<br><br>你的均分和本科院校是？');
        break;
      case 'showAUInfo':
        addBotMessage('澳洲硕士申请要求：<br>• <strong>墨尔本大学</strong>：偏好985/211，均分80+<br>• <strong>悉尼/新南</strong>：211均分75+，双非80+<br>• <strong>八大</strong>：双非均分70-75也有机会<br>• <strong>雅思</strong>：6.5（单项6.0），接受PTE<br>• <strong>优势</strong>：工签2-3年，移民政策友好<br><br>想去哪所学校？');
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
      askContact: { label: '联系顾问', action: 'askContact' },
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
