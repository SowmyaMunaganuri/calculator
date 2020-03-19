const WebSocket = require('ws');
const express=require('express');

const wss = new WebSocket.Server({ port: 3030 });
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;


if(process.env.NODE_ENV === 'production') 
{  
  app.use(express.static(path.join(__dirname, 'client/build')));  

app.get('*', (req, res) => 
{  
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})}

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.listen(port, (req, res) => {  console.log( `server listening on port: ${port}`);})