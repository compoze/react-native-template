import {
  commafy,
  titleCase,
  uppercaseFirstLetter,
  toPercent,
  toDollarAmount,
  uppercaseFirstLetterLowercaseRest,
} from '../HumanifyUtils';
describe('HumanifyUtils', () => {
  describe('commafy', () => {
    it('Comma every 3rd digit', async () => {
      const expected: string = '100,000';
      const total: number = 100000;

      const actual = commafy(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('titleCase', () => {
    it('Title case caps every first letter', async () => {
      const expected: string = 'Google Is Great';
      const total: string = 'google is great';

      const actual = titleCase(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('uppercaseFirstLetter', () => {
    it('Uppercase the first letter', async () => {
      const expected: string = 'Google is great';
      const total: string = 'google is great';

      const actual = uppercaseFirstLetter(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('uppercaseFirstLetterLowercaseRest', () => {
    it('Uppercase the first letter lowercase the rest', async () => {
      const expected: string = 'Google is great';
      const total: string = 'google is GREAt';

      const actual = uppercaseFirstLetterLowercaseRest(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('toPercent', () => {
    it('ToPercent value', async () => {
      const expected: string = '67%';
      const total: number = 0.669;

      const actual = toPercent(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('toPercent', () => {
    it('ToPercent value', async () => {
      const expected: string = '0%';
      const total: string = 'vvv';

      const actual = toPercent(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('toPercent', () => {
    it('ToPercent value', async () => {
      const expected: string = '66.9%';
      const total: string = '66.9M';

      const actual = toPercent(total, 1);

      expect(actual).toEqual(expected);
    });
  });
  describe('toDollarAmount', () => {
    it('toDollarAmount value', async () => {
      const expected: string = '$6.90';
      const total: number = 6.9;

      const actual = toDollarAmount(total);

      expect(actual).toEqual(expected);
    });
  });
  describe('toDollarAmount', () => {
    it('toDollarAmount value', async () => {
      const expected: string = '$0.00';
      const total: string = 'ctp';

      const actual = toDollarAmount(total);

      expect(actual).toEqual(expected);
    });
  });
});
