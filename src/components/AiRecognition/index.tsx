import React, { useState, useRef } from 'react';
import { Camera, Upload, RotateCcw, Info } from 'lucide-react';
import mockData from '../../mock.json';

const AiRecognition: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setIsLoading(true);
        
        // 模拟AI识别过程
        setTimeout(() => {
          // 随机选择一个菜品作为识别结果
          const randomFood = mockData.foods[Math.floor(Math.random() * mockData.foods.length)];
          setRecognitionResult(randomFood);
          setIsLoading(false);
        }, 2000);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
                  <img 
                    src={selectedImage} 
                    alt="Uploaded" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
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
              {recognitionResult ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-qianqing-blue to-qinghua-blue rounded-lg p-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{recognitionResult.name}</h3>
                    <p className="opacity-90">识别成功！这是一道陕西非遗菜品</p>
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
                        <div className="text-2xl font-bold text-danhe-color">{recognitionResult.carbs}g</div>
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
                        <span className="text-danhe-color">{recognitionResult.heritage.category}</span>
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