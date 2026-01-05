import React, { useEffect, useState } from 'react';

// 定义数据类型
interface HeritageItem {
  id: number;
  title: string;
  category: string;
  description: string;
  image_url: string;
}

const CulturalHeritage: React.FC = () => {
  const [items, setItems] = useState<HeritageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 请求后端接口
    fetch('http://localhost:3000/api/heritage')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("加载失败:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>正在加载数据...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>非遗文化展示</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {items.map(item => (
          <div key={item.id} style={{ 
            border: '1px solid #e5e7eb', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            background: 'white'
          }}>
            {/* 图片区域 */}
            <div style={{ height: '180px', overflow: 'hidden' }}>
              <img 
                src={item.image_url} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* 文字区域 */}
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.title}</h3>
                <span style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#f3f4f6', 
                  padding: '2px 8px', 
                  borderRadius: '10px',
                  color: '#4b5563'
                }}>
                  {item.category}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CulturalHeritage;