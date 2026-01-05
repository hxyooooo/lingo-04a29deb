import React, { useState, useEffect } from 'react';
import { Calendar, Utensils, Heart, Sun, Moon, Wind, UtensilsCrossed, Coffee, Soup } from 'lucide-react';
import { getAllSeasonalRecipes, getSeasonalRecipeBySeason } from '../../services/seasonalRecipeService';

const SeasonalDiet: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState('冬至');
  const [healthGoal, setHealthGoal] = useState('减脂');
  const [showTimeRecommendation, setShowTimeRecommendation] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAncientMode, setIsAncientMode] = useState(false);
  const [seasonalRecipes, setSeasonalRecipes] = useState<any[]>([]);

  // 初始化节气食谱数据
  useEffect(() => {
    const fetchSeasonalRecipes = async () => {
      try {
        const recipes = await getAllSeasonalRecipes();
        setSeasonalRecipes(recipes);
      } catch (error) {
        console.error('获取节气食谱数据失败:', error);
      }
    };
    fetchSeasonalRecipes();
  }, []);

  // 模拟时间感知，判断是否为节气日
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次

    return () => clearInterval(timer);
  }, []);

  const currentSeason = seasonalRecipes.find(recipe => recipe.season === selectedSeason);

  const seasons = [
    { name: '冬至', icon: Sun, color: 'text-red-500' },
    { name: '清明', icon: Wind, color: 'text-green-500' },
    { name: '立夏', icon: Sun, color: 'text-yellow-500' },
    { name: '立秋', icon: Moon, color: 'text-orange-500' },
    { name: '立冬', icon: Wind, color: 'text-blue-500' },
    { name: '春分', icon: Sun, color: 'text-pink-500' }
  ];

  const goals = ['减脂', '增肌', '控糖', '养生'];

  // 模拟判断是否为节气日（简化逻辑）
  const isSeasonDay = selectedSeason === '冬至'; // 模拟当前是冬至

  // 模拟今日三餐建议
  const mealRecommendations = [
    { time: '早餐', name: '温补小米粥', icon: Coffee, calories: 200 },
    { time: '午餐', name: '冬至低脂饺子', icon: UtensilsCrossed, calories: 450 },
    { time: '晚餐', name: '温阳羊肉汤', icon: Soup, calories: 350 }
  ];

  const toggleAncientMode = () => {
    setIsAncientMode(!isAncientMode);
    document.body.setAttribute('data-mode', !isAncientMode ? 'ancient' : '');
  };

  return (
    <div className={`min-h-screen py-8 ${isAncientMode ? 'ancient-mode' : 'bg-gradient-to-b from-qianqing-blue to-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 节气浮窗提示 */}
        {isSeasonDay && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-tangse-amber to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center animate-bounce">
            <Sun className="mr-2 h-5 w-5" />
            <span>今日冬至，宜温补！</span>
          </div>
        )}

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">节气饮食匹配</h1>
          <p className="text-gray-600">根据当前节气和健康目标，推荐适宜的传统食谱</p>
          
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

        {/* Filters */}
        <div className={`rounded-xl shadow-lg p-6 mb-8 ${isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white traditional-border'}`}>
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
                        : isAncientMode 
                          ? 'border-danhe-color/30 hover:border-tangse-amber' 
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
                        : isAncientMode 
                          ? 'border-danhe-color/30 hover:border-tangse-amber' 
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

        {/* 今日三餐推荐按钮 */}
        <div className="text-center mb-6">
          <button
            onClick={() => setShowTimeRecommendation(!showTimeRecommendation)}
            className="px-6 py-3 bg-gradient-to-r from-qinghua-blue to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
          >
            {showTimeRecommendation ? '收起三餐建议' : '查看今日三餐时间轴建议'}
          </button>
        </div>

        {/* 三餐时间轴建议 */}
        {showTimeRecommendation && (
          <div className={`rounded-xl shadow-lg p-6 mb-8 ${isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white traditional-border'}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">今日三餐建议</h3>
            <div className="space-y-4">
              {mealRecommendations.map((meal, index) => (
                <div 
                  key={index} 
                  className={`flex items-center p-4 rounded-lg border ${
                    isAncientMode ? 'border-danhe-color/30 bg-white' : 'border-gray-200 bg-blue-50'
                  }`}
                >
                  <meal.icon className="h-8 w-8 text-qinghua-blue mr-4" />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold text-gray-900">{meal.time} - {meal.name}</h4>
                      <span className="text-qinghua-blue font-medium">{meal.calories} kcal</span>
                    </div>
                    <p className="text-sm text-gray-600">温补阳气，顺应冬至节气特点</p>
                  </div>
                  <button className="px-3 py-1 bg-qinghua-blue text-white text-sm rounded hover:bg-blue-700">
                    加入清单
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recipe Card */}
        {currentSeason && (
          <div className={`rounded-xl shadow-lg p-6 mb-8 ${isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white traditional-border'}`}>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-lg p-6 text-white mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">{currentSeason.season}</h2>
                    <Calendar className="h-8 w-8" />
                  </div>
                  <p className="opacity-90 mt-2">{currentSeason.cultureNote}</p>
                </div>

                <div className={`border rounded-lg p-6 ${isAncientMode ? 'border-danhe-color/30 bg-white' : 'border-gray-200 bg-white'}`}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Utensils className="mr-2 h-5 w-5 text-qinghua-blue" />
                    {currentSeason.recipe}
                  </h3>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">健康益处</h4>
                    <div className={`flex items-center p-3 ${
                      isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-green-50'
                    } rounded-lg`}>
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
                          className={`px-3 py-1 rounded-full text-sm ${
                            isAncientMode 
                              ? 'bg-danhe-color/20 text-danhe-color' 
                              : 'bg-blue-100 text-qinghua-blue'
                          }`}
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
                <div className={`rounded-lg p-6 ${
                  isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-gradient-to-b from-ancient-paper to-white border border-danhe-color/30'
                }`}>
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">节气养生知识</h4>
                  <div className="space-y-4 text-sm text-gray-700">
                    <div>
                      <h5 className={`font-medium ${
                        isAncientMode ? 'text-danhe-color' : 'text-danhe-color'
                      } mb-1`}>节气特点</h5>
                      <p>冬至是北半球白昼最短、黑夜最长的一天，标志着进入数九寒天。</p>
                    </div>
                    <div>
                      <h5 className={`font-medium ${
                        isAncientMode ? 'text-danhe-color' : 'text-danhe-color'
                      } mb-1`}>饮食原则</h5>
                      <p>宜温补阳气，多食温热性食物，少食寒凉。</p>
                    </div>
                    <div>
                      <h5 className={`font-medium ${
                        isAncientMode ? 'text-danhe-color' : 'text-danhe-color'
                      } mb-1`}>养生建议</h5>
                      <p>早睡晚起，适度运动，保持心情愉悦。</p>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 border rounded-lg p-4 ${isAncientMode ? 'border-danhe-color/30 bg-ancient-paper' : 'border-gray-200 bg-white'}`}>
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
        <div className={`rounded-xl shadow-lg p-6 ${isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-white traditional-border'}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">节气饮食小贴士</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg ${
              isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-blue-50'
            }`}>
              <h4 className={`font-medium ${
                isAncientMode ? 'text-danhe-color' : 'text-qinghua-blue'
              } mb-2`}>春</h4>
              <p className="text-sm text-gray-700">宜食辛甘发散之品，如韭菜、春笋，助阳气生发</p>
            </div>
            <div className={`p-4 rounded-lg ${
              isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-green-50'
            }`}>
              <h4 className={`font-medium ${
                isAncientMode ? 'text-danhe-color' : 'text-qiansong-green'
              } mb-2`}>夏</h4>
              <p className="text-sm text-gray-700">宜清淡解暑，多食瓜果，如西瓜、冬瓜，清热利湿</p>
            </div>
            <div className={`p-4 rounded-lg ${
              isAncientMode ? 'bg-ancient-paper border border-danhe-color/30' : 'bg-orange-50'
            }`}>
              <h4 className={`font-medium ${
                isAncientMode ? 'text-danhe-color' : 'text-tangse-amber'
              } mb-2`}>秋</h4>
              <p className="text-sm text-gray-700">宜滋阴润燥，多食梨、银耳，养阴生津</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalDiet;