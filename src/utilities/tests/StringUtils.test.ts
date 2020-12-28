import {
  isBool,
  isBoolean,
  replaceNonNumber,
  stringToBoolean,
} from '../StringUtils';

describe('StringUtils', () => {
  describe('stringToBoolean', () => {
    it('Returns a boolean value', async () => {
      const stb = stringToBoolean('TRUE');
      expect(stb).toEqual(true);
    });
  });
  describe('isBool', () => {
    it('Returns a boolean value', async () => {
      const stringToBoolean = isBool(null);
      expect(stringToBoolean).toEqual(false);
    });
  });
  describe('isBoolean', () => {
    it('Returns a boolean value', async () => {
      const stringToBoolean = isBoolean('no ');
      expect(stringToBoolean).toEqual(false);
    });
  });
  describe('isBoolean', () => {
    it('Returns a boolean value', async () => {
      const stringToBoolean = isBoolean('1 ');
      expect(stringToBoolean).toEqual(true);
    });
  });
  describe('replaceNonNumber', () => {
    it('Replaces non numbers in a string', async () => {
      const num = replaceNonNumber('-2000.99M');
      expect(num).toEqual(-2000.99);
    });
  });
});
