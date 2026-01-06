import React, { useState, useRef } from 'react';

// ==========================================
// 1. 全局数据准备
// ==========================================

// --- 文化传承数据 (非遗长廊) ---
const heritageData = [
  {
    id: 1,
    title: '陕西皮影戏',
    category: '民间美术 / 国家级非遗',
    image: 'https://img95.699pic.com/photo/50064/0488.jpg_wh860.jpg',
    desc: '一口叙说千古事，双手对舞百万兵。',
    detail: '陕西皮影戏起源于汉代，兴盛于唐宋。其造型质朴单纯，富于装饰性，同时又具有精致工巧的艺术特色。表演时，艺人们在白色幕布后面，一边操纵影人，一边用秦腔讲述故事，吼出西北汉子的豪迈。',
    videoUrl: 'https://www.bilibili.com/video/BV1Ax411w7F6/'
  },
  {
    id: 2,
    title: '秦腔',
    category: '传统戏剧 / 国家级非遗',
    image: 'https://img95.699pic.com/photo/50046/5569.jpg_wh860.jpg', 
    desc: '八百里秦川尘土飞扬，三千万老陕齐吼秦腔。',
    detail: '秦腔，别称“邦子腔”，是中国西北最古老的戏剧之一。其特点是高昂激越、强烈急促。听秦腔，能感受到关中八百里秦川的厚重与沧桑，是国家级非物质文化遗产。',
    videoUrl: 'https://www.bilibili.com/video/BV1Qs411N7vK/'
  },
  {
    id: 3,
    title: '凤翔泥塑',
    category: '传统技艺 / 宝鸡',
    image: 'https://img95.699pic.com/photo/50160/3277.jpg_wh860.jpg',
    desc: '色彩艳丽，造型夸张，寓意驱邪避灾。',
    detail: '凤翔泥塑汲取了古代石刻、年画、剪纸和刺绣的纹饰，造型夸张，色彩鲜艳，深受人们喜爱。其中以“挂虎”和“坐虎”最为典型，寓意驱邪避灾，吉祥如意。',
    videoUrl: 'https://www.bilibili.com/video/BV1UW411M7Sg/'
  },
  {
    id: 4,
    title: '安塞腰鼓',
    category: '民俗舞蹈 / 延安',
    image: 'https://img95.699pic.com/photo/40007/3569.jpg_wh860.jpg', 
    desc: '黄土高原上的“第一鼓”，气势磅礴。',
    detail: '安塞腰鼓是黄土高原上的一种独特的民间大型舞蹈艺术形式，具有2000年以上的历史。表演可由几人或上千人一同进行，磅礴的气势，精湛的技艺，使人叹为观止。',
    videoUrl: 'https://www.bilibili.com/video/BV1Mx411w7nQ/'
  },
  {
    id: 5,
    title: '同州梆子',
    category: '传统戏剧 / 渭南',
    image: 'https://img95.699pic.com/photo/50055/5638.jpg_wh860.jpg',
    desc: '秦腔的鼻祖，唱腔激越豪放。',
    detail: '同州梆子是陕西省东府渭南地区的地方戏曲剧种，是秦腔的前身。它保留了更多古老的音韵和表演程式，具有极高的艺术研究价值。',
    videoUrl: '#'
  },
  {
    id: 6,
    title: '耀州窑陶瓷',
    category: '传统技艺 / 铜川',
    image: 'https://img95.699pic.com/photo/50059/8966.jpg_wh860.jpg',
    desc: '巧如范金，精比琢玉，北方青瓷代表。',
    detail: '耀州窑是中国传统制瓷工艺中的珍品，宋代六大窑系。其刀法犀利流畅，线条刚劲有力，素有“北方青瓷之冠”的美誉。',
    videoUrl: '#'
  }
];

// --- 节气数据字典 ---
const seasonalData = {
  lichun: {
    name: '立春',
    date: '2月3日-5日',
    color: '#52c41a',
    intro: '立春，为二十四节气之首。立，是“开始”之意；春，代表着温暖、生长。立春不仅是春天的开始，也是一年农事活动的开端。陕西民间有“咬春”的习俗，吃春饼、嚼萝卜，祈求身体健康，五谷丰登。',
    foods: [
      { name: '春饼卷素', calories: 320, desc: '薄饼卷土豆丝、豆芽，寓意咬住春天', icon: '🌯' },
      { name: '凉拌萝卜丝', calories: 80, desc: '清脆爽口，顺气消食，谓之“咬春”', icon: '🥕' },
      { name: '韭菜炒鸡蛋', calories: 260, desc: '春令时鲜，助阳生发', icon: '🥚' }
    ]
  },
  qingming: {
    name: '清明',
    date: '4月4日-6日',
    color: '#13c2c2',
    intro: '清明时节雨纷纷，万物生长此时洁净而明清。此时节气温转暖，但早晚仍有凉意。饮食宜温和，多吃柔肝养肺的食物。陕西关中地区有吃“寒食”的遗风，如凉皮、凉面等。',
    foods: [
      { name: '青团', calories: 220, desc: '艾草汁和面，清淡幽香，软糯可口', icon: '🟢' },
      { name: '秦镇凉皮', calories: 280, desc: '清明吃凉，酸辣开胃，关中特色', icon: '🍜' },
      { name: '螺蛳肉', calories: 150, desc: '清明螺，抵只鹅，肉质肥美', icon: '🐚' }
    ]
  },
  dashu: {
    name: '大暑',
    date: '7月22日-24日',
    color: '#fa8c16',
    intro: '大暑是全年最热的节气，“湿热交蒸”在此时达到顶点。饮食应以清热解暑、健脾利湿为主。老陕人喜欢在夏天喝绿豆汤、吃浆水鱼鱼，既解暑又开胃。',
    foods: [
      { name: '绿豆百合汤', calories: 120, desc: '消暑止渴，清心安神', icon: '🥣' },
      { name: '浆水鱼鱼', calories: 180, desc: '酸香爽滑，也是陕西夏日消暑神器', icon: '🐟' },
      { name: '苦瓜炒肉', calories: 240, desc: '苦味入心，清热祛火', icon: '🥒' }
    ]
  },
  dongzhi: {
    name: '冬至',
    date: '12月21日-23日',
    color: '#1890ff',
    intro: '冬至是“阴极之至，阳气始生”的重要节气。在陕西，冬至地位极高，所谓“冬至大如年”。最核心的习俗就是吃饺子，寓意消寒，不冻耳朵；陕北地区则有喝羊肉汤的习惯，以此温补阳气。',
    foods: [
      { name: '酸汤水饺', calories: 450, desc: '冬至不端饺子碗，冻掉耳朵没人管', icon: '🥟' },
      { name: '铁锅炖羊肉', calories: 500, desc: '温中暖肾，抵御严寒', icon: '🥘' },
      { name: '八宝粥', calories: 300, desc: '五谷杂粮，健脾养胃', icon: '🥣' }
    ]
  }
};

// ==========================================
// 2. 页面组件
// ==========================================

// --- 首页 ---
const HomeView = ({ toPage }) => (
  <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
    <h1 style={{ fontSize: '42px', color: '#333', marginBottom: '10px', fontWeight: 'bold' }}>AI健康饮食</h1>
    <h1 style={{ fontSize: '42px', color: '#1890ff', marginTop: '0', marginBottom: '20px', fontWeight: 'bold' }}>陕西传统文化融合</h1>
    <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>以AI轻量化赋能精准健康饮食，结合陕西非遗饮食文化传承的移动应用</p>
    
    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '50px' }}>
      <button onClick={() => toPage('recognition')} style={{ padding: '12px 36px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(24,144,255,0.3)' }}>开始体验</button>
      <button style={{ padding: '12px 36px', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: '6px', fontSize: '16px', cursor: 'pointer' }}>了解更多</button>
    </div>

    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
      {[
        { num: '42+', label: '非遗菜品' }, { num: '128+', label: '传统食谱' }, { num: '2456+', label: '注册用户' }
      ].map((stat, idx) => (
        <div key={idx} style={{ background: 'white', padding: '20px', borderRadius: '12px', width: '220px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '32px', color: '#ffa940', fontWeight: 'bold' }}>{stat.num}</div>
          <div style={{ color: '#666', marginTop: '5px' }}>{stat.label}</div>
        </div>
      ))}
    </div>

    <h2 style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'left' }}>核心功能概览</h2>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
      {[
        { title: 'AI非遗识别', desc: '拍照识别陕西非遗菜品', icon: '📷', link: 'recognition' },
        { title: '节气饮食', desc: '根据节气推荐传统食谱', icon: '📅', link: 'season' },
        { title: '文化传承', desc: '学习陕西非遗技艺', icon: '📖', link: 'culture' },
        { title: '个人中心', desc: '查看健康数据与设置', icon: '👤', link: 'report' }
      ].map((item, idx) => (
        <div key={idx} onClick={() => toPage(item.link)} style={{ background: 'white', padding: '25px', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', textAlign: 'left' }}>
          <div style={{ fontSize: '30px', marginBottom: '15px', background: '#e6f7ff', width: '60px', height: '60px', lineHeight: '60px', borderRadius: '50%', textAlign: 'center', color: '#1890ff' }}>{item.icon}</div>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{item.title}</h3>
          <p style={{ color: '#999', fontSize: '13px', margin: 0 }}>{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// --- AI识食 ---
const RecognitionView = ({ onAdd }) => {
  const [imgPreview, setImgPreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const mockDatabase = [
    { name: '腊汁肉夹馍', calories: 455, unit: '个', intro: '陕西省非物质文化遗产，中式汉堡。', recipe: '老卤炖煮五花肉，白吉馍烤制酥脆。' },
    { name: '羊肉泡馍', calories: 560, unit: '碗', intro: '苏轼赞誉“秦烹唯羊羹”。', recipe: '羊骨熬汤，死面烙饼，配糖蒜辣酱。' },
    { name: '秦镇米皮', calories: 280, unit: '份', intro: '色白光润，皮薄筋道，酸辣味浓。', recipe: '大米磨浆蒸制，切条拌入秘制调料。' }
  ];

  const handleBtnClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPreview(reader.result);
        setStatus('loading');
        setTimeout(() => {
          const isSuccess = Math.random() > 0.1; 
          if (isSuccess) {
            const randomDish = mockDatabase[Math.floor(Math.random() * mockDatabase.length)];
            setResult(randomDish);
            setStatus('success');
          } else {
            setStatus('error');
          }
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToDiet = () => {
    if(onAdd) {
        onAdd(result);
        alert(`成功！已将【${result.name}】加入个人中心的饮食清单。`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', fontSize: '28px', marginBottom: '10px' }}>AI非遗菜品识别</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>上传图片，AI自动分析营养成分与文化背景</p>
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div onClick={status === 'loading' ? null : handleBtnClick} style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '2px dashed #d9d9d9', cursor: status === 'loading' ? 'wait' : 'pointer', overflow: 'hidden', position: 'relative' }}>
            {imgPreview ? (
              <>
                <img src={imgPreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {status === 'loading' && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}><div style={{ fontSize: '30px', marginBottom: '10px' }}>🤖</div><div style={{ color: '#1890ff', fontWeight: 'bold' }}>AI 正在分析...</div></div>
                )}
              </>
            ) : (
              <><div style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}>📷</div><div style={{ color: '#999' }}>点击上传图片</div></>
            )}
          </div>
          <div style={{ marginTop: '20px' }}>
             <button onClick={handleBtnClick} style={{ padding: '12px 30px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 10px rgba(24,144,255,0.3)' }}>{imgPreview ? '🔄 重新上传' : '📤 上传图片'}</button>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: '300px', textAlign: 'left' }}>
          {status === 'idle' && (
             <div style={{ background: 'white', padding: '40px', borderRadius: '16px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#999', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}><div style={{ fontSize: '40px', marginBottom: '20px', opacity: 0.5 }}>📊</div><div>请上传图片，右侧将显示分析结果</div></div>
          )}
          {status === 'success' && result && (
            <div style={{ background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
                 <div><span style={{ background: '#e6f7ff', color: '#1890ff', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>陕西非遗美食</span><h2 style={{ margin: '10px 0', color: '#333' }}>{result.name}</h2></div>
                 <div style={{ textAlign: 'right' }}><div style={{ fontSize: '28px', color: '#52c41a', fontWeight: 'bold' }}>{result.calories}</div><div style={{ fontSize: '12px', color: '#999' }}>kcal / {result.unit}</div></div>
               </div>
               <div style={{ marginBottom: '20px' }}><h4 style={{ margin: '0 0 8px 0', color: '#666' }}>💡 介绍</h4><p style={{ margin: 0, fontSize: '14px', color: '#555', lineHeight: '1.6' }}>{result.intro}</p></div>
               <div style={{ marginBottom: '30px' }}><h4 style={{ margin: '0 0 8px 0', color: '#666' }}>🍲 做法概览</h4><div style={{ background: '#fafafa', padding: '15px', borderRadius: '8px', fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{result.recipe}</div></div>
               <button onClick={handleAddToDiet} style={{ width: '100%', padding: '12px', background: '#52c41a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 10px rgba(82,196,26,0.3)' }}><span>➕</span> 加入今日饮食清单</button>
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#fff1f0', padding: '40px', borderRadius: '16px', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#ff4d4f', border: '1px solid #ffccc7' }}><div style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️</div><h3 style={{ margin: '0 0 10px 0' }}>无法识别图片内容</h3><p style={{ margin: 0, color: '#666', textAlign: 'center', maxWidth: '250px' }}>未检测到已知的陕西非遗菜品，请确保图片清晰，主体完整。</p></div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- [新版] 节气饮食 ---
const SeasonalView = ({ onAdd }) => {
  // 默认选中"冬至"
  const [activeTerm, setActiveTerm] = useState('dongzhi');
  
  // 获取当前选中节气的数据
  const termInfo = seasonalData[activeTerm];

  // 处理添加食物到清单
  const handleAddFood = (food) => {
    if (onAdd) {
      onAdd({
        name: `${termInfo.name}·${food.name}`,
        calories: food.calories,
        unit: '份'
      });
      alert(`已将【${food.name}】加入个人中心的饮食清单！`);
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      {/* 1. 用户信息 */}
      <div style={{ background: 'white', borderRadius: '16px', padding: '30px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#ddd', overflow: 'hidden' }}>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ margin: '0 0 5px 0', color: '#333' }}>用户管理员 <span style={{ fontSize: '12px', background: '#fff7e6', color: '#fa8c16', padding: '2px 8px', borderRadius: '10px', verticalAlign: 'middle', border: '1px solid #ffd591' }}>VIP会员</span></h2>
          <p style={{ margin: 0, color: '#999', fontSize: '13px' }}>ID: 8827364 | 陕西·西安</p>
        </div>
        <button style={{ padding: '8px 20px', border: '1px solid #1890ff', color: '#1890ff', background: 'white', borderRadius: '20px', cursor: 'pointer' }}>签到打卡</button>
      </div>

      {/* 2. 健康数据 */}
      <h3 style={{ marginLeft: '10px', color: '#555' }}>我的健康数据</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>身体质量指数 (BMI)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>21.5 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>正常</span></div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>今日热量摄入</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>{totalCalories} <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#999' }}>/ 1800 kcal</span></div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>当前体重</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>62.5 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#999' }}>kg</span></div>
        </div>
      </div>

      {/* 3. 今日饮食清单 */}
      <h3 style={{ marginLeft: '10px', color: '#555' }}>今日饮食清单 (AI识别 / 节气食谱)</h3>
      <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '30px', minHeight: '100px' }}>
        {safeList.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#ccc', padding: '20px' }}>暂无饮食记录，请通过AI识别或节气饮食添加</div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {safeList.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f9f9f9', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>{item.calories} kcal / {item.unit}</div>
                </div>
                <button style={{ padding: '6px 12px', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}>删除</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 3. 主程序 (App Layout)
// ==========================================
function App() {
  const [activePage, setActivePage] = useState('home');
  const [dietList, setDietList] = useState([]);

  const handleAddToDiet = (item) => {
    setDietList([...dietList, item]);
  };

  const getNavItemStyle = (page) => ({
    color: '#333',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontWeight: activePage === page ? 'bold' : 'normal',
    backgroundColor: activePage === page ? '#e6f7ff' : 'transparent',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  });

  return (
    <div style={{ fontFamily: "'PingFang SC', sans-serif", backgroundColor: '#f0f2f5', minHeight: '100vh', display: 'flex' }}>
      
      {/* 左侧导航栏 */}
      <div style={{ width: '220px', background: 'white', boxShadow: '2px 0 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
        {/* 顶部标题 */}
        <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '20px', color: '#1890ff' }}>🍃</span>
          <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>营养师后台管理系统</span>
        </div>
        
        {/* 搜索框 */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #eee' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '6px', padding: '8px 12px' }}>
            <span style={{ color: '#999', marginRight: '8px' }}>🔍</span>
            <input type="text" placeholder="搜索..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
          </div>
        </div>
        
        {/* 导航菜单 */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {[
            { icon: '🏠', label: '仪表盘', page: 'home' },
            { icon: '👥', label: '用户管理', page: 'users' },
            { icon: '🍎', label: '食物数据库', page: 'food' },
            { icon: '🍽️', label: '食谱管理', page: 'recipes' },
            { icon: '📝', label: '饮食记录', page: 'records' },
            { icon: '📊', label: '营养分析', page: 'analysis' },
            { icon: '⚙️', label: '系统设置', page: 'settings' }
          ].map((item, idx) => (
            <div key={idx} onClick={() => setActivePage(item.page)} style={getNavItemStyle(item.page)}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* 右侧主内容区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 顶部导航栏 */}
        <header style={{ background: '#1890ff', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
            <span style={{ marginRight: '10px', background: 'white', color: '#1890ff', width: '30px', height: '30px', borderRadius: '50%', textAlign: 'center', lineHeight: '30px', fontSize: '18px' }}>食</span>
            AI健康饮食 · 陕西文化
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ color: 'white', fontSize: '20px', cursor: 'pointer' }}>🔔</span>
              <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ff4d4f', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>3</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', cursor: 'pointer' }}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="管理员" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
              <span>管理员</span>
              <span>▼</span>
            </div>
          </div>
        </header>

        {/* 主体内容 */}
        <main style={{ flex: 1, padding: '24px' }}>
          {activePage === 'home' && <HomeView toPage={setActivePage} />}
          {activePage === 'recognition' && <RecognitionView onAdd={handleAddToDiet} />}
          {activePage === 'season' && <SeasonalView onAdd={handleAddToDiet} />}
          {activePage === 'culture' && <CultureView />}
          {activePage === 'report' && <PersonalCenterView dietList={dietList} />}
          {activePage === 'users' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>用户管理页面</div>}
          {activePage === 'food' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>食物数据库页面</div>}
          {activePage === 'recipes' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>食谱管理页面</div>}
          {activePage === 'records' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>饮食记录页面</div>}
          {activePage === 'analysis' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>营养分析页面</div>}
          {activePage === 'settings' && <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px', color: '#666' }}>系统设置页面</div>}
        </main>

        {/* AI助手悬浮按钮 */}
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#3CA9C4', color: 'white', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, fontWeight: 'bold' }}>
          <span>✨</span> AI助手
        </div>
      </div>
    </div>
  );
}

export default App;