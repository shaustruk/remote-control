import { Jimp, robot } from './utilits';

export const getImg = async (
  x: number,
  y: number
) => {
  const size: number = 100;
  const bitMap = robot.screen.capture(
    x,
    y,
    size * 2,
    size * 2
  );
  const img = new Jimp(size * 2, size * 2);
  return img;
};
