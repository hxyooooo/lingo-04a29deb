import React, { useState } from 'react';

// ==========================================
// 1. 数据准备 (非遗展示数据)
// ==========================================
const heritageData = [
  {
    id: 1,
    title: '陕西皮影戏 (Shadow Puppetry)',
    category: '民间美术 / 陕西特色',
    image: 'https://img95.699pic.com/photo/50064/0488.jpg_wh860.jpg',
    desc: '皮影戏俗称“灯影子”，是陕西关中地区最具代表性的民间艺术形式。',
    detail: '陕西皮影戏起源于汉代，兴盛于唐宋。其造型质朴单纯，富于装饰性，同时又具有精致工巧的艺术特色。表演时，艺人们在白色幕布后面，一边操纵影人，一边用秦腔讲述故事，吼出西北汉子的豪迈。',
    videoUrl: 'https://www.bilibili.com/video/BV1Ax411w7F6/'
  },
  {
    id: 2,
    title: '秦腔 (Qinqiang Opera)',
    category: '传统戏剧 / 陕西特色',
    image: 'https://img95.699pic.com/photo/50046/5569.jpg_wh860.jpg', // 暂用戏曲图代替
    desc: '中国汉族最古老的戏剧之一，起于西周，成熟于秦，是陕西文化的灵魂。',
    detail: '秦腔，别称“邦子腔”，是中国西北最古老的戏剧之一。其特点是高昂激越、强烈急促。听秦腔，能感受到关中八百里秦川的厚重与沧桑，是国家级非物质文化遗产。',
    videoUrl: 'https://www.bilibili.com/video/BV1Qs411N7vK/'
  },
  {
    id: 3,
    title: '凤翔泥塑 (Clay Sculpture)',
    category: '传统技艺 / 宝鸡',
    image: 'https://img95.699pic.com/photo/50160/3277.jpg_wh860.jpg', // 暂用通用图
    desc: '凤翔泥塑色彩艳丽，造型夸张，是陕西省宝鸡市凤翔区的一种民间美术。',
    detail: '凤翔泥塑汲取了古代石刻、年画、剪纸和刺绣的纹饰，造型夸张，色彩鲜艳，深受人们喜爱。其中以“挂虎”和“坐虎”最为典型，寓意驱邪避灾，吉祥如意。',
    videoUrl: 'https://www.bilibili.com/video/BV1UW411M7Sg/'
  },
  {
    id: 4,
    title: '安塞腰鼓 (Waist Drum)',
    category: '民俗舞蹈 / 延安',
    image: 'https://img95.699pic.com/photo/40007/3569.jpg_wh860.jpg', 
    desc: '流传于陕西省安塞区的一种民间广场舞蹈艺术，气势磅礴。',
    detail: '安塞腰鼓是黄土高原上的一种独特的民间大型舞蹈艺术形式，具有2000年以上的历史。表演可由几人或上千人一同进行，磅礴的气势，精湛的技艺，使人叹为观止。',
    videoUrl: 'https://www.bilibili.com/video/BV1Mx411w7nQ/'
  },
  {
    id: 5,
    title: '景泰蓝 (Cloisonné)',
    category: '传统技艺',
    image: 'https://img95.699pic.com/photo/50055/5638.jpg_wh860.jpg',
    desc: '正名“铜胎掐丝珐琅”，集历史、文化、艺术及独特的传统工艺于一身。',
    detail: '虽然景泰蓝多见于北京，但在中华文化长河中，它代表了极致的工匠精神。它集历史、文化、艺术及独特的传统工艺于一身，古朴典雅，精美华贵。',
    videoUrl: 'https://www.bilibili.com/video/BV1Kb411W7Xy/'
  },
  {
    id: 6,
    title: '苏绣 (Suzhou Embroidery)',
    category: '传统技艺',
    image: 'https://img95.699pic.com/photo/50059/8966.jpg_wh860.jpg',
    desc: '苏绣具有图案秀丽、构思巧妙、绣工细致、针法活泼的风格。',
    detail: '苏绣与湘绣、蜀绣、粤绣并称为中国四大名绣。其发源地在苏州吴县一带，现已遍衍无锡、常州等地。',
    videoUrl: 'https://www.bilibili.com/video/BV1Es411D7Wx/'
  }
];

// ==========================================
// 2. 页面组件
// ==========================================

// --- A. “AI识食”页面 (复刻你的截图) ---
const AIRecognitionPage = () => (
  <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ color: '#333', fontSize: '32px', marginBottom: '10px' }}>AI非遗菜品识别</h1>
    <p style={{ color: '#666', marginBottom: '40px' }}>拍照识别陕西非遗菜品，获取营养信息和文化背景</p>

    {/* 上传区域 */}
    <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* 左侧虚线框 */}
      <div style={{ flex: 1, border: '2px dashed #d9d9d9', borderRadius: '12px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fafafa', cursor: 'pointer' }}>
        <div style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}>📷</div>
        <div style={{ color: '#999' }}>点击下方按钮上传图片</div>
      </div>

      {/* 右侧说明 */}
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px', color: '#888' }}>ℹ️</span>
          <span style={{ color: '#666' }}>上传图片后，AI将识别菜品并显示营养信息和文化背景</span>
        </div>
      </div>
    </div>

    {/* 按钮区域 */}
    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <button style={{ padding: '12px 30px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        📤 上传图片
      </button>
      <button style={{ padding: '12px 30px', background: '#e6e6e6', color: '#666', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        🔄 重新识别
      </button>
    </div>

    {/* 底部贴士 */}
    <div style={{ marginTop: '40px', background: 'white', borderRadius: '12px', padding: '20px', textAlign: 'left', display: 'flex', gap: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div style={{ flex: 1, background: '#f0f9ff', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#1890ff' }}>最佳拍摄角度</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>正面拍摄，确保菜品完整可见，避免反光和阴影</p>
      </div>
      <div style={{ flex: 1, background: '#f6ffed', padding: '15px', borderRadius: '8px' }}>
        <h4 style={{ margin: '0 0 5px 0', color: '#52c41a' }}>支持识别</h4>
        <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>陕西非遗菜品如腊汁肉、凉皮、甑糕等传统美食</p>
      </div>
    </div>
  </div>
);

// --- B. “文化传承”页面 (你想要的新功能) ---
const CultureHeritagePage = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // 1. 详情页视图
  if (selectedItem) {
    return (
      <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '30px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <button 
          onClick={() => setSelectedItem(null)} 
          style={{ padding: '8px 16px', border: '1px solid #ddd', background: 'white', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← 返回文化长廊
        </button>
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <img 
            src={selectedItem.image} 
            alt={selectedItem.title} 
            style={{ width: '100%', maxWidth: '500px', borderRadius: '12px', objectFit: 'cover', height: '300px' }} 
          />
          <div style={{ flex: 1 }}>
            <span style={{ background: '#e6f7ff', color: '#1890ff', padding: '4px 10px', borderRadius: '4px', fontSize: '14px' }}>{selectedItem.category}</span>
            <h1 style={{ marginTop: '15px', marginBottom: '20px', color: '#333' }}>{selectedItem.title}</h1>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555' }}>
              {selectedItem.detail}
            </p>
            
            <div style={{ marginTop: '30px', padding: '20px', background: '#fffbe6', borderRadius: '8px', border: '1px solid #ffe58f' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🎥 影像资料库</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>想了解更多？点击观看官方纪录片或介绍视频。</p>
              <a 
                href={selectedItem.videoUrl} 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'inline-block', marginTop: '10px', padding: '10px 20px', background: '#ff4d4f', color: 'white', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold' }}
              >
                ▶ 立即观看
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. 列表页视图
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', color: '#333', margin: 0 }}>🏛 陕西非遗文化长廊</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>探索三秦大地千年的文化积淀</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {heritageData.map((item) => (
          <div 
            key={item.id} 
            onClick={() => { setSelectedItem(item); window.scrollTo(0, 0); }}
            style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <div style={{ fontSize: '12px', color: '#1890ff', fontWeight: 'bold', marginBottom: '5px' }}>{item.category}</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#333' }}>{item.title}</h3>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                {item.desc.length > 45 ? item.desc.substring(0, 45) + '...' : item.desc}
              </p>
              <div style={{ marginTop: '15px', color: '#1890ff', fontSize: '14px', fontWeight: 'bold' }}>查看详情 →</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. 主程序入口 (导航控制)
// ==========================================
function App() {
  // 核心状态：当前在哪个页面？默认在 'recognition' (你的截图页)
  const [activePage, setActivePage] = useState('recognition'); 

  // 导航栏样式助手
  const navLinkStyle = (pageName) => ({
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '0 15px',
    cursor: 'pointer',
    opacity: activePage === pageName ? 1 : 0.7,
    fontWeight: activePage === pageName ? 'bold' : 'normal',
    borderBottom: activePage === pageName ? '2px solid white' : 'none',
    paddingBottom: '5px'
  });

  return (
    <div style={{ fontFamily: "'PingFang SC', sans-serif", backgroundColor: '#f0f8ff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- 顶部导航栏 (和你的截图一样) --- */}
      <header style={{ background: '#1890ff', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Logo区域 */}
        <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
          <span style={{ marginRight: '10px', background: 'white', color: '#1890ff', width: '30px', height: '30px', borderRadius: '50%', textAlign: 'center', lineHeight: '30px', fontSize: '18px' }}>食</span>
          AI健康饮食 · 陕西文化
        </div>

        {/* 菜单链接 */}
        <nav style={{ display: 'flex', gap: '10px' }}>
          <div style={navLinkStyle('home')} onClick={() => alert('首页功能开发中...')}>🏠 首页</div>
          
          {/* 点击这里切换到 AI识别 */}
          <div style={navLinkStyle('recognition')} onClick={() => setActivePage('recognition')}>📷 AI识食</div>
          
          <div style={navLinkStyle('season')} onClick={() => alert('节气饮食开发中...')}>📅 节气饮食</div>
          
          {/* 点击这里切换到 文化传承 (新功能) */}
          <div style={navLinkStyle('culture')} onClick={() => setActivePage('culture')}>📖 文化传承</div>
          
          <div style={navLinkStyle('report')} onClick={() => alert('健康报告开发中...')}>📈 健康报告</div>
        </nav>

        {/* 右侧登录按钮 */}
        <div>
          <button style={{ background: 'white', color: '#1890ff', border: 'none', padding: '6px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            登录
          </button>
        </div>
      </header>

      {/* --- 主要内容区域 --- */}
      <main style={{ flex: 1 }}>
        {activePage === 'recognition' && <AIRecognitionPage />}
        {activePage === 'culture' && <CultureHeritagePage />}
      </main>

      {/* --- AI助手悬浮窗 (截图右下角那个) --- */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#3CA9C4', color: 'white', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100 }}>
        <span>✨</span> AI助手
      </div>

    </div>
  );
}

export default App;

