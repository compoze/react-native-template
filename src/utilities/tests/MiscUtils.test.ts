import {
  stringToBoolean,
  isEmpty,
  isBool,
  isValidEmail,
  numberIsInteger,
  floorFigure,
  replaceNonNumber,
} from '../MiscUtils';

describe('MiscUtils', () => {
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
  describe('isEmpty', () => {
    it('Empty string returns boolean if is empty', async () => {
      const isEmpt = isEmpty('');
      expect(isEmpt).toEqual(true);
    });
  });
  describe('isEmpty', () => {
    it('Empty string with a space returns boolean if is empty', async () => {
      const isEmpt = isEmpty(' ');
      expect(isEmpt).toEqual(true);
    });
  });
  describe('isEmpty', () => {
    it('Non empty string returns boolean if is empty', async () => {
      const isEmpt = isEmpty('new goo');
      expect(isEmpt).toEqual(false);
    });
  });
  describe('isEmpty', () => {
    it('Object returns boolean if is empty', async () => {
      const isEmpt = isEmpty(new Object({}));
      expect(isEmpt).toEqual(true);
    });
  });
  describe('isEmpty', () => {
    it('Array returns boolean if is empty', async () => {
      const isEmpt = isEmpty([]);
      expect(isEmpt).toEqual(true);
    });
  });
  describe('isEmpty', () => {
    it('nil returns boolean if is empty', async () => {
      const isEmpt = isEmpty(undefined);
      expect(isEmpt).toEqual(true);
    });
  });
  describe('isValidEmail', () => {
    it('Is not valid email', async () => {
      const isEmpt = isValidEmail('d.dd.dd');
      expect(isEmpt).toEqual(false);
    });
  });
  describe('isValidEmail', () => {
    it('Is valid email', async () => {
      const isEmpt = isValidEmail('c.porth@elko.dev');
      expect(isEmpt).toEqual(true);
    });
  });
  describe('numberIsInteger', () => {
    it('Not numberIsInteger', async () => {
      const isEmpt = numberIsInteger(66.9);
      expect(isEmpt).toEqual(false);
    });
  });
  describe('floorFigure', () => {
    it('floors number', async () => {
      const isEmpt = floorFigure(66.922, 100);
      expect(isEmpt).toEqual(66.92);
    });
  });
  describe('replaceNonNumber', () => {
    it('Replaces non numbers in a string', async () => {
      const isEmpt = replaceNonNumber('2000.99M');
      expect(isEmpt).toEqual(66.92);
    });
  });
});
