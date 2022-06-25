import { robot } from './utilits';

export const drawSquare = (witdh: number) => {
  robot.mouseToggle('down');

  let { x, y } = robot.getMousePos();
  y += witdh;
  robot.moveMouseSmooth(x, y);
  x += witdh;
  robot.moveMouseSmooth(x, y);
  y -= witdh;
  robot.moveMouseSmooth(x, y);
  x -= witdh;
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  console.log(`draw_square, ${witdh}`);
};
