import { api } from '../config/api';

interface AncientRecipe {
  id: number;
  name: string;
  source: string;
  summary: string;
  modernRecipe: string;
  illustration: string;
}

export const getAllAncientRecipes = async (): Promise<AncientRecipe[]> => {
  try {
    const recipes = await api.getAncientRecipes();
    return recipes;
  } catch (error) {
    console.error('获取古方食谱失败:', error);
    return [];
  }
};

export const getAncientRecipeById = async (id: number): Promise<AncientRecipe | null> => {
  try {
    const recipe = await api.getAncientRecipeById(id);
    return recipe;
  } catch (error) {
    console.error('获取古方食谱失败:', error);
    return null;
  }
};

export const createAncientRecipe = async (recipeData: Omit<AncientRecipe, 'id'>): Promise<number | null> => {
  try {
    const recipe = await api.createAncientRecipe(recipeData);
    return recipe.id;
  } catch (error) {
    console.error('创建古方食谱失败:', error);
    return null;
  }
};