console.log('Starting server...'); // 第一行加个日志，证明文件被读取了

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

console.log('Libraries loaded...'); // 证明依赖包没问题

// ⚠️⚠️⚠️ 数据库配置 (记得改密码) ⚠️⚠️⚠️
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456', // <--- 请确保这里填了密码
  database: 'lingo_db'
};

const pool = mysql.createPool(dbConfig);

// 这是一个测试接口，不查数据库，直接返回数据 (确保页面能显示)
app.get('/api/heritage', async (req, res) => {
  console.log('收到前端请求！'); // 前端请求过来时会打印
  res.json([
    {
      id: 1,
      title: '皮影戏 (测试)',
      category: '民间艺术',
      description: '这是来自后端的数据。',
      image_url: 'https://img.zcool.cn/community/01f1f35d2d8bcfa80121483789f852.jpg@1280w_1l_2o_100sh.jpg'
    },
    {
      id: 2,
      title: '苏绣 (测试)',
      category: '传统手工',
      description: '如果能看到这些字，说明前后端连通了。',
      image_url: 'https://img.zcool.cn/community/019c2957845f090000018c1b3f5c1d.jpg@1280w_1l_2o_100sh.jpg'
    }
  ]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 后端运行在 http://localhost:${PORT}`);
  console.log('✅ 等待前端请求中...');
});
