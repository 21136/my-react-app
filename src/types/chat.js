/**
 * @typedef {'user' | 'assistant' | 'system'} ChatRole
 */

/**
 * @typedef {'pending' | 'streaming' | 'done' | 'error'} ChatMessageStatus
 */

/**
 * @typedef {Object} ChatMessage
 * @property {string} id
 * @property {ChatRole} role
 * @property {string} content
 * @property {ChatMessageStatus} [status]
 * @property {string} [error]
 */

/** @type {ChatMessage} */
export const WELCOME_MESSAGE = {
    id: "welcome",
    role: "assistant",
    content: "你好，我是 AI 助手。今天用 mock 回复练聊天 UI，Day 91 已接真实 SSE。",
    status: "done",
  };
  
  export function createMessageId() {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }