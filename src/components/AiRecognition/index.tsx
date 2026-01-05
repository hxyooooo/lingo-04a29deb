import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, RotateCcw, Info, Award, AlertTriangle } from 'lucide-react';
import { getAllFoods, getFoodById } from '../../services/foodService';

const AiRecognition: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [showBadge, setShowBadge] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualFoodName, setManualFoodName] = useState('');
  const [detectionBoxes, setDetectionBoxes] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [foods, setFoods] = useState<any[]>([]);

  // 初始化食物数据
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const foodsData = await getAllFoods();
        setFoods(foodsData);
      } catch (error) {
        console.error('获取食物数据失败:', error);
      }
    };
    fetchFoods();
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setSelectedImage(e.target?.result as string);
        setIsLoading(true);
        setConfidence(null);
        setDetectionBoxes([]);
        
        // 模拟AI实时扫描过程
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setConfidence(progress);
          if (progress >= 95) {
            clearInterval(interval);
            
            // 模拟检测框
            const boxes = [
              { x: 20, y: 30, width: 60, height: 40 }
            ];
            setDetectionBoxes(boxes);
            
            // 模拟识别完成 - 从数据库中随机选择一个食物
            setTimeout(async () => {
              try {
                if (foods.length > 0) {
                  const randomFood = foods[Math.floor(Math.random() * foods.length)];
                  const finalConfidence = Math.floor(Math.random() * 20) + 80; // 80-99%
                  setConfidence(finalConfidence);
                  
                  // 如果置信度低于60%，显示手动输入选项
                  if (finalConfidence < 60) {
                    setShowManualInput(true);
                    setIsLoading(false);
                  } else {
                    setRecognitionResult(randomFood);
                    setIsLoading(false);
                    
                    // 显示数字徽章特效
                    setShowBadge(true);
                    setTimeout(() => setShowBadge(false), 2000);
                  }
                }
              } catch (error) {
                console.error('识别食物失败:', error);
                setIsLoading(false);
              }
            }, 1000);
          }
        }, 200);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const resetRecognition = () => {
    setSelectedImage(null);
    setRecognitionResult(null);
    setConfidence(null);
    setShowBadge(false);
    setShowManualInput(false);
    setManualFoodName('');
    setDetectionBoxes([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitManualFood = () => {
    if (manualFoodName.trim()) {
      // 模拟将手动输入的食物添加到待学习库
      const mockFood = {
        id: Date.now(),
        name: manualFoodName,
        calories: Math.floor(Math.random() * 300) + 100,
        protein: Math.floor(Math.random() * 20) + 5,
        carbs: Math.floor(Math.random() * 30) + 10,
        fat: Math.floor(Math.random() * 20) + 2,
        heritage: {
          title: `${manualFoodName}制作技艺`,
          origin: "用户贡献",
          steps: [`步骤1: 准备${manualFoodName}材料`, `步骤2: 制作${manualFoodName}`, `步骤3: 完成${manualFoodName}`],
          category: "用户贡献"
        }
      };
      setRecognitionResult(mockFood);
      setShowManualInput(false);
      setConfidence(100);
      
      // 显示数字徽章特效
      setShowBadge(true);
      setTimeout(() => setShowBadge(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-qianqing-blue to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI非遗菜品识别</h1>
          <p className="text-gray-600">拍照识别陕西非遗菜品，获取营养信息和文化背景</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 traditional-border">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Camera Section */}
            <div className="flex-1">
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center relative bg-gray-50">
                {selectedImage ? (
                  <div className="relative">
                    <img 
                      src={selectedImage} 
                      alt="Uploaded" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    {detectionBoxes.map((box, index) => (
                      <div
                        key={index}
                        className="detection-box"
                        style={{
                          top: `${box.y}%`,
                          left: `${box.x}%`,
                          width: `${box.width}%`,
                          height: `${box.height}%`,
                        }}
                      ></div>
                    ))}
                    {isLoading && (
                      <div className="scan-line"></div>
                    )}
                  </div>
                ) : (
                  <>
                    <Camera className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-gray-500 mb-4">点击下方按钮上传图片</p>
                  </>
                )}
                
                {isLoading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-xl">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                      <p>AI正在识别中...</p>
                      {confidence !== null && (
                        <p className="mt-2">{confidence}% 概率为陕西非遗菜品</p>
                      )}
                    </div>
                  </div>
                )}
                
                {showBadge && (
                  <div className="absolute top-4 right-4 badge-pop">
                    <div className="bg-gradient-to-r from-tangse-amber to-orange-500 text-white px-4 py-2 rounded-full flex items-center shadow-lg">
                      <Award className="mr-2 h-5 w-5" />
                      <span>非遗数字徽章</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={handleCameraClick}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-qinghua-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  上传图片
                </button>
                <button
                  onClick={resetRecognition}
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  重新识别
                </button>
              </div>
            </div>

            {/* Results Section */}
            <div className="flex-1">
              {showManualInput ? (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">AI不确定，请教您</h3>
                  </div>
                  <p className="text-gray-600 mb-4">AI识别置信度较低，您可以手动输入菜名帮助AI学习</p>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">请输入菜名</label>
                    <input
                      type="text"
                      value={manualFoodName}
                      onChange={(e) => setManualFoodName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-qinghua-blue focus:border-transparent"
                      placeholder="例如：腊汁肉、凉皮、甑糕..."
                    />
                  </div>
                  
                  <button
                    onClick={submitManualFood}
                    className="w-full px-4 py-2 bg-qinghua-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    确认并提交给AI学习
                  </button>
                </div>
              ) : recognitionResult ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-lg p-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{recognitionResult.name}</h3>
                    <p className="opacity-90">识别成功！这是一道陕西非遗菜品</p>
                    {confidence && (
                      <div className="mt-2 text-sm opacity-80">置信度: {confidence}%</div>
                    )}
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Info className="mr-2 h-5 w-5 text-qinghua-blue" />
                      营养信息 (每100g)
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-qinghua-blue">{recognitionResult.calories}</div>
                        <div className="text-sm text-gray-600">卡路里(kcal)</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-qiansong-green">{recognitionResult.protein}g</div>
                        <div className="text-sm text-gray-600">蛋白质</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-2xl font-bold text-tangse-amber">{recognitionResult.carbs}g</div>
                        <div className="text-sm text-gray-600">碳水化合物</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-500">{recognitionResult.fat}g</div>
                        <div className="text-sm text-gray-600">脂肪</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">非遗文化背景</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium">技艺名称：</span>
                        <span className="text-qinghua-blue">{recognitionResult.heritage.title}</span>
                      </div>
                      <div>
                        <span className="font-medium">起源：</span>
                        <span className="text-gray-700">{recognitionResult.heritage.origin}</span>
                      </div>
                      <div>
                        <span className="font-medium">遗产等级：</span>
                        <span className="text-tangse-amber">{recognitionResult.heritage.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">制作步骤</h4>
                    <div className="space-y-2">
                      {recognitionResult.heritage.steps.map((step: string, index: number) => (
                        <div key={index} className="flex items-start">
                          <div className="w-6 h-6 bg-qinghua-blue text-white rounded-full flex items-center justify-center text-sm font-medium mr-3 flex-shrink-0">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <Info className="mx-auto h-12 w-12 mb-3" />
                    <p>上传图片后，AI将识别菜品并显示营养信息和文化背景</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 traditional-border">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">识别小贴士</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-qinghua-blue mb-2">最佳拍摄角度</h4>
              <p className="text-gray-700">正面拍摄，确保菜品完整可见，避免反光和阴影</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-qiansong-green mb-2">支持识别</h4>
              <p className="text-gray-700">陕西非遗菜品如腊汁肉、凉皮、甑糕等传统美食</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiRecognition;