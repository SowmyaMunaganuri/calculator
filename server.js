const WebSocket = require('ws');
const express=require('express');


const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'client/build')));  
app.get('*', (req, res) => 
{  
  res.sendFile(path.join(__dirname+'/client/public/index.html'));
})

const wss = new WebSocket.Server({ port:process.env.PORT || 3001 , server:app });
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.listen(port, () => {  console.log( `server listening on port: ${port}`);})