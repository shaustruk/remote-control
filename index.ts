import { drawCircle } from './src/circle';
import { httpServer } from './src/http_server';
import { drawRectangle } from './src/rectangle';
import { drawSquare } from './src/square';
import {
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
    ws.on('message', (data) => {
      console.log(data.toString());
      const command = data.toString().split(' ');
      let currentCommand = command[0];
      let currentArgument = Number(command[1]);
      let secondArgument = Number(command[2]);

      if (currentCommand === 'mouse_position') {
        const { x, y } = robot.getMousePos();
        ws.send(`mouse_position ${x},${y}`);
        console.log(`mouse_position ${x},${y}`);
      } else if (currentCommand === 'mouse_up') {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y - currentArgument);
        ws.send(`mouse_up ${y}px`);
        console.log('the mouse was moved up');
      } else if (
        currentCommand === 'mouse_down'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x, y + currentArgument);
        ws.send(`mouse_down ${y}px`);
        console.log('the mouse was moved down');
      } else if (
        currentCommand === 'mouse_left'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x - currentArgument, y);
        ws.send(`mouse_left ${y}px`);
        console.log('the mouse was moved left');
      } else if (
        currentCommand === 'mouse_right'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(x + currentArgument, y);
        ws.send(`mouse_right ${y}px`);
        console.log('the mouse was moved right');
      } else if (
        currentCommand === 'draw_circle'
      ) {
        drawCircle(currentArgument);
        ws.send(`draw_circle ${currentArgument}`);
        console.log('circle', currentArgument);
      } else if (
        currentCommand === 'draw_rectangle'
      ) {
        drawRectangle(
          currentArgument,
          secondArgument
        );
        ws.send(
          `draw_rectangle ${currentArgument}, ${secondArgument}`
        );
        console.log(
          `draw_rectangle, ${currentArgument}, ${secondArgument}`
        );
      } else if (
        currentCommand === 'draw_square'
      ) {
        drawSquare(currentArgument);
        ws.send(`draw_square ${currentArgument}`);
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
