import * as Jimp from 'jimp';
import * as robot from 'robotjs';
import { httpServer } from './src/http_server';
import { WebSocket, WebSocketServer } from 'ws';

const HTTP_PORT: number = 3000;

console.log(
  `Start static http server on the ${HTTP_PORT} port!`
);
httpServer.listen(HTTP_PORT);

export const wss = new WebSocketServer({
  port: 8080,
});
wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const command = data.toString();
    console.log(command);
    if (command === 'mouse_position') {
      const { x, y } = robot.getMousePos();

      ws.send(`mouse_position ${x},${y}\0`);
      console.log(`mouse_position ${x},${y}`);
    } else {
      console.log('no');
    }
  });
});
// wss.on('close', () => {
//   console.log('end');
// });
