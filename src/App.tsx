import React, { useState, useRef } from 'react';

// ==========================================
// 1. 全局数据准备
// ==========================================

// 文化传承数据
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

// --- [修复版] 节气饮食 ---
// 增加功能：多节气切换、养生卡片、加入清单联动
const SeasonalView = ({ onAdd }) => {
  const [activeTerm, setActiveTerm] = useState('dongzhi');

  // 节气数据字典
  const seasonalData = {
    dongzhi: {
      id: 'dongzhi',
      name: '冬至',
      color: '#1890ff',
      tagline: '阴极之至，阳气始生',
      tip: { good: '羊肉、饺子、坚果', bad: '生冷海鲜、过量辛辣' },
      meals: [
        { type: '早餐', name: '温补小米粥', calories: 200, desc: '温补阳气，顺应冬至节气特点', icon: '☕' },
        { type: '午餐', name: '冬至低脂饺子', calories: 450, desc: '俗话说：冬至不端饺子碗，冻掉耳朵没人管', icon: '🥟' },
        { type: '晚餐', name: '温阳羊肉汤', calories: 350, desc: '暖胃驱寒，补充优质蛋白质', icon: '🍲' }
      ]
    },
    lichun: {
      id: 'lichun',
      name: '立春',
      color: '#52c41a',
      tagline: '大地回春，万物复苏',
      tip: { good: '春笋、韭菜、菠菜', bad: '酸味食物、油腻补品' },
      meals: [
        { type: '早餐', name: '春饼卷素菜', calories: 320, desc: '咬春习俗，清淡爽口', icon: '🌯' },
        { type: '午餐', name: '韭菜炒河虾', calories: 280, desc: '助阳生发，增强脾胃之气', icon: '🦐' },
        { type: '晚餐', name: '红枣山药粥', calories: 240, desc: '养血安神，温补脾胃', icon: '🥣' }
      ]
    },
    dashu: {
      id: 'dashu',
      name: '大暑',
      color: '#fa8c16',
      tagline: '赤日炎炎，湿热交蒸',
      tip: { good: '绿豆、冬瓜、苦瓜', bad: '冷饮过量、油炸烧烤' },
      meals: [
        { type: '早餐', name: '绿豆百合汤', calories: 150, desc: '清热解暑，生津止渴', icon: '🥣' },
        { type: '午餐', name: '凉拌苦瓜', calories: 120, desc: '去心火，解毒明目', icon: '🥗' },
        { type: '晚餐', name: '冬瓜老鸭汤', calories: 380, desc: '滋阴补血，利水消肿', icon: '🦆' }
      ]
    }
  };

  const currentData = seasonalData[activeTerm];

  const handleAddMeal = (meal) => {
    if (onAdd) {
      // 构造成符合个人中心的数据格式
      onAdd({
        name: `${meal.type}·${meal.name}`,
        calories: meal.calories,
        unit: '份'
      });
      alert(`已添加【${meal.name}】到饮食清单！`);
    }
  };

  const TabButton = ({ termKey, label }) => {
    const isActive = activeTerm === termKey;
    return (
      <div 
        onClick={() => setActiveTerm(termKey)}
        style={{ 
          border: isActive ? `2px solid ${seasonalData[termKey].color}` : '1px solid #eee', 
          color: isActive ? seasonalData[termKey].color : '#999', 
          padding: '10px 24px', 
          borderRadius: '8px', 
          fontWeight: isActive ? 'bold' : 'normal', 
          background: isActive ? '#fff' : '#f9f9f9',
          cursor: 'pointer',
          transition: 'all 0.2s',
          flex: 1,
          textAlign: 'center'
        }}
      >
        {label}
      </div>
    );
  };

 return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'left', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '28px', color: '#333', margin: 0 }}>🏛 陕西非遗文化长廊</h2>
        <p style={{ color: '#666', marginTop: '5px' }}>探索三秦大地千年的文化积淀</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {heritageData.map((item) => (
          <div key={item.id} onClick={() => setSelectedItem(item)} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'transform 0.2s' }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            <div style={{ padding: '15px' }}>
              <div style={{ fontSize: '12px', color: '#1890ff', fontWeight: 'bold', marginBottom: '5px' }}>{item.category}</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#333' }}>{item.title}</h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- 个人中心 ---
const PersonalCenterView = ({ dietList = [] }) => {
  const safeList = Array.isArray(dietList) ? dietList : [];
  const baseCalories = 1240;
  const addedCalories = safeList.reduce((acc, cur) => acc + (cur.calories || 0), 0);
  const totalCalories = baseCalories + addedCalories;

  const MenuItem = ({ icon, title, isRed, onClick }) => (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '16px 20px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer',
      color: isRed ? '#ff4d4f' : '#333',
      transition: 'background 0.2s'
    }}
    onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
    onMouseLeave={e => e.currentTarget.style.background = 'white'}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <span>{title}</span>
      </div>
      <span style={{ color: '#ccc' }}>&gt;</span>
    </div>
  );

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
          <div style={{ textAlign: 'center', color: '#ccc', padding: '20px' }}>暂无数据，请前往「AI识食」或「节气饮食」添加</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {safeList.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f9f9f9', borderRadius: '8px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ width: '40px', height: '40px', background: '#e6f7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🍲</div>
                   <div>
                     <div style={{ fontWeight: 'bold', color: '#333' }}>{item.name}</div>
                     <div style={{ fontSize: '12px', color: '#999' }}>热量来源</div>
                   </div>
                 </div>
                 <div style={{ fontWeight: 'bold', color: '#52c41a' }}>+{item.calories} kcal</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. 菜单 */}
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <MenuItem icon="📝" title="编辑资料" onClick={() => alert('跳转编辑资料页面')} />
        <MenuItem icon="⚙️" title="系统设置" onClick={() => alert('打开设置弹窗')} />
        <MenuItem icon="🛡️" title="隐私与安全" onClick={() => alert('隐私设置')} />
        <MenuItem icon="❓" title="帮助与反馈" onClick={() => alert('联系客服')} />
        <MenuItem icon="🚪" title="退出登录" isRed={true} onClick={() => alert('已退出登录')} />
      </div>

      <p style={{ textAlign: 'center', color: '#ccc', fontSize: '12px', marginTop: '30px' }}>Version 1.0.0 · AI Health Diet App</p>
    </div>
  );
};

// ==========================================
// 3. 布局结构
// ==========================================

const SidebarItem = ({ label, icon, active, onClick }) => (
  <div onClick={onClick} style={{
    padding: '16px 24px', cursor: 'pointer',
    background: active ? '#e6f7ff' : 'transparent',
    color: active ? '#1890ff' : '#666',
    borderRight: active ? '3px solid #1890ff' : '3px solid transparent',
    display: 'flex', alignItems: 'center', gap: '12px',
    fontSize: '15px', fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.2s'
  }}>
    <span style={{ fontSize: '18px' }}>{icon}</span>
    {label}
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('home');
  const [dietList, setDietList] = useState([]);

  // 通用添加方法
  const handleAddToDiet = (foodItem) => {
    setDietList(prev => [...prev, { ...foodItem, id: Date.now() + Math.random() }]);
  };

  return (
    <div style={{ fontFamily: "'PingFang SC', sans-serif", backgroundColor: '#f0f2f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#1890ff', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
           <span style={{ marginRight: '10px', background: 'white', color: '#1890ff', width: '32px', height: '32px', borderRadius: '50%', textAlign: 'center', lineHeight: '32px', fontSize: '20px' }}>食</span>
           AI健康饮食 · 陕西文化
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
           <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '20px', cursor: 'pointer' }}>🔔</span>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <div style={{ width: '32px', height: '32px', background: '#ccc', borderRadius: '50%', border: '2px solid white' }}></div>
              <span style={{ color: 'white', fontSize: '14px' }}>登录 / 注册</span>
           </div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <aside style={{ width: '240px', background: 'white', boxShadow: '2px 0 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', paddingTop: '20px', zIndex: 5 }}>
          <div style={{ padding: '0 20px 20px 20px' }}>
            <input type="text" placeholder="🔍 搜索..." style={{ width: '100%', padding: '8px 12px', borderRadius: '4px', border: '1px solid #eee', background: '#f5f5f5', outline: 'none' }} />
          </div>
          <SidebarItem label="首页" icon="🏠" active={activePage === 'home'} onClick={() => setActivePage('home')} />
          <SidebarItem label="AI识食" icon="📷" active={activePage === 'recognition'} onClick={() => setActivePage('recognition')} />
          <SidebarItem label="节气饮食" icon="📅" active={activePage === 'season'} onClick={() => setActivePage('season')} />
          <SidebarItem label="文化传承" icon="📖" active={activePage === 'culture'} onClick={() => setActivePage('culture')} />
          <SidebarItem label="个人中心" icon="👤" active={activePage === 'report'} onClick={() => setActivePage('report')} />
          <div style={{ marginTop: 'auto', padding: '20px', borderTop: '1px solid #eee', color: '#999', fontSize: '12px' }}>系统设置 ⚙️</div>
        </aside>

        <main style={{ flex: 1, overflowY: 'auto', padding: '20px', backgroundColor: '#eef7fc' }}>
          {activePage === 'home' && <HomeView toPage={setActivePage} />}
          {activePage === 'recognition' && <RecognitionView onAdd={handleAddToDiet} />}
          {/* 这里也传入了 onAdd */}
          {activePage === 'season' && <SeasonalView onAdd={handleAddToDiet} />}
          {activePage === 'culture' && <CultureView />}
          {activePage === 'report' && <PersonalCenterView dietList={dietList} />}
        </main>
      </div>

      <div style={{ position: 'fixed', bottom: '30px', right: '30px', background: '#3CA9C4', color: 'white', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 100, fontWeight: 'bold' }}>
        <span>✨</span> AI助手
      </div>
    </div>
  );
}

export default App;