const http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        message: "Hello World!",
      })
    );
  })
  .listen(8001, () => console.log("Servidor está rodando na porta 8001"));
