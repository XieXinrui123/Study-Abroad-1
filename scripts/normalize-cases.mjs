import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, '..', 'cases.json');
const payload = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const sourceCases = Array.isArray(payload) ? payload : payload.cases;

if (!Array.isArray(sourceCases)) {
  throw new Error('cases.json 必须是案例数组，或包含 cases 数组。');
}

const canonicalSchoolNames = new Map([
  ['南安普敦大学', '南安普顿大学'],
  ['南安普敦', '南安普顿大学'],
  ['南安普顿', '南安普顿大学'],
  ['澳洲国立大学', '澳大利亚国立大学'],
  ['澳洲国立', '澳大利亚国立大学'],
  ['南洋理工大学大学', '南洋理工大学'],
  ['西交利物浦', '西交利物浦大学'],
  ['UCL', '伦敦大学学院（UCL）'],
  ['伦敦大学学院', '伦敦大学学院（UCL）']
]);

function normalizeSchoolName(name) {
  const cleaned = String(name || '').trim();
  return canonicalSchoolNames.get(cleaned) || cleaned;
}

function inferRegion(school) {
  const name = String(school || '').toLowerCase();
  if (!name) return '';
  if (name === '保研') return '国内';
  if (name.includes('香港')) return '香港';
  if (name.includes('澳门')) return '澳门';
  if (name.includes('新加坡') || name.includes('南洋理工')) return '新加坡';
  if (name.includes('西交利物浦') || name.includes('宁波诺丁汉') || name.includes('北师珠')) return '中外合办';
  if (['悉尼', '墨尔本', '新南威尔士', '莫纳什', '昆士兰', '阿德莱德', '澳大利亚国立'].some(key => name.includes(key))) return '澳大利亚';
  if (name.includes('奥克兰')) return '新西兰';
  if (['曼彻斯特', '伦敦', 'ucl', '格拉斯哥', '南安普顿', '布里斯托', '利兹', '杜伦', '伯明翰', '谢菲尔德', '诺丁汉', '华威', '约克', '纽卡斯尔', '爱丁堡', '帝国理工', '兰卡斯特', '巴斯', '利物浦'].some(key => name.includes(key))) return '英国';
  return '';
}

function normalizeCase(item) {
  const offers = Array.isArray(item.offers)
    ? item.offers.map(offer => ({
        school: normalizeSchoolName(offer.school),
        major: String(offer.major || '待更新').trim(),
        rank: String(offer.rank || item.result || '待更新').trim()
      }))
    : [];

  const inferredRegions = [...new Set(offers.map(offer => inferRegion(offer.school)).filter(Boolean))];
  let country = String(item.country || '未分类').trim();
  if (country === '未分类' && inferredRegions.length === 1) {
    country = inferredRegions[0];
  }
  if (country === '国内' && inferredRegions.length === 1 && inferredRegions[0] !== '国内') {
    country = inferredRegions[0];
  }

  return {
    ...item,
    student_school: String(item.student_school || '').trim(),
    student_major: String(item.student_major || item.major || '专业未填写').trim(),
    gpa: String(item.gpa || '未填写').trim(),
    language_score: String(item.language_score || '未填写').trim() || '未填写',
    country,
    degree: item.id === 303 ? '硕士' : String(item.degree || '硕士').trim(),
    result: String(item.result || '待更新').trim(),
    offers,
    note: String(item.note || '').trim()
  };
}

function duplicateKey(item) {
  return JSON.stringify([
    item.student_school,
    item.student_major,
    item.gpa,
    item.language_score,
    item.country,
    item.degree,
    item.result,
    item.offers,
    item.entry_year,
    item.tier,
    item.note
  ]);
}

const normalized = sourceCases.map(normalizeCase);
const seen = new Set();
const duplicates = [];
const deduplicated = normalized.filter(item => {
  const key = duplicateKey(item);
  if (seen.has(key)) {
    duplicates.push(item.id);
    return false;
  }
  seen.add(key);
  return true;
});

fs.writeFileSync(dataPath, `${JSON.stringify(deduplicated, null, 2)}\n`);
console.log(`案例数据已规范化：${sourceCases.length} → ${deduplicated.length} 条。`);
if (duplicates.length) console.log(`移除重复案例 ID：${duplicates.join(', ')}`);
