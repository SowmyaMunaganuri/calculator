const { WebSocket } = require('ws');
const express=require('express');
const PORT = process.env.PORT || 3000;
const INDEX = '/client/public/index.html';

const server = express();
server.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss=new WebSocket({server});

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

