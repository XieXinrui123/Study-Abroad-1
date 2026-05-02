const plans=[
{name:'DIY服务（纯DIY）',desc:'材料润色与答疑、申请流程指导',price:'按项目计费',link:'package.html',services:['简历500/篇','文书1000/篇','推荐信400/篇','DIY答疑1888/年']},
{name:'半DIY服务',desc:'材料撰写支持+策略指导+部分流程自主',price:'全套3999元起',link:'package.html',services:['简历1000/篇','文书2000/篇','推荐信800/篇','网申100/项目']},
{name:'全包服务',desc:'全程代办+签证支持+流程管理',price:'10000元/8项目起',link:'package.html',services:['澳新1000/3所','英港新10000/8项目','15000/15项目','超级混申20000']}
];
let baseCases=[];const fallbackCases=Array.from({length:36},(_,i)=>{const countries=['英国','香港','新加坡','澳洲','新西兰','澳门'];const degrees=['本科','硕士','博士'];const results=['QS前50','QS前100','奖学金'];const c=countries[i%6],d=degrees[i%3],r=results[i%3];return{id:i+1,title:`${c}${d}申请案例 #${i+1}`,background:`GPA ${(3+((i%10)/10)).toFixed(1)} / IELTS ${6+(i%3)*0.5}`,major:['商科','计算机','传媒','设计'][i%4],country:c,degree:d,result:r,school:['UCL','HKU','NUS','UNSW','Auckland','UM'][i%6],details:`${c}${d}方向，录取${['UCL','HKU','NUS','UNSW','Auckland','UM'][i%6]}，结果：${r}`};});
const faqs=[['如何选择服务模式？','时间充足+自主能力强可选DIY；希望省时但保留自主可选半DIY；想全程省心建议全包。'],['全包服务有保障吗？','全包支持0 offer全额退款承诺，并提供透明流程与进度同步。'],['服务响应时间？','7×16小时顾问响应，确保申请问题及时解决。']];
const testimonials=[['2023届学员数据','186位学员获QS前100录取。'],['2024届学员数据','198位学员获QS前100录取。'],['2025届学员数据','170位学员获QS前100录取。']];
const timeline=['敲定选校','闲鱼付款','撰写材料与递交申请','闲鱼发货','收到付款'];
const planCards=document.getElementById('planCards');plans.forEach(p=>{const c=document.createElement('article');c.className='card';c.innerHTML=`<h3>${p.name}</h3><p>${p.desc}</p><div class="price">${p.price}</div><ul>${p.services.map(i=>`<li>${i}</li>`).join('')}</ul>`;planCards.append(c)});
const searchInput=document.getElementById('searchInput'),countryFilter=document.getElementById('countryFilter'),degreeFilter=document.getElementById('degreeFilter'),resultFilter=document.getElementById('resultFilter');const caseGrid=document.getElementById('caseGrid'),vizPanel=document.getElementById('vizPanel'),resultTip=document.getElementById('resultTip'),dataSourceTip=document.getElementById('dataSourceTip'),pager=document.getElementById('pager');const pageSize=9;let currentPage=1;const fillSelect=(el,label,vals)=>el.innerHTML=`<option value="">全部${label}</option>`+vals.map(v=>`<option>${v}</option>`).join('');
async function initCases(){
  try {
    const res = await fetch('/cases.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('api failed');
    const data = await res.json();
    baseCases = Array.isArray(data) ? data : (data.cases || []);
    if (!baseCases.length) baseCases = fallbackCases;
    dataSourceTip.textContent = '数据来源：cases.json（可直接维护）';
  } catch (e) {
    baseCases = fallbackCases;
    dataSourceTip.textContent = '数据来源：本地回退（请检查 cases.json 格式）';
    console.warn('cases.json failed, using fallback data');
  }
  fillSelect(countryFilter,'地区',[...new Set(baseCases.map(c=>c.country))]);
  fillSelect(degreeFilter,'学历',[...new Set(baseCases.map(c=>c.degree))]);
  fillSelect(resultFilter,'结果',[...new Set(baseCases.map(c=>c.result))]);
  render();
}
const getFiltered=()=>{const kw=searchInput.value.trim();return baseCases.filter(c=>(!countryFilter.value||c.country===countryFilter.value)&&(!degreeFilter.value||c.degree===degreeFilter.value)&&(!resultFilter.value||c.result===resultFilter.value)&&(!kw||`${c.title}${c.background}${c.school}${c.major}`.includes(kw)))};function renderViz(items){const byCountry=Object.entries(items.reduce((a,c)=>(a[c.country]=(a[c.country]||0)+1,a),{}));const max=Math.max(1,...byCountry.map(([,n])=>n));vizPanel.innerHTML=`<h3>数据可视化（按地区）</h3><div class="bars">${byCountry.map(([k,v])=>`<div class="bar-item"><small>${k} ${v}例</small><div class="bar-track"><div class="bar-fill" style="width:${(v/max)*100}%"></div></div></div>`).join('')}</div>`}function render(){const items=getFiltered();const totalPage=Math.max(1,Math.ceil(items.length/pageSize));currentPage=Math.min(currentPage,totalPage);const pageItems=items.slice((currentPage-1)*pageSize,currentPage*pageSize);caseGrid.innerHTML=pageItems.map(i=>`<article class="case"><h3>${i.title}</h3><p>${i.background}</p><p><span class="pill">${i.country}</span><span class="pill">${i.degree}</span><span class="pill">${i.result}</span></p><p class="details">${i.major}｜${i.school}｜${i.details}</p></article>`).join('');renderViz(items);resultTip.textContent=`共 ${items.length} 条案例，当前第 ${currentPage}/${totalPage} 页`;pager.innerHTML=Array.from({length:totalPage},(_,i)=>`<button class="${i+1===currentPage?'active':''}" data-page="${i+1}">${i+1}</button>`).join('')}[searchInput,countryFilter,degreeFilter,resultFilter].forEach(el=>el.addEventListener('input',()=>{currentPage=1;render()}));pager.addEventListener('click',e=>{if(e.target.dataset.page){currentPage=Number(e.target.dataset.page);render()}});initCases();
const faqList=document.getElementById('faqList');faqs.forEach(([q,a])=>{const i=document.createElement('div');i.className='accordion-item';i.innerHTML=`<button class="accordion-btn">${q}</button><div class="accordion-panel">${a}</div>`;i.querySelector('button').addEventListener('click',()=>i.classList.toggle('open'));faqList.append(i)});const tBox=document.getElementById('testimonials');testimonials.forEach(([n,t])=>{const i=document.createElement('article');i.className='mini-card';i.innerHTML=`<h3>${n}</h3><p>${t}</p>`;tBox.append(i)});const timelineBox=document.getElementById('timeline');timeline.forEach((t,idx)=>{const li=document.createElement('li');li.innerHTML=`<span>${idx+1}</span>${t}`;timelineBox.append(li)});
const header=document.getElementById('topHeader');window.addEventListener('scroll',()=>{header.classList.toggle('scrolled',window.scrollY>40);document.getElementById('hero').style.backgroundPositionY=`${window.scrollY*0.35}px`;document.getElementById('toTop').classList.toggle('show',window.scrollY>400)});document.getElementById('toTop').addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));document.getElementById('themeToggle').addEventListener('click',()=>document.body.classList.toggle('dark'));const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.2});document.querySelectorAll('.fade-in').forEach(el=>observer.observe(el));
