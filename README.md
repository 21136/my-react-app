# my-react-app — React 管理后台（含 AI 助手）

B 端风格练手后台：登录鉴权、待办、文章 CRUD，并集成 **LLM 对话模块**（SSE 流式 + 打字机 + 停止生成/重试）。AI 能力包括全局 Drawer 助手与文章页 AI 智能搜索。

## 演示

![AI 模块演示](./docs/demo.gif)

> 若 GIF 未上传，可先放 GitHub Release / 图床链接，或本地路径 `docs/demo.gif`。

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 19、React Router 7 |
| 构建 | Vite 8 |
| UI | Ant Design 6 |
| 状态 | Zustand（登录态） |
| 请求 | fetch、axios（文章 API） |
| AI | SSE 流式、Node 本地 proxy、Vite dev proxy |

## 功能一览

- **登录 / 路由守卫**：未登录跳转 `/login`
- **待办**：Todo 模块（受保护路由）
- **文章**：Table 分页、标题搜索防抖、Modal 新建/编辑、删除确认
- **AI 助手**：顶栏按钮 → 右侧 Drawer，`ChatPanel` + SSE 流式回复
- **AI 搜索**：`/posts` 页「AI 搜」→ Modal，搜索关键词预填
- **工程化**：路由懒加载、`useFetch`、环境变量配置

## 快速开始

### 环境要求

- Node.js 18+
- 两个终端窗口（开发期 AI 需要本地 proxy）

### 安装

```bash
cd my-react-app
npm install
```

### 启动（开发）

**终端 1 — AI 流式代理（mock SSE，Day 89）：**

```bash
node server/chat-proxy.mjs
```

**终端 2 — 前端：**

```bash
npm run dev
```

浏览器打开 Vite 提示的地址（通常 `http://localhost:5173`）。

### 验证 AI 模块

1. 任意页点击顶栏 **「AI 助手」** → 发送消息 → 观察逐字流式输出
2. 进入 **文章** → 输入搜索词 → **「AI 搜」** → 流式回复
3. 流式过程中点 **「停止」** → 保留已生成内容
4. 关闭 Node 代理后发送 → 出现错误提示 → **重试**（需先重启代理）

### 构建

```bash
npm run build
npm run preview
```

> 生产环境需将 `server/chat-proxy.mjs` 替换为真实后端；Vite proxy 仅开发用。

## AI 架构（开发环境）

```
浏览器  fetch("/api/chat/stream")
    ↓
Vite proxy  (/api/chat → localhost:3001)
    ↓
Node chat-proxy.mjs  （mock SSE；持 Key，不进前端 bundle）
    ↓
（未来）大模型 HTTPS API
```

**安全原则：** API Key 不使用 `VITE_` 前缀，不提交到 Git。

## 目录说明（AI 相关）

```
server/chat-proxy.mjs       # 本地 SSE 代理
src/utils/parseSse.js       # 读 SSE 流
src/utils/streamChatReply.js
src/utils/isAbortError.js
src/hooks/useChatMessages.js
src/components/chat/        # ChatPanel / ChatInput / ChatMessage
src/components/Layout.jsx   # Drawer 全局助手
src/pages/PostListPage.jsx  # AI 搜 Modal
```

## 相关学习页（个人笔记）

- Day 89–94 前端学习目录：`day89` … `day94` HTML 学习页

## License

MIT（练手项目，按需修改）