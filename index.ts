import { drawCircle } from './src/circle';
import { httpServer } from './src/http_server';
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
      const command = data.toString().split(' ');
      let currentCommand = command[0];
      let currentArgument = command[1];
      if (currentCommand === 'mouse_position') {
        const { x, y } = robot.getMousePos();
        ws.send(`mouse_position ${x},${y}`);
        console.log(`mouse_position ${x},${y}`);
      } else if (currentCommand === 'mouse_up') {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(
          x,
          y - Number(currentArgument)
        );
        ws.send(`mouse_up ${y}px`);
        console.log('the mouse was moved up');
      } else if (
        currentCommand === 'mouse_down'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(
          x,
          y + Number(currentArgument)
        );
        ws.send(`mouse_down ${y}px`);
        console.log('the mouse was moved down');
      } else if (
        currentCommand === 'mouse_left'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(
          x - Number(currentArgument),
          y
        );
        ws.send(`mouse_left ${y}px`);
        console.log('the mouse was moved left');
      } else if (
        currentCommand === 'mouse_right'
      ) {
        const { x, y } = robot.getMousePos();
        robot.moveMouse(
          x + Number(currentArgument),
          y
        );
        ws.send(`mouse_right ${y}px`);
        console.log('the mouse was moved right');
      } else if (
        currentCommand === 'draw_circle'
      ) {
        robot.mouseToggle('down');
        drawCircle(Number(currentArgument));
        robot.mouseToggle('up');
        ws.send(
          `draw_circle ${Number(currentArgument)}`
        );
        console.log('circle', currentArgument);
      }
    });
  });
} catch (err) {
  console.log('error, smth went wrong...');
}

// wss.on('close', () => {
//   console.log('end');
// });
