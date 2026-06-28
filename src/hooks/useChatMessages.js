import { useCallback, useRef, useState } from "react";
import { WELCOME_MESSAGE, createMessageId } from "@/types/chat.js"
import { streamChatReply } from "@/utils/streamChatReply.js";
import { isAbortError } from "@/utils/isAbortError.js";

const STOPPED_SUFFIX = "\n\n（已停止生成）";
/**
 * mock助手回复（day91再换）
 * @param {string} userText
 * @param {'assistant' | 'search'} mode
 */

function mockAssistantReply(userText,mode){
    const prefix = 
    mode === "search"
    ?"【AI搜索 mock】根据你的问题"
    :"【助手 mock】";
    return `${prefix}「${userText}」：这是 Day 90 的模拟回复。明天 Day 91 会接 /api/chat/stream 真 SSE。`;

}
/**
 * @param{{mode?:'assistant' | 'search'}} [options]
 */
export function useChatMessages(option = {}){
    const {mode = "assistant"} = option;

    const [messages,setMessages] = useState([WELCOME_MESSAGE]);
    const [input,setInput] = useState("");
    const [sendStatus,setSendStatus] = useState("idle");
    const sendingRef = useRef(false)
    const abortRef = useRef(null);
    const lastRequestRef = useRef({ userText: "", assistantId: "" });
  
    const runAssistantStream = useCallback(
      async (userText, assistantId) => {
        abortRef.current = new AbortController();
  
        try {
          await streamChatReply(userText, {
            mode,
            signal: abortRef.current.signal,
            onChunk: (fullText) => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? {
                        ...m,
                        content: fullText,
                        status: fullText ? "streaming" : "pending",
                      }
                    : m
                )
              );
            },
            onDone: () => {
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId ? { ...m, status: "done" } : m
                )
              );
              setSendStatus("idle");
            },
          });
        } catch (err) {
          if (isAbortError(err)) {
            setMessages((prev) =>
              prev.map((m) => {
                if (m.id !== assistantId) return m;
                const base = m.content?.trim() ? m.content : "";
                const suffix = base.includes("已停止生成") ? "" : STOPPED_SUFFIX;
                return {
                  ...m,
                  content: base + suffix,
                  status: "done",
                };
              })
            );
            setSendStatus("idle");
            return;
          }
  
          const message = err instanceof Error ? err.message : "unknown";
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: "发送失败，请点击重试",
                    status: "error",
                    error: message,
                  }
                : m
            )
          );
          setSendStatus("error");
          lastRequestRef.current = { userText, assistantId };
        } finally {
          sendingRef.current = false;
          abortRef.current = null;
        }
      },
      [mode]
    );
  
    const handleSend = useCallback(
      async (textOverride) => {
        const text = (textOverride ?? input).trim();
        if (!text || sendingRef.current) return;
  
        sendingRef.current = true;
        setSendStatus("sending");
  
        const userMsg = {
          id: createMessageId(),
          role: "user",
          content: text,
          status: "done",
        };
  
        const assistantId = createMessageId();
        const pendingAssistant = {
          id: assistantId,
          role: "assistant",
          content: "",
          status: "pending",
        };
  
        lastRequestRef.current = { userText: text, assistantId };
  
        setMessages((prev) => [...prev, userMsg, pendingAssistant]);
        setInput("");
  
        await runAssistantStream(text, assistantId);
      },
      [input, runAssistantStream]
    );
  
    const handleRetry = useCallback(async () => {
      const { userText, assistantId } = lastRequestRef.current;
      if (!userText || !assistantId || sendingRef.current) return;
  
      sendingRef.current = true;
      setSendStatus("sending");
  
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: "", status: "pending", error: undefined }
            : m
        )
      );
  
      await runAssistantStream(userText, assistantId);
    }, [runAssistantStream]);

    function handleStop(){
        abortRef.current?.abort();
    }

    /** @param {import('react').SubmitEvent} e */
    function handleSubmit(e){
        e.preventDefault();
        void handleSend();
    }

    return{
        messages,
        input,
        setInput,
        sendStatus,
        handleSend,
        handleSubmit, 
        handleStop,
        handleRetry
    }
}
