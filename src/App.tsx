import { useState, useEffect } from 'react';
import './App.css';

// 定义数据类型
interface FoodItem {
  id?: number;
  name: string;
  category: string;
  calories: number;
  description: string;
}

function App() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [form, setForm] = useState<FoodItem>({ name: '', category: '', calories: 0, description: '' });
  const [isEditing, setIsEditing] = useState(false);
  
  // 后端 API 地址 (如果是本地测试用 localhost，阿里云部署后请改为服务器IP)
  const API_URL = 'http://localhost:3001/api/food';

  // 1. 初始化加载数据 - 【这里已修正语法】
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('加载失败:', err));
  }, []);

  // 2. 提交表单 (新增或修改)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = isEditing && form.id ? 'PUT' : 'POST';
    const url = isEditing && form.id ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (res.ok) {
        const newItem = await res.json();
        if (isEditing) {
          setItems(items.map(item => (item.id === newItem.id ? newItem : item)));
        } else {
          setItems([...items, newItem]);
        }
        resetForm();
      }
    } catch (error) {
      console.error('提交失败:', error);
    }
  };

  // 3. 删除数据
  const handleDelete = async (id: number) => {
    if (!window.confirm('确定删除这条饮食记录吗?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('删除失败:', error);
    }
  };

  // 4. 准备编辑
  const handleEdit = (item: FoodItem) => {
    setForm(item);
    setIsEditing(true);
  };

  const resetForm = () => {
    setForm({ name: '', category: '', calories: 0, description: '' });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">
          AI 健康饮食管理系统
        </h1>
        
        {/* 表单区域 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? '编辑记录' : '添加新饮食'}</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">食物名称</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">分类</label>
              <input 
                type="text" 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                placeholder="例如: 陕西菜, 减脂餐"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">卡路里</label>
              <input 
                type="number" 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.calories}
                onChange={e => setForm({ ...form, calories: Number(e.target.value) })}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">描述</label>
              <textarea 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows={2}
              />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                {isEditing ? '更新记录' : '添加记录'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">
                  取消
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 列表区域 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">卡路里</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-4 text-gray-500">暂无数据，请添加。</td></tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.calories}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        编辑
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id!)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
