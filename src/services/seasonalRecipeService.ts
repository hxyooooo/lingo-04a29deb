import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface SeasonalRecipe {
  id: number;
  season: string;
  recipe: string;
  ingredients: string[];
  instructions: string[];
  healthBenefit: string;
  cultureNote: string;
}

export const getAllSeasonalRecipes = async (): Promise<SeasonalRecipe[]> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT sr.*, 
     GROUP_CONCAT(sri.ingredient ORDER BY sri.id) as ingredients,
     GROUP_CONCAT(srii.instruction ORDER BY srii.step_number) as instructions
     FROM seasonal_recipes sr
     LEFT JOIN seasonal_recipe_ingredients sri ON sr.id = sri.recipe_id
     LEFT JOIN seasonal_recipe_instructions srii ON sr.id = srii.recipe_id
     GROUP BY sr.id`
  );
  
  return rows.map(row => {
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
};

export const getSeasonalRecipeBySeason = async (season: string): Promise<SeasonalRecipe | null> => {
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT sr.*, 
     GROUP_CONCAT(sri.ingredient ORDER BY sri.id) as ingredients,
     GROUP_CONCAT(srii.instruction ORDER BY srii.step_number) as instructions
     FROM seasonal_recipes sr
     LEFT JOIN seasonal_recipe_ingredients sri ON sr.id = sri.recipe_id
     LEFT JOIN seasonal_recipe_instructions srii ON sr.id = srii.recipe_id
     WHERE sr.season = ?
     GROUP BY sr.id`,
    [season]
  );
  
  if (rows.length > 0) {
    const row = rows[0];
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
  }
  
  return null;
};

export const createSeasonalRecipe = async (recipeData: Omit<SeasonalRecipe, 'id'>): Promise<number> => {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // 插入食谱基本信息
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO seasonal_recipes (season, recipe, health_benefit, culture_note) 
       VALUES (?, ?, ?, ?)`,
      [recipeData.season, recipeData.recipe, recipeData.healthBenefit, recipeData.cultureNote]
    );
    
    const recipeId = result.insertId;
    
    // 插入食材
    if (recipeData.ingredients && recipeData.ingredients.length > 0) {
      for (const ingredient of recipeData.ingredients) {
        await connection.execute(
          'INSERT INTO seasonal_recipe_ingredients (recipe_id, ingredient) VALUES (?, ?)',
          [recipeId, ingredient]
        );
      }
    }
    
    // 插入制作步骤
    if (recipeData.instructions && recipeData.instructions.length > 0) {
      for (let i = 0; i < recipeData.instructions.length; i++) {
        await connection.execute(
          'INSERT INTO seasonal_recipe_instructions (recipe_id, step_number, instruction) VALUES (?, ?, ?)',
          [recipeId, i + 1, recipeData.instructions[i]]
        );
      }
    }
    
    await connection.commit();
    return recipeId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};