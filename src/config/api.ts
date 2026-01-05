const API_BASE_URL = 'http://localhost:3001';

export const api = {
  // 用户相关API
  getUser: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/users/${id}`);
    if (!response.ok) {
      throw new Error('获取用户信息失败');
    }
    return response.json();
  },
  
  createUser: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('创建用户失败');
    }
    return response.json();
  },

  // 食物相关API
  getFoods: async () => {
    const response = await fetch(`${API_BASE_URL}/api/foods`);
    if (!response.ok) {
      throw new Error('获取食物信息失败');
    }
    return response.json();
  },
  
  getFoodById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/foods/${id}`);
    if (!response.ok) {
      throw new Error('获取食物信息失败');
    }
    return response.json();
  },
  
  createFood: async (foodData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    if (!response.ok) {
      throw new Error('创建食物失败');
    }
    return response.json();
  },

  // 节气食谱相关API
  getSeasonalRecipes: async () => {
    const response = await fetch(`${API_BASE_URL}/api/seasonal-recipes`);
    if (!response.ok) {
      throw new Error('获取节气食谱失败');
    }
    return response.json();
  },
  
  getSeasonalRecipeBySeason: async (season: string) => {
    const response = await fetch(`${API_BASE_URL}/api/seasonal-recipes/${season}`);
    if (!response.ok) {
      throw new Error('获取节气食谱失败');
    }
    return response.json();
  },
  
  createSeasonalRecipe: async (recipeData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/seasonal-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error('创建节气食谱失败');
    }
    return response.json();
  },

  // 古方食谱相关API
  getAncientRecipes: async () => {
    const response = await fetch(`${API_BASE_URL}/api/ancient-recipes`);
    if (!response.ok) {
      throw new Error('获取古方食谱失败');
    }
    return response.json();
  },
  
  getAncientRecipeById: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/ancient-recipes/${id}`);
    if (!response.ok) {
      throw new Error('获取古方食谱失败');
    }
    return response.json();
  },
  
  createAncientRecipe: async (recipeData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/ancient-recipes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipeData),
    });
    if (!response.ok) {
      throw new Error('创建古方食谱失败');
    }
    return response.json();
  },

  // 健康数据相关API
  getHealthData: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/api/health-data/${userId}`);
    if (!response.ok) {
      throw new Error('获取健康数据失败');
    }
    return response.json();
  },
  
  createHealthData: async (healthData: any) => {
    const response = await fetch(`${API_BASE_URL}/api/health-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(healthData),
    });
    if (!response.ok) {
      throw new Error('创建健康数据失败');
    }
    return response.json();
  },
};