import {
  floorFigure,
  numberIsInteger,
  isEven,
  randomNumber,
  generateRandomNumber,
  randomNumberRange,
} from '../NumberUtils';
describe('NumberUtils', () => {
  describe('numberIsInteger', () => {
    it('Not numberIsInteger', async () => {
      const num = numberIsInteger(66.9);
      expect(num).toEqual(false);
    });
  });
  describe('floorFigure', () => {
    it('floors number', async () => {
      const num = floorFigure(66.922, 100);
      expect(num).toEqual(66.92);
    });
  });

  describe('isEven', () => {
    it('isEven true', async () => {
      const num = isEven(2);
      expect(num).toEqual(true);
    });
  });

  describe('isEven', () => {
    it('isEven false', async () => {
      const num = isEven(1);
      expect(num).toEqual(false);
    });
  });

  describe('generateRandomNumber', () => {
    it('generateRandomNumber', async () => {
      const num = generateRandomNumber(0, 100);
      expect(num).toBeLessThanOrEqual(100);
    });
  });
  describe('randomNumber', () => {
    it('randomNumber', async () => {
      const num = randomNumber(0, 100);
      expect(num).toBeLessThanOrEqual(100);
    });
  });
  describe('randomNumberRange', () => {
    it('randomNumberRange', async () => {
      const num = randomNumberRange(99, 100);
      expect(num).toBeLessThanOrEqual(100);
      expect(num).toBeGreaterThanOrEqual(99);
    });
  });
});
