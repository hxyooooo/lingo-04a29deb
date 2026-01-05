import React, { useState, useEffect } from 'react';
import { Camera, Calendar, BookOpen, Activity, TrendingUp, Award, HeartPulse, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isSeasonDay, setIsSeasonDay] = useState(false);
  const [stats] = useState({
    foods: 42,
    recipes: 128,
    users: 2456
  });

  // 模拟时间感知，判断是否为节气日
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 每分钟更新一次

    // 简单模拟判断是否为节气日（这里简化为总是显示冬至）
    setIsSeasonDay(true);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "AI非遗识别",
      description: "拍照识别陕西非遗菜品，获取营养信息和文化背景",
      color: "text-qinghua-blue",
      bg: "bg-blue-50"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "节气饮食",
      description: "根据节气推荐传统食谱，科学养生",
      color: "text-tangse-amber",
      bg: "bg-amber-50"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "文化传承",
      description: "学习陕西非遗技艺，了解古籍饮食智慧",
      color: "text-danhe-color",
      bg: "bg-orange-50"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "健康报告",
      description: "个性化健康分析，助力科学饮食管理",
      color: "text-qiansong-green",
      bg: "bg-green-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white">
      {/* 节气浮窗提示 */}
      {isSeasonDay && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-tangse-amber to-orange-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center animate-bounce">
          <HeartPulse className="mr-2 h-5 w-5" />
          <span>今日冬至，宜温补！</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI健康饮食
            <span className="block text-qinghua-blue">陕西传统文化融合</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            以AI轻量化赋能精准健康饮食，结合陕西非遗饮食文化传承的移动应用
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-qinghua-blue text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
              开始体验
            </button>
            <button className="px-8 py-3 bg-white text-qinghua-blue border border-qinghua-blue rounded-lg hover:bg-gray-50 transition-colors">
              了解更多
            </button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-lg text-center traditional-border">
            <div className="text-3xl font-bold text-qinghua-blue mb-2">{stats.foods}+</div>
            <div className="text-gray-600">非遗菜品</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center traditional-border">
            <div className="text-3xl font-bold text-tangse-amber mb-2">{stats.recipes}+</div>
            <div className="text-gray-600">传统食谱</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center traditional-border">
            <div className="text-3xl font-bold text-qiansong-green mb-2">{stats.users}+</div>
            <div className="text-gray-600">注册用户</div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">核心功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg text-center traditional-border hover-lift"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`${feature.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Cultural Concept Section */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 traditional-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <Award className="h-12 w-12 text-tangse-amber mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">文化传承理念</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              我们致力于将陕西丰富的非物质文化遗产与现代科技相结合，通过AI技术让传统文化焕发新生，
              让每一位用户在享受健康饮食的同时，感受千年文化的魅力。
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-qinghua-blue" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">非遗技艺</h3>
              <p className="text-gray-600">收录陕西4000+非遗菜品制作工艺，传承千年美食文化</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-tangse-amber" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">节气养生</h3>
              <p className="text-gray-600">遵循二十四节气规律，提供科学养生饮食建议</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-qiansong-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">健康科技</h3>
              <p className="text-gray-600">AI精准识别与营养分析，科学管理健康饮食</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;