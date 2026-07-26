(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CasesManagerCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const TIER_VALUES = ['985', '211', '双非', '海外本科'];
  const RANK_VALUES = ['QS前10', 'QS前50', 'QS前100', '海外名校', '中外合办', '待更新'];
  const RANK_WEIGHT = new Map(RANK_VALUES.map((value, index) => [value, index]));
  const HEADER_ALIASES = {
    id: ['案例编号', 'id', 'ID'],
    student_school: ['本科院校', '学生院校', 'student_school'],
    tier: ['本科层次', '院校层次', 'tier'],
    student_major: ['本科专业', '学生专业', 'student_major'],
    gpa: ['GPA/均分', 'GPA', '均分', 'gpa'],
    language_score: ['语言成绩', 'language_score'],
    country: ['申请地区', '国家/地区', 'country'],
    degree: ['学历', '申请学历', 'degree'],
    entry_year: ['入学年份', '年份', 'entry_year'],
    note: ['备注', 'note'],
    offer_school: ['录取院校', 'Offer院校', 'offer_school'],
    offer_major: ['录取专业', 'Offer专业', 'offer_major'],
    offer_rank: ['录取层次', 'Offer层次', 'offer_rank']
  };

  const clean = value => String(value ?? '').trim();

  function normalizeRank(value) {
    const text = clean(value).replace(/\s+/g, '');
    if (!text) return '待更新';
    const upper = text.toUpperCase();
    if (/QS(?:排名)?前?10\b|TOP10\b/.test(upper)) return 'QS前10';
    if (/QS(?:排名)?前?50\b|TOP50\b/.test(upper)) return 'QS前50';
    if (/QS(?:排名)?前?100\b|TOP100\b/.test(upper)) return 'QS前100';
    if (text.includes('中外合办')) return '中外合办';
    if (text.includes('海外名校')) return '海外名校';
    return RANK_VALUES.includes(text) ? text : '待更新';
  }

  function inferTier(school, suppliedTier) {
    const tier = clean(suppliedTier);
    if (TIER_VALUES.includes(tier)) return tier;
    const name = clean(school);
    if (/大学|学院/.test(name) && /海外|国外|国际/.test(name)) return '海外本科';
    return '双非';
  }

  function bestRank(offers) {
    const ranks = (offers || []).map(item => normalizeRank(item.rank));
    if (!ranks.length) return '待更新';
    return ranks.sort((a, b) => (RANK_WEIGHT.get(a) ?? 99) - (RANK_WEIGHT.get(b) ?? 99))[0];
  }

  function normalizeOffer(offer) {
    return {
      school: clean(offer?.school || offer?.offer_school),
      major: clean(offer?.major || offer?.offer_major) || '待更新',
      rank: normalizeRank(offer?.rank || offer?.offer_rank)
    };
  }

  function normalizeCase(item, fallbackId) {
    const rawOffers = Array.isArray(item?.offers)
      ? item.offers
      : (item?.offer_school || item?.录取院校 ? [{
          school: item.offer_school || item.录取院校,
          major: item.offer_major || item.录取专业,
          rank: item.offer_rank || item.录取层次
        }] : []);
    const offers = rawOffers.map(normalizeOffer).filter(offer => offer.school || offer.major !== '待更新');
    const idValue = Number.parseInt(item?.id ?? item?.案例编号 ?? fallbackId, 10);
    const yearValue = Number.parseInt(item?.entry_year ?? item?.入学年份, 10);
    const normalized = {
      id: Number.isInteger(idValue) ? idValue : fallbackId,
      student_school: clean(item?.student_school ?? item?.本科院校),
      student_major: clean(item?.student_major ?? item?.本科专业),
      gpa: clean(item?.gpa ?? item?.['GPA/均分']) || '未填写',
      language_score: clean(item?.language_score ?? item?.语言成绩) || '未填写',
      country: clean(item?.country ?? item?.申请地区),
      degree: clean(item?.degree ?? item?.学历) || '硕士',
      result: normalizeRank(item?.result),
      offers,
      entry_year: Number.isInteger(yearValue) ? yearValue : new Date().getFullYear() + 1,
      tier: inferTier(item?.student_school ?? item?.本科院校, item?.tier ?? item?.本科层次),
      note: clean(item?.note ?? item?.备注)
    };
    normalized.result = bestRank(normalized.offers);
    return normalized;
  }

  function valueByAlias(row, key) {
    const names = HEADER_ALIASES[key] || [key];
    for (const name of names) {
      if (Object.prototype.hasOwnProperty.call(row, name) && clean(row[name])) return row[name];
    }
    return '';
  }

  function rowsToCases(rows, startingId = 1) {
    const groups = new Map();
    let lastId = '';
    let nextId = startingId;
    for (const rawRow of rows || []) {
      const row = rawRow || {};
      const meaningful = Object.values(row).some(value => clean(value));
      if (!meaningful) continue;
      let id = clean(valueByAlias(row, 'id'));
      if (!id && lastId) id = lastId;
      if (!id) id = String(nextId++);
      lastId = id;
      if (!groups.has(id)) groups.set(id, []);
      groups.get(id).push(row);
    }

    const cases = [];
    for (const [groupId, groupRows] of groups) {
      const first = groupRows[0];
      const offers = groupRows.map(row => ({
        school: valueByAlias(row, 'offer_school'),
        major: valueByAlias(row, 'offer_major'),
        rank: valueByAlias(row, 'offer_rank')
      })).filter(offer => clean(offer.school) || clean(offer.major));
      const item = {
        id: groupId,
        student_school: valueByAlias(first, 'student_school'),
        student_major: valueByAlias(first, 'student_major'),
        gpa: valueByAlias(first, 'gpa'),
        language_score: valueByAlias(first, 'language_score'),
        country: valueByAlias(first, 'country'),
        degree: valueByAlias(first, 'degree'),
        entry_year: valueByAlias(first, 'entry_year'),
        tier: valueByAlias(first, 'tier'),
        note: valueByAlias(first, 'note'),
        offers
      };
      cases.push(normalizeCase(item, nextId++));
    }
    return cases;
  }

  function parseCSV(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    const source = String(text || '').replace(/^\uFEFF/, '');
    for (let i = 0; i < source.length; i += 1) {
      const char = source[i];
      const next = source[i + 1];
      if (char === '"' && quoted && next === '"') {
        cell += '"';
        i += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        row.push(cell);
        cell = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && next === '\n') i += 1;
        row.push(cell);
        if (row.some(value => clean(value))) rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }
    row.push(cell);
    if (row.some(value => clean(value))) rows.push(row);
    if (!rows.length) return [];
    const headers = rows.shift().map(clean);
    return rows.map(values => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ''])));
  }

  function validateCases(items) {
    const errors = [];
    const warnings = [];
    const seenIds = new Set();
    const seenContent = new Map();
    const currentYear = new Date().getFullYear();
    for (const [index, item] of (items || []).entries()) {
      const label = `第 ${index + 1} 条案例`;
      if (!Number.isInteger(item.id) || item.id <= 0) errors.push(`${label}：案例编号必须是正整数`);
      else if (seenIds.has(item.id)) errors.push(`${label}：案例编号 ${item.id} 重复`);
      else seenIds.add(item.id);
      if (!clean(item.student_school)) warnings.push(`${label}：本科院校未公开或未填写`);
      if (!clean(item.student_major)) errors.push(`${label}：本科专业不能为空`);
      if (!clean(item.country)) errors.push(`${label}：申请地区不能为空`);
      if (!TIER_VALUES.includes(item.tier)) errors.push(`${label}：本科层次不在允许范围`);
      if (!Number.isInteger(item.entry_year) || item.entry_year < currentYear - 5 || item.entry_year > currentYear + 10) {
        warnings.push(`${label}：请确认入学年份 ${item.entry_year || '未填写'}`);
      }
      if (!Array.isArray(item.offers) || !item.offers.length) warnings.push(`${label}：尚未填写 Offer`);
      for (const [offerIndex, offer] of (item.offers || []).entries()) {
        if (!clean(offer.school)) errors.push(`${label}：第 ${offerIndex + 1} 个 Offer 缺少录取院校`);
        if (!RANK_VALUES.includes(offer.rank)) errors.push(`${label}：第 ${offerIndex + 1} 个 Offer 层次无效`);
        if (!clean(offer.major) || offer.major === '待更新') warnings.push(`${label}：第 ${offerIndex + 1} 个 Offer 专业待补充`);
      }
      if (!clean(item.language_score) || item.language_score === '未填写') warnings.push(`${label}：语言成绩未填写`);
      const key = [
        clean(item.student_school).toLowerCase(),
        clean(item.student_major).toLowerCase(),
        clean(item.gpa).toLowerCase(),
        clean(item.country).toLowerCase(),
        item.entry_year,
        (item.offers || []).map(offer => `${clean(offer.school)}|${clean(offer.major)}`).sort().join(';')
      ].join('||');
      if (seenContent.has(key)) warnings.push(`${label}：可能与案例 #${seenContent.get(key)} 重复`);
      else seenContent.set(key, item.id);
    }
    return { errors, warnings };
  }

  function nextId(items) {
    return Math.max(0, ...(items || []).map(item => Number(item.id) || 0)) + 1;
  }

  return {
    TIER_VALUES,
    RANK_VALUES,
    HEADER_ALIASES,
    normalizeRank,
    inferTier,
    bestRank,
    normalizeOffer,
    normalizeCase,
    rowsToCases,
    parseCSV,
    validateCases,
    nextId
  };
});
