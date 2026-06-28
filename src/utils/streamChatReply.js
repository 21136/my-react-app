import { readSseStream } from "@/utils/parseSse.js";

/**
 * 向本地 chat-proxy 发 SSE 请求，边收边回调 onChunk
 * @param {string} userText
 * @param {{
*   onChunk?: (fullText: string) => void;
*   onDone?: () => void;
*   signal?: AbortSignal;
*   mode?: 'assistant' | 'search';
* }} [callbacks]
* @returns {Promise<string>}
*/

export  async  function  streamChatReply(userText,callbacks ={}){
    const { onChunk, onDone, signal, mode = "assistant"} = callbacks;

    const response = await fetch ("/api/chat/stream",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, mode }),
        signal,
    })
    if(!response.ok){
        throw new Error(`SSE 请求失败: ${response.status}`)
    }

    let fullText = ""

    await readSseStream(response,{
        signal,
        onEvent: (dataString) => {
            const parsed = JSON.parse(dataString);
            const piece = parsed.content ?? "";
            fullText += piece;
            onChunk?.(fullText);
          },
          onDone: () => {
            onDone?.();
          },
    })
    return fullText;
}
