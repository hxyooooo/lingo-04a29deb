import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  heritage: {
    title: string;
    origin: string;
    steps: string[];
    category: string;
  };
}

export const getAllFoods = async (): Promise<Food[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT f.*, GROUP_CONCAT(fs.step_description ORDER BY fs.step_number) as steps
     FROM foods f
     LEFT JOIN food_steps fs ON f.id = fs.food_id
     GROUP BY f.id`
  );
  
  return rows.map(row => {
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
};

export const getFoodById = async (id: number): Promise<Food | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT f.*, GROUP_CONCAT(fs.step_description ORDER BY fs.step_number) as steps
     FROM foods f
     LEFT JOIN food_steps fs ON f.id = fs.food_id
     WHERE f.id = ?
     GROUP BY f.id`,
    [id]
  );
  
  if (rows.length > 0) {
    const row = rows[0];
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
  }
  
  return null;
};

export const createFood = async (foodData: Omit<Food, 'id'>): Promise<number> => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 插入食物基本信息
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO foods (name, calories, protein, carbs, fat, image, heritage_title, heritage_origin, heritage_category) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        foodData.name,
        foodData.calories,
        foodData.protein,
        foodData.carbs,
        foodData.fat,
        foodData.image,
        foodData.heritage.title,
        foodData.heritage.origin,
        foodData.heritage.category
      ]
    );
    
    const foodId = result.insertId;
    
    // 插入制作步骤
    if (foodData.heritage.steps && foodData.heritage.steps.length > 0) {
      for (let i = 0; i < foodData.heritage.steps.length; i++) {
        await connection.execute(
          'INSERT INTO food_steps (food_id, step_number, step_description) VALUES (?, ?, ?)',
          [foodId, i + 1, foodData.heritage.steps[i]]
        );
      }
    }
    
    await connection.commit();
    return foodId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};