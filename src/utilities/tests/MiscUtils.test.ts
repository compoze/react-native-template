import { isEmpty } from '../MiscUtils';

describe('MiscUtils', () => {
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
    it('Array returns boolean if is empty', async () => {
      const isEmpt = isEmpty([1, 2, 3]);
      expect(isEmpt).toEqual(false);
    });
  });
  describe('isEmpty', () => {
    it('nil returns boolean if is empty', async () => {
      const isEmpt = isEmpty(undefined);
      expect(isEmpt).toEqual(true);
    });
  });
});
