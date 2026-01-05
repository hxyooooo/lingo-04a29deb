import mysql from 'mysql2/promise';

// 数据库连接配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ai_health_diet',
  port: parseInt(process.env.DB_PORT || '3306'),
};

// 创建数据库连接池
export const pool = mysql.createPool(dbConfig);

// 测试数据库连接
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('数据库连接成功');
    connection.release();
  } catch (error) {
    console.error('数据库连接失败:', error);
    throw error;
  }
};

// 初始化数据库表
export const initializeDatabase = async () => {
  const connection = await pool.getConnection();
  
  try {
    // 创建用户表
    await connection.query(`
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
    await connection.query(`
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
    await connection.query(`
      CREATE TABLE IF NOT EXISTS food_steps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        food_id INT,
        step_number INT,
        step_description TEXT,
        FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE
      )
    `);
    
    // 创建节气食谱表
    await connection.query(`
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
    await connection.query(`
      CREATE TABLE IF NOT EXISTS seasonal_recipe_ingredients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT,
        ingredient VARCHAR(255),
        FOREIGN KEY (recipe_id) REFERENCES seasonal_recipes(id) ON DELETE CASCADE
      )
    `);
    
    // 创建节气食谱制作步骤表
    await connection.query(`
      CREATE TABLE IF NOT EXISTS seasonal_recipe_instructions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        recipe_id INT,
        step_number INT,
        instruction TEXT,
        FOREIGN KEY (recipe_id) REFERENCES seasonal_recipes(id) ON DELETE CASCADE
      )
    `);
    
    // 创建古方食谱表
    await connection.query(`
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
    await connection.query(`
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
  } catch (error) {
    console.error('初始化数据库失败:', error);
    throw error;
  } finally {
    connection.release();
  }
};