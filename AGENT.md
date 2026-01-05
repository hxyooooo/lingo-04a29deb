# AI健康饮食・陕西传统文化应用

## 项目概述
这是一个融合AI技术与陕西传统文化的健康饮食管理应用，旨在通过轻量化AI技术为用户提供精准的饮食管理和传统文化传承体验。

## 项目结构
```
/home/project/
├── src/
│   ├── components/
│   │   ├── Navbar/
│   │   │   └── index.tsx                 # 导航栏组件
│   │   ├── Home/
│   │   │   └── index.tsx                 # 首页组件
│   │   ├── AiRecognition/
│   │   │   └── index.tsx                 # AI识食组件
│   │   ├── SeasonalDiet/
│   │   │   └── index.tsx                 # 节气饮食组件
│   │   ├── CulturalHeritage/
│   │   │   └── index.tsx                 # 文化传承组件
│   │   └── HealthReport/
│   │       └── index.tsx                 # 健康报告组件
│   ├── App.tsx                           # 主应用组件
│   ├── main.tsx                          # 应用入口
│   ├── index.css                         # 全局样式
│   └── mock.json                         # 模拟数据
├── package.json                          # 项目依赖配置
├── vite.config.ts                        # Vite构建配置
├── tsconfig.json                         # TypeScript配置
├── tsconfig.node.json                    # TypeScript节点配置
├── tailwind.config.js                    # Tailwind样式配置
├── postcss.config.js                     # PostCSS配置
└── index.html                            # HTML入口
```

## 文件内容描述

### package.json
定义了项目的基本信息和依赖项，包括React、React Router、Lucide React、date-fns等核心库，以及开发所需的Vite、TypeScript等工具。

### vite.config.ts
配置Vite开发服务器，设置host和allowedHosts以支持任意主机访问。

### tsconfig.json / tsconfig.node.json
TypeScript编译配置文件，定义了项目的编译选项和模块解析规则。

### tailwind.config.js
Tailwind CSS配置文件，定义了项目使用的自定义颜色主题，包括浅青花蓝、淡赭石色、浅松绿等陕西文化特色色彩。

### postcss.config.js
PostCSS配置文件，集成Tailwind CSS和Autoprefixer插件。

### index.html
HTML入口文件，包含应用的根节点和脚本引用。

### src/main.tsx
React应用入口文件，渲染App组件到DOM。

### src/index.css
全局样式文件，包含Tailwind指令和自定义样式，如滚动条、悬停效果等。

### src/App.tsx
主应用组件，配置路由系统，包含导航栏和各页面路由。

### src/mock.json
模拟数据文件，包含用户信息、食物营养数据、节气食谱、古方食谱、健康报告等数据。

### src/components/Navbar/index.tsx
导航栏组件，包含应用标题、导航链接和登录/退出功能，适配移动端和桌面端。

### src/components/Home/index.tsx
首页组件，展示应用的核心功能、统计数据和文化传承理念，使用Framer Motion动画效果。

### src/components/AiRecognition/index.tsx
AI识食组件，提供图片上传、菜品识别、营养信息展示和非遗文化背景介绍功能。

### src/components/SeasonalDiet/index.tsx
节气饮食组件，提供节气选择、健康目标设置、传统食谱推荐和养生知识展示。

### src/components/CulturalHeritage/index.tsx
文化传承组件，提供非遗技艺和古方食谱的搜索、浏览功能，包含标签切换和详细内容展示。

### src/components/HealthReport/index.tsx
健康报告组件，展示热量摄入趋势、营养分析、目标完成情况和AI健康建议。