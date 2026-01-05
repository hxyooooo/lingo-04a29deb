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
│   │   │   └── index.tsx                 # AI识食组件 - 实现了AI实时扫描动效、数字徽章特效、智能纠错功能，已集成数据库连接
│   │   ├── SeasonalDiet/
│   │   │   └── index.tsx                 # 节气饮食组件 - 实现了动态节气感知、时间轴建议、古风模式，已集成数据库连接
│   │   ├── CulturalHeritage/
│   │   │   └── index.tsx                 # 文化传承组件 - 实现了古风模式、古称对照功能，已集成数据库连接
│   │   ├── HealthReport/
│   │   │   └── index.tsx                 # 健康报告组件，已集成数据库连接
│   │   └── AiAgent/
│   │       └── index.tsx                 # AI智能体组件 - 实现了聊天机器人、健康饮食建议、非遗文化知识、个性化指导功能
│   ├── services/                         # 数据库服务层
│   │   ├── userService.ts                # 用户服务 - 处理用户相关数据库操作
│   │   ├── foodService.ts                # 食物服务 - 处理食物相关数据库操作
│   │   ├── seasonalRecipeService.ts      # 节气食谱服务 - 处理节气食谱相关数据库操作
│   │   ├── ancientRecipeService.ts       # 古方食谱服务 - 处理古方食谱相关数据库操作
│   │   └── healthDataService.ts          # 健康数据服务 - 处理健康数据相关数据库操作
│   ├── config/                           # 配置文件
│   │   └── database.ts                   # 数据库配置 - MySQL连接配置和初始化
│   ├── App.tsx                           # 主应用组件 - 集成了AI智能体组件和数据库初始化
│   ├── main.tsx                          # 应用入口
│   ├── index.css                         # 全局样式 - 包含新中式设计、古风模式、扫描动效等样式
│   └── mock.json                         # 模拟数据
├── package.json                          # 项目依赖配置 - 已添加MySQL依赖
├── vite.config.ts                        # Vite构建配置
├── tsconfig.json                         # TypeScript配置
├── tsconfig.node.json                    # TypeScript节点配置
├── tailwind.config.js                    # Tailwind样式配置 - 更新了色彩系统
├── postcss.config.js                     # PostCSS配置
└── index.html                            # HTML入口
```

## 文件内容描述

### package.json
定义了项目的基本信息和依赖项，包括React、React Router、Lucide React、date-fns等核心库，以及开发所需的Vite、TypeScript等工具。已添加MySQL相关依赖。

### vite.config.ts
配置Vite开发服务器，设置host和allowedHosts以支持任意主机访问。

### tsconfig.json / tsconfig.node.json
TypeScript编译配置文件，定义了项目的编译选项和模块解析规则。

### tailwind.config.js
Tailwind CSS配置文件，定义了项目使用的自定义颜色主题，包括青花蓝、汝窑天青、糖色等新中式设计色彩体系。

### postcss.config.js
PostCSS配置文件，集成Tailwind CSS和Autoprefixer插件。

### index.html
HTML入口文件，包含应用的根节点和脚本引用。

### src/main.tsx
React应用入口文件，渲染App组件到DOM。

### src/index.css
全局样式文件，包含Tailwind指令和自定义样式，如滚动条、悬停效果、新中式设计、古风模式、扫描动效等。

### src/config/database.ts
数据库配置文件，包含MySQL连接配置、连接池创建、数据库连接测试和表初始化功能。

### src/services/userService.ts
用户服务文件，包含用户相关的数据库操作，如获取用户信息、创建用户、更新用户信息等。

### src/services/foodService.ts
食物服务文件，包含食物相关的数据库操作，如获取所有食物、获取特定食物、创建食物等。

### src/services/seasonalRecipeService.ts
节气食谱服务文件，包含节气食谱相关的数据库操作，如获取所有节气食谱、获取特定节气食谱、创建节气食谱等。

### src/services/ancientRecipeService.ts
古方食谱服务文件，包含古方食谱相关的数据库操作，如获取所有古方食谱、获取特定古方食谱、创建古方食谱等。

### src/services/healthDataService.ts
健康数据服务文件，包含健康数据相关的数据库操作，如获取用户健康数据、创建健康数据、更新健康数据等。

### src/App.tsx
主应用组件，配置路由系统，包含导航栏和各页面路由，新增AI智能体组件，已集成数据库初始化逻辑。

### src/mock.json
模拟数据文件，包含用户信息、食物营养数据、节气食谱、古方食谱、健康报告等数据。

### src/components/Navbar/index.tsx
导航栏组件，包含应用标题、导航链接和登录/退出功能，适配移动端和桌面端。

### src/components/Home/index.tsx
首页组件，展示应用的核心功能、统计数据和文化传承理念，使用Framer Motion动画效果，包含节气浮窗提示。

### src/components/AiRecognition/index.tsx
AI识食组件，提供图片上传、AI实时扫描动效（显示识别置信度）、数字徽章特效、营养信息展示和非遗文化背景介绍功能，新增AI智能纠错与共创功能，已集成数据库连接。

### src/components/SeasonalDiet/index.tsx
节气饮食组件，提供节气选择、健康目标设置、传统食谱推荐和养生知识展示，实现首页动态感知时间、节气主题背景变换、三餐时间轴建议、古风模式等功能，已集成数据库连接。

### src/components/CulturalHeritage/index.tsx
文化传承组件，提供非遗技艺和古方食谱的搜索、浏览功能，包含标签切换和详细内容展示，新增"古今对话"沉浸模式和古称对照功能，已集成数据库连接。

### src/components/HealthReport/index.tsx
健康报告组件，展示热量摄入趋势、营养分析、目标完成情况和AI健康建议，已集成数据库连接。

### src/components/AiAgent/index.tsx
AI智能体组件，提供聊天机器人功能，可回答健康饮食、非遗文化、个性化指导等问题，包含消息历史、输入框、AI回复生成功能，支持智能响应和文化知识问答。