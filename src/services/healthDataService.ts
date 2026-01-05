import { api } from '../config/api';

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
  try {
    const data = await api.getHealthData(userId);
    return data;
  } catch (error) {
    console.error('获取健康数据失败:', error);
    return null;
  }
};

export const createHealthData = async (healthData: Omit<HealthData, 'id'>): Promise<number | null> => {
  try {
    const data = await api.createHealthData(healthData);
    return data.id;
  } catch (error) {
    console.error('创建健康数据失败:', error);
    return null;
  }
};

export const updateHealthData = async (id: number, healthData: Partial<HealthData>): Promise<boolean> => {
  // 暂时使用mock实现，后续可扩展API
  console.log('更新健康数据:', id, healthData);
  return true;
};