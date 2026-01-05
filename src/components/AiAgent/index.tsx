import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, X, Sparkles } from 'lucide-react';
import mockData from '../../mock.json';

const AiAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'agent',
      text: '您好！我是您的AI健康饮食助手，可以为您提供营养建议、非遗文化知识和个性化指导。您有什么问题想问吗？',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string) => {
    // 模拟AI思考时间
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      
      if (userMessage.toLowerCase().includes('非遗') || userMessage.toLowerCase().includes('文化')) {
        response = `陕西非遗饮食文化博大精深！比如腊汁肉源于战国时期的“祛寒娇耳汤”，凉皮则源自唐代的“冷淘”工艺。这些传统美食不仅是味觉享受，更是文化传承的载体。`;
      } else if (userMessage.toLowerCase().includes('营养') || userMessage.toLowerCase().includes('热量') || userMessage.toLowerCase().includes('卡路里')) {
        const randomFood = mockData.foods[Math.floor(Math.random() * mockData.foods.length)];
        response = `以${randomFood.name}为例，每100g含有${randomFood.calories}卡路里，蛋白质${randomFood.protein}g，碳水化合物${randomFood.carbs}g，脂肪${randomFood.fat}g。这道菜不仅营养丰富，还承载着深厚的文化底蕴。`;
      } else if (userMessage.toLowerCase().includes('推荐') || userMessage.toLowerCase().includes('建议')) {
        const randomRecipe = mockData.seasonalRecipes[Math.floor(Math.random() * mockData.seasonalRecipes.length)];
        response = `根据当前时节，我推荐您尝试${randomRecipe.recipe}。主要食材包括${randomRecipe.ingredients.join('、')}，具有${randomRecipe.healthBenefit}的功效。这道菜还有着${randomRecipe.cultureNote}的文化寓意。`;
      } else if (userMessage.toLowerCase().includes('健康') || userMessage.toLowerCase().includes('目标')) {
        response = `为了实现健康目标，建议您均衡摄入各类营养素。陕西传统美食如凉皮、腊汁肉等，适量食用可以提供优质蛋白质和碳水化合物。同时，结合当季节气饮食，如立夏时节的绿豆汤，有助于清热解暑。`;
      } else if (userMessage.toLowerCase().includes('谢谢') || userMessage.toLowerCase().includes('感谢')) {
        response = '不客气！如果您有其他问题，随时可以问我。祝您健康饮食，享受美食与文化的双重体验！';
      } else {
        const responses = [
          `关于${userMessage}，我可以告诉您，陕西饮食文化源远流长。每一道传统美食背后都有着深厚的历史故事和营养价值。`,
          `您提到的${userMessage}确实很重要。在陕西传统饮食中，我们注重食材的时令性和营养搭配，既满足味蕾也照顾健康。`,
          `这是一个很好的问题！${userMessage}与陕西非遗饮食文化相结合，体现了古人对饮食健康的深刻理解。`,
          `关于${userMessage}，陕西传统美食提供了很好的解决方案。比如腊汁肉、凉皮等，都是营养与文化兼备的选择。`
        ];
        response = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const newMessage = {
        id: Date.now(),
        sender: 'agent',
        text: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 随机延迟1-2秒
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    generateResponse(inputText);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // 添加欢迎消息
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 h-96 flex flex-col border border-qinghua-blue">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-qinghua-blue to-qianqing-blue text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="h-6 w-6 mr-2" />
              <h3 className="font-semibold">AI健康饮食助手</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-qianqing-blue">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.sender === 'user' 
                      ? 'bg-qinghua-blue text-white rounded-br-none' 
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start">
                    {message.sender === 'agent' && (
                      <Bot className="h-4 w-4 mt-0.5 mr-2 flex-shrink-0" />
                    )}
                    <p className="text-sm">{message.text}</p>
                    {message.sender === 'user' && (
                      <User className="h-4 w-4 mt-0.5 ml-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl p-3 rounded-bl-none">
                  <div className="flex items-center">
                    <Bot className="h-4 w-4 mr-2" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题..."
                className="flex-1 border border-gray-300 rounded-l-lg p-2 text-sm resize-none h-12 focus:outline-none focus:ring-2 focus:ring-qinghua-blue"
                rows={1}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputText.trim() === ''}
                className={`bg-qinghua-blue text-white p-2 rounded-r-lg ${
                  inputText.trim() === '' ? 'opacity-50' : 'hover:bg-blue-700'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-center">
              AI助手可提供营养建议、非遗文化知识和个性化指导
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-qinghua-blue to-qianqing-blue text-white p-4 rounded-full shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all transform hover:scale-105 flex items-center"
        >
          <Sparkles className="h-6 w-6 mr-2" />
          <span className="font-medium">AI助手</span>
        </button>
      )}
    </div>
  );
};

export default AiAgent;