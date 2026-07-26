import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const outputDir = path.join(projectDir, 'outputs', '019f9ea7-c450-7552-b241-b683f9cfc2d3');
const outputPath = path.join(outputDir, '案例批量导入模板.xlsx');
const previewInputPath = path.join(outputDir, '案例批量导入模板-预览.png');
const previewGuidePath = path.join(outputDir, '案例批量导入模板-填写说明.png');

const workbook = Workbook.create();
const input = workbook.worksheets.add('案例批量导入');
const guide = workbook.worksheets.add('填写说明');

const navy = '#103B8F';
const blue = '#1859D1';
const paleBlue = '#EAF2FF';
const orange = '#F58220';
const paleOrange = '#FFF3E8';
const ink = '#17243B';
const muted = '#65738A';
const line = '#DCE4F0';
const white = '#FFFFFF';

input.showGridLines = false;
input.getRange('A1:M1').merge();
input.getRange('A1').values = [['DreamBridge 案例批量导入模板']];
input.getRange('A1:M1').format = {
  fill: navy,
  font: { bold: true, color: white, size: 18 },
  verticalAlignment: 'center',
  horizontalAlignment: 'left'
};
input.getRange('A1:M1').format.rowHeight = 36;

input.getRange('A2:M2').merge();
input.getRange('A2').values = [[
  '同一位学生有多个 Offer 时，请重复填写相同“案例编号”，每个 Offer 占一行；浅黄色列为必填。导入时读取第一个工作表。'
]];
input.getRange('A2:M2').format = {
  fill: paleOrange,
  font: { color: '#8A4A13', size: 10 },
  verticalAlignment: 'center',
  wrapText: true
};
input.getRange('A2:M2').format.rowHeight = 30;

const headers = [
  '案例编号', '本科院校', '本科层次', '本科专业', 'GPA/均分', '语言成绩', '申请地区',
  '学历', '入学年份', '备注', '录取院校', '录取专业', '录取层次'
];
input.getRange('A4:M4').values = [headers];
input.getRange('A4:M4').format = {
  fill: blue,
  font: { bold: true, color: white },
  horizontalAlignment: 'center',
  verticalAlignment: 'center',
  wrapText: true,
  borders: { preset: 'inside', style: 'thin', color: '#8EB2EF' }
};
input.getRange('A4:M4').format.rowHeight = 32;

const samples = [
  [503, '中山大学', '985', '金融学', '88', 'IELTS 7.0', '香港/新加坡', '硕士', 2027, '示例：同一案例可填写多行', '香港大学', '金融学', 'QS前50'],
  [503, '中山大学', '985', '金融学', '88', 'IELTS 7.0', '香港/新加坡', '硕士', 2027, '示例：同一案例可填写多行', '新加坡国立大学', '金融工程', 'QS前10'],
  [504, '宁波诺丁汉大学', '中外合办', '计算机科学', '3.6/4.0', 'IELTS 6.5', '英国', '硕士', 2027, '', '曼彻斯特大学', '高级计算机科学', 'QS前50']
];
input.getRange('A5:M7').values = samples;
input.getRange('A5:M7').format = {
  font: { color: ink },
  verticalAlignment: 'center',
  wrapText: true,
  borders: {
    insideHorizontal: { style: 'thin', color: line },
    bottom: { style: 'thin', color: line }
  }
};
input.getRange('A5:M7').format.rowHeight = 30;
input.getRange('A5:M7').format.fill = '#FAFCFF';
input.getRange('A5:A7').format.fill = paleOrange;
input.getRange('B5:D7').format.fill = paleOrange;
input.getRange('G5:G7').format.fill = paleOrange;
input.getRange('K5:M7').format.fill = paleOrange;

const widths = [11, 22, 13, 20, 13, 15, 18, 11, 12, 26, 24, 24, 14];
widths.forEach((width, index) => {
  input.getRangeByIndexes(0, index, 200, 1).format.columnWidth = width;
});
input.getRange('A5:A500').format.numberFormat = '0';
input.getRange('I5:I500').format.numberFormat = '0';
input.getRange('A5:A500').format.horizontalAlignment = 'center';
input.getRange('C5:C500').format.horizontalAlignment = 'center';
input.getRange('H5:I500').format.horizontalAlignment = 'center';
input.getRange('M5:M500').format.horizontalAlignment = 'center';

input.getRange('C5:C500').dataValidation = {
  rule: { type: 'list', values: ['985', '211', '双非', '海外本科', '中外合办'] }
};
input.getRange('H5:H500').dataValidation = {
  rule: { type: 'list', values: ['硕士', '本科', '博士'] }
};
input.getRange('I5:I500').dataValidation = {
  rule: { type: 'whole', operator: 'between', formula1: 2024, formula2: 2036 }
};
input.getRange('M5:M500').dataValidation = {
  rule: { type: 'list', values: ['QS前10', 'QS前50', 'QS前100', '海外名校', '中外合办', '待更新'] }
};
input.tables.add('A4:M7', true, 'CasesImportTable').style = 'TableStyleMedium2';
input.freezePanes.freezeRows(4);

guide.showGridLines = false;
guide.getRange('A1:F1').merge();
guide.getRange('A1').values = [['填写说明与导入规则']];
guide.getRange('A1:F1').format = {
  fill: navy,
  font: { bold: true, color: white, size: 18 },
  verticalAlignment: 'center'
};
guide.getRange('A1:F1').format.rowHeight = 36;

guide.getRange('A3:F3').merge();
guide.getRange('A3').values = [['推荐流程']];
guide.getRange('A3:F3').format = { fill: blue, font: { bold: true, color: white } };
guide.getRange('A4:F8').values = [
  ['步骤', '操作', '', '', '', ''],
  ['1', '复制“案例批量导入”中的示例行，替换成新案例。', '', '', '', ''],
  ['2', '同一学生的每个 Offer 占一行，并重复使用相同案例编号。', '', '', '', ''],
  ['3', '保存为 .xlsx；不要改动第 4 行表头名称。', '', '', '', ''],
  ['4', '打开 cases-manager.html，点击“导入 JSON / CSV / Excel”。', '', '', '', '']
];
for (let row = 4; row <= 8; row += 1) guide.getRange(`B${row}:F${row}`).merge();
guide.getRange('A4:F8').format = {
  wrapText: true,
  verticalAlignment: 'center',
  borders: { preset: 'inside', style: 'thin', color: line }
};
guide.getRange('A4:F4').format = { fill: paleBlue, font: { bold: true, color: navy } };
guide.getRange('A5:A8').format = { fill: paleOrange, font: { bold: true, color: orange }, horizontalAlignment: 'center' };
guide.getRange('A4:F8').format.rowHeight = 28;

guide.getRange('A10:F10').merge();
guide.getRange('A10').values = [['字段规则']];
guide.getRange('A10:F10').format = { fill: blue, font: { bold: true, color: white } };
guide.getRange('A11:C17').values = [
  ['字段', '是否必填', '说明'],
  ['案例编号', '是', '正整数；同一学生的多行必须相同。建议从当前最大编号继续。'],
  ['本科层次', '是', '从下拉菜单选择；中外合办院校可选“中外合办”，导入后会统一归入“双非”或按需调整。'],
  ['申请地区', '是', '多个地区使用 / 分隔，例如：香港/英国。'],
  ['GPA/均分', '建议', '可以填 86、3.6/4.0、3.9/5.0 等原始写法。'],
  ['语言成绩', '建议', '例如 IELTS 7.0、TOEFL 100；未出分可写“未填写”。'],
  ['录取层次', '是', '从下拉菜单选择；管理器会自动把最高层次写入 result。']
];
guide.getRange('A11:C17').format = {
  wrapText: true,
  verticalAlignment: 'center',
  borders: { preset: 'all', style: 'thin', color: line }
};
guide.getRange('A11:C11').format = { fill: paleBlue, font: { bold: true, color: navy } };
guide.getRange('B12:B17').format.horizontalAlignment = 'center';
guide.getRange('A11:C17').format.rowHeight = 34;

guide.getRange('A19:F19').merge();
guide.getRange('A19').values = [['注意事项']];
guide.getRange('A19:F19').format = { fill: orange, font: { bold: true, color: white } };
guide.getRange('A20:F23').values = [
  ['•', '请勿在案例中写入学生姓名、手机号、微信号等不应公开的个人信息。', '', '', '', ''],
  ['•', '导入完成后先处理红色错误；黄色提醒不会阻止导出。', '', '', '', ''],
  ['•', '导出的 cases.json 需要手动替换网站根目录中的同名文件。', '', '', '', ''],
  ['•', '建议每次更新前备份旧 cases.json，文件名可加日期。', '', '', '', '']
];
for (let row = 20; row <= 23; row += 1) guide.getRange(`B${row}:F${row}`).merge();
guide.getRange('A20:F23').format = { wrapText: true, verticalAlignment: 'center' };
guide.getRange('A20:A23').format = { font: { bold: true, color: orange }, horizontalAlignment: 'center' };
guide.getRange('A20:F23').format.rowHeight = 28;

guide.getRange('A1:A23').format.columnWidth = 11;
guide.getRange('B1:B23').format.columnWidth = 20;
guide.getRange('C1:C23').format.columnWidth = 46;
guide.getRange('D1:F23').format.columnWidth = 12;
guide.freezePanes.freezeRows(1);

await fs.mkdir(outputDir, { recursive: true });
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

const inputPreview = await workbook.render({ sheetName: '案例批量导入', range: 'A1:M12', scale: 1.15, format: 'png' });
await fs.writeFile(previewInputPath, new Uint8Array(await inputPreview.arrayBuffer()));
const guidePreview = await workbook.render({ sheetName: '填写说明', range: 'A1:F23', scale: 1.1, format: 'png' });
await fs.writeFile(previewGuidePath, new Uint8Array(await guidePreview.arrayBuffer()));

const inspection = await workbook.inspect({
  kind: 'workbook,sheet,table',
  maxChars: 5000,
  tableMaxRows: 8,
  tableMaxCols: 13,
  tableMaxCellChars: 80
});
console.log(inspection.ndjson || inspection);
console.log(JSON.stringify({ outputPath, previewInputPath, previewGuidePath }, null, 2));
