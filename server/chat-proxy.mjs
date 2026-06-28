import http from "node:http";

const PORT = 3001
const MOCK_TEXT = "你好，这是day89的模拟SSE流式响应。可以点击停止中断。";


function readJsonBody(req){
    return new Promise((resolve,reject)=>{
        let raw = "";
        req.on("data", (chunk) => {
          raw += chunk;
        });
        req.on("end", () => {
          try {
            resolve(raw ? JSON.parse(raw) : {});
          } catch (err) {
            reject(err);
          }
        });
        req.on("error", reject);
    })
}

function writeSseStream(res, text) {
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    });
  
    const chars = [...text];
    let i = 0;
  
    const timer = setInterval(() => {
      if (i >= chars.length) {
        res.write("data: [DONE]\n\n");
        res.end();
        clearInterval(timer);
        return;
      }
      const payload = JSON.stringify({ content: chars[i] });
      res.write(`data: ${payload}\n\n`);
      i += 1;
    }, 120);
  
    res.on("close", () => {
      clearInterval(timer);
    });
  }

const server = http.createServer(async(req,res)=>{
    if(req.method === "POST" && req.url ==="/api/chat/stream"){
  try {
      const body = await readJsonBody(req);

      if (body.simulateError) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("mock server error for Day 92 retry test");
        return;
      }

      writeSseStream(res, MOCK_TEXT);
    } catch {
      res.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Bad JSON");
    }
    return;
    }
    res.writeHead(404,{"Content-Type":"text/plain;charset = utf-8"});
    res.end("Not Found")
})

    server.listen(PORT,() =>{
        console.log(`Chat proxy mock SSE -> http://localhost:${PORT}`);
        console.log("POST/api/chat/stream")
    }
    )