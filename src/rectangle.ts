import { robot } from './utilits';

export const drawRectangle = (
  witdh: number,
  length: number
) => {
  robot.mouseToggle('down');

  let { x, y } = robot.getMousePos();
  y += length;
  robot.moveMouseSmooth(x, y);
  x += witdh;
  robot.moveMouseSmooth(x, y);
  y -= length;
  robot.moveMouseSmooth(x, y);
  x -= witdh;
  robot.moveMouseSmooth(x, y);
  robot.mouseToggle('up');
  console.log(
    `draw_rectangle, ${witdh}, ${length}`
  );
};
