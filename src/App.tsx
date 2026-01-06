import React, { useState } from 'react';

// ==========================================
// 1. 数据准备 (保持原样)
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

// 节气饮食数据
const meals = [
  { type: '早餐', name: '温补小米粥', kcal: 200, desc: '温补阳气，顺应冬至节气特点', icon: '☕' },
  { type: '午餐', name: '冬至低脂饺子', kcal: 450, desc: '俗话说：冬至不端饺子碗，冻掉耳朵没人管', icon: '🥟' },
  { type: '晚餐', name: '温阳羊肉汤', kcal: 350, desc: '暖胃驱寒，补充优质蛋白质', icon: '🍲' }
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
const RecognitionView = () => (
  <div style={{ textAlign: 'center', padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <h1 style={{ color: '#333', fontSize: '28px', marginBottom: '10px' }}>AI非遗菜品识别</h1>
    <p style={{ color: '#666', marginBottom: '30px' }}>拍照识别陕西非遗菜品，获取营养信息和文化背景</p>
    <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '40px', alignItems: 'center', justifyContent: 'center', minHeight: '300px' }}>
      <div style={{ flex: 1, border: '2px dashed #d9d9d9', borderRadius: '12px', height: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fafafa', cursor: 'pointer' }}>
        <div style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}>📷</div>
        <div style={{ color: '#999' }}>点击下方按钮上传图片</div>
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px', color: '#888' }}>ℹ️</span>
          <span style={{ color: '#666' }}>上传图片后，AI将识别菜品并显示营养信息和文化背景</span>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '30px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
      <button style={{ padding: '10px 30px', background: '#1890ff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>📤 上传图片</button>
      <button style={{ padding: '10px 30px', background: '#e6e6e6', color: '#666', border: 'none', borderRadius: '6px', fontSize: '14px', cursor: 'pointer' }}>🔄 重新识别</button>
    </div>
  </div>
);

// --- 节气饮食 ---
const SeasonalView = () => (
  <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
       <span style={{ background: '#ffa940', color: 'white', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold' }}>☀️ 今日冬至，宜温补！</span>
    </div>

    <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
       <div style={{ display: 'flex', gap: '40px', marginBottom: '30px' }}>
         <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '10px', color: '#666' }}>选择节气</div>
            <div style={{ display: 'flex', gap: '10px' }}>
               <div style={{ border: '2px solid #1890ff', color: '#1890ff', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', background: '#e6f7ff' }}>🔆 冬至</div>
               <div style={{ border: '1px solid #eee', color: '#999', padding: '10px 20px', borderRadius: '8px' }}>清明</div>
               <div style={{ border: '1px solid #eee', color: '#999', padding: '10px 20px', borderRadius: '8px' }}>立夏</div>
            </div>
         </div>
       </div>

       <h3 style={{ borderLeft: '4px solid #1890ff', paddingLeft: '10px', marginBottom: '20px' }}>今日三餐建议</h3>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         {meals.map((meal, idx) => (
           <div key={idx} style={{ background: '#f5faff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '32px' }}>{meal.icon}</div>
                <div>
                   <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#333' }}>{meal.type} - {meal.name}</div>
                   <div style={{ color: '#666', fontSize: '13px', marginTop: '4px' }}>{meal.desc}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{meal.kcal} kcal</span>
                 <button style={{ background: '#1890ff', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>加入</button>
              </div>
           </div>
         ))}
       </div>
    </div>
  </div>
);

// --- 文化传承 ---
const CultureView = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  if (selectedItem) {
    return (
      <div style={{ maxWidth: '1000px', margin: '20px auto', padding: '30px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <button onClick={() => setSelectedItem(null)} style={{ marginBottom: '20px', padding: '8px 20px', border: '1px solid #ddd', background: 'white', borderRadius: '6px', cursor: 'pointer' }}>← 返回列表</button>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <img src={selectedItem.image} alt={selectedItem.title} style={{ width: '100%', maxWidth: '450px', borderRadius: '12px', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <span style={{ background: '#e6f7ff', color: '#1890ff', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>{selectedItem.category}</span>
            <h1 style={{ marginTop: '10px', color: '#333' }}>{selectedItem.title}</h1>
            <p style={{ fontSize: '16px', lineHeight: '1.8', color: '#555', margin: '20px 0' }}>{selectedItem.detail}</p>
            <div style={{ background: '#fffbe6', padding: '20px', borderRadius: '8px', border: '1px solid #ffe58f' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>🎥 影像资料库</h3>
              <a href={selectedItem.videoUrl} target="_blank" rel="noreferrer" style={{ background: '#ff4d4f', color: 'white', textDecoration: 'none', padding: '8px 20px', borderRadius: '4px', fontSize: '14px' }}>▶ 立即观看</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

// --- 新版：个人中心 (Personal Center) ---
const PersonalCenterView = () => {
  // 设置列表项样式
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
      {/* 1. 用户信息卡片 */}
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

      {/* 2. 健康数据概览 (保留原健康报告功能) */}
      <h3 style={{ marginLeft: '10px', color: '#555' }}>我的健康数据</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>身体质量指数 (BMI)</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>21.5 <span style={{ fontSize: '12px', fontWeight: 'normal' }}>正常</span></div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>今日热量摄入</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>1,240 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#999' }}>/ 1800 kcal</span></div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>当前体重</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>62.5 <span style={{ fontSize: '12px', fontWeight: 'normal', color: '#999' }}>kg</span></div>
        </div>
      </div>

      {/* 3. 设置与功能菜单 */}
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
    padding: '16px 24px',
    cursor: 'pointer',
    background: active ? '#e6f7ff' : 'transparent',
    color: active ? '#1890ff' : '#666',
    borderRight: active ? '3px solid #1890ff' : '3px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '15px',
    fontWeight: active ? 'bold' : 'normal',
    transition: 'all 0.2s'
  }}>
    <span style={{ fontSize: '18px' }}>{icon}</span>
    {label}
  </div>
);

function App() {
  const [activePage, setActivePage] = useState('home');

  return (
    <div style={{ fontFamily: "'PingFang SC', sans-serif", backgroundColor: '#f0f2f5', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/*