const marqueeData = [{"from": "武汉理工 社会工作 GPA 3.9", "to": "NUS + UCL 社会学", "tag": "双非逆袭"}, {"from": "燕山大学 材料 GPA 72", "to": "帝国理工 + UCL", "tag": "低GPA录取"}, {"from": "中国农大 工业设计 GPA 2.9", "to": "南洋理工 材料科学", "tag": "转专业录取"}, {"from": "北服 设计 GPA 3.7", "to": "UCL + RCA + NTU", "tag": "艺术顶尖"}, {"from": "地大 GIS GPA 89", "to": "NUS AI for Science", "tag": "跨专业申AI"}, {"from": "海南大学 食品 GPA 85", "to": "NUS 食品 + HKU", "tag": "211冲前10"}, {"from": "澳门城市 旅游 GPA 3.8", "to": "HKU 气候治理", "tag": "双非冲港大"}, {"from": "广东科技学院 市场 GPA 84", "to": "岭南大学 市场", "tag": "二本录取"}];
const plansData = [{"name": "DIY服务（纯DIY）", "desc": "材料润色与答疑、申请流程指导", "price": "按项目计费", "services": ["简历润色 500/篇", "文书润色 1000/篇", "推荐信润色 400/篇", "DIY答疑 1888/年"]}, {"name": "半DIY服务", "desc": "材料撰写支持+策略指导+部分流程自主", "price": "全套3999元起", "services": ["简历代写 1000/篇", "文书代写 2000/篇", "推荐信代写 800/篇", "网申辅助 100/项目"]}, {"name": "全包服务", "desc": "全程代办+签证支持+流程管理", "price": "10000元/8项目起", "featured": true, "services": ["澳新申请 1000/3所", "英港新 10000/8项目", "15000/15项目", "超级混申 20000"]}];
const faqsData = [["如何选择服务模式？", "时间充足+自主能力强可选DIY；希望省时但保留自主可选半DIY；想全程省心建议全包。"], ["全包服务有保障吗？", "全包支持0 offer全额退款承诺，并提供透明流程与进度同步。"], ["服务响应时间？", "7×16小时顾问响应，确保申请问题及时解决。"], ["文书可以修改几次？", "全包和半DIY服务中文书支持无限次修改，直至满意。"], ["申请账号是否透明？", "全程使用学生本人邮箱和网申账号，进度实时可见。"]];
const testimonialsData = [{"name": "张同学", "title": "2023届学员", "text": "186位学员获QS前100录取。"}, {"name": "李同学", "title": "2024届学员", "text": "198位学员获QS前100录取。"}, {"name": "王同学", "title": "2025届学员", "text": "170位学员获QS前100录取。"}];
const topSchools = ["清华", "北大", "复旦", "上交", "浙大", "中科大", "南大", "人大", "同济", "北航", "武大", "哈工大", "西交", "华科", "中山", "北理", "东南", "南开", "川大", "山大", "厦大", "中南", "湖大", "大工", "吉大", "重大", "北师", "华东师范", "华南理工", "电子科大", "中国农大", "中央民族", "西北农林", "兰大", "海大", "东北大学", "湖南大学", "西北工业大学", "大连理工", "重庆大学", "西安交大", "华中科技大学", "华南理工", "北京理工", "北京师范"];

const schoolTierMap = {
  '北京大学': '985',
  '北大': '985',
  '清华大学': '985',
  '清华': '985',
  '复旦大学': '985',
  '复旦': '985',
  '上海交通大学': '985',
  '上海交大': '985',
  '上交': '985',
  '浙江大学': '985',
  '浙大': '985',
  '中国科学技术大学': '985',
  '中科大': '985',
  '中国科大': '985',
  '南京大学': '985',
  '南大': '985',
  '中国人民大学': '985',
  '人大': '985',
  '北京航空航天大学': '985',
  '北航': '985',
  '北京理工大学': '985',
  '北理工': '985',
  '北理': '985',
  '北京师范大学': '985',
  '北师大': '985',
  '中国农业大学': '985',
  '中农': '985',
  '中国农大': '985',
  '中央民族大学': '985',
  '中央民族': '985',
  '同济大学': '985',
  '华东师范大学': '985',
  '华东师范': '985',
  '华师大': '985',
  '南开大学': '985',
  '天津大学': '985',
  '天大': '985',
  '哈尔滨工业大学': '985',
  '哈工大': '985',
  '吉林大学': '985',
  '吉大': '985',
  '大连理工大学': '985',
  '大工': '985',
  '大连理工': '985',
  '东北大学': '985',
  '山东大学': '985',
  '山大': '985',
  '中国海洋大学': '985',
  '中国海大': '985',
  '西安交通大学': '985',
  '西安交大': '985',
  '西交': '985',
  '西北工业大学': '985',
  '西工大': '985',
  '西北工业': '985',
  '西北农林科技大学': '985',
  '西北农林': '985',
  '西农': '985',
  '武汉大学': '985',
  '武大': '985',
  '华中科技大学': '985',
  '华科': '985',
  '华中科大': '985',
  '中南大学': '985',
  '湖南大学': '985',
  '湖大': '985',
  '国防科技大学': '985',
  '国防科大': '985',
  '中山大学': '985',
  '中大': '985',
  '华南理工大学': '985',
  '华工': '985',
  '华南理工': '985',
  '四川大学': '985',
  '川大': '985',
  '电子科技大学': '985',
  '电子科大': '985',
  '成电': '985',
  '重庆大学': '985',
  '重大': '985',
  '厦门大学': '985',
  '厦大': '985',
  '兰州大学': '985',
  '兰大': '985',
  '东南大学': '985',
  '东大': '985',
  '北京交通大学': '211',
  '北交大': '211',
  '北京工业大学': '211',
  '北工大': '211',
  '北京科技大学': '211',
  '北科大': '211',
  '北京化工大学': '211',
  '北化工': '211',
  '北京邮电大学': '211',
  '北邮': '211',
  '北京林业大学': '211',
  '北林': '211',
  '北京中医药大学': '211',
  '北中医': '211',
  '北京外国语大学': '211',
  '北外': '211',
  '中国传媒大学': '211',
  '中传': '211',
  '中央财经大学': '211',
  '中财': '211',
  '央财': '211',
  '对外经济贸易大学': '211',
  '对外经贸': '211',
  '贸大': '211',
  '中国政法大学': '211',
  '法大': '211',
  '华北电力大学': '211',
  '华电': '211',
  '中国矿业大学（北京）': '211',
  '中国矿业大学北京': '211',
  '矿大北京': '211',
  '中国石油大学（北京）': '211',
  '中国石油大学北京': '211',
  '中石大北京': '211',
  '中国地质大学（北京）': '211',
  '中国地质大学北京': '211',
  '地大北京': '211',
  '北京体育大学': '211',
  '北体': '211',
  '中央音乐学院': '211',
  '央音': '211',
  '上海财经大学': '211',
  '上财': '211',
  '上海外国语大学': '211',
  '上外': '211',
  '华东理工大学': '211',
  '华理': '211',
  '东华大学': '211',
  '上海大学': '211',
  '上大': '211',
  '海军军医大学': '211',
  '第二军医大学': '211',
  '南京航空航天大学': '211',
  '南航': '211',
  '南京理工大学': '211',
  '南理工': '211',
  '河海大学': '211',
  '江南大学': '211',
  '中国矿业大学': '211',
  '矿大': '211',
  '南京农业大学': '211',
  '南农': '211',
  '中国药科大学': '211',
  '药大': '211',
  '南京师范大学': '211',
  '南师大': '211',
  '苏州大学': '211',
  '苏大': '211',
  '福州大学': '211',
  '福大': '211',
  '安徽大学': '211',
  '安大': '211',
  '合肥工业大学': '211',
  '合工大': '211',
  '南昌大学': '211',
  '昌大': '211',
  '郑州大学': '211',
  '郑大': '211',
  '武汉理工大学': '211',
  '武理工': '211',
  '武汉理工': '211',
  '中国地质大学（武汉）': '211',
  '中国地质大学武汉': '211',
  '地大武汉': '211',
  '中国地质大学': '211',
  '地大': '211',
  '华中农业大学': '211',
  '华农': '211',
  '华中师范大学': '211',
  '华师': '211',
  '中南财经政法大学': '211',
  '中南财大': '211',
  '湖南师范大学': '211',
  '湖南师大': '211',
  '暨南大学': '211',
  '暨大': '211',
  '华南师范大学': '211',
  '华南师大': '211',
  '广西大学': '211',
  '西大': '211',
  '海南大学': '211',
  '西南交通大学': '211',
  '西南交大': '211',
  '西南财经大学': '211',
  '西南财大': '211',
  '西财': '211',
  '四川农业大学': '211',
  '川农': '211',
  '贵州大学': '211',
  '贵大': '211',
  '云南大学': '211',
  '云大': '211',
  '西藏大学': '211',
  '藏大': '211',
  '西北大学': '211',
  '西安电子科技大学': '211',
  '西电': '211',
  '长安大学': '211',
  '陕西师范大学': '211',
  '陕师大': '211',
  '空军军医大学': '211',
  '第四军医大学': '211',
  '青海大学': '211',
  '宁夏大学': '211',
  '宁大': '211',
  '新疆大学': '211',
  '新大': '211',
  '石河子大学': '211',
  '中国石油大学（华东）': '211',
  '中国石油大学华东': '211',
  '中石大华东': '211',
  '哈尔滨工程大学': '211',
  '哈工程': '211',
  '东北林业大学': '211',
  '东北林大': '211',
  '东北农业大学': '211',
  '东北农大': '211',
  '辽宁大学': '211',
  '辽大': '211',
  '大连海事大学': '211',
  '延边大学': '211',
  '东北师范大学': '211',
  '东北师大': '211',
  '内蒙古大学': '211',
  '内大': '211',
  '河北工业大学': '211',
  '河工大': '211',
  '太原理工大学': '211',
  '太原理工': '211',
  '天津医科大学': '211',
  '北京协和医学院': '211',
  '协和': '211',
  '厦门大学马来西亚分校': '海外本科',
  '澳门城市大学': '海外本科',
  '澳门城市': '海外本科',
  'PSB Academy': '海外本科',
  '西交利物浦大学': '海外本科',
  '西交利物浦': '海外本科',
  '阿姆斯特丹大学': '海外本科',
  '宁波诺丁汉大学': '海外本科',
  '宁波诺丁汉': '海外本科',
  '上海纽约大学': '海外本科',
  '昆山杜克大学': '海外本科',
  '广东以色列理工学院': '海外本科',
  '温州肯恩大学': '海外本科',
  '深圳北理莫斯科大学': '海外本科',
  '香港中文大学': '海外本科',
  '港中文': '海外本科',
  '香港大学': '海外本科',
  '港大': '海外本科',
  '香港科技大学': '海外本科',
  '港科大': '海外本科',
  '香港城市大学': '海外本科',
  '港城大': '海外本科',
  '香港理工大学': '海外本科',
  '港理工': '海外本科',
  '香港浸会大学': '海外本科',
  '浸会': '海外本科',
  '香港岭南大学': '海外本科',
  '岭南': '海外本科',
  '香港教育大学': '海外本科',
  '教大': '海外本科',
  '香港演艺学院': '海外本科',
  '澳门科技大学': '海外本科',
  '澳科大': '海外本科',
  '澳门大学': '海外本科',
  '澳大': '海外本科',
};

const majorGroups = {
  '计算机软件': ['计算机', '软件', '信息', '人工智能', 'AI', '数据科学', '大数据', '网络安全', '物联网', '自动化', '智能科学', '计算', '区块链', '机器人'],
  '电子信息': ['电子', '通信', '微电子', '集成电路', '半导体', '光电', '电气', '信号', '电路', '控制', '电信'],
  '金融经济': ['金融', '经济', '会计', '财务', '投资', '保险', '税务', '审计', '财政', '国贸', '商务', '银行', '证券', '贸易'],
  '管理商科': ['管理', '工商', '行政', '人力', '市场', '营销', '物流', '供应链', '项目', '运营', '战略', '创业', 'MBA', '公共管理'],
  '文科语言': ['语言', '文学', '历史', '哲学', '社会', '政治', '法律', '法学', '教育', '心理', '翻译', '英语', '日语', '汉语言', '传媒', '新闻', '广告', '播音', '主持', '公关', '媒体', '传播'],
  '艺术设计': ['设计', '艺术', '美术', '动画', '建筑', '规划', '园林', '服装', '视觉', '产品', '环境设计', '数媒', '交互', '游戏', 'VR', '策展', '表演'],
  '机械材料': ['机械', '车辆', '汽车', '航空', '航天', '船舶', '材料', '工业', '制造', '能源', '动力', '土木', '水利', '交通', '地质', '测绘', '采矿', '石油', '海洋', '地理', 'GIS', '遥感'],
  '生物医药': ['生物', '生化', '医药', '药学', '医学', '农学', '食品', '环境', '化学', '化工', '材料科学', '生命科学', '生物医学', '生物技术', '智慧农业'],
  '数学统计': ['数学', '统计', '应用数学', '计算科学', '运筹', '概率'],
  '物理光电': ['物理', '光电', '天体', '核科学', '力学']
};

let allCases = [];
let currentPage = 1;
const pageSize = 9;
let filteredItems = [];
let activeQuickFilter = 'all';
let activeTierFilter = 'all';

function $(id) { return document.getElementById(id); }
function on(el, evt, fn) { el && el.addEventListener(evt, fn); }

function getSchoolTier(name) {
  if (!name) return '双非';
  // 1. 精确匹配
  if (schoolTierMap[name]) return schoolTierMap[name];
  // 2. 安全模糊匹配：映射键长度>=4，且映射键被包含在学校名中
  // 这样 "西南大学" 不会匹配 "南大"，因为 "南大" 不在 "西南大学" 中
  for (const [key, tier] of Object.entries(schoolTierMap)) {
    if (key.length >= 4 && name.includes(key)) return tier;
  }
  // 3. 海外本科关键词
  const s = name.toLowerCase();
  if (s.includes('澳门') || s.includes('香港') || s.includes('academy') || 
      s.includes('利物浦') || s.includes('诺丁汉') || s.includes('纽约') || 
      s.includes('杜克') || s.includes('以色列') || s.includes('莫斯科') ||
      s.includes('阿姆斯特丹') || s.includes('university') || s.includes('college') ||
      s.includes('本科') || s.includes('海本') || s.includes('美本')) {
    return '海外本科';
  }
  return '双非';
}
function tierClass(tier) {
  const map = { '985': '985', '211': '211', '双非': 'shuangfei', '海外本科': 'overseas', '独立学院': 'shuangfei', '双一流': 'shuangfei' };
  return map[tier] || 'shuangfei';
}

function tierValue(tier) {
  return { '985': 4, '211': 3, '海外本科': 2, '双非': 1 }[tier] || 1;
}

function parseGpa(gpaStr) {
  if (!gpaStr || gpaStr === '未填写') return NaN;
  const match = String(gpaStr).match(/[\d.]+/);
  if (!match) return NaN;
  let val = parseFloat(match[0]);
  if (isNaN(val)) return NaN;
  if (String(gpaStr).includes('/')) {
    const parts = String(gpaStr).split('/');
    if (parts.length >= 2) {
      const denom = parseFloat(parts[1]);
      if (denom === 4) return Math.round(val / 4 * 100);
      if (denom === 5) return Math.round(val / 5 * 100);
      if (denom > 10) return Math.round(val);
    }
  }
  if (val > 10) return Math.round(val);
  if (val <= 4.3 && val >= 0) return Math.round(val / 4 * 100);
  if (val <= 5.5 && val > 4.3) return Math.round(val / 5 * 100);
  if (val <= 10 && val > 5.5) return Math.round(val / 10 * 100);
  return Math.round(val);
}

function isRelatedMajor(a, b) {
  if (!a || !b) return false;
  const aLower = a.toLowerCase();
  const bLower = b.toLowerCase();
  for (const keywords of Object.values(majorGroups)) {
    const aMatch = keywords.some(k => aLower.includes(k));
    const bMatch = keywords.some(k => bLower.includes(k));
    if (aMatch && bMatch) return true;
  }
  return false;
}

function parseRegions(countryStr) {
  if (!countryStr || countryStr === '未分类') return [];
  const str = countryStr.toLowerCase();
  const regions = [];
  if (str.includes('香港')) regions.push('香港');
  if (str.includes('澳门')) regions.push('澳门');
  if (str.includes('新加坡')) regions.push('新加坡');
  if (str.includes('英国')) regions.push('英国');
  if (str.includes('新西兰')) regions.push('新西兰');
  if (str.includes('澳大利亚') || str.includes('澳洲')) regions.push('澳大利亚');
  if (str.includes('国内')) regions.push('国内中外合办');
  return regions;
}

async function loadCases() {
  try {
    const res = await fetch('cases.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const casesData = await res.json();
    allCases = casesData.map((item, idx) => normalizeCase(item, idx));
    initFilters();
    renderCases();
  } catch (err) {
    console.error(err);
    $('casesGrid').innerHTML = `<div class="no-results" style="display:block;">✗ 案例加载失败：${err.message}<br>请确保 cases.json 文件存在且格式正确</div>`;
  }
}

function initFilters() {
  const degrees = [...new Set(allCases.map(c => c.degree))].sort();
  const results = [...new Set(allCases.map(c => c.result))].sort();
  const standardRegions = ['香港', '澳门', '新加坡', '英国', '新西兰', '澳大利亚', '国内中外合办'];
  
  standardRegions.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    $('countryFilter').appendChild(opt);
  });
  degrees.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    $('degreeFilter').appendChild(opt);
  });
  results.forEach(r => {
    const opt = document.createElement('option');
    opt.value = r;
    opt.textContent = r;
    $('resultFilter').appendChild(opt);
  });
}

function updateCountdown() {
  const now = new Date();
  const target = new Date('2025-11-01T00:00:00');
  const diff = target - now;
  if (diff > 0) {
    const days = Math.ceil(diff / 86400000);
    $('countdownText').textContent = `距离NUS截止还有 ${days} 天`;
    $('countdownBar').classList.add('show');
  }
}
updateCountdown();

function renderMarquee() {
  const track = $('marqueeTrack');
  const cards = marqueeData.map(m => `
    <div class="marquee-card">
      <div class="marquee-from">${m.from}</div>
      <div class="marquee-arrow">→</div>
      <div class="marquee-to">${m.to}</div>
      <span class="marquee-tag">${m.tag}</span>
    </div>
  `).join('');
  track.innerHTML = cards + cards;
}

function showPlanView(view) {
  document.querySelectorAll('.plan-toggle-btn').forEach(b => b.classList.toggle('active',
    (view === 'cards' && b.textContent.includes('卡片')) || (view === 'table' && b.textContent.includes('对比'))
  ));
  $('planCards').style.display = view === 'cards' ? 'grid' : 'none';
  $('compareTable').classList.toggle('active', view === 'table');
}

function renderPlans() {
  const wrap = $('planCards');
  plansData.forEach(p => {
    const card = document.createElement('article');
    card.className = 'plan-card' + (p.featured ? ' featured' : '');
    card.innerHTML = (p.featured ? '<span class="plan-badge">推荐</span>' : '') +
      `<div class="plan-name">${p.name}</div>` +
      `<div class="plan-desc">${p.desc}</div>` +
      `<div class="plan-price">${p.price}</div>` +
      `<ul class="plan-list">${p.services.map(s => `<li>${s}</li>`).join('')}</ul>`;
    wrap.appendChild(card);
  });
}

function renderFAQ() {
  const list = $('faqList');
  faqsData.forEach(([q, a]) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `<button class="accordion-btn">${q}</button><div class="accordion-panel">${a}</div>`;
    on(item.querySelector('button'), 'click', () => item.classList.toggle('open'));
    list.appendChild(item);
  });
}

function renderTestimonials() {
  const box = $('testimonials');
  testimonialsData.forEach(t => {
    const card = document.createElement('article');
    card.className = 'testimonial-card';
    card.innerHTML = `
      <div class="testimonial-avatar">${t.name[0]}</div>
      <h3>${t.title}</h3>
      <p>${t.text}</p>
    `;
    box.appendChild(card);
  });
}

function normalizeCase(item, idx) {
  const offers = Array.isArray(item.offers) && item.offers.length
    ? item.offers
    : [{ school: item.school || '待更新', major: item.major || '待更新', rank: item.result || '普通录取' }];
  const studentSchool = item.student_school;
  // cases.json中已包含正确的tier字段，直接使用
  const tier = item.tier || getSchoolTier(studentSchool);
  return {
    id: item.id || idx + 1,
    title: item.title || `${item.country || '地区'}${item.degree || '项目'}`,
    student_school: studentSchool,
    student_major: item.student_major || item.major || '专业未填写',
    gpa: item.gpa || '未填写',
    language_score: item.language_score || '未填写',
    country: item.country || '未分类',
    degree: item.degree || '未分类',
    result: item.result || (offers[0]?.rank) || '普通录取',
    offers: offers,
    tier: tier,
    entry_year: item.entry_year
  };
}

const quickFilters = {
  all: () => true,
  shuangfei: c => c.tier === '双非',
  lowgpa: c => {
    const gpa = parseGpa(c.gpa);
    return !isNaN(gpa) && gpa < 80;
  },
  transfer: c => c.offers.length > 0 && c.student_major !== c.offers[0].major && c.offers[0].major !== '待更新',
  top10: c => c.result.includes('前10') || c.offers.some(o => o.rank.includes('前10'))
};

document.querySelectorAll('.quick-tag').forEach(tag => {
  on(tag, 'click', () => {
    document.querySelectorAll('.quick-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    activeQuickFilter = tag.dataset.filter;
    currentPage = 1;
    renderCases();
  });
});

document.querySelectorAll('.tier-tag').forEach(tag => {
  on(tag, 'click', () => {
    document.querySelectorAll('.tier-tag').forEach(t => t.classList.remove('active'));
    tag.classList.add('active');
    activeTierFilter = tag.dataset.tier;
    currentPage = 1;
    renderCases();
  });
});

function getFiltered() {
  const kw = $('searchInput').value.trim().toLowerCase();
  const c = $('countryFilter').value;
  const d = $('degreeFilter').value;
  const r = $('resultFilter').value;
  return allCases.filter(item => {
    const offerText = item.offers.map(o => `${o.school} ${o.major} ${o.rank}`).join(' ');
    const source = `${item.title} ${item.student_school} ${item.student_major} ${item.gpa} ${item.language_score} ${offerText}`.toLowerCase();
    return quickFilters[activeQuickFilter](item) &&
      (activeTierFilter === 'all' || item.tier === activeTierFilter) &&
      (!c || item.country.includes(c)) &&
      (!d || item.degree === d) &&
      (!r || item.result === r) &&
      (!kw || source.includes(kw));
  });
}

/* ========== 修改：移除人均Offer统计 ========== */
function renderStats(items) {
  const top10 = items.filter(c => c.result.includes('前10')).length;
  const top50 = items.filter(c => c.result.includes('前50')).length;
  $('statsBar').innerHTML = `
    <div class="stat-pill"><div class="stat-number">${items.length}</div><div class="stat-label">筛选后案例</div></div>
    <div class="stat-pill"><div class="stat-number">${top10}</div><div class="stat-label">QS前10录取</div></div>
    <div class="stat-pill"><div class="stat-number">${top50}</div><div class="stat-label">QS前50录取</div></div>
  `;
}

function renderCharts(items) {
  const cc = {};
  items.forEach(c => {
    const regions = parseRegions(c.country);
    regions.forEach(r => { cc[r] = (cc[r] || 0) + 1; });
  });
  const cs = Object.entries(cc).sort((a, b) => b[1] - a[1]);
  const cm = Math.max(...cs.map(([, n]) => n), 1);
  $('countryChart').innerHTML = cs.map(([k, v]) => `
    <div class="bar-row"><div class="bar-label">${k}</div><div class="bar-track"><div class="bar-fill" style="width:${(v / cm) * 100}%"><span class="bar-value">${v}</span></div></div></div>
  `).join('') || '<div style="color:var(--color-text-secondary);text-align:center;padding:20px;">暂无数据</div>';

  const rc = {};
  items.forEach(c => { rc[c.result] = (rc[c.result] || 0) + 1; });
  const rs = Object.entries(rc).sort((a, b) => b[1] - a[1]);
  const rm = Math.max(...rs.map(([, n]) => n), 1);
  $('resultChart').innerHTML = rs.map(([k, v]) => `
    <div class="bar-row"><div class="bar-label">${k}</div><div class="bar-track"><div class="bar-fill" style="width:${(v / rm) * 100}%"><span class="bar-value">${v}</span></div></div></div>
  `).join('') || '<div style="color:var(--color-text-secondary);text-align:center;padding:20px;">暂无数据</div>';

  const sc = {};
  items.forEach(c => c.offers.forEach(o => { sc[o.school] = (sc[o.school] || 0) + 1; }));
  const ss = Object.entries(sc).sort((a, b) => b[1] - a[1]).slice(0, 8);
  const sm = Math.max(...ss.map(([, n]) => n), 1);
  $('schoolChart').innerHTML = ss.map(([k, v], i) => `
    <div class="bar-row"><div class="bar-label">${i + 1}. ${k.length > 8 ? k.slice(0, 8) + '..' : k}</div><div class="bar-track"><div class="bar-fill" style="width:${(v / sm) * 100}%"><span class="bar-value">${v}</span></div></div></div>
  `).join('') || '<div style="color:var(--color-text-secondary);text-align:center;padding:20px;">暂无数据</div>';
}

/* ========== 修改：移除案例卡片上的 "N 个Offer" 标识 ========== */
function renderCaseCard(item) {
  const yearTag = item.entry_year ? `<span class="pill" style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;">${String(item.entry_year).slice(-2)}年入学</span>` : '';
  return `
    <div class="case-card" onclick="openCaseModal(${item.id})">
      <div class="case-header">
        <div class="case-title">${item.student_school ? `案例 #${item.id} · ${item.student_school}` : `案例 #${item.id}`}</div>
        <span class="pill pill-tier-${tierClass(item.tier)}">${item.tier}</span>
      </div>
      <div class="case-pills">
        ${yearTag}
        <span class="pill">${item.country}</span>
        <span class="pill">${item.degree}</span>
        <span class="pill">${item.result}</span>
      </div>
      <div class="case-meta">
        <div class="meta-item"><div class="meta-label">学生专业</div><div class="meta-value">${item.student_major}</div></div>
        <div class="meta-item"><div class="meta-label">GPA/均分</div><div class="meta-value">${item.gpa}</div></div>
        <div class="meta-item"><div class="meta-label">语言成绩</div><div class="meta-value">${item.language_score}</div></div>
        <div class="meta-item"><div class="meta-label">申请地区</div><div class="meta-value">${item.country}</div></div>
      </div>
      <div class="offer-section">
        <div class="offer-title">🎓 录取详情（点击查看更多）</div>
        <div class="offer-list">
          ${item.offers.slice(0, 2).map(o => `
            <div class="offer-item">
              <span class="offer-school">${o.school}</span>
              ${o.major && o.major !== '待更新' ? `<span class="offer-major">${o.major}</span>` : '<span class="offer-major"></span>'}
              <span class="offer-rank">${o.rank}</span>
            </div>
          `).join('')}
          ${item.offers.length > 2 ? `<div class="offer-more">+${item.offers.length - 2} 个更多Offer</div>` : ''}
        </div>
      </div>
    </div>
  `;
}

function openCaseModal(id) {
  const item = allCases.find(c => c.id === id);
  if (!item) return;
  $('modalTitle').textContent = item.student_school ? `案例 #${item.id} · ${item.student_school}` : `案例 #${item.id}`;
  $('modalPills').innerHTML = `<span class="pill pill-tier-${tierClass(item.tier)}">${item.tier}</span><span class="pill">${item.country}</span><span class="pill">${item.degree}</span><span class="pill">${item.result}</span>`;
  $('modalMeta').innerHTML = `
    <div class="detail-meta-block"><label>本科院校</label><value>${item.student_school || item.tier + '院校'}</value></div>
    <div class="detail-meta-block"><label>学生专业</label><value>${item.student_major}</value></div>
    <div class="detail-meta-block"><label>GPA / 均分</label><value>${item.gpa}</value></div>
    <div class="detail-meta-block"><label>语言成绩</label><value>${item.language_score}</value></div>
  `;
  $('modalOffers').innerHTML = item.offers.map(o => `
    <div class="detail-offer-item">
      <div>
        <div class="detail-offer-school">${o.school}</div>
        ${o.major && o.major !== '待更新' ? `<div class="detail-offer-major">${o.major}</div>` : ''}
      </div>
      <div class="detail-offer-rank">${o.rank}</div>
    </div>
  `).join('');
  $('caseModal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeCaseModal() {
  $('caseModal').classList.remove('show');
  document.body.style.overflow = '';
}

on($('caseModal'), 'click', e => { if (e.target === $('caseModal')) closeCaseModal(); });

function renderPagination() {
  const total = filteredItems.length;
  const pages = Math.ceil(total / pageSize);
  const pag = $('pagination');
  if (pages <= 1) { pag.innerHTML = ''; return; }

  let html = `<button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goPage(${currentPage - 1})">上一页</button>`;

  const maxV = 5;
  let sp = Math.max(1, currentPage - Math.floor(maxV / 2));
  let ep = Math.min(pages, sp + maxV - 1);
  if (ep - sp < maxV - 1) sp = Math.max(1, ep - maxV + 1);

  if (sp > 1) { html += `<button class="page-btn" onclick="goPage(1)">1</button>`; if (sp > 2) html += `<span class="page-info">...</span>`; }
  for (let i = sp; i <= ep; i++) html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
  if (ep < pages) { if (ep < pages - 1) html += `<span class="page-info">...</span>`; html += `<button class="page-btn" onclick="goPage(${pages})">${pages}</button>`; }

  html += `<button class="page-btn" ${currentPage === pages ? 'disabled' : ''} onclick="goPage(${currentPage + 1})">下一页</button>`;
  html += `<span class="page-info">共 ${total} 条</span>`;
  pag.innerHTML = html;
}

function goPage(page) {
  const pages = Math.ceil(filteredItems.length / pageSize);
  if (page < 1 || page > pages) return;
  currentPage = page;
  renderCasesPage();
  $('casesGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderCasesPage() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const items = filteredItems.slice(start, end);
  const grid = $('casesGrid');
  const noRes = $('noResults');

  if (items.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    $('dataSourceTip').textContent = '';
  } else {
    grid.innerHTML = items.map(renderCaseCard).join('');
    noRes.style.display = 'none';
    $('dataSourceTip').textContent = `共 ${filteredItems.length} 条案例，当前第 ${currentPage}/${Math.ceil(filteredItems.length / pageSize)} 页，显示 ${start + 1}-${Math.min(end, filteredItems.length)} 条`;
  }
  renderPagination();
}

function renderCases() {
  filteredItems = getFiltered();
  currentPage = 1;
  renderStats(filteredItems);
  renderCharts(filteredItems);
  renderCasesPage();
}

function calculateMatchScore(user, caseItem) {
  let score = 0;
  const reasons = [];
  const caseTierVal = tierValue(caseItem.tier);
  const userTierVal = tierValue(user.tier);
  const tierDiff = caseTierVal - userTierVal;
  
  if (tierDiff === 0) {
    score += 40;
    reasons.push('同档次院校');
  } else if (Math.abs(tierDiff) === 1) {
    score += 20;
    reasons.push(tierDiff > 0 ? '高一档院校' : '低一档院校');
  }
  
  const userGpa = parseGpa(user.gpa);
  const caseGpa = parseGpa(caseItem.gpa);
  if (!isNaN(userGpa) && !isNaN(caseGpa)) {
    const diff = Math.abs(caseGpa - userGpa);
    if (diff <= 2) { score += 30; reasons.push('GPA高度匹配'); }
    else if (diff <= 5) { score += 20; reasons.push('GPA接近'); }
    else if (diff <= 10) { score += 10; reasons.push('GPA区间相似'); }
  }
  
  if (user.major && caseItem.student_major) {
    const u = user.major.toLowerCase();
    const c = caseItem.student_major.toLowerCase();
    if (u === c || c.includes(u) || u.includes(c)) {
      score += 20;
      reasons.push('同专业');
    } else if (isRelatedMajor(u, c)) {
      score += 10;
      reasons.push('相关专业');
    }
  }
  
  if (user.target && caseItem.country.includes(user.target)) {
    score += 10;
    reasons.push('目标地区匹配');
  }
  
  return { score, reasons, tierDiff, gpaDiff: caseGpa - userGpa };
}

function runEval() {
  const school = $('evalSchool').value.trim();
  const gpaInput = $('evalGpa').value.trim();
  const major = $('evalMajor').value.trim();
  const target = $('evalTarget').value;
  
  if (!school || !gpaInput) {
    alert('请至少填写本科院校和GPA');
    return;
  }
  
  const user = {
    tier: getSchoolTier(school),
    gpa: gpaInput,
    major: major,
    target: target
  };
  
  const scored = allCases.map(c => {
    const { score, reasons, tierDiff, gpaDiff } = calculateMatchScore(user, c);
    return { case: c, score, reasons, tierDiff, gpaDiff };
  }).filter(m => m.score >= 30)
    .sort((a, b) => b.score - a.score);
  
  const 冲刺 = [];
  const 匹配 = [];
  const 保底 = [];
  const userGpa = parseGpa(user.gpa);
  
  scored.forEach(m => {
    const caseGpa = parseGpa(m.case.gpa);
    const caseTierVal = tierValue(m.case.tier);
    const userTierVal = tierValue(user.tier);
    
    if (caseTierVal > userTierVal) {
      冲刺.push(m);
    } else if (caseTierVal < userTierVal) {
      保底.push(m);
    } else {
      if (!isNaN(caseGpa) && !isNaN(userGpa)) {
        if (caseGpa > userGpa + 3) 冲刺.push(m);
        else if (caseGpa < userGpa - 5) 保底.push(m);
        else 匹配.push(m);
      } else {
        匹配.push(m);
      }
    }
  });
  
  renderEvalResult({ 冲刺, 匹配, 保底, user });
}

function renderEvalResult(result) {
  const { 冲刺, 匹配, 保底, user } = result;
  
  let html = `<div style="text-align:center;margin-bottom:var(--space-6);">
    <h3 style="font-size:var(--text-xl);margin-bottom:var(--space-2);">评估结果：${user.tier} · GPA ${user.gpa}</h3>
    <p style="color:var(--color-text-secondary);font-size:var(--text-sm);">
      基于 ${allCases.length} 个真实案例匹配，以下是为你生成的三档选校建议
    </p>
  </div>`;
  
  if (冲刺.length > 0) {
    html += `
      <div class="eval-category eval-reach">
        <div class="eval-category-title">🚀 冲刺档（Reach）</div>
        <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">
          背景优于你的相似案例录取了这些院校，你可以尝试冲刺
        </p>
        <div class="eval-grid">${冲刺.slice(0, 3).map(m => renderEvalCaseCard(m)).join('')}</div>
      </div>
    `;
  }
  
  if (匹配.length > 0) {
    html += `
      <div class="eval-category eval-match">
        <div class="eval-category-title">✅ 匹配档（Match）</div>
        <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">
          与你背景高度相似的案例，这些院校录取概率较高
        </p>
        <div class="eval-grid">${匹配.slice(0, 3).map(m => renderEvalCaseCard(m)).join('')}</div>
      </div>
    `;
  }
  
  if (保底.length > 0) {
    html += `
      <div class="eval-category eval-safe">
        <div class="eval-category-title">🛡️ 保底档（Safe）</div>
        <p style="font-size:var(--text-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">
          背景稍弱也能录取的院校，确保你有学可上
        </p>
        <div class="eval-grid">${保底.slice(0, 3).map(m => renderEvalCaseCard(m)).join('')}</div>
      </div>
    `;
  }
  
  if (冲刺.length === 0 && 匹配.length === 0 && 保底.length === 0) {
    html += `
      <div class="eval-empty">
        <div style="font-size:var(--text-3xl);margin-bottom:var(--space-3);">🔍</div>
        <p>未找到完全匹配的案例，你的背景比较特殊</p>
        <p style="font-size:var(--text-sm);margin-top:var(--space-2);">建议添加微信获取一对一评估</p>
        <button class="btn btn-primary" onclick="openQr()" style="margin-top:var(--space-4);">添加微信咨询</button>
      </div>
    `;
  } else {
    html += `
      <div style="text-align:center;margin-top:var(--space-8);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
        <p style="color:var(--color-text-secondary);font-size:var(--text-sm);margin-bottom:var(--space-4);">
          想获取更精准的选校定位和文书策略？
        </p>
        <button class="btn btn-primary" onclick="openQr()">添加微信，获取专属方案</button>
      </div>
    `;
  }
  
  $('evalResult').innerHTML = html;
  $('evalResult').classList.add('show');
  $('evalResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderEvalCaseCard(m) {
  const c = m.case;
  return `
    <div class="eval-case-card" onclick="openCaseModal(${c.id})">
      <div class="eval-case-header">
        <span class="eval-case-school">${c.student_school}</span>
        <span class="pill pill-tier-${tierClass(c.tier)}">${c.tier}</span>
      </div>
      <div class="eval-case-meta">${c.student_major} · GPA ${c.gpa}</div>
      <div class="eval-case-offers">
        ${c.offers.slice(0, 2).map(o => `
          <div class="eval-offer-item">
            <div>
              <span style="font-weight:600;">${o.school}</span>
              ${o.major && o.major !== '待更新' ? `<span style="font-size:11px;color:var(--color-text-secondary);display:block;margin-top:2px;">${o.major}</span>` : ''}
            </div>
            <span style="color:var(--color-accent);font-weight:700;">${o.rank}</span>
          </div>
        `).join('')}
      </div>
      <div class="eval-match-score">匹配度 ${m.score} 分：${m.reasons.join(' · ')}</div>
    </div>
  `;
}

on($('evalSchool'), 'input', () => {
  const val = $('evalSchool').value.trim();
  const tag = $('evalTierTag');
  if (val.length >= 2) {
    const tier = getSchoolTier(val);
    tag.textContent = '识别为：' + tier;
    tag.style.display = 'inline-block';
    tag.className = 'eval-tier-tag pill-tier-' + tierClass(tier);
  } else {
    tag.style.display = 'none';
  }
});

function openQr() { $('qrModal').classList.add('show'); }
function closeQr() { $('qrModal').classList.remove('show'); }

on($('qrClose'), 'click', closeQr);
on($('qrModal'), 'click', e => { if (e.target === $('qrModal')) closeQr(); });
on($('consultBtnHero'), 'click', openQr);
on($('consultBtnFooter'), 'click', openQr);

on($('searchInput'), 'input', () => { currentPage = 1; renderCases(); });
on($('countryFilter'), 'change', () => { currentPage = 1; renderCases(); });
on($('degreeFilter'), 'change', () => { currentPage = 1; renderCases(); });
on($('resultFilter'), 'change', () => { currentPage = 1; renderCases(); });

function setupUI() {
  const header = $('topHeader');
  const toTop = $('toTop');

  on(window, 'scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 400);
  });

  on(toTop, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  on($('themeToggle'), 'click', () => document.body.classList.toggle('dark'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Init
renderMarquee();
renderPlans();
renderFAQ();
renderTestimonials();
setupUI();
loadCases();