import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, Calendar, Target, BarChart3, PieChart } from 'lucide-react';
import { getHealthDataByUserId } from '../../services/healthDataService';

const HealthReport: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  const [healthData, setHealthData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 模拟用户ID，实际应用中应从登录状态获取
  const userId = 1;

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const data = await getHealthDataByUserId(userId);
        setHealthData(data);
      } catch (error) {
        console.error('获取健康数据失败:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHealthData();
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qinghua-blue mx-auto mb-4"></div>
          <p className="text-gray-600">正在加载健康报告...</p>
        </div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">暂无健康数据</p>
        </div>
      </div>
    );
  }

  const { dailyCalories, dailyProtein, dailyCarbs, dailyFat, weeklyProgress } = healthData;

  // 计算统计数据
  const avgDailyCalories = weeklyProgress.reduce((sum, day) => sum + day.calories, 0) / weeklyProgress.length;
  const weightChange = weeklyProgress[0]?.weight - weeklyProgress[weeklyProgress.length - 1]?.weight || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">健康报告</h1>
          <p className="text-gray-600">个性化健康分析，助力科学饮食管理</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg traditional-border traditional-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">平均热量</p>
                <p className="text-2xl font-bold text-qinghua-blue">{Math.round(avgDailyCalories)} kcal</p>
              </div>
              <Activity className="h-8 w-8 text-qinghua-blue" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              目标: {dailyCalories} kcal
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg traditional-border traditional-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">蛋白质摄入</p>
                <p className="text-2xl font-bold text-qiansong-green">{dailyProtein}g</p>
              </div>
              <Target className="h-8 w-8 text-qiansong-green" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              目标: {dailyProtein}g
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg traditional-border traditional-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">体重变化</p>
                <p className="text-2xl font-bold text-red-500">{weightChange.toFixed(1)}kg</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-500" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              本周趋势
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg traditional-border traditional-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">营养均衡</p>
                <p className="text-2xl font-bold text-danhe-color">85%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-danhe-color" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              良好状态
            </div>
          </div>
        </div>

        {/* Chart and Data */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8 traditional-border">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">周度热量摄入趋势</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedPeriod('week')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedPeriod === 'week'
                        ? 'bg-qinghua-blue text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    本周
                  </button>
                  <button
                    onClick={() => setSelectedPeriod('month')}
                    className={`px-3 py-1 rounded-md text-sm ${
                      selectedPeriod === 'month'
                        ? 'bg-qinghua-blue text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    本月
                  </button>
                </div>
              </div>

              <div className="h-64 flex items-end justify-between space-x-2">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-gradient-to-t from-qinghua-blue to-blue-300 rounded-t-lg transition-all duration-300 hover:from-blue-600 hover:to-blue-400"
                      style={{
                        height: `${(day.calories / 2000) * 200}px`,
                      }}
                    ></div>
                    <div className="text-xs text-gray-600 mt-2">{day.day}</div>
                    <div className="text-xs text-qinghua-blue font-medium">{day.calories}kcal</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 traditional-border">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">营养摄入分析</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">营养比例</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>蛋白质</span>
                        <span>{dailyProtein}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-qiansong-green h-2 rounded-full"
                          style={{ width: '25%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>碳水化合物</span>
                        <span>{dailyCarbs}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-danhe-color h-2 rounded-full"
                          style={{ width: '55%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>脂肪</span>
                        <span>{dailyFat}g</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: '20%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-gray-900">营养</span>
                      </div>
                    </div>
                    <div className="absolute inset-0">
                      <div className="w-full h-full rounded-full border-8 border-qiansong-green" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 50%)' }}></div>
                      <div className="w-full h-full rounded-full border-8 border-danhe-color" style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }}></div>
                      <div className="w-full h-full rounded-full border-8 border-red-500" style={{ clipPath: 'polygon(50% 50, 100% 50%, 100% 100%, 50% 100%)' }}></div>
                      <div className="w-full h-full rounded-full border-8 border-qinghua-blue" style={{ clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 traditional-border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">本周目标完成情况</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>热量控制</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-qinghua-blue h-2 rounded-full"
                      style={{ width: '85%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>蛋白质达标</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-qiansong-green h-2 rounded-full"
                      style={{ width: '95%' }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>体重管理</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: '80%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 traditional-border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">健康建议</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-700">• 本周平均热量摄入略高于目标，建议适当增加运动量</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-700">• 蛋白质摄入达标，继续保持优质蛋白来源</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-700">• 建议增加膳食纤维摄入，有助于体重控制</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">AI健康提醒</h3>
              <p className="text-sm opacity-90">
                根据您的饮食记录，AI建议您明天可以尝试"冬至低脂饺子"，
                既符合节气养生，又能满足您的减脂目标。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;