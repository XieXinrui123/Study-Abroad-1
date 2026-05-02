const plans = [
  {
    name: '基础套餐',
    desc: '适合目标明确、时间充足的同学',
    price: '¥9,800',
    services: ['选校定位', '申请时间规划', '3所院校申请支持']
  },
  {
    name: '进阶套餐',
    desc: '适合想冲刺Top院校的同学',
    price: '¥19,800',
    services: ['背景提升建议', '定制文书辅导', '8所院校全流程申请']
  },
  {
    name: '全套服务',
    desc: '从规划到落地的完整陪伴',
    price: '¥32,800',
    services: ['无限次咨询', '签证与住宿指导', '行前准备与落地支持']
  }
];

const cases = [
  {
    title: '双非背景逆袭 QS Top 50',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
    summary: 'GPA 3.2 / 跨专业申请 / 获2所Top 50录取',
    details: '通过项目经历重构与文书故事线优化，拿到曼大与KCL录取。'
  },
  {
    title: '艺术生成功申请美国名校',
    image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80',
    summary: '作品集提升 + 面试模拟',
    details: '三个月完成作品集重构，收获RISD与SVA offer。'
  },
  {
    title: '转专业申请计算机硕士',
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80',
    summary: '经济学背景 / 计算机转申',
    details: '通过先修课与科研项目包装，成功录取NEU CS Align。'
  }
];

const faqs = [
  ['我没有科研经历可以申请名校吗？', '可以。我们会根据你的背景设计可执行的背景提升路径，突出可迁移能力与项目价值。'],
  ['服务周期一般多久？', '通常为3-10个月，依据申请国家、专业和入学季而定。'],
  ['文书是模板化的吗？', '不是。每份文书采用一对一深度访谈生成，确保真实、个性化与差异化。']
];

const planCards = document.getElementById('planCards');
plans.forEach((plan) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h3>${plan.name}</h3>
    <p>${plan.desc}</p>
    <div class="price">${plan.price}</div>
    <ul>${plan.services.map((item) => `<li>${item}</li>`).join('')}</ul>
    <a class="btn btn-primary" href="#contact">了解更多</a>
  `;
  planCards.append(card);
});

const caseGrid = document.getElementById('caseGrid');
cases.forEach((item) => {
  const card = document.createElement('article');
  card.className = 'case';
  card.innerHTML = `
    <img src="${item.image}" alt="${item.title}" />
    <div class="case-content">
      <h3>${item.title}</h3>
      <p>${item.summary}</p>
      <p class="details">${item.details}</p>
    </div>
  `;
  card.addEventListener('click', () => card.classList.toggle('open'));
  caseGrid.append(card);
});

const faqList = document.getElementById('faqList');
faqs.forEach(([q, a]) => {
  const item = document.createElement('div');
  item.className = 'accordion-item';
  item.innerHTML = `
    <button class="accordion-btn">${q}</button>
    <div class="accordion-panel">${a}</div>
  `;
  item.querySelector('button').addEventListener('click', () => item.classList.toggle('open'));
  faqList.append(item);
});

const header = document.getElementById('topHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
  const hero = document.getElementById('hero');
  hero.style.backgroundPositionY = `${window.scrollY * 0.35}px`;
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
