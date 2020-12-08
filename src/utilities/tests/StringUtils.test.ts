import {
  isBool,
  isBoolean,
  isValidEmail,
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
  describe('isValidEmail', () => {
    it('Is not valid email', async () => {
      const email = isValidEmail('d.dd.dd');
      expect(email).toEqual(false);
    });
  });
  describe('isValidEmail', () => {
    it('Is valid email', async () => {
      const email = isValidEmail('c.porth@elko.dev');
      expect(email).toEqual(true);
    });
  });
  describe('replaceNonNumber', () => {
    it('Replaces non numbers in a string', async () => {
      const num = replaceNonNumber('-2000.99M');
      expect(num).toEqual(-2000.99);
    });
  });
});
