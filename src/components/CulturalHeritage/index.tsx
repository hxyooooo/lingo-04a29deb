import React, { useState } from 'react';
import { BookOpen, Search, Heart, Star, Users, BookText } from 'lucide-react';
import mockData from '../../mock.json';

const CulturalHeritage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('heritage');
  const [isAncientMode, setIsAncientMode] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);

  const filteredFoods = mockData.foods.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    food.heritage.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAncientRecipes = mockData.ancientRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAncientMode = () => {
    setIsAncientMode(!isAncientMode);
    document.body.setAttribute('data-mode', !isAncientMode ? 'ancient' : '');
  };

  // 古称对照表
  const ancientTerms: Record<string, string> = {
    '白菜': '菘',
    '萝卜': '芦菔',
    '生姜': '百辣云',
    '大蒜': '葫',
    '韭菜': '丰本',
    '花椒': '秦椒',
    '猪肉': '豚',
    '羊肉': '羔',
    '鸡肉': '雏',
    '鱼': '鲜'
  };

  // 将现代食材转换为古称
  const convertToAncientTerms = (text: string) => {
    if (!isAncientMode) return text;
    
    let result = text;
    Object.entries(ancientTerms).forEach(([modern, ancient]) => {
      result = result.replace(new RegExp(modern, 'g'), `<span class="text-tangse-amber" title="${modern} (古称)">${ancient}</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <div className={`min-h-screen py-8 ${isAncientMode ? 'ancient-mode' : 'bg-gradient-to-b from-qianqing-blue to-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">传统文化传承</h1>
          <p className="text-gray-600">学习陕西非遗饮食技艺，了解古籍饮食智慧</p>
          
          {/* 古今对话开关 */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={toggleAncientMode}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                isAncientMode 
                  ? 'bg-qinghua-blue text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isAncientMode ? '退出古风模式' : '开启古风模式'}
            </button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className={`rounded-xl shadow-lg p-6 mb-8 ${isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white traditional-border'}`}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="搜索非遗菜品或古方食谱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-qinghua-blue focus:border-transparent ${
                  isAncientMode 
                    ? 'bg-ancient-paper border-danhe-color/30 text-ink-grey' 
                    : 'border-gray-300'
                }`}
              />
            </div>
          </div>

          <div className={`border-b ${
            isAncientMode ? 'border-danhe-color/30' : 'border-gray-200'
          }`}>
            <button
              onClick={() => setActiveTab('heritage')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'heritage'
                  ? isAncientMode
                    ? 'text-qinghua-blue border-b-2 border-qinghua-blue'
                    : 'text-qinghua-blue border-b-2 border-qinghua-blue'
                  : isAncientMode
                    ? 'text-danhe-color hover:text-tangse-amber'
                    : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              非遗技艺
            </button>
            <button
              onClick={() => setActiveTab('ancient')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'ancient'
                  ? isAncientMode
                    ? 'text-qinghua-blue border-b-2 border-qinghua-blue'
                    : 'text-qinghua-blue border-b-2 border-qinghua-blue'
                  : isAncientMode
                    ? 'text-danhe-color hover:text-tangse-amber'
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
              <div 
                key={food.id} 
                className={`rounded-xl shadow-lg overflow-hidden hover-lift traditional-shadow ${
                  isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white'
                }`}
              >
                <div className={`h-48 ${
                  isAncientMode ? 'bg-gradient-to-r from-tangse-amber to-orange-400' : 'bg-gradient-to-r from-qianqing-blue to-qinghua-blue'
                } flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2">🍲</div>
                    <h3 className="text-xl font-bold">{food.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-semibold mb-2 ${
                    isAncientMode ? 'text-ink-grey' : 'text-gray-900'
                  }`}>{food.heritage.title}</h3>
                  <p className={`text-sm ${
                    isAncientMode ? 'text-ink-grey/80' : 'text-gray-600'
                  } mb-4`}>{food.heritage.origin}</p>
                  
                  <div className="mb-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      isAncientMode 
                        ? 'bg-danhe-color/20 text-danhe-color' 
                        : 'bg-danhe-color/20 text-danhe-color'
                    }`}>
                      {food.heritage.category}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <h4 className={`font-medium ${
                      isAncientMode ? 'text-ink-grey' : 'text-gray-900'
                    }`}>制作步骤</h4>
                    {food.heritage.steps.slice(0, 3).map((step, index) => (
                      <div key={index} className={`text-sm flex items-start ${
                        isAncientMode ? 'text-ink-grey' : 'text-gray-700'
                      }`}>
                        <span className="inline-block w-4 h-4 bg-qinghua-blue text-white text-xs rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        {isAncientMode ? convertToAncientTerms(step) : step}
                      </div>
                    ))}
                    {food.heritage.steps.length > 3 && (
                      <div className={`text-sm ${
                        isAncientMode ? 'text-ink-grey/60' : 'text-gray-500'
                      } italic`}>...还有{food.heritage.steps.length - 3}个步骤</div>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
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
              <div 
                key={recipe.id} 
                className={`rounded-xl shadow-lg p-6 hover-lift traditional-shadow ${
                  isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className={`text-xl font-semibold mb-1 ${
                      isAncientMode ? 'text-ink-grey' : 'text-gray-900'
                    }`}>{recipe.name}</h3>
                    <p className={`text-sm ${
                      isAncientMode ? 'text-ink-grey/80' : 'text-gray-600'
                    }`}>来源：{recipe.source}</p>
                  </div>
                  <BookOpen className={`h-8 w-8 ${
                    isAncientMode ? 'text-tangse-amber' : 'text-qinghua-blue'
                  }`} />
                </div>

                <div className={`rounded-lg p-4 mb-4 ${
                  isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-ancient-paper border border-danhe-color/30'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    isAncientMode ? 'text-ink-grey' : 'text-gray-900'
                  }`}>古方摘要</h4>
                  <p className={`${
                    isAncientMode ? 'text-ink-grey italic' : 'text-gray-700 italic'
                  }`}>"{recipe.summary}"</p>
                </div>

                <div className={`border rounded-lg p-4 ${
                  isAncientMode ? 'border-danhe-color/30 bg-white' : 'border-gray-200 bg-white'
                }`}>
                  <h4 className={`font-medium mb-2 ${
                    isAncientMode ? 'text-ink-grey' : 'text-gray-900'
                  }`}>现代做法</h4>
                  <p className={`${
                    isAncientMode ? 'text-ink-grey' : 'text-gray-700'
                  }`}>
                    {isAncientMode ? convertToAncientTerms(recipe.modernRecipe) : recipe.modernRecipe}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      isAncientMode 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      古方今用
                    </span>
                  </div>
                  <div className={`text-sm ${
                    isAncientMode ? 'text-ink-grey/80' : 'text-gray-500'
                  }`}>
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