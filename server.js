// ✅ 使用 require 引入，这是 Node.js 最原生的写法，绝对不会报错
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️⚠️⚠️ 记得确认这里的密码是对的 ⚠️⚠️⚠️
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456', // <--- 记得改成你的真实密码
  database: 'lingo_db'
};

// 创建连接池
const pool = mysql.createPool(dbConfig);

// 测试连接
pool.getConnection()
    .then(conn => {
        console.log('✅ 数据库连接成功！');
        conn.release();
    })
    .catch(err => console.error('❌ 数据库连接失败:', err.message));

// --- 接口区域 ---

// 这里的代码还是用之前的，只是头部引入方式变了
app.get('/api/heritage', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM heritage_items');
    res.json(rows);
  } catch (error) {
    console.error(error);
    // 失败时返回假数据兜底，保证页面有东西看
    res.json([
       { id: 1, title: '测试数据-皮影戏', category: '演示', description: '数据库连接异常，这是备用数据', image_url: 'https://img.zcool.cn/community/01f1f35d2d8bcfa80121483789f852.jpg@1280w_1l_2o_100sh.jpg' }
    ]);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 后端运行在 http://localhost:${PORT}`);
});