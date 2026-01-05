import React, { useState } from 'react';
import { BookOpen, Search, Heart, Star, Users } from 'lucide-react';
import mockData from '../../mock.json';

const CulturalHeritage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('heritage');

  const filteredFoods = mockData.foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.heritage.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAncientRecipes = mockData.ancientRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">传统文化传承</h1>
          <p className="text-gray-600">学习陕西非遗饮食技艺，了解古籍饮食智慧</p>
        </div>

        {/* Search and Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 traditional-border">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="搜索非遗菜品或古方食谱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qinghua-blue focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'heritage'
                  ? 'text-qinghua-blue border-b-2 border-qinghua-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              非遗技艺
            </button>
            <button
              onClick={() => setActiveTab('ancient')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'ancient'
                  ? 'text-qinghua-blue border-b-2 border-qinghua-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              古方食谱
            </button>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'heritage' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => (
              <div key={food.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift traditional-border traditional-shadow">
                <div className="h-48 bg-gradient-to-r from-qianqing-blue to-qinghua-blue flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🍲</div>
                    <h3 className="text-xl font-bold">{food.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{food.heritage.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{food.heritage.origin}</p>
                  
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-danhe-color/20 text-danhe-color text-xs rounded-full">
                      {food.heritage.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-900">制作步骤</h4>
                    {food.heritage.steps.slice(0, 3).map((step, index) => (
                      <div key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="inline-block w-4 h-4 bg-qinghua-blue text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                    {food.heritage.steps.length > 3 && (
                      <div className="text-sm text-gray-500 italic">...还有{food.heritage.steps.length - 3}个步骤</div>
                    )}
                  </div>

                  <div className="flex justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      <span>收藏 128</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span>4.8分</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>学习 2.1k</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ancient' && (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredAncientRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-xl shadow-lg p-6 hover-lift traditional-border traditional-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{recipe.name}</h3>
                    <p className="text-sm text-gray-600">来源：{recipe.source}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-qinghua-blue" />
                </div>

                <div className="bg-ancient-paper rounded-lg p-4 mb-4 border border-danhe-color/30">
                  <h4 className="font-medium text-gray-900 mb-2">古方摘要</h4>
                  <p className="text-gray-700 italic">"{recipe.summary}"</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">现代做法</h4>
                  <p className="text-gray-700">{recipe.modernRecipe}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      古方今用
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {recipe.illustration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'heritage' && filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">未找到相关非遗菜品</p>
          </div>
        )}

        {activeTab === 'ancient' && filteredAncientRecipes.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500">未找到相关古方食谱</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CulturalHeritage;