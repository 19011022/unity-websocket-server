const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 }, ()=> {
    console.log("Server started");
});

var clients = [];

wss.on("connection", (ws)=> {
    clients.forEach((client) => {
        ws.send();
    });

    clients.push(ws);

    ws.on('message', (data) => {
        if (data instanceof Buffer) {
            const message = data.toString('utf-8'); // Dönüşümü gerçekleştir
            console.log(`Received: ${message}`);
          } else {
            console.log(`Received: ${data}`);
          }

          clients.forEach((client) => {
            if(client === ws) return; // Kendisine gönderme
                client.send(data);
          })
    })
})
