export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (!token || !databaseId) return res.status(500).json({ error: 'Missing NOTION_TOKEN or NOTION_DATABASE_ID' });

  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ page_size: 100 })
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });

    const cases = (data.results || []).map((page, idx) => {
      const p = page.properties || {};
      const getTitle = (name) => p[name]?.title?.[0]?.plain_text || '';
      const getText = (name) => p[name]?.rich_text?.[0]?.plain_text || '';
      const getSelect = (name) => p[name]?.select?.name || '';
      const getNumber = (name) => p[name]?.number ?? '';
      const getCheck = (name) => p[name]?.checkbox ?? true;

      return {
        id: page.id || idx + 1,
        title: getTitle('标题') || `案例 ${idx + 1}`,
        background: getText('背景') || '背景待补充',
        major: getSelect('专业方向') || '未分类',
        country: getSelect('地区') || '未分类',
        degree: getSelect('学历层级') || '未分类',
        result: getSelect('结果标签') || '普通录取',
        school: getText('录取院校') || '待更新',
        details: getText('案例详情') || '暂无详情',
        year: getNumber('年份') || '' ,
        visible: getCheck('是否展示')
      };
    }).filter((item) => item.visible);

    res.status(200).json({ cases });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
}
