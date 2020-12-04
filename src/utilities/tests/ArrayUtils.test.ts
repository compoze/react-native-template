// @ts-ignore
import {
  onlyUnique,
  reduceToSum,
  arrayRemove,
  simpleSort,
  filterNil,
} from '../ArrayUtils';

describe('ArrayUtils', () => {
  describe('onlyUnique', () => {
    it('Returns only unique values', async () => {
      const expected: string[] = ['1', '2', '3'];
      const total: string[] = ['1', '2', '2', '1', '3'];

      const actual = total.filter(onlyUnique);

      expect(actual).toEqual(expected);
    });
  });
  describe('reduceToSum', () => {
    it('Returns 6 after adding the numbers together', async () => {
      const expected: number = 6;
      const total: number[] = [1, 2, 3];

      const actual = total.reduce(reduceToSum, 0);

      expect(actual).toEqual(expected);
    });
  });
  describe('ArrayRemove', () => {
    it('Removes an object at a position', async () => {
      const expected: string[] = ['one', 'two'];
      const total: string[] = ['one', 'two', 'three'];

      const actual = arrayRemove(total, 'three');

      expect(actual).toEqual(expected);
    });
  });
  describe('simpleSort', () => {
    it('Sorts objects based on order', async () => {
      const expected: number[] = [1, 2, 3, 4, 5];
      const total: number[] = [1, 4, 3, 5, 2];

      const actual = total.sort(simpleSort);

      expect(actual).toEqual(expected);
    });
  });
  describe('simpleSort', () => {
    it('Sorts objects based on order strings', async () => {
      const expected: string[] = ['a', 'aa', 'b', 'bb'];
      const total: string[] = ['a', 'bb', 'b', 'aa'];

      const actual = total.sort(simpleSort);

      expect(actual).toEqual(expected);
    });
  });
  describe('filterNil', () => {
    it('Filtering out null vales', async () => {
      const expected: number[] = [1, 2];
      const total: number[] = [undefined, undefined, null, 1, 2];

      const actual = total.filter(filterNil);

      expect(actual).toEqual(expected);
    });
  });
});
