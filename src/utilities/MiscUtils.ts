type className = string | undefined | null;
type Str = string | undefined | null;
type MultiplesOf10 = 1 | 10 | 100 | 1000 | 10000 | 100000 | 1000000;

export const makeCleanClassName = (classNames: className[]): string => {
  const CLASSES_SEPARATOR = ' ';
  // Filter with "Boolean" deleting empty values
  return classNames.filter(Boolean).join(CLASSES_SEPARATOR);
};

export const stringToBoolean = (str: Str): boolean => {
  switch ((str || '').toLowerCase().trim()) {
    //true objs
    case 'true':
      return true;
    case 'yes':
      return true;
    case '1':
      return true;
    case 'on':
      return true;
    //False obj
    case 'false':
      return false;
    case 'no':
      return false;
    case '0':
      return false;
    case 'off':
      return false;
    case 'null':
      return false;
    case 'undefined':
      return false;
    case 'nil':
      return false;
    case '':
      return false;
    default:
      return Boolean(str);
  }
};

export const isBoolean = (str: Str): boolean => {
  return stringToBoolean(str);
};

export const isBool = (str: Str): boolean => {
  return stringToBoolean(str);
};

export const isEmpty = (item: Str | object | any[]): boolean => {
  if (item) {
    if (typeof item === 'string') {
      try {
        const str = (item || '').trim();
        return str === '' || str.length === 0;
      } catch (e) {
        return true;
      }
    } else if (typeof item === 'object' && !Array.isArray(item)) {
      try {
        const obj = JSON.stringify(item);
        return obj === JSON.stringify({});
      } catch (e) {
        return true;
      }
    } else if (typeof item === 'undefined') {
      return true;
    } else if (Array.isArray(item)) {
      try {
        return Array.from(item).length === 0;
      } catch (e) {
        return true;
      }
    } else {
      throw new Error('Unable to find empty object');
    }
  } else {
    return true;
  }
};

export const isValidEmail = (email: Str): boolean => {
  if (email) {
    const regex: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const string: string = String(email).toLowerCase().trim();
    const match = string.match(regex);
    return !!match && string.includes('.') && string.includes('@');
  } else {
    return false;
  }
};

export const numberIsInteger = (number: number): boolean => {
  return !isNaN(number) && number % 1 === 0;
};

export const floorFigure = (num: number, place: MultiplesOf10): number => {
  return Math.round((num + Number.EPSILON) * place) / place;
};
//Replaces non number digits plus neg and decimal points
export const replaceNonNumber = (str: string): number => {
  return +str.replace(/[^\d.-]/g, '');
};
