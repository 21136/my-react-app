import { useEffect, useRef } from "react";
import { Alert } from "antd";
import { useChatMessages } from "@/hooks/useChatMessages.js";
import { ChatMessage } from "./ChatMessage.jsx";
import { ChatInput } from "./ChatInput.jsx";
import "./ChatPanel.css";

const PLACEHOLDERS = {
    assistant:"向AI助手提问...（Ctrl+Enter发送）",
    search:"用自然语言描述你想搜的文章...（Ctrl+Enter发送）"
}

/**
 * @param {{ mode?: 'assistant' | 'search'; title?: string }} props
 */

export function ChatPanel({
    mode = "assistant",
    title,
    embedded = false,
    seedInput = "",
    }){
    const{
        messages,
        input,
        setInput,
        sendStatus,
        handleSubmit,
        handleStop,
        handleRetry,
    } = useChatMessages({mode});

    const listEndRef = useRef(null);
    const panelTitle = title ?? (mode === "search" ? "AI 智能搜索" : "AI 助手");


    useEffect(() => {
        if (seedInput.trim()) {
          setInput(seedInput.trim());
        }
      }, [seedInput, setInput]);
    useEffect(() => {
        listEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    const panelClass = [
        "chat-panel",
        embedded ? "chat-panel--embedded" : "",
        embedded && mode === "assistant" ? "chat-panel--drawer" : "",
      ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className="chat-panel">
          {!embedded  && (<header className="chat-panel__header">{panelTitle}</header>)}
    
          <div className="chat-panel__list" role="log" aria-live="polite">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} 
              onRetry={msg.status === "error" ? handleRetry : undefined}
              />
            ))}
            <div ref={listEndRef} />
          </div>
    
          {sendStatus === "error" && (
            <Alert
              type="error"
              message="发送失败"
              description="网络或代理异常，可点击下方重试"
              showIcon
              action={
                <Button size = "small" onClick={handleRetry}>
                    重试
                </Button>
              }
              style={{ margin: "0 12px 8px" }}
            />
          )}
    
          <div className="chat-panel__footer">
            <ChatInput
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              onStop={handleStop}
              sendStatus={sendStatus}
              placeholder={PLACEHOLDERS[mode]}
            />
          </div>
        </div>
      );
}