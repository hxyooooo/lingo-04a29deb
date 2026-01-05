import React, { useState } from 'react';
import { Calendar, Utensils, Heart, Sun, Moon, Wind } from 'lucide-react';
import mockData from '../../mock.json';

const SeasonalDiet: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('冬至');
  const [healthGoal, setHealthGoal] = useState('减脂');

  const currentSeason = mockData.seasonalRecipes.find(recipe => recipe.season === selectedSeason);

  const seasons = [
    { name: '冬至', icon: Sun, color: 'text-red-500' },
    { name: '清明', icon: Wind, color: 'text-green-500' },
    { name: '立夏', icon: Sun, color: 'text-yellow-500' },
    { name: '立秋', icon: Moon, color: 'text-orange-500' },
    { name: '立冬', icon: Wind, color: 'text-blue-500' },
    { name: '春分', icon: Sun, color: 'text-pink-500' }
  ];

  const goals = ['减脂', '增肌', '控糖', '养生'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">节气饮食匹配</h1>
          <p className="text-gray-600">根据当前节气和健康目标，推荐适宜的传统食谱</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 traditional-border">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">选择节气</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {seasons.map((season) => (
                  <button
                    key={season.name}
                    onClick={() => setSelectedSeason(season.name)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      selectedSeason === season.name
                        ? 'border-qinghua-blue bg-qinghua-blue/10 text-qinghua-blue'
                        : 'border-gray-200 hover:border-qinghua-blue/50'
                    }`}
                  >
                    <season.icon className={`mx-auto mb-1 ${season.color}`} size={20} />
                    <div className="text-xs">{season.name}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">健康目标</label>
              <div className="grid grid-cols-2 gap-2">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    onClick={() => setHealthGoal(goal)}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      healthGoal === goal
                        ? 'border-qinghua-blue bg-qinghua-blue/10 text-qinghua-blue'
                        : 'border-gray-200 hover:border-qinghua-blue/50'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Card */}
        {currentSeason && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 traditional-border">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{currentSeason.season}</h2>
                    <Calendar className="h-8 w-8" />
                  </div>
                  <p className="opacity-90 mt-2">{currentSeason.cultureNote}</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-qinghua-blue" />
                    {currentSeason.recipe}
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">健康益处</h4>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <Heart className="h-5 w-5 text-qiansong-green mr-2" />
                      <span className="text-gray-700">{currentSeason.healthBenefit}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">所需食材</h4>
                    <div className="flex flex-wrap gap-2">
                      {currentSeason.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-qinghua-blue rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">制作步骤</h4>
                    <div className="space-y-3">
                      {currentSeason.instructions.map((instruction, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-qinghua-blue text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{instruction}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-80">
                <div className="bg-gradient-to-b from-ancient-paper to-white rounded-lg p-6 border border-danhe-color/30">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">节气养生知识</h4>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <h5 className="font-medium text-danhe-color mb-1">节气特点</h5>
                      <p>冬至是北半球白昼最短、黑夜最长的一天，标志着进入数九寒天。</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-danhe-color mb-1">饮食原则</h5>
                      <p>宜温补阳气，多食温热性食物，少食寒凉。</p>
                    </div>
                    <div>
                      <h5 className="font-medium text-danhe-color mb-1">养生建议</h5>
                      <p>早睡晚起，适度运动，保持心情愉悦。</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">个性化建议</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>推荐热量</span>
                      <span className="font-medium">450-500 kcal</span>
                    </div>
                    <div className="flex justify-between">
                      <span>蛋白质</span>
                      <span className="font-medium">25-30g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>碳水化合物</span>
                      <span className="font-medium">50-60g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>脂肪</span>
                      <span className="font-medium">15-20g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seasonal Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6 traditional-border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">节气饮食小贴士</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-qinghua-blue mb-2">春</h4>
              <p className="text-sm text-gray-700">宜食辛甘发散之品，如韭菜、春笋，助阳气生发</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-qiansong-green mb-2">夏</h4>
              <p className="text-sm text-gray-700">宜清淡解暑，多食瓜果，如西瓜、冬瓜，清热利湿</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-danhe-color mb-2">秋</h4>
              <p className="text-sm text-gray-700">宜滋阴润燥，多食梨、银耳，养阴生津</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalDiet;