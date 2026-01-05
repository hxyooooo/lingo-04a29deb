import { api } from '../config/api';

interface User {
  id: number;
  name: string;
  email: string;
  goal: string;
  weight: number;
  height: number;
  age: number;
}

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const user = await api.getUser(id);
    return user;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<User | null> => {
  try {
    const user = await api.createUser(userData);
    return user;
  } catch (error) {
    console.error('创建用户失败:', error);
    return null;
  }
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
  // 暂时使用mock实现，后续可扩展API
  console.log('更新用户信息:', id, userData);
  return true;
};