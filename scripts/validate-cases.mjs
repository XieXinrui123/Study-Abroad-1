import fs from 'node:fs';
import Core from '../cases-manager-core.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.resolve(scriptDir, '..', 'cases.json');
const cases = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const errors = [];
const ids = new Set();
const requiredTextFields = [
  'student_school',
  'student_major',
  'gpa',
  'language_score',
  'country',
  'degree',
  'result',
  'tier',
  'note'
];

if (!Array.isArray(cases)) {
  throw new Error('cases.json 顶层必须是数组。');
}

for (const [index, item] of cases.entries()) {
  if (!Number.isInteger(item.id) || ids.has(item.id)) {
    errors.push(`第 ${index + 1} 条案例的 ID 无效或重复`);
  }
  ids.add(item.id);
  const knownTier = Core.knownSchoolTier(item.student_school);
  if (knownTier && knownTier !== item.tier) errors.push(`案例 #${item.id} 的院校层次应为 ${knownTier}，当前为 ${item.tier}`);
  if (!Core.entryYear(item.entry_year)) errors.push(`案例 #${item.id} 的入学年份无效`);
  for (const field of requiredTextFields) {
    if (typeof item[field] !== 'string') errors.push(`案例 #${item.id} 缺少文本字段 ${field}`);
  }
  if (!Array.isArray(item.offers)) {
    errors.push(`案例 #${item.id} 的 offers 不是数组`);
    continue;
  }
  for (const [offerIndex, offer] of item.offers.entries()) {
    for (const field of ['school', 'major', 'rank']) {
      if (typeof offer[field] !== 'string' || !offer[field].trim()) {
        errors.push(`案例 #${item.id} 的第 ${offerIndex + 1} 个 Offer 缺少 ${field}`);
      }
    }
  }
}

const byId = [...cases].sort((a, b) => a.id - b.id);
for (const [index, item] of byId.entries()) {
  if (item.id !== index + 1) errors.push(`案例编号应连续，位置 ${index + 1} 当前为 #${item.id}`);
  if (index && Core.entryYear(item.entry_year) < Core.entryYear(byId[index - 1].entry_year)) {
    errors.push(`案例 #${item.id} 的入学年份早于较小编号案例，请按年份重新编号`);
  }
}

if (errors.length) {
  console.error(errors.slice(0, 30).join('\n'));
  process.exitCode = 1;
} else {
  const years = [...new Set(cases.map(item => item.entry_year).filter(Boolean))].sort();
  const regions = [...new Set(cases.flatMap(item => item.country.split('/')))].sort();
  console.log(`校验通过：${cases.length} 条案例，${ids.size} 个唯一 ID。`);
  console.log(`入学年份：${years.join('、')}；原始地区标签：${regions.join('、')}。`);
}
