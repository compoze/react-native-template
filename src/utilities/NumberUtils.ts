type MultiplesOf10 = 1 | 10 | 100 | 1000 | 10000 | 100000 | 1000000;

export const isDivisable = (x: number, diviser: number) => x % diviser === 0;
export const numberIsInteger = (number: number): boolean =>
  isDivisable(number, 1);
export const isEven = (x: number): boolean => isDivisable(x, 2);
export const isMultipleOfTen = (x: number): boolean => isDivisable(x, 10);
export const isMultipleOf100 = (x: number): boolean => isDivisable(x, 100);

export const floorFigure = (num: number, place: MultiplesOf10): number =>
  Math.round((num + Number.EPSILON) * place) / place;

export const randomArbitrary = (min: number, max: number): number =>
  Math.random() * (max - min) + min;

export const randomNumber = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomNumber = (min: number, max: number): number =>
  randomNumber(min, max);
export const randomNumberRange = (min: number, max: number): number =>
  randomNumber(min, max);
