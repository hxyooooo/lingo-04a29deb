import React, { useState } from 'react';

// ---------------------------------------------------------------------
// 1. 直接把数据写在前端，不查数据库了，保证能显示！
// ---------------------------------------------------------------------
const heritageData = [
  {
    id: 1,
    title: '皮影戏 (Shadow Puppetry)',
    category: '民间美术 / 戏剧',
    image: 'https://img95.699pic.com/photo/50064/0488.jpg_wh860.jpg', // 网络示例图
    desc: '皮影戏，又称“影子戏”或“灯影戏”，是一种以兽皮或纸板做成的人物剪影以表演故事的民间戏剧。',
    detail: '皮影戏是中国民间古老的传统艺术，老北京人都叫它“驴皮影”。表演时，艺人们在白色幕布后面，一边操纵影人，一边用当地流行的曲调讲述故事，同时配以打击乐器和弦乐，有浓厚的乡土气息。2011年，中国皮影戏入选人类非物质文化遗产代表作名录。',
    videoUrl: 'https://www.bilibili.com/video/BV1Ax411w7F6/' // 示例视频链接
  },
  {
    id: 2,
    title: '苏绣 (Suzhou Embroidery)',
    category: '传统技艺',
    image: 'https://img95.699pic.com/photo/50059/8966.jpg_wh860.jpg',
    desc: '苏绣是苏州地区刺绣产品的总称，其发源地在苏州吴县一带，现已遍衍无锡、常州等地。',
    detail: '苏绣具有图案秀丽、构思巧妙、绣工细致、针法活泼、色彩清雅的独特风格，地方特色浓郁。苏绣技艺的“平、齐、细、密、和、光、顺、匀”的特点。苏绣与湘绣、蜀绣、粤绣并称为中国四大名绣。',
    videoUrl: 'https://www.bilibili.com/video/BV1Es411D7Wx/'
  },
  {
    id: 3,
    title: '川剧变脸 (Face Changing)',
    category: '传统戏剧',
    image: 'https://img95.699pic.com/photo/50046/5569.jpg_wh860.jpg',
    desc: '变脸是川剧表演的特技之一，用于揭示剧中人物的内心及思想感情的变化。',
    detail: '变脸是运用在川剧艺术中塑造人物的一种特技。是揭示剧中人物内心思想感情的一种浪漫主义手法。把不可见、不可感的抽象的情绪和心理状态变成可见、可感的具体形象——脸谱。',
    videoUrl: 'https://www.bilibili.com/video/BV1Qs411N7vK/'
  },
  {
    id: 4,
    title: '剪纸 (Paper Cutting)',
    category: '民间美术',
    image: 'https://img95.699pic.com/photo/50160/3277.jpg_wh860.jpg',
    desc: '中国剪纸是一种用剪刀或刻刀在纸上剪刻花纹，用于装点生活或配合其他民俗活动的民间艺术。',
    detail: '剪纸艺术是最古老的中国民间艺术之一，作为一种镂空艺术，它能给人以视觉上以透空的感觉. 2009年，中国剪纸项目入选“人类非物质文化遗产代表作名录”。',
    videoUrl: 'https://www.bilibili.com/video/BV1UW411M7Sg/'
  },
  {
    id: 5,
    title: '景泰蓝 (Cloisonné)',
    category: '传统技艺',
    image: 'https://img95.699pic.com/photo/50055/5638.jpg_wh860.jpg',
    desc: '正名“铜胎掐丝珐琅”，因其在明朝景泰年间盛行，制作技艺比较成熟，使用的珐琅釉多以蓝色为主，故而得名。',
    detail: '景泰蓝诞生于皇宫，是皇家重要的组成部分，是皇宫大殿的主要陈设，亦是镇殿之宝。它集历史、文化、艺术及独特的传统工艺于一身，古朴典雅，精美华贵。',
    videoUrl: 'https://www.bilibili.com/video/BV1Kb411W7Xy/'
  },
  {
    id: 6,
    title: '二十四节气 (24 Solar Terms)',
    category: '民俗知识',
    image: 'https://img95.699pic.com/photo/40007/3569.jpg_wh860.jpg',
    desc: '二十四节气，是指中国农历中表示季节变迁的24个特定节令。',
    detail: '二十四节气指导着传统农业生产和日常生活，是中国古代劳动人民长期经验的积累和智慧的结晶。2016年11月30日，二十四节气被正式列入联合国教科文组织人类非物质文化遗产代表作名录。',
    videoUrl: 'https://www.bilibili.com/video/BV1Mx411w7nQ/'
  }
];

// ---------------------------------------------------------------------
// 2. 样式配置 (简单的 CSS in JS)
// ---------------------------------------------------------------------
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
    backgroundColor: '#f9f9f9',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#8b4513' // 棕色系，比较有文化感
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '30px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  cardContent: {
    padding: '20px'
  },
  category: {
    display: 'inline-block',
    padding: '4px 8px',
    backgroundColor: '#e6f7ff',
    color: '#1890ff',
    borderRadius: '4px',
    fontSize: '12px',
    marginBottom: '10px'
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#333'
  },
  desc: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6'
  },
  // 详情页样式
  detailContainer: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
  },
  backBtn: {
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
    fontSize: '16px'
  },
  detailImage: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    borderRadius: '12px',
    marginBottom: '30px'
  },
  videoBtn: {
    display: 'inline-block',
    marginTop: '20px',
    padding: '12px 24px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold'
  }
};

// ---------------------------------------------------------------------
// 3. 主组件代码
// ---------------------------------------------------------------------
function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  // 点击卡片，进入详情
  const handleCardClick = (item) => {
    setSelectedItem(item);
    window.scrollTo(0, 0); // 滚回顶部
  };

  // 点击返回
  const handleBack = () => {
    setSelectedItem(null);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={{ fontSize: '36px', margin: 0 }}>🏮 中华非遗文化长廊 🏮</h1>
        <p style={{ fontSize: '18px', marginTop: '10px', color: '#666' }}>
          传承文明，连接过去与未来
        </p>
      </header>

      {selectedItem ? (
        // === 详情页视图 ===
        <div style={styles.detailContainer}>
          <button onClick={handleBack} style={styles.backBtn}>
             ← 返回列表
          </button>
          
          <img 
            src={selectedItem.image} 
            alt={selectedItem.title} 
            style={styles.detailImage} 
          />
          
          <div style={styles.category}>{selectedItem.category}</div>
          <h2 style={{ fontSize: '32px', margin: '10px 0' }}>{selectedItem.title}</h2>
          
          <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#444' }}>
            {selectedItem.detail}
          </p>

          <div style={{ marginTop: '30px', padding: '20px', background: '#fffbe6', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 10px 0' }}>🎥 影像资料</h3>
            <p>点击下方按钮跳转观看相关纪录片或介绍视频：</p>
            <a 
              href={selectedItem.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.videoBtn}
            >
              ▶ 观看视频介绍 (Bilibili)
            </a>
          </div>
        </div>
      ) : (
        // === 列表页视图 ===
        <div style={styles.grid}>
          {heritageData.map((item) => (
            <div 
              key={item.id} 
              style={styles.card}
              onClick={() => handleCardClick(item)}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={item.image} alt={item.title} style={styles.cardImage} />
              <div style={styles.cardContent}>
                <span style={styles.category}>{item.category}</span>
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>
                  {item.desc.length > 50 ? item.desc.substring(0, 50) + '...' : item.desc}
                </p>
                <div style={{ marginTop: '10px', color: '#1890ff', fontSize: '14px' }}>
                  点击查看详情 &gt;
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
