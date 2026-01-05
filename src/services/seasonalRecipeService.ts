import { api } from '../config/api';

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
  try {
    const recipes = await api.getSeasonalRecipes();
    return recipes;
  } catch (error) {
    console.error('获取节气食谱失败:', error);
    return [];
  }
};

export const getSeasonalRecipeBySeason = async (season: string): Promise<SeasonalRecipe | null> => {
  try {
    const recipe = await api.getSeasonalRecipeBySeason(season);
    return recipe;
  } catch (error) {
    console.error('获取节气食谱失败:', error);
    return null;
  }
};

export const createSeasonalRecipe = async (recipeData: Omit<SeasonalRecipe, 'id'>): Promise<number | null> => {
  try {
    const recipe = await api.createSeasonalRecipe(recipeData);
    return recipe.id;
  } catch (error) {
    console.error('创建节气食谱失败:', error);
    return null;
  }
};