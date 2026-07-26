(function () {
  'use strict';
  const Core = window.CasesManagerCore;
  const STORAGE_KEY = 'dreambridge-cases-manager-draft-v1';
  const $ = selector => document.querySelector(selector);
  const state = { cases: [], selectedId: null, source: '未载入' };

  const elements = {
    list: $('#caseList'), form: $('#caseForm'), offers: $('#offersContainer'), message: $('#message'),
    search: $('#searchInput'), file: $('#fileInput'), drop: $('#dropZone'), heading: $('#editorHeading')
  };

  function showMessage(text, type = 'info') {
    elements.message.className = `message show ${type}`;
    elements.message.textContent = text;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function clearMessage() {
    elements.message.className = 'message';
    elements.message.textContent = '';
  }

  function persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cases: state.cases, savedAt: new Date().toISOString() }));
  }

  function updateStats() {
    const report = Core.validateCases(state.cases);
    $('#caseCount').textContent = state.cases.length;
    $('#offerCount').textContent = state.cases.reduce((sum, item) => sum + item.offers.length, 0);
    $('#errorCount').textContent = report.errors.length;
    $('#warningCount').textContent = report.warnings.length;
  }

  function renderList() {
    const query = elements.search.value.trim().toLowerCase();
    const filtered = state.cases.filter(item => {
      const haystack = [
        item.id, item.student_school, item.student_major, item.country,
        ...item.offers.flatMap(offer => [offer.school, offer.major])
      ].join(' ').toLowerCase();
      return !query || haystack.includes(query);
    });
    if (!filtered.length) {
      elements.list.innerHTML = '<div class="empty">没有匹配的案例</div>';
      return;
    }
    elements.list.innerHTML = '';
    filtered.sort((a, b) => b.id - a.id).forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `case-row${item.id === state.selectedId ? ' active' : ''}`;
      button.innerHTML = `<div class="case-row-top"><span>#${item.id} ${escapeHtml(item.student_school || '未填写院校')}</span><span>${escapeHtml(item.result)}</span></div>
        <div class="case-row-meta">${escapeHtml(item.student_major || '未填写专业')} · ${escapeHtml(item.country || '未填写地区')} · ${item.offers.length} 个 Offer</div>`;
      button.addEventListener('click', () => selectCase(item.id));
      elements.list.appendChild(button);
    });
  }

  function escapeHtml(value) {
    const div = document.createElement('div');
    div.textContent = String(value ?? '');
    return div.innerHTML;
  }

  function addOfferRow(offer = {}) {
    const card = document.createElement('div');
    card.className = 'offer-card';
    card.innerHTML = `
      <div class="field"><label class="required">录取院校</label><input data-offer="school" value="${escapeHtml(offer.school || '')}" placeholder="例如：香港大学"></div>
      <div class="field"><label>录取专业</label><input data-offer="major" value="${escapeHtml(offer.major || '')}" placeholder="例如：金融学"></div>
      <div class="field"><label class="required">录取层次</label>
        <select data-offer="rank">${Core.RANK_VALUES.map(rank => `<option${rank === (offer.rank || '待更新') ? ' selected' : ''}>${rank}</option>`).join('')}</select>
      </div>
      <button class="btn small danger" type="button" aria-label="删除此 Offer">删除</button>`;
    card.querySelector('button').addEventListener('click', () => {
      card.remove();
      if (!elements.offers.children.length) addOfferRow();
    });
    elements.offers.appendChild(card);
  }

  function fillForm(item) {
    const current = item || Core.normalizeCase({ id: Core.nextId(state.cases), entry_year: new Date().getFullYear() + 1, offers: [{}] });
    state.selectedId = item ? item.id : null;
    elements.heading.textContent = item ? `编辑案例 #${item.id}` : '新建案例';
    for (const [name, value] of Object.entries(current)) {
      const input = elements.form.elements[name];
      if (input && !Array.isArray(value)) input.value = value;
    }
    elements.offers.innerHTML = '';
    (current.offers.length ? current.offers : [{}]).forEach(addOfferRow);
    $('#deleteButton').disabled = !item;
    $('#duplicateButton').disabled = !item;
    renderList();
  }

  function collectForm() {
    const formData = new FormData(elements.form);
    const offers = [...elements.offers.querySelectorAll('.offer-card')].map(card => ({
      school: card.querySelector('[data-offer="school"]').value,
      major: card.querySelector('[data-offer="major"]').value,
      rank: card.querySelector('[data-offer="rank"]').value
    }));
    return Core.normalizeCase({
      id: formData.get('id'),
      student_school: formData.get('student_school'),
      student_major: formData.get('student_major'),
      gpa: formData.get('gpa'),
      language_score: formData.get('language_score'),
      country: formData.get('country'),
      degree: formData.get('degree'),
      entry_year: formData.get('entry_year'),
      tier: formData.get('tier'),
      note: formData.get('note'),
      offers
    });
  }

  function selectCase(id) {
    const item = state.cases.find(entry => entry.id === id);
    if (item) fillForm(item);
  }

  function saveCase(event) {
    event.preventDefault();
    clearMessage();
    const item = collectForm();
    const conflict = state.cases.find(entry => entry.id === item.id && entry.id !== state.selectedId);
    if (conflict) return showMessage(`案例编号 ${item.id} 已存在，请换一个编号。`, 'error');
    const singleReport = Core.validateCases([item]);
    if (singleReport.errors.length) return showMessage(singleReport.errors.join('\n'), 'error');
    const index = state.cases.findIndex(entry => entry.id === state.selectedId);
    if (index >= 0) state.cases[index] = item;
    else state.cases.push(item);
    state.selectedId = item.id;
    persist();
    updateStats();
    renderList();
    elements.heading.textContent = `编辑案例 #${item.id}`;
    showMessage(`案例 #${item.id} 已保存到浏览器草稿。${singleReport.warnings.length ? `\n提醒：${singleReport.warnings.join('；')}` : ''}`, 'success');
  }

  function replaceCases(items, source) {
    state.cases = items.map((item, index) => Core.normalizeCase(item, index + 1)).sort((a, b) => a.id - b.id);
    state.source = source;
    state.selectedId = null;
    persist();
    updateStats();
    renderList();
    fillForm(state.cases[state.cases.length - 1] || null);
    const report = Core.validateCases(state.cases);
    showMessage(`已从${source}载入 ${state.cases.length} 条案例。校验发现 ${report.errors.length} 个错误、${report.warnings.length} 个提醒。`, report.errors.length ? 'error' : 'success');
  }

  async function importFile(file) {
    if (!file) return;
    const extension = file.name.split('.').pop().toLowerCase();
    try {
      if (extension === 'json') {
        const parsed = JSON.parse(await file.text());
        replaceCases(Array.isArray(parsed) ? parsed : parsed.cases, ` ${file.name} `);
      } else if (extension === 'csv') {
        const rows = Core.parseCSV(await file.text());
        replaceCases(Core.rowsToCases(rows, Core.nextId(state.cases)), ` ${file.name} `);
      } else if (extension === 'xlsx' || extension === 'xls') {
        if (!window.XLSX) throw new Error('Excel 组件未加载。请联网后重试，或把文件另存为 CSV 再导入。');
        const workbook = window.XLSX.read(await file.arrayBuffer(), { type: 'array', cellDates: false });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = window.XLSX.utils.sheet_to_json(sheet, { defval: '', range: 3 });
        replaceCases(Core.rowsToCases(rows, Core.nextId(state.cases)), ` ${file.name} `);
      } else {
        throw new Error('仅支持 JSON、CSV、XLSX 或 XLS 文件。');
      }
    } catch (error) {
      showMessage(`导入失败：${error.message}`, 'error');
    } finally {
      elements.file.value = '';
    }
  }

  function exportJSON() {
    const current = collectForm();
    const index = state.cases.findIndex(entry => entry.id === state.selectedId);
    if (index >= 0) state.cases[index] = current;
    const report = Core.validateCases(state.cases);
    updateStats();
    if (report.errors.length) {
      showMessage(`暂不能导出，请先修复以下问题：\n${report.errors.slice(0, 20).join('\n')}${report.errors.length > 20 ? `\n……另有 ${report.errors.length - 20} 个错误` : ''}`, 'error');
      return;
    }
    const output = [...state.cases].sort((a, b) => a.id - b.id);
    const blob = new Blob([`${JSON.stringify(output, null, 2)}\n`], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'cases.json';
    anchor.click();
    URL.revokeObjectURL(url);
    persist();
    showMessage(`导出成功：${output.length} 条案例、${output.reduce((sum, item) => sum + item.offers.length, 0)} 个 Offer。${report.warnings.length ? `\n还有 ${report.warnings.length} 个非阻断提醒，可按需继续完善。` : ''}`, 'success');
  }

  async function loadInitialData() {
    try {
      const response = await fetch('cases.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('无法读取 cases.json');
      replaceCases(await response.json(), '网站 cases.json');
    } catch (error) {
      const draft = localStorage.getItem(STORAGE_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        replaceCases(parsed.cases || [], '浏览器草稿');
      } else {
        fillForm(null);
        updateStats();
        renderList();
        showMessage('当前通过 file:// 打开，浏览器无法自动读取 cases.json。请点击“导入”选择现有文件，或用本地服务器打开本页面。', 'info');
      }
    }
  }

  elements.form.addEventListener('submit', saveCase);
  elements.search.addEventListener('input', renderList);
  $('#newButton').addEventListener('click', () => fillForm(null));
  $('#addOfferButton').addEventListener('click', () => addOfferRow());
  $('#importButton').addEventListener('click', () => elements.file.click());
  elements.file.addEventListener('change', () => importFile(elements.file.files[0]));
  $('#exportButton').addEventListener('click', exportJSON);
  $('#restoreButton').addEventListener('click', () => {
    const draft = localStorage.getItem(STORAGE_KEY);
    if (!draft) return showMessage('当前浏览器还没有保存过草稿。', 'info');
    try {
      const parsed = JSON.parse(draft);
      replaceCases(parsed.cases || [], '浏览器草稿');
    } catch (error) {
      showMessage('浏览器草稿已损坏，无法恢复。', 'error');
    }
  });
  $('#deleteButton').addEventListener('click', () => {
    if (state.selectedId === null) return;
    if (!window.confirm(`确定删除案例 #${state.selectedId} 吗？删除后仍可通过重新导入原 cases.json 恢复。`)) return;
    state.cases = state.cases.filter(item => item.id !== state.selectedId);
    persist();
    updateStats();
    renderList();
    fillForm(null);
    showMessage('案例已从浏览器草稿中删除。', 'success');
  });
  $('#duplicateButton').addEventListener('click', () => {
    const source = state.cases.find(item => item.id === state.selectedId);
    if (!source) return;
    const copy = JSON.parse(JSON.stringify(source));
    copy.id = Core.nextId(state.cases);
    copy.note = copy.note ? `${copy.note}（复制）` : '';
    fillForm(copy);
    state.selectedId = null;
    elements.heading.textContent = `复制案例（新编号 #${copy.id}）`;
  });

  ['dragenter', 'dragover'].forEach(type => document.addEventListener(type, event => {
    event.preventDefault();
    elements.drop.classList.add('show');
  }));
  ['dragleave', 'drop'].forEach(type => document.addEventListener(type, event => {
    event.preventDefault();
    elements.drop.classList.remove('show');
  }));
  document.addEventListener('drop', event => importFile(event.dataTransfer.files[0]));
  loadInitialData();
})();
