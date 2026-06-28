import { Button, Spin } from "antd";
import "./ChatMessage.css";

/**
 * @param {{ message: import('@/types/chat.js').ChatMessage }} props
 */
export function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isPending = message.status === "pending";
  const isStreaming = message.status === "streaming";
  const isError = message.status === "error";

  return (
    <div
      className={[
        "chat-message",
        isUser ? "chat-message--user" : "chat-message--assistant",
        isError ? "chat-message--error" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="chat-message__bubble">
        {isPending ? (
          <span className="chat-message__pending">
            <Spin size="small" /> 正在思考…
          </span>
        ) : (
            <span className="chat-message__text">
            {message.content}
            {isStreaming && (
              <span className="chat-message__cursor" aria-hidden="true">
                ▋
              </span>
              )}
          </span>
        )}
        {isError && onRetry && (
            <Button
            className =  "chat-message_retry"
            size = "small"
            type = "link"
            icon = {<ReloadOutlined />}
            onClink = {onRetry}
            >
                重试
            </Button>
        )}
      </div>
    </div>
  );
}