import { NullType } from './MiscUtils';

export type Str = string | NullType;

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

export const isBoolean = (str: Str): boolean => stringToBoolean(str);

export const isBool = (str: Str): boolean => stringToBoolean(str);

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
//Replaces non number digits plus neg and decimal points
export const replaceNonNumber = (str: string): number => {
  return +str.replace(/[^\d.-]/g, '');
};
