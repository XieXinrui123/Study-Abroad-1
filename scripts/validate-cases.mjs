import fs from 'node:fs';
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

if (errors.length) {
  console.error(errors.slice(0, 30).join('\n'));
  process.exitCode = 1;
} else {
  const years = [...new Set(cases.map(item => item.entry_year).filter(Boolean))].sort();
  const regions = [...new Set(cases.flatMap(item => item.country.split('/')))].sort();
  console.log(`校验通过：${cases.length} 条案例，${ids.size} 个唯一 ID。`);
  console.log(`入学年份：${years.join('、')}；原始地区标签：${regions.join('、')}。`);
}
