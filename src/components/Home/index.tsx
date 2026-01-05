import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, BookOpen, Activity, Heart, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const Home: React.FC = () => {
  const features = [
    {
      title: 'AI非遗菜品识别',
      description: '拍照识别陕西非遗菜品，获取精准营养信息和文化背景',
      icon: Camera,
      color: 'text-qinghua-blue',
      path: '/ai-recognition'
    },
    {
      title: '节气饮食匹配',
      description: '根据当前节气和健康目标，推荐适宜的传统食谱',
      icon: Calendar,
      color: 'text-danhe-color',
      path: '/seasonal-diet'
    },
    {
      title: '传统文化传承',
      description: '学习陕西非遗饮食技艺，了解古籍饮食智慧',
      icon: BookOpen,
      color: 'text-qiansong-green',
      path: '/cultural-heritage'
    },
    {
      title: '健康管理报告',
      description: '记录饮食数据，生成个性化健康分析报告',
      icon: Activity,
      color: 'text-pink-500',
      path: '/health-report'
    }
  ];

  const stats = [
    { number: '92.5%', label: 'AI识别准确率' },
    { number: '24', label: '节气饮食推荐' },
    { number: '20+', label: '非遗菜品收录' },
    { number: '500+', label: '古方食谱' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              AI赋能健康饮食
              <br />
              <span className="text-qinghua-blue">传承陕西非遗文化</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              轻量化AI技术，让健康管理与传统文化传承触手可及
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                to="/ai-recognition"
                className="inline-flex items-center px-8 py-3 bg-qinghua-blue text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                开始AI识食
                <Camera className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-qinghua-blue/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-danhe-color/10 rounded-full blur-xl"></div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-3xl font-bold text-qinghua-blue mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-b from-white to-qianqing-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-xl text-gray-600">融合AI技术与传统文化，打造全方位健康饮食体验</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover-lift traditional-border traditional-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-full bg-gray-100 mb-4 ${feature.color}`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link
                    to={feature.path}
                    className="text-qinghua-blue font-medium hover:underline"
                  >
                    立即体验 →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Cultural Heritage Highlight */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">陕西非遗饮食文化</h2>
              <p className="text-lg text-gray-600 mb-6">
                我们致力于传承和发扬陕西丰富的饮食文化遗产，让古老的智慧在现代健康管理中焕发新活力。
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Heart className="text-qinghua-blue mr-3 flex-shrink-0" />
                  <span>收录20+陕西非遗菜品制作技艺</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="text-qiansong-green mr-3 flex-shrink-0" />
                  <span>融合节气饮食智慧，顺应自然规律</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="text-danhe-color mr-3 flex-shrink-0" />
                  <span>挖掘古籍食谱，传承饮食文化</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-xl p-8 text-center traditional-border">
                <h3 className="text-xl font-semibold text-white mb-4">文化传承理念</h3>
                <p className="text-white/90">
                  "让每一道传统美食都承载着文化记忆，让每一次健康饮食都蕴含着传统智慧"
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-danhe-color/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-qiansong-green/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;