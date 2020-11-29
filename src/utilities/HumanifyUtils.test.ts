import {
  Commafy,
  TitleCase,
  UppercaseFirstLetter,
  ToPercent,
  ToDollarAmount
} from './HumanifyUtils';
describe('HumanifyUtils', () => {
  describe('Commafy', () => {
    it('Comma every 3rd digit', async () => {
      const expected: string = '100,000';
      const total: number = 100000;

      const actual = Commafy(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('TitleCase', () => {
    it("Title case caps every first letter", async () => {
      const expected: string = 'Google Is Great';
      const total: string = 'google is great';

      const actual = TitleCase(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('UppercaseFirstLetter', () => {
    it('Uppercase the first letter', async () => {
      const expected: string = 'Google is great';
      const total: string = 'google is great';

      const actual = UppercaseFirstLetter(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('ToPercent', () => {
    it('ToPercent value', async () => {
      const expected: string = '67%';
      const total: number = .669;

      const actual = ToPercent(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('ToPercent', () => {
    it('ToPercent value', async () => {
      const expected: string = '66.9%';
      const total: string = '66.9M';

      const actual = ToPercent(total, 1);

      expect(actual).toEqual(expected);
    });
  });
  describe('ToDollarAmount', () => {
    it('ToPercent value', async () => {
      const expected: string = '$6.90';
      const total: number = 6.9;


      const actual = ToDollarAmount(total);

      expect(actual).toEqual(expected);
    });
  });
});
