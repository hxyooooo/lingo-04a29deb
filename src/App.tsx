import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AiRecognition from './components/AiRecognition';
import SeasonalDiet from './components/SeasonalDiet';
import CulturalHeritage from './components/CulturalHeritage';
import HealthReport from './components/HealthReport';
import Navbar from './components/Navbar';
import AiAgent from './components/AiAgent';
import { testConnection, initializeDatabase } from './config/database';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dbInitialized, setDbInitialized] = useState(false);

  // 初始化数据库连接
  useEffect(() => {
    const initDatabase = async () => {
      try {
        await testConnection();
        await initializeDatabase();
        setDbInitialized(true);
        console.log('数据库初始化完成');
      } catch (error) {
        console.error('数据库初始化失败:', error);
      }
    };

    initDatabase();
  }, []);

  if (!dbInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-qinghua-blue mx-auto mb-4"></div>
          <p className="text-gray-600">正在初始化数据库...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white">
        <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-recognition" element={<AiRecognition />} />
          <Route path="/seasonal-diet" element={<SeasonalDiet />} />
          <Route path="/cultural-heritage" element={<CulturalHeritage />} />
          <Route path="/health-report" element={<HealthReport />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAgent />
      </div>
    </Router>
  );
}

export default App;