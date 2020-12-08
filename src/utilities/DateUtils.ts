import importMoment, { Moment } from 'moment';

type DateType = Date | Moment | string;
type DateTimeType = DateFormat | TimeFormat | DateTimeFormat;

export type WeekDaysFullType =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';
export type MonthsFullType =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';
type MonthsNumbersType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

const moment = importMoment;

//Add more as needed
export enum DateTimeFormat {
  computerStandard = 'YYYY-MM-DD HH:mm',
  computerStandardWithSeconds = 'YYYY-MM-DD HH:mm:ss',
  usSlash = 'MM/DD/YYYY hh:mm A',
  usSlashWithSeconds = 'MM/DD/YYYY hh:mm:ss A',
  usHuman = 'hh:mm A MM/DD/YYYY',
  usHumanWithSeconds = 'hh:mm:ss A MM/DD/YYYY',
  locate = 'locate',
}

//Women: "Whats your idea of the prefect date?" Comp Sci Major: "YYYY-MM-DD"
export enum DateFormat {
  computerStandard = 'YYYY-MM-DD',
  usDash = 'MM-DD-YYYY',
  usSlash = 'MM/DD/YYYY',
  euDash = 'DD-MM-YYYY',
  euSlash = 'DD/MM/YYYY',
  locate = 'locate',
}

export enum TimeFormat {
  military = 'HH:mm',
  militaryStandard = 'HHmm',
  civilian = 'hh:mm A',
  civilianNoSpace = 'hh:mmA',
  singleDigitCivilian = 'h:mm A',
  singleDigitCivilianNoSpace = 'h:mmA',
  militaryWithSeconds = 'HH:mm:ss',
  civilianWithSeconds = 'hh:mm:ss A',
  locate = 'locate',
}

//Human To Unix time
export const humanToUnixTime = (date: DateType = new Date()): number => {
  return moment(date).unix();
};
export const stringToDate = (
  strDate: string,
  format: DateTimeType,
  toDateOrMoment: boolean = true
): Date | Moment => {
  const date = moment(strDate, format);
  return toDateOrMoment ? date.toDate() : date;
};
//Date to date format for region
export const dateToLocale = (date: DateType = new Date()): string => {
  return moment(date).format('L');
};
export const dateTimeToLocale = (date: DateType = new Date()): string => {
  return moment(date).format('LLLL');
};
//Unix time to human time and date
export const unixTimeToHumanDateTime = (
  unixTime: number,
  format: DateTimeType = DateFormat.locate
): string => {
  const date = moment.unix(unixTime).subtract('M', 1);
  if (format !== DateFormat.locate) {
    return date.format(format);
  } else {
    return dateToLocale(date);
  }
};
//Both ways to convert
export const convertMilitaryCivilianTime = (input: string): string => {
  const is24HourRegex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
  try {
    if (
      !!input.toLowerCase().match(/am|pm/i) ||
      input.toLowerCase().match(/[ap]/i)
    ) {
      return moment(input, TimeFormat.civilian).format(TimeFormat.military);
    } else {
      if ((input.match(is24HourRegex) || []).length > 0) {
        return moment(input, TimeFormat.military).format(TimeFormat.civilian);
      } else {
        return input;
      }
    }
  } catch (e) {
    return input;
  }
};
//Is Browser Mil time
export const isMilitaryTime = (): boolean => {
  const date = new Date();
  const dateString = date.toLocaleTimeString();

  //apparently toLocaleTimeString() has a bug in Chrome. toString() however returns 12/24 hour formats. If one of two contains AM/PM execute 12 hour coding.
  return !(
    !!dateString.toLowerCase().match(/am|pm/i) ||
    !!date.toString().toLowerCase().match(/am|pm/i)
  );
};
export const monthNumberToMonthString = (month: MonthsNumbersType): string => {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return 'Undefined';
  }
};

export const convertFullDayToShortDay = (fullDay: WeekDaysFullType): string => {
  switch (fullDay.toLowerCase().trim()) {
    case 'monday':
      return 'M';
    case 'tuesday':
      return 'Tu';
    case 'wednesday':
      return 'W';
    case 'thursday':
      return 'Th';
    case 'friday':
      return 'F';
    case 'saturday':
      return 'Sa';
    case 'sunday':
      return 'Su';
    default:
      return 'sunday';
  }
};

export const weekDaySorting = {
  sunday: 0, // << if sunday is first day of week
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  // "sunday": 7
};
export const monthSorting = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};
export const simpleWeekDaySort = (a: WeekDaysFullType, b: WeekDaysFullType) => {
  return weekDaySorting[a] - weekDaySorting[b];
};
export const simpleMonthSort = (a: MonthsFullType, b: MonthsFullType) => {
  return monthSorting[a] - monthSorting[b];
};
