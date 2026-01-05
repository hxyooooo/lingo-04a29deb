import { api } from '../config/api';

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
  try {
    const foods = await api.getFoods();
    return foods;
  } catch (error) {
    console.error('获取食物信息失败:', error);
    return [];
  }
};

export const getFoodById = async (id: number): Promise<Food | null> => {
  try {
    const food = await api.getFoodById(id);
    return food;
  } catch (error) {
    console.error('获取食物信息失败:', error);
    return null;
  }
};

export const createFood = async (foodData: Omit<Food, 'id'>): Promise<number | null> => {
  try {
    const food = await api.createFood(foodData);
    return food.id;
  } catch (error) {
    console.error('创建食物失败:', error);
    return null;
  }
};