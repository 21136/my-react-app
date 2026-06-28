export async function readSseStream(response, { onEvent, onDone, signal } = {}) {
    if (!response.ok) {
      throw new Error(`SSE 请求失败: ${response.status}`);
    }
    if (!response.body) {
      throw new Error("当前环境不支持 ReadableStream");
    }
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
  
    try {
      while (true) {
        if (signal?.aborted) {
          await reader.cancel();
          break;
        }
  
        const { done, value } = await reader.read();
        if (done) break;
  
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
  
        for (const block of parts) {
          const lines = block.split("\n");
          for (const line of lines) {
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trimStart();
            if (data === "[DONE]") {
              onDone?.();
              return;
            }
            onEvent?.(data);
          }
        }
      }
      onDone?.();
    } finally {
      reader.releaseLock();
    }
}