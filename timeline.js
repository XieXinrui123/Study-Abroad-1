(() => {
  'use strict';

  const regionNames = {
    uk: '英国',
    hk: '香港',
    sg: '新加坡',
    au: '澳洲'
  };

  const phaseMap = {
    uk: [
      { title: '准备阶段（申请前12–18个月）', items: ['确定目标院校与专业方向', '准备语言考试（雅思、托福或 PTE）', '联系推荐人', '开始收集文书素材'] },
      { title: '申请阶段（申请前6–12个月）', items: ['完成个人陈述与简历', '准备推荐信和学术材料', '分批递交滚动录取项目', '准备可能的面试'] },
      { title: '录取阶段（申请后2–6个月）', items: ['比较并确认 Offer', '缴纳押金', '满足语言或学术条件', '申请 CAS'] },
      { title: '签证与行前（入学前1–3个月）', items: ['办理学生签证', '预订住宿与机票', '准备入境材料', '参加行前说明会'] }
    ],
    hk: [
      { title: '准备阶段（申请前12个月）', items: ['确定目标院校与专业', '准备语言考试', '按专业要求准备 GMAT 或 GRE', '积累实习、科研或项目经历'] },
      { title: '申请阶段（9月–次年3月）', items: ['按轮次安排申请顺序', '完成文书与材料', '递交网申', '准备专业面试'] },
      { title: '录取阶段（11月–次年5月）', items: ['比较并确认 Offer', '缴纳留位费', '准备学生签证材料', '安排住宿'] },
      { title: '签证与行前（入学前1–2个月）', items: ['领取签证标签或电子签证', '预订交通', '准备注册材料', '参加新生 Orientation'] }
    ],
    sg: [
      { title: '准备阶段（申请前12–18个月）', items: ['确定 NUS、NTU、SMU 等目标项目', '准备语言成绩', '按项目要求准备 GRE 或 GMAT', '整理文书素材'] },
      { title: '申请阶段（10月–次年3月）', items: ['确认各项目开放和截止时间', '完成网申与材料上传', '支付申请费', '准备面试'] },
      { title: '录取阶段（次年1月–5月）', items: ['比较并确认 Offer', '缴纳确认费用', '申请 IPA', '安排住宿'] },
      { title: '签证与行前（入学前1–2个月）', items: ['完成体检和签证手续', '准备入境材料', '预订机票', '参加 Orientation'] }
    ],
    au: [
      { title: '准备阶段（申请前12个月）', items: ['确定目标院校与专业', '准备语言考试', '整理成绩单与学术材料', '确认2月或7月入学批次'] },
      { title: '申请阶段（申请前6–9个月）', items: ['按批次递交申请', '跟进补件要求', '准备可能的面试', '比较不同课程设置'] },
      { title: '录取阶段（申请后1–3个月）', items: ['接收并比较 Offer', '满足附加条件', '缴纳学费押金', '申请 COE'] },
      { title: '签证与行前（入学前2–4个月）', items: ['购买 OSHC', '办理学生签证（Subclass 500）', '安排住宿与机票', '准备入境'] }
    ]
  };

  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

  function getElement(id) {
    return document.getElementById(id);
  }

  function monthsUntilSeptember(year) {
    const now = new Date();
    const target = new Date(year, 8, 1);
    return Math.max(0, Math.ceil((target - now) / (1000 * 60 * 60 * 24 * 30.44)));
  }

  function generateTimeline(options = {}) {
    const yearSelect = getElement('timelineYear');
    const regionSelect = getElement('timelineRegion');
    const result = getElement('timelineResult');
    if (!yearSelect || !regionSelect || !result) return;

    const year = Number.parseInt(yearSelect.value, 10);
    const region = phaseMap[regionSelect.value] ? regionSelect.value : 'uk';
    const phases = phaseMap[region];
    const remainingMonths = monthsUntilSeptember(year);

    result.innerHTML = `
      <div class="timeline-result-heading">
        <h2>${escapeHtml(year)} Fall ${escapeHtml(regionNames[region])}申请时间线</h2>
        <p>${remainingMonths > 0 ? `距离目标入学约 ${remainingMonths} 个月` : '目标入学时间已临近，请尽快确认申请和签证进度'}</p>
      </div>
      ${phases.map((phase, index) => `
        <section class="timeline-phase${index === 0 ? ' active' : ''}">
          <h3>${escapeHtml(phase.title)}</h3>
          <ul>${phase.items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </section>
      `).join('')}
      <div class="timeline-consult">
        <p>想根据个人背景确定更精确的申请节点？</p>
        <button class="btn btn-primary" type="button" onclick="openQr()">添加微信，获取专属方案</button>
      </div>
    `;

    if (options.scroll) result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function openQr() {
    const modal = getElement('qrModal');
    if (modal) modal.classList.add('show');
  }

  function closeQr() {
    const modal = getElement('qrModal');
    if (modal) modal.classList.remove('show');
  }

  window.generateTimeline = () => generateTimeline({ scroll: true });
  window.openQr = openQr;
  window.closeQr = closeQr;

  document.addEventListener('DOMContentLoaded', () => {
    const yearSelect = getElement('timelineYear');
    const regionSelect = getElement('timelineRegion');
    const modal = getElement('qrModal');
    const closeButton = modal?.querySelector('.qr-close');
    const toTop = getElement('toTop');
    const header = getElement('topHeader');

    document.querySelectorAll('.fade-in').forEach(element => element.classList.add('visible'));
    generateTimeline();

    yearSelect?.addEventListener('change', () => generateTimeline());
    regionSelect?.addEventListener('change', () => generateTimeline());
    closeButton?.addEventListener('click', closeQr);
    modal?.addEventListener('click', event => {
      if (event.target === modal) closeQr();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeQr();
    });
    window.addEventListener('scroll', () => {
      header?.classList.toggle('scrolled', window.scrollY > 40);
      toTop?.classList.toggle('show', window.scrollY > 400);
    });
    toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  });
})();
