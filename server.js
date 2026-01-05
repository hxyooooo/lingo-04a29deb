import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors()); // 允许前端访问
app.use(express.json());

// ⚠️⚠️⚠️ 请在这里填入你的数据库密码 ⚠️⚠️⚠️
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '123456', // <--- 记得改这里！！！
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
    .catch(err => console.error('❌ 数据库连接失败，请检查密码:', err.message));

// --- 接口区域 ---

// 接口：获取所有文化遗产数据
app.get('/api/heritage', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM heritage_items');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '数据库查询失败' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 后端运行在 http://localhost:${PORT}`);
});