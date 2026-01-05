import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface AncientRecipe {
  id: number;
  name: string;
  source: string;
  summary: string;
  modernRecipe: string;
  illustration: string;
}

export const getAllAncientRecipes = async (): Promise<AncientRecipe[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM ancient_recipes ORDER BY id'
  );
  
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    source: row.source,
    summary: row.summary,
    modernRecipe: row.modern_recipe,
    illustration: row.illustration
  }));
};

export const getAncientRecipeById = async (id: number): Promise<AncientRecipe | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    'SELECT * FROM ancient_recipes WHERE id = ?',
    [id]
  );
  
  if (rows.length > 0) {
    const row = rows[0];
    return {
      id: row.id,
      name: row.name,
      source: row.source,
      summary: row.summary,
      modernRecipe: row.modern_recipe,
      illustration: row.illustration
    };
  }
  
  return null;
};

export const createAncientRecipe = async (recipeData: Omit<AncientRecipe, 'id'>): Promise<number> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO ancient_recipes (name, source, summary, modern_recipe, illustration) 
     VALUES (?, ?, ?, ?, ?)`,
    [recipeData.name, recipeData.source, recipeData.summary, recipeData.modernRecipe, recipeData.illustration]
  );
  
  return result.insertId;
};