import * as robot from 'robotjs';

export const getMousePosition = () => {
  const { x, y } = robot.getMousePos();
  return { x, y };
};
