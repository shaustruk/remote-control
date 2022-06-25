import { drawCircle } from './src/circle';
import { httpServer } from './src/http_server';
import { drawRectangle } from './src/rectangle';
import { getScreenshot } from './src/screenshot';
import { drawSquare } from './src/square';
import {
  createWebSocketStream,
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
  wss.on('connection', (ws) => {
    const messageStream = createWebSocketStream(
      ws,
      { encoding: 'utf8', decodeStrings: false }
    );
    messageStream.on('data', (data) => {
      const command = data.toString().split(' ');
      let currentCommand = command[0];
      let currentArgument = Number(command[1]);
      let secondArgument = Number(command[2]);

      if (currentCommand === 'mouse_position') {
        const { x, y } = robot.getMousePos();
        messageStream.write(
          `mouse_position ${x},${y}`
        );
        console.log(`mouse_position ${x},${y}`);
      } else if (currentCommand === 'mouse_up') {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y - currentArgument);
        messageStream.write(`mouse_up ${y}px`);
        console.log('the mouse was moved up');
      } else if (
        currentCommand === 'mouse_down'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y + currentArgument);
        messageStream.write(`mouse_down ${y}px`);
        console.log('the mouse was moved down');
      } else if (
        currentCommand === 'mouse_left'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x - currentArgument, y);
        messageStream.write(`mouse_left ${y}px`);
        console.log('the mouse was moved left');
      } else if (
        currentCommand === 'mouse_right'
      ) {
        const { x, y } = robot.getMousePos();
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
        console.log('circle', currentArgument);
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
        console.log(
          `draw_rectangle, ${currentArgument}, ${secondArgument}`
        );
      } else if (
        currentCommand === 'draw_square'
      ) {
        drawSquare(currentArgument);
        messageStream.write(
          `draw_square ${currentArgument}`
        );
        console.log(
          `draw_square, ${currentArgument}`
        );
      } else if (currentCommand === 'prnt_scrn') {
        getScreenshot();
        messageStream.write(
          `prnt_scrn ${currentArgument}`
        );
        console.log(
          `draw_square, ${currentArgument}`
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
