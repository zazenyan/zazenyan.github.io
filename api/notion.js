// api/notion.js
export default async function handler(req, res) {
    // 1. 设置跨域头，允许你的 GitHub Pages 域名访问这个 API
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有域名访问
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 处理预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. 从 Vercel 环境变量中安全读取你的机密数据
    const NOTION_SECRET = process.env.NOTION_SECRET;
    const DATABASE_ID = process.env.DATABASE_ID;

    if (!NOTION_SECRET || !DATABASE_ID) {
        return res.status(500).json({ error: "服务器环境变量未配置" });
    }

    try {
        // 3. 向 Notion 官方服务器发起加密请求
        const response = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            // 这里可以添加过滤和排序规则，目前先拉取所有文章
            body: JSON.stringify({
                sorts: [
                    {
                        property: "Date", // 假设你的 Notion 数据库里有 Date 这个属性
                        direction: "descending" // 按时间倒序排列
                    }
                ]
            })
        });

        const data = await response.json();
        
        // 4. 将抓取到的数据直接返回给前端
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}