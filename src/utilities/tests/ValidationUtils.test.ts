import {
  isHardenPassword,
  PasswordHardeningLevels,
  isValidEmail,
} from '../ValidationUtils';
describe('ValidationUtils', () => {
  describe('isHardenPassword', () => {
    it('Hardest password', async () => {
      const expected = PasswordHardeningLevels.third;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `MonkeyDon't$ayWhatMonkeyMon'tDo24964=_=-^`
      );

      expect(resault).toEqual(expected);
    });
  });
  describe('isHardenPassword', () => {
    it('Invalid password', async () => {
      const expected = PasswordHardeningLevels.zero;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `MonkeyDont`
      );

      expect(resault).toEqual(expected);
    });
  });
  describe('isHardenPassword', () => {
    it('Weak password', async () => {
      const expected = PasswordHardeningLevels.first;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `monkeywontsaywantmonkeywontdo`
      );

      expect(resault).toEqual(expected);
    });
  });
  describe('isHardenPassword', () => {
    it('weak password', async () => {
      const expected = PasswordHardeningLevels.first;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `MonkeyDontSayWhatMonkyWontDo`
      );

      expect(resault).toEqual(expected);
    });
  });
  describe('isHardenPassword', () => {
    it('medium password', async () => {
      const expected = PasswordHardeningLevels.second;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `MonkeyDont0ayWhatMonkeyW0ntD0`
      );

      expect(resault).toEqual(expected);
    });
  });
  describe('isHardenPassword', () => {
    it('medium password', async () => {
      const expected = PasswordHardeningLevels.second;
      const resault: PasswordHardeningLevels | boolean = isHardenPassword(
        `MonkeyDon'tSayWhatMonkeyWon'tDo`
      );

      expect(resault).toEqual(expected);
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
});
