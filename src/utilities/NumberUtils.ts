type MultiplesOf10 = 1 | 10 | 100 | 1000 | 10000 | 100000 | 1000000;

export const numberIsInteger = (number: number): boolean =>
  !isNaN(number) && number % 1 === 0;
export const isEven = (x: number): boolean => x % 2 === 0;

export const floorFigure = (num: number, place: MultiplesOf10): number => {
  return Math.round((num + Number.EPSILON) * place) / place;
};

export const randomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};
export const randomNumber = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const generateRandomNumber = (min: number, max: number) =>
  randomNumber(min, max);
export const randomNumberRange = (min: number, max: number) =>
  randomNumber(min, max);
