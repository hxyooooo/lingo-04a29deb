import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 数据库连接配置
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'lingo_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 测试数据库连接
db.getConnection((err, connection) => {
  if (err) {
    console.error('数据库连接失败:', err);
  } else {
    console.log('数据库连接成功');
    connection.release();
  }
});

// API路由
// 获取所有文化遗产
app.get('/api/heritage', (req, res) => {
  const sql = 'SELECT * FROM heritage_items';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

// 获取用户信息
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: '用户不存在' });
      return;
    }
    res.json(results[0]);
  });
});

// 获取食物营养信息
app.get('/api/foods', (req, res) => {
  const sql = 'SELECT * FROM foods';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

// 获取节气食谱
app.get('/api/seasonal_recipes', (req, res) => {
  const sql = 'SELECT * FROM seasonal_recipes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

// 获取古方食谱
app.get('/api/ancient_recipes', (req, res) => {
  const sql = 'SELECT * FROM ancient_recipes';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

// 获取健康数据
app.get('/api/health_data/:userId', (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM health_data WHERE user_id = ? ORDER BY created_at DESC';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      res.status(500).json({ error: '查询失败' });
      return;
    }
    res.json(results);
  });
});

// 创建新用户
app.post('/api/users', (req, res) => {
  const { name, age, gender, weight, height } = req.body;
  const sql = 'INSERT INTO users (name, age, gender, weight, height) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, age, gender, weight, height], (err, result) => {
    if (err) {
      console.error('插入失败:', err);
      res.status(500).json({ error: '插入失败' });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// 创建食物记录
app.post('/api/foods', (req, res) => {
  const { name, calories, protein, carbs, fat, category } = req.body;
  const sql = 'INSERT INTO foods (name, calories, protein, carbs, fat, category) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, calories, protein, carbs, fat, category], (err, result) => {
    if (err) {
      console.error('插入失败:', err);
      res.status(500).json({ error: '插入失败' });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// 创建节气食谱
app.post('/api/seasonal_recipes', (req, res) => {
  const { season, recipe_name, ingredients, instructions, health_benefits } = req.body;
  const sql = 'INSERT INTO seasonal_recipes (season, recipe_name, ingredients, instructions, health_benefits) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [season, recipe_name, ingredients, instructions, health_benefits], (err, result) => {
    if (err) {
      console.error('插入失败:', err);
      res.status(500).json({ error: '插入失败' });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// 创建古方食谱
app.post('/api/ancient_recipes', (req, res) => {
  const { dynasty, recipe_name, ingredients, preparation, cultural_significance } = req.body;
  const sql = 'INSERT INTO ancient_recipes (dynasty, recipe_name, ingredients, preparation, cultural_significance) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [dynasty, recipe_name, ingredients, preparation, cultural_significance], (err, result) => {
    if (err) {
      console.error('插入失败:', err);
      res.status(500).json({ error: '插入失败' });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// 创建健康数据
app.post('/api/health_data', (req, res) => {
  const { user_id, date, calories_consumed, water_intake, steps, sleep_hours } = req.body;
  const sql = 'INSERT INTO health_data (user_id, date, calories_consumed, water_intake, steps, sleep_hours) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [user_id, date, calories_consumed, water_intake, steps, sleep_hours], (err, result) => {
    if (err) {
      console.error('插入失败:', err);
      res.status(500).json({ error: '插入失败' });
      return;
    }
    res.json({ id: result.insertId, ...req.body });
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});