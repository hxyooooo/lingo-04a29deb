import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface HealthData {
  id: number;
  userId: number;
  date: string;
  calories: number;
  weight: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface WeeklyProgress {
  day: string;
  calories: number;
  weight: number;
}

interface HealthDataSummary {
  dailyCalories: number;
  dailyProtein: number;
  dailyCarbs: number;
  dailyFat: number;
  weeklyProgress: WeeklyProgress[];
}

export const getHealthDataByUserId = async (userId: number): Promise<HealthDataSummary | null> => {
  // 获取用户最近一周的健康数据
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT date, calories, weight 
     FROM health_data 
     WHERE user_id = ? 
     AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
     ORDER BY date`,
    [userId]
  );
  
  if (rows.length === 0) {
    return null;
  }
  
  // 计算周度进度
  const weeklyProgress: WeeklyProgress[] = rows.map(row => ({
    day: new Date(row.date).toLocaleDateString('zh-CN', { weekday: 'short' }),
    calories: row.calories,
    weight: row.weight
  }));
  
  // 返回默认的每日目标值（后续可以存储在用户表中）
  return {
    dailyCalories: 1800,
    dailyProtein: 80,
    dailyCarbs: 200,
    dailyFat: 60,
    weeklyProgress
  };
};

export const createHealthData = async (healthData: Omit<HealthData, 'id'>): Promise<number> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO health_data (user_id, date, calories, weight, protein, carbs, fat) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [healthData.userId, healthData.date, healthData.calories, healthData.weight, healthData.protein, healthData.carbs, healthData.fat]
  );
  
  return result.insertId;
};

export const updateHealthData = async (id: number, healthData: Partial<HealthData>): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE health_data 
     SET calories = ?, weight = ?, protein = ?, carbs = ?, fat = ? 
     WHERE id = ?`,
    [healthData.calories, healthData.weight, healthData.protein, healthData.carbs, healthData.fat, id]
  );
  
  return result.affectedRows > 0;
};