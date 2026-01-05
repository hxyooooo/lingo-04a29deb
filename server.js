const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ai_health_diet',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// 测试数据库连接
const testConnection = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('数据库连接成功');
    await connection.end();
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw error;
  }
};

// 初始化数据库表
const initializeDatabase = async () => {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    // 创建用户表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        goal VARCHAR(50),
        weight DECIMAL(5,2),
        height DECIMAL(5,2),
        age INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建食物表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS foods (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        calories INT NOT NULL,
        protein DECIMAL(5,2),
        carbs DECIMAL(5,2),
        fat DECIMAL(5,2),
        image VARCHAR(500),
        heritage_title VARCHAR(500),
        heritage_origin TEXT,
        heritage_category VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建食物制作步骤表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS food_steps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_id INT,
        step_number INT,
        step_description TEXT,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
      )
    `);
    
    // 创建节气食谱表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS seasonal_recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        season VARCHAR(50) NOT NULL,
        recipe VARCHAR(255) NOT NULL,
        health_benefit TEXT,
        culture_note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建节气食谱食材表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS seasonal_recipe_ingredients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT,
        ingredient VARCHAR(255),
        FOREIGN KEY (recipe_id) REFERENCES seasonal_recipes(id) ON DELETE CASCADE
      )
    `);
    
    // 创建节气食谱制作步骤表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS seasonal_recipe_instructions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT,
        step_number INT,
        instruction TEXT,
        FOREIGN KEY (recipe_id) REFERENCES seasonal_recipes(id) ON DELETE CASCADE
      )
    `);
    
    // 创建古方食谱表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS ancient_recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        source VARCHAR(255) NOT NULL,
        summary TEXT,
        modern_recipe TEXT,
        illustration VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建健康数据表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS health_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        date DATE NOT NULL,
        calories INT,
        weight DECIMAL(5,2),
        protein DECIMAL(5,2),
        carbs DECIMAL(5,2),
        fat DECIMAL(5,2),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE KEY unique_user_date (user_id, date)
      )
    `);
    
    console.log('数据库表创建成功');
    await connection.end();
  } catch (error) {
    console.error('初始化数据库失败:', error);
    await connection.end();
    throw error;
  }
};

// 初始化数据库
testConnection().then(initializeDatabase).catch(console.error);

// API 路由
app.get('/api/users/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM users WHERE id = ?', [req.params.id]);
    await connection.end();
    
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { name, email, goal, weight, height, age } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, goal, weight, height, age) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, goal, weight, height, age]
    );
    await connection.end();
    
    res.json({ id: result.insertId, name, email, goal, weight, height, age });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/foods', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT f.*, GROUP_CONCAT(fs.step_description ORDER BY fs.step_number) as steps
       FROM foods f
       LEFT JOIN food_steps fs ON f.id = fs.food_id
       GROUP BY f.id
    `);
    await connection.end();
    
    const foods = rows.map(row => {
      const steps = row.steps ? row.steps.split(',') : [];
      return {
        id: row.id,
        name: row.name,
        calories: row.calories,
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        image: row.image,
        heritage: {
          title: row.heritage_title,
          origin: row.heritage_origin,
          steps: steps,
          category: row.heritage_category
        }
      };
    });
    
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/foods/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT f.*, GROUP_CONCAT(fs.step_description ORDER BY fs.step_number) as steps
       FROM foods f
       LEFT JOIN food_steps fs ON f.id = fs.food_id
       WHERE f.id = ?
       GROUP BY f.id
    `, [req.params.id]);
    await connection.end();
    
    if (rows.length > 0) {
      const row = rows[0];
      const steps = row.steps ? row.steps.split(',') : [];
      const food = {
        id: row.id,
        name: row.name,
        calories: row.calories,
        protein: row.protein,
        carbs: row.carbs,
        fat: row.fat,
        image: row.image,
        heritage: {
          title: row.heritage_title,
          origin: row.heritage_origin,
          steps: steps,
          category: row.heritage_category
        }
      };
      res.json(food);
    } else {
      res.status(404).json({ error: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/foods', async (req, res) => {
  try {
    const { name, calories, protein, carbs, fat, image, heritage } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    
    await connection.beginTransaction();
    
    // 插入食物基本信息
    const [result] = await connection.execute(
      `INSERT INTO foods (name, calories, protein, carbs, fat, image, heritage_title, heritage_origin, heritage_category) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        calories,
        protein,
        carbs,
        fat,
        image,
        heritage.title,
        heritage.origin,
        heritage.category
      ]
    );
    
    const foodId = result.insertId;
    
    // 插入制作步骤
    if (heritage.steps && heritage.steps.length > 0) {
      for (let i = 0; i < heritage.steps.length; i++) {
        await connection.execute(
          'INSERT INTO food_steps (food_id, step_number, step_description) VALUES (?, ?, ?)',
          [foodId, i + 1, heritage.steps[i]]
        );
      }
    }
    
    await connection.commit();
    await connection.end();
    
    res.json({ id: foodId, name, calories, protein, carbs, fat, image, heritage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/seasonal-recipes', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT sr.*, 
       GROUP_CONCAT(sri.ingredient ORDER BY sri.id) as ingredients,
       GROUP_CONCAT(srii.instruction ORDER BY srii.step_number) as instructions
       FROM seasonal_recipes sr
       LEFT JOIN seasonal_recipe_ingredients sri ON sr.id = sri.recipe_id
       LEFT JOIN seasonal_recipe_instructions srii ON sr.id = srii.recipe_id
       GROUP BY sr.id
    `);
    await connection.end();
    
    const recipes = rows.map(row => {
      const ingredients = row.ingredients ? row.ingredients.split(',') : [];
      const instructions = row.instructions ? row.instructions.split(',') : [];
      return {
        id: row.id,
        season: row.season,
        recipe: row.recipe,
        ingredients: ingredients,
        instructions: instructions,
        healthBenefit: row.health_benefit,
        cultureNote: row.culture_note
      };
    });
    
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/seasonal-recipes/:season', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT sr.*, 
       GROUP_CONCAT(sri.ingredient ORDER BY sri.id) as ingredients,
       GROUP_CONCAT(srii.instruction ORDER BY srii.step_number) as instructions
       FROM seasonal_recipes sr
       LEFT JOIN seasonal_recipe_ingredients sri ON sr.id = sri.recipe_id
       LEFT JOIN seasonal_recipe_instructions srii ON sr.id = srii.recipe_id
       WHERE sr.season = ?
       GROUP BY sr.id
    `, [req.params.season]);
    await connection.end();
    
    if (rows.length > 0) {
      const row = rows[0];
      const ingredients = row.ingredients ? row.ingredients.split(',') : [];
      const instructions = row.instructions ? row.instructions.split(',') : [];
      const recipe = {
        id: row.id,
        season: row.season,
        recipe: row.recipe,
        ingredients: ingredients,
        instructions: instructions,
        healthBenefit: row.health_benefit,
        cultureNote: row.culture_note
      };
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Seasonal recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/seasonal-recipes', async (req, res) => {
  try {
    const { season, recipe, ingredients, instructions, healthBenefit, cultureNote } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    
    await connection.beginTransaction();
    
    // 插入食谱基本信息
    const [result] = await connection.execute(
      `INSERT INTO seasonal_recipes (season, recipe, health_benefit, culture_note) 
       VALUES (?, ?, ?, ?)`,
      [season, recipe, healthBenefit, cultureNote]
    );
    
    const recipeId = result.insertId;
    
    // 插入食材
    if (ingredients && ingredients.length > 0) {
      for (const ingredient of ingredients) {
        await connection.execute(
          'INSERT INTO seasonal_recipe_ingredients (recipe_id, ingredient) VALUES (?, ?)',
          [recipeId, ingredient]
        );
      }
    }
    
    // 插入制作步骤
    if (instructions && instructions.length > 0) {
      for (let i = 0; i < instructions.length; i++) {
        await connection.execute(
          'INSERT INTO seasonal_recipe_instructions (recipe_id, step_number, instruction) VALUES (?, ?, ?)',
          [recipeId, i + 1, instructions[i]]
        );
      }
    }
    
    await connection.commit();
    await connection.end();
    
    res.json({ id: recipeId, season, recipe, ingredients, instructions, healthBenefit, cultureNote });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ancient-recipes', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM ancient_recipes ORDER BY id');
    await connection.end();
    
    const recipes = rows.map(row => ({
      id: row.id,
      name: row.name,
      source: row.source,
      summary: row.summary,
      modernRecipe: row.modern_recipe,
      illustration: row.illustration
    }));
    
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ancient-recipes/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM ancient_recipes WHERE id = ?', [req.params.id]);
    await connection.end();
    
    if (rows.length > 0) {
      const row = rows[0];
      const recipe = {
        id: row.id,
        name: row.name,
        source: row.source,
        summary: row.summary,
        modernRecipe: row.modern_recipe,
        illustration: row.illustration
      };
      res.json(recipe);
    } else {
      res.status(404).json({ error: 'Ancient recipe not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ancient-recipes', async (req, res) => {
  try {
    const { name, source, summary, modernRecipe, illustration } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      `INSERT INTO ancient_recipes (name, source, summary, modern_recipe, illustration) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, source, summary, modernRecipe, illustration]
    );
    await connection.end();
    
    res.json({ id: result.insertId, name, source, summary, modernRecipe, illustration });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health-data/:userId', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(`
      SELECT date, calories, weight 
       FROM health_data 
       WHERE user_id = ? 
       AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
       ORDER BY date`,
      [req.params.userId]
    );
    await connection.end();
    
    if (rows.length > 0) {
      const weeklyProgress = rows.map(row => ({
        day: new Date(row.date).toLocaleDateString('zh-CN', { weekday: 'short' }),
        calories: row.calories,
        weight: row.weight
      }));
      
      res.json({
        dailyCalories: 1800,
        dailyProtein: 80,
        dailyCarbs: 200,
        dailyFat: 60,
        weeklyProgress
      });
    } else {
      res.json({
        dailyCalories: 1800,
        dailyProtein: 80,
        dailyCarbs: 200,
        dailyFat: 60,
        weeklyProgress: []
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/health-data', async (req, res) => {
  try {
    const { userId, date, calories, weight, protein, carbs, fat } = req.body;
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      `INSERT INTO health_data (user_id, date, calories, weight, protein, carbs, fat) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, date, calories, weight, protein, carbs, fat]
    );
    await connection.end();
    
    res.json({ id: result.insertId, userId, date, calories, weight, protein, carbs, fat });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`后端服务器运行在 http://localhost:${PORT}`);
});