import { drawCircle } from './src/circle';
import { httpServer } from './src/http_server';
import { drawRectangle } from './src/rectangle';

import { drawSquare } from './src/square';
import {
  createWebSocketStream,
  Jimp,
  robot,
  WebSocketServer,
} from './src/utilits';

const HTTP_PORT: number = 3000;

console.log(
  `Start static http server on the ${HTTP_PORT} port!`
);
httpServer.listen(HTTP_PORT);

export const wss = new WebSocketServer({
  port: 8080,
});
try {
  process.on('SIGINT', () => {
    process.stdout.write(
      'Closing websocket...\n'
    );
    wss.close();
    process.exit(0);
  });
  wss.on('connection', (ws) => {
    const messageStream = createWebSocketStream(
      ws,
      {
        encoding: 'utf8',
        decodeStrings: false,
      }
    );
    messageStream.on('data', async (data) => {
      const command = data.toString().split(' ');
      let currentCommand = command[0],
        currentArgument = Number(command[1]),
        secondArgument = Number(command[2]);
      const { x, y } = robot.getMousePos();

      if (currentCommand === 'mouse_position') {
        messageStream.write(
          `mouse_position ${x},${y}`
        );
        console.log(`mouse_position ${x},${y}`);
      } else if (currentCommand === 'mouse_up') {
        robot.moveMouse(x, y - currentArgument);
        messageStream.write(`mouse_up ${y}px`);
        console.log('the mouse was moved up');
      } else if (
        currentCommand === 'mouse_down'
      ) {
        robot.moveMouse(x, y + currentArgument);
        messageStream.write(`mouse_down ${y}px`);
        console.log('the mouse was moved down');
      } else if (
        currentCommand === 'mouse_left'
      ) {
        robot.moveMouse(x - currentArgument, y);
        messageStream.write(`mouse_left ${y}px`);
        console.log('the mouse was moved left');
      } else if (
        currentCommand === 'mouse_right'
      ) {
        robot.moveMouse(x + currentArgument, y);
        messageStream.write(`mouse_right ${y}px`);
        console.log('the mouse was moved right');
      } else if (
        currentCommand === 'draw_circle'
      ) {
        drawCircle(currentArgument);
        messageStream.write(
          `draw_circle ${currentArgument}`,
          'utf-8'
        );
      } else if (
        currentCommand === 'draw_rectangle'
      ) {
        drawRectangle(
          currentArgument,
          secondArgument
        );
        messageStream.write(
          `draw_rectangle ${currentArgument}, ${secondArgument}`
        );
      } else if (
        currentCommand === 'draw_square'
      ) {
        drawSquare(currentArgument);
      } else if (currentCommand === 'prnt_scrn') {
        const size: number = 100;
        const bitMap = robot.screen.capture(
          x,
          y,
          size * 2,
          size * 2
        );
        const img = new Jimp(size * 2, size * 2);
        img.bitmap.data = bitMap.image;
        const base64 = await img.getBufferAsync(
          Jimp.MIME_PNG
        );
        console.log('the screenshot was created');
        messageStream.write(
          `prnt_scrn ${base64.toString('base64')}`
        );
      }
    });
  });
} catch (err) {
  console.log('error, smth went wrong...');
}

// wss.on('close', () => {
//   console.log('end');
// });
