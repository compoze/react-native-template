import {
  convertMilitaryCivilianTime,
  DateFormat,
  humanToUnixTime,
  unixTimeToHumanDateTime,
} from '../DateUtils';

describe('MiscUtils', () => {
  describe('convertMilitaryCivilianTime', () => {
    it('Converts Military to Civilian Time', async () => {
      const militaryCivilianTime = convertMilitaryCivilianTime('19:00'); // 7PM
      expect(militaryCivilianTime).toEqual('07:00 PM');
    });
  });
  describe('convertMilitaryCivilianTime', () => {
    it('Converts Civilian to Mil Time', async () => {
      const militaryCivilianTime = convertMilitaryCivilianTime('07:00 AM'); // 07:00
      expect(militaryCivilianTime).toEqual('07:00');
    });
  });
  describe('humanToUnixTime', () => {
    it('Creates a Unix time', async () => {
      const unixTime = humanToUnixTime(new Date(2020, 12, 3)); // 1606953600
      expect(unixTime).toEqual(1609653600);
    });
  });
  describe('unixTimeToHumanDateTime', () => {
    it('Creates a Unix time', async () => {
      const unixTime = unixTimeToHumanDateTime(
        1609653600,
        DateFormat.computerStandard
      ); // 1606953600
      expect(unixTime).toEqual('2020-12-03');
    });
  });
  describe('unixTimeToHumanDateTime', () => {
    it('Creates a Unix time default locate', async () => {
      const unixTime = unixTimeToHumanDateTime(1609653600); // 1606953600
      expect(unixTime).toEqual('12/03/2020');
    });
  });
});
