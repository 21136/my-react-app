import { ChatPanel } from "@/components/chat/ChatPanel.jsx";
import "./ChatPage.css";

export default function ChatPage(){
    return (
        <div className = "chat-page">
            <h1 className = "chat-page_title">聊天实验室（mock）</h1>
            <p className = "chat-page_desc">
            独立页练 UI；Day 93 会把同一 ChatPanel 挂到侧边栏 Drawer 和文章 AI 搜索。
            </p>
            <ChatPanel mode = "assistant"/>
            <details className="chat-page__preview">
            <summary>预览 search 模式（Day 93 智能搜索用同一组件）</summary>
            <ChatPanel mode="search" title="AI 搜索预览" />
        </details>
        </div>
    )
}