import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Camera, Calendar, BookOpen, Activity } from 'lucide-react';

interface NavbarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/ai-recognition', icon: Camera, label: 'AI识食' },
    { path: '/seasonal-diet', icon: Calendar, label: '节气饮食' },
    { path: '/cultural-heritage', icon: BookOpen, label: '文化传承' },
    { path: '/health-report', icon: Activity, label: '健康报告' },
  ];

  const handleLogin = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  return (
    <nav className="bg-qinghua-blue text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-qinghua-blue font-bold text-lg">食</span>
            </div>
            <h1 className="text-xl font-bold">AI健康饮食・陕西文化</h1>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors ${
                  location.pathname === item.path
                    ? 'bg-white text-qinghua-blue'
                    : 'hover:bg-qinghua-blue/80'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <button
            onClick={handleLogin}
            className="bg-white text-qinghua-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            {isAuthenticated ? '退出' : '登录'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-around py-2 bg-qinghua-blue/90">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded ${
              location.pathname === item.path ? 'text-yellow-300' : 'text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;