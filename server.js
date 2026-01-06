import express from 'express';
import mysql from 'mysql2/promise'; // 使用 promise 版本，代码更简洁
import cors from 'cors';

const app = express();
const port = 3001; // 后端服务端口

// 1. 中间件配置
app.use(cors()); // 允许前端跨域访问
app.use(express.json()); // 解析 JSON 请求体

// 2. 数据库连接配置
const dbConfig = {
    host: 'localhost',       // 阿里云数据库公网地址 (如果是本地测试填 localhost)
    user: 'root',           // 数据库用户名
    password: '123456',    // 数据库密码
    database: 'lingo_db'    // 数据库名称
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 3. 数据库初始化 (自动创建表)
async function initDB() {
    try {
        const connection = await pool.getConnection();
        await connection.query(`
            CREATE TABLE IF NOT EXISTS food_items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(100),
                calories INT,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        connection.release();
        console.log('数据库连接成功，表检查完毕。');
    } catch (err) {
        console.error('数据库连接失败:', err);
    }
}

initDB();

// 4. CRUD 接口实现

// 查询 (Read)
app.get('/api/food', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM food_items ORDER BY created_at DESC');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 新增 {
    const { name, category, calories, description } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO food_items (name, category, calories, description) VALUES (?, ?, ?, ?)',
            [name, category, calories, description]
        );
        res.status(201).json({ id: result.insertId, name, category, calories, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 修改 {
    const { name, category, calories, description } = req.body;
    const { id } = req.params;
    try {
        await pool.query(
            'UPDATE food_items SET name=?, category=?, calories=?, description=? WHERE id=?',
            [name, category, calories, description, id]
        );
        res.json({ message: '更新成功', id, name, category, calories, description });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 删除 (Delete)
app.delete('/api/food/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM food_items WHERE id = ?', [id]);
        res.json({ message: '删除成功', id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 启动服务
app.listen(port, () => {
    console.log(`后端服务运行在 http://localhost:${port}`);
});
