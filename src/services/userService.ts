import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

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
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM users WHERE id = ?',
    [id]
  );
  
  if (rows.length > 0) {
    const user = rows[0] as User;
    return user;
  }
  
  return null;
};

export const createUser = async (userData: Omit<User, 'id'>): Promise<number> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'INSERT INTO users (name, email, goal, weight, height, age) VALUES (?, ?, ?, ?, ?, ?)',
    [userData.name, userData.email, userData.goal, userData.weight, userData.height, userData.age]
  );
  
  return result.insertId;
};

export const updateUser = async (id: number, userData: Partial<User>): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE users SET name = ?, email = ?, goal = ?, weight = ?, height = ?, age = ? WHERE id = ?',
    [userData.name, userData.email, userData.goal, userData.weight, userData.height, userData.age, id]
  );
  
  return result.affectedRows > 0;
};