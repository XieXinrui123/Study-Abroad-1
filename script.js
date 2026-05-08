const plans = [
  {
    name: 'DIY服务（纯DIY）',
    desc: '材料润色与答疑、申请流程指导',
    price: '按项目计费',
    services: ['简历500/篇', '文书1000/篇', '推荐信400/篇', 'DIY答疑1888/年']
  },
  {
    name: '半DIY服务',
    desc: '材料撰写支持+策略指导+部分流程自主',
    price: '全套3999元起',
    services: ['简历1000/篇', '文书2000/篇', '推荐信800/篇', '网申100/项目']
  },
  {
    name: '全包服务',
    desc: '全程代办+签证支持+流程管理',
    price: '10000元/8项目起',
    services: ['澳新1000/3所', '英港新10000/8项目', '15000/15项目', '超级混申20000']
  }
];

const faqs = [
  ['如何选择服务模式？', '时间充足+自主能力强可选DIY；希望省时但保留自主可选半DIY；想全程省心建议全包。'],
  ['全包服务有保障吗？', '全包支持0 offer全额退款承诺，并提供透明流程与进度同步。'],
  ['服务响应时间？', '7×16小时顾问响应，确保申请问题及时解决。']
];

const testimonials = [
  ['2023届学员数据', '186位学员获QS前100录取。'],
  ['2024届学员数据', '198位学员获QS前100录取。'],
  ['2025届学员数据', '170位学员获QS前100录取。']
];

const fallbackCases = []; // 数据已从 script.js 移除，请维护 cases.json 文件

const state = {
  baseCases: [],
  currentPage: 1,
  pageSize: 9999
};

function normalizeCase(item, idx) {
  const offers = Array.isArray(item.offers) && item.offers.length
    ? item.offers
    : [{ school: item.school || '待更新', major: item.major || '待更新', rank: item.result || '普通录取' }];

  return {
    id: item.id || idx + 1,
    title: item.title || `${item.country || '地区'}${item.degree || '项目'}`,
    student_school: item.student_school || '院校未填写',
    student_major: item.student_major || item.major || '专业未填写',
    gpa: item.gpa || '未填写',
    language_score: item.language_score || '未填写',
    country: item.country || '未分类',
    degree: item.degree || '未分类',
    result: item.result || offers[0]?.rank || '普通录取',
    offers
  };
}

function renderPlans() {
  const wrap = document.getElementById('planCards');
  if (!wrap) return;

  plans.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="price">${p.price}</div>
      <ul>${p.services.map((s) => `<li>${s}</li>`).join('')}</ul>
    `;
    wrap.append(card);
  });
}

function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;

  faqs.forEach(([q, a]) => {
    const item = document.createElement('div');
    item.className = 'accordion-item';
    item.innerHTML = `<button class="accordion-btn">${q}</button><div class="accordion-panel">${a}</div>`;
    item.querySelector('button')?.addEventListener('click', () => item.classList.toggle('open'));
    list.append(item);
  });
}

function renderTestimonials() {
  const box = document.getElementById('testimonials');
  if (!box) return;

  testimonials.forEach(([name, text]) => {
    const item = document.createElement('article');
    item.className = 'mini-card';
    item.innerHTML = `<h3>${name}</h3><p>${text}</p>`;
    box.append(item);
  });
}

function setupCases() {
  const searchInput = document.getElementById('searchInput');
  const countryFilter = document.getElementById('countryFilter');
  const degreeFilter = document.getElementById('degreeFilter');
  const resultFilter = document.getElementById('resultFilter');
  const pageSizeSelect = document.getElementById('pageSizeSelect');

  const caseGrid = document.getElementById('caseGrid');
  const vizPanel = document.getElementById('vizPanel');
  const offerRankPanel = document.getElementById('offerRankPanel');
  const topSchoolPanel = document.getElementById('topSchoolPanel');
  const metricsBoard = document.getElementById('metricsBoard');
  const resultTip = document.getElementById('resultTip');
  const dataSourceTip = document.getElementById('dataSourceTip');
  const pager = document.getElementById('pager');

  if (!searchInput || !countryFilter || !degreeFilter || !resultFilter || !caseGrid || !vizPanel || !offerRankPanel || !topSchoolPanel || !metricsBoard || !resultTip || !dataSourceTip || !pager) {
    return;
  }

  const fillSelect = (el, label, vals) => {
    el.innerHTML = `<option value="">全部${label}</option>${vals.map((v) => `<option>${v}</option>`).join('')}`;
  };

  const getFiltered = () => {
    const kw = searchInput.value.trim();

    return state.baseCases.filter((c) => {
      const offerText = c.offers.map((o) => `${o.school}${o.major}${o.rank}`).join(' ');
      const source = `${c.title}${c.student_school}${c.student_major}${c.gpa}${c.language_score}${offerText}`;

      return (!countryFilter.value || c.country === countryFilter.value)
        && (!degreeFilter.value || c.degree === degreeFilter.value)
        && (!resultFilter.value || c.result === resultFilter.value)
        && (!kw || source.includes(kw));
    });
  };

  const renderViz = (items) => {
    const byCountry = Object.entries(items.reduce((acc, c) => {
      acc[c.country] = (acc[c.country] || 0) + 1;
      return acc;
    }, {}));

    if (!byCountry.length) {
      vizPanel.innerHTML = '<h3>数据可视化（按地区）</h3><p class="result-tip">暂无匹配案例</p>';
      return;
    }

    const max = Math.max(...byCountry.map(([, n]) => n));
    vizPanel.innerHTML = `
      <h3>数据可视化（按地区）</h3>
      <div class="bars">
        ${byCountry.map(([k, v]) => `
          <div class="bar-item">
            <small>${k} ${v}例</small>
            <div class="bar-track"><div class="bar-fill" style="width:${(v / max) * 100}%"></div></div>
          </div>
        `).join('')}
      </div>
    `;
  };

  const renderCaseCard = (item) => {
    const topOffers = item.offers.slice(0, 3);
    const restCount = Math.max(0, item.offers.length - 3);

    return `
      <article class="case">
        <div class="case-header">
          <h3>${item.title}</h3>
          <span class="offer-badge">${item.offers.length} Offers</span>
        </div>

        <p class="pill-row">
          <span class="pill">#${item.id}</span>
          <span class="pill">${item.country}</span>
          <span class="pill">${item.degree}</span>
          <span class="pill">${item.result}</span>
        </p>

        <div class="student-meta">
          <div><strong>学生学校</strong><span>${item.student_school}</span></div>
          <div><strong>学生专业</strong><span>${item.student_major}</span></div>
          <div><strong>GPA/均分</strong><span>${item.gpa}</span></div>
          <div><strong>语言成绩</strong><span>${item.language_score}</span></div>
        </div>

        <div class="offer-preview">
          ${topOffers.map((o) => `<span class="offer-chip">${o.school} · ${o.major}</span>`).join('')}
          ${restCount ? `<span class="offer-chip more">+${restCount} 个更多Offer</span>` : ''}
        </div>

        <details class="offer-details">
          <summary>查看全部 Offer 明细</summary>
          <div class="offer-list">
            ${item.offers.map((o) => `
              <div class="offer-item">
                <strong>${o.school}</strong>
                <span>${o.major}</span>
                <em>${o.rank}</em>
              </div>
            `).join('')}
          </div>
        </details>
      </article>
    `;
  };


  const renderMetrics = (items) => {
    const totalOffers = items.reduce((acc, c) => acc + c.offers.length, 0);
    const avgOffer = items.length ? (totalOffers / items.length).toFixed(1) : '0';
    const top10Count = items.filter((c) => `${c.result}`.includes('前10')).length;
    const multiOfferCount = items.filter((c) => c.offers.length >= 2).length;

    metricsBoard.innerHTML = `
      <article class="metric-card"><strong>${items.length}</strong><span>筛选后案例数</span></article>
      <article class="metric-card"><strong>${totalOffers}</strong><span>累计 Offer 数</span></article>
      <article class="metric-card"><strong>${avgOffer}</strong><span>人均 Offer</span></article>
      <article class="metric-card"><strong>${top10Count}</strong><span>QS前10 结果</span></article>
    `;

    offerRankPanel.innerHTML = `
      <h3>录取结果分布</h3>
      <div class="mini-list">${Object.entries(items.reduce((acc, c) => {
        acc[c.result] = (acc[c.result] || 0) + 1;
        return acc;
      }, {})).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([k,v]) => `<div class="mini-row"><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>
      <p class="result-tip">其中 ${multiOfferCount} 位学生拥有2个及以上Offer</p>
    `;

    const schoolCounter = {};
    items.forEach((c) => c.offers.forEach((o) => { schoolCounter[o.school] = (schoolCounter[o.school] || 0) + 1; }));
    topSchoolPanel.innerHTML = `
      <h3>高频录取院校 Top 8</h3>
      <div class="mini-list">${Object.entries(schoolCounter).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v],idx) => `<div class="mini-row"><span>${idx + 1}. ${k}</span><strong>${v}</strong></div>`).join('')}</div>
    `;
  };

  const render = () => {
    const items = getFiltered();
    const showAll = state.pageSize >= 9999;
    const totalPage = showAll ? 1 : Math.max(1, Math.ceil(items.length / state.pageSize));

    state.currentPage = Math.min(state.currentPage, totalPage);
    const pageItems = showAll
      ? items
      : items.slice((state.currentPage - 1) * state.pageSize, state.currentPage * state.pageSize);

    caseGrid.innerHTML = pageItems.map(renderCaseCard).join('');
    renderViz(items);
    renderMetrics(items);

    resultTip.textContent = showAll
      ? `共 ${items.length} 条案例（当前显示全部）`
      : `共 ${items.length} 条案例，当前第 ${state.currentPage}/${totalPage} 页`;

    pager.innerHTML = showAll
      ? ''
      : Array.from({ length: totalPage }, (_, i) => `
          <button class="${i + 1 === state.currentPage ? 'active' : ''}" data-page="${i + 1}">${i + 1}</button>
        `).join('');
  };

  const syncPageSize = () => {
    if (!pageSizeSelect) {
      state.pageSize = 9999;
      return;
    }
    state.pageSize = pageSizeSelect.value === 'all' ? 9999 : Number(pageSizeSelect.value || 12);
  };

  [searchInput, countryFilter, degreeFilter, resultFilter, pageSizeSelect]
    .filter(Boolean)
    .forEach((el) => el.addEventListener('input', () => {
      syncPageSize();
      state.currentPage = 1;
      render();
    }));

  pager.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    const page = target.dataset.page;
    if (!page) return;
    state.currentPage = Number(page);
    render();
  });

  (async () => {
    try {
      const res = await fetch('./cases.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const parsed = Array.isArray(data) ? data : (data.cases || []);
      if (!parsed.length) throw new Error('empty data');
      state.baseCases = parsed.map(normalizeCase);
      dataSourceTip.textContent = '✓ 已加载 ' + parsed.length + ' 条案例';
    } catch (error) {
      state.baseCases = [];
      dataSourceTip.innerHTML = '<span style="color:#ff6b35">✗ 案例加载失败：' + error.message + '</span><br>请确保 cases.json 文件存在';
      console.error('Cases load error:', error);
    }

    fillSelect(countryFilter, '地区', [...new Set(state.baseCases.map((c) => c.country))]);
    fillSelect(degreeFilter, '学历', [...new Set(state.baseCases.map((c) => c.degree))]);
    fillSelect(resultFilter, '结果', [...new Set(state.baseCases.map((c) => c.result))]);

    syncPageSize();
    render();
  })();
}

function setupCommonUI() {
  const header = document.getElementById('topHeader');
  const hero = document.getElementById('hero');
  const toTop = document.getElementById('toTop');
  const themeToggle = document.getElementById('themeToggle');

  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.2}px`;
    if (toTop) toTop.classList.toggle('show', window.scrollY > 400);
  });

  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  themeToggle?.addEventListener('click', () => document.body.classList.toggle('dark'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  const qrModal = document.getElementById('qrModal');
  const consultBtn = document.getElementById('consultBtn');
  const consultBtnFooter = document.getElementById('consultBtnFooter');
  const qrClose = document.getElementById('qrClose');

  const openQr = () => qrModal?.classList.add('show');
  consultBtn?.addEventListener('click', openQr);
  consultBtnFooter?.addEventListener('click', openQr);
  qrClose?.addEventListener('click', () => qrModal?.classList.remove('show'));
  qrModal?.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('show');
  });
}

renderPlans();
renderFAQ();
renderTestimonials();
setupCases();
setupCommonUI();
