(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.CasesManagerCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  // Exact names only: do not inherit a parent university tier for an independent college.
  const SCHOOL_TIERS = {
  "北京大学": "985",
  "清华大学": "985",
  "复旦大学": "985",
  "上海交通大学": "985",
  "上海交大": "985",
  "浙江大学": "985",
  "中国科学技术大学": "985",
  "中国科大": "985",
  "南京大学": "985",
  "中国人民大学": "985",
  "北京航空航天大学": "985",
  "北京理工大学": "985",
  "北京师范大学": "985",
  "中国农业大学": "985",
  "中国农大": "985",
  "中央民族大学": "985",
  "中央民族": "985",
  "同济大学": "985",
  "华东师范大学": "985",
  "华东师范": "985",
  "南开大学": "985",
  "天津大学": "985",
  "哈尔滨工业大学": "985",
  "吉林大学": "985",
  "大连理工大学": "985",
  "大连理工": "985",
  "东北大学": "985",
  "山东大学": "985",
  "中国海洋大学": "985",
  "中国海大": "985",
  "西安交通大学": "985",
  "西安交大": "985",
  "西北工业大学": "985",
  "西北工业": "985",
  "西北农林科技大学": "985",
  "西北农林": "985",
  "武汉大学": "985",
  "华中科技大学": "985",
  "华中科大": "985",
  "中南大学": "985",
  "湖南大学": "985",
  "国防科技大学": "985",
  "国防科大": "985",
  "中山大学": "985",
  "华南理工大学": "985",
  "华南理工": "985",
  "四川大学": "985",
  "电子科技大学": "985",
  "电子科大": "985",
  "重庆大学": "985",
  "厦门大学": "985",
  "兰州大学": "985",
  "东南大学": "985",
  "北京交通大学": "211",
  "北京工业大学": "211",
  "北京科技大学": "211",
  "北京化工大学": "211",
  "北京邮电大学": "211",
  "北京林业大学": "211",
  "北京中医药大学": "211",
  "北京外国语大学": "211",
  "中国传媒大学": "211",
  "中央财经大学": "211",
  "对外经济贸易大学": "211",
  "对外经贸": "211",
  "中国政法大学": "211",
  "华北电力大学": "211",
  "中国矿业大学（北京）": "211",
  "中国矿业大学北京": "211",
  "矿大北京": "211",
  "中国石油大学（北京）": "211",
  "中国石油大学北京": "211",
  "中石大北京": "211",
  "中国地质大学（北京）": "211",
  "中国地质大学北京": "211",
  "地大北京": "211",
  "北京体育大学": "211",
  "中央音乐学院": "211",
  "上海财经大学": "211",
  "上海外国语大学": "211",
  "华东理工大学": "211",
  "东华大学": "211",
  "上海大学": "211",
  "海军军医大学": "211",
  "第二军医大学": "211",
  "南京航空航天大学": "211",
  "南京理工大学": "211",
  "河海大学": "211",
  "江南大学": "211",
  "中国矿业大学": "211",
  "南京农业大学": "211",
  "中国药科大学": "211",
  "南京师范大学": "211",
  "苏州大学": "211",
  "福州大学": "211",
  "安徽大学": "211",
  "合肥工业大学": "211",
  "南昌大学": "211",
  "郑州大学": "211",
  "武汉理工大学": "211",
  "武汉理工": "211",
  "中国地质大学（武汉）": "211",
  "中国地质大学武汉": "211",
  "地大武汉": "211",
  "中国地质大学": "211",
  "华中农业大学": "211",
  "华中师范大学": "211",
  "中南财经政法大学": "211",
  "中南财大": "211",
  "湖南师范大学": "211",
  "湖南师大": "211",
  "暨南大学": "211",
  "华南师范大学": "211",
  "华南师大": "211",
  "广西大学": "211",
  "海南大学": "211",
  "西南交通大学": "211",
  "西南交大": "211",
  "西南财经大学": "211",
  "西南财大": "211",
  "四川农业大学": "211",
  "贵州大学": "211",
  "云南大学": "211",
  "西藏大学": "211",
  "西北大学": "211",
  "西安电子科技大学": "211",
  "长安大学": "211",
  "陕西师范大学": "211",
  "空军军医大学": "211",
  "第四军医大学": "211",
  "青海大学": "211",
  "宁夏大学": "211",
  "新疆大学": "211",
  "石河子大学": "211",
  "中国石油大学（华东）": "211",
  "中国石油大学华东": "211",
  "中石大华东": "211",
  "哈尔滨工程大学": "211",
  "东北林业大学": "211",
  "东北林大": "211",
  "东北农业大学": "211",
  "东北农大": "211",
  "辽宁大学": "211",
  "大连海事大学": "211",
  "延边大学": "211",
  "东北师范大学": "211",
  "东北师大": "211",
  "内蒙古大学": "211",
  "河北工业大学": "211",
  "太原理工大学": "211",
  "太原理工": "211",
  "天津医科大学": "211",
  "北京协和医学院": "211",
  "厦门大学马来西亚分校": "海外本科",
  "澳门城市大学": "海外本科",
  "澳门城市": "海外本科",
  "PSB Academy": "海外本科",
  "西交利物浦大学": "海外本科",
  "西交利物浦": "海外本科",
  "阿姆斯特丹大学": "海外本科",
  "宁波诺丁汉大学": "海外本科",
  "宁波诺丁汉": "海外本科",
  "上海纽约大学": "海外本科",
  "昆山杜克大学": "海外本科",
  "广东以色列理工学院": "海外本科",
  "温州肯恩大学": "海外本科",
  "深圳北理莫斯科大学": "海外本科",
  "香港中文大学": "海外本科",
  "香港大学": "海外本科",
  "香港科技大学": "海外本科",
  "香港城市大学": "海外本科",
  "香港理工大学": "海外本科",
  "香港浸会大学": "海外本科",
  "香港岭南大学": "海外本科",
  "香港教育大学": "海外本科",
  "香港演艺学院": "海外本科",
  "澳门科技大学": "海外本科",
  "澳门大学": "海外本科"
};

  function knownSchoolTier(school) {
    const name = String(school ?? "").trim().replace(/\s+/g, "").replace(/（/g, "(").replace(/）/g, ")");
    const entry = Object.entries(SCHOOL_TIERS).find(([key]) => key.replace(/\s+/g, "").replace(/（/g, "(").replace(/）/g, ")") === name);
    return entry ? entry[1] : "";
  }

  function entryYear(value) {
    const text = String(value ?? "").trim();
    return /^\d{4}(?:年)?$/.test(text) ? Number(text.slice(0, 4)) : 0;
  }

  function compareLatest(a, b) {
    return entryYear(b.entry_year) - entryYear(a.entry_year) || Number(b.id) - Number(a.id);
  }

  function compareIdDesc(a, b) {
    return Number(b.id) - Number(a.id);
  }

  function compareChronological(a, b) {
    return entryYear(a.entry_year) - entryYear(b.entry_year) || Number(a.id) - Number(b.id);
  }

  function renumberCases(items) {
    return [...items].sort(compareChronological)
      .map((item, index) => ({ ...item, id: index + 1 }))
      .sort(compareIdDesc);
  }

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
    const known = knownSchoolTier(school);
    if (known) return known;
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
    const yearValue = entryYear(item?.entry_year ?? item?.入学年份);
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
      entry_year: yearValue || null,
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
      const knownTier = knownSchoolTier(item.student_school);
      if (knownTier && knownTier !== item.tier) errors.push(`${label}：${item.student_school} 应标为 ${knownTier}，当前为 ${item.tier}`);
      if (!entryYear(item.entry_year)) errors.push(`${label}：请填写四位数入学年份`);
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
    knownSchoolTier,
    entryYear,
    compareLatest,
    compareIdDesc,
    compareChronological,
    renumberCases,
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
