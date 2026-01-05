import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AiRecognition from './components/AiRecognition';
import SeasonalDiet from './components/SeasonalDiet';
import CulturalHeritage from './components/CulturalHeritage';
import HealthReport from './components/HealthReport';
import Navbar from './components/Navbar';
import AiAgent from './components/AiAgent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 检查后端连接状态
  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users/1');
        if (!response.ok) {
          console.warn('后端服务未启动，请运行: npm run server');
        }
      } catch (error) {
        console.warn('后端服务未启动，请运行: npm run server');
      }
    };

    checkBackendConnection();
  }, []);

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