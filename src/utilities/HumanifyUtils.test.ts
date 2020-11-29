import {
  Commafy,
  TitleCase,
  UppercaseFirstLetter,
  ToPercent
} from './HumanifyUtils';
describe('HumanifyUtils', () => {
  describe('Commafy', () => {
    it('Returns only unique values', async () => {
      const expected: string = '100,000';
      const total: number = 100000;

      const actual = Commafy(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('TitleCase', () => {
    it('Returns only unique values', async () => {
      const expected: string = 'Google Is Great';
      const total: string = 'google is great';

      const actual = TitleCase(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('UppercaseFirstLetter', () => {
    it('Returns only unique values', async () => {
      const expected: string = 'Google is great';
      const total: string = 'google is great';

      const actual = UppercaseFirstLetter(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('ToPercent', () => {
    it('Returns only unique values', async () => {
      const expected: number = 66.9;
      const total: string = '%66';

      const actual = ToPercent(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('UppercaseFirstLetter', () => {
    it('Returns only unique values', async () => {
      const expected: number = 66.9;
      const total: string = '%66.9';

      const actual = ToPercent(total, 1);

      expect(actual).toEqual(expected);
    });
  });
});
