import { NullType } from './MiscUtils';

export type Str = string | NullType;

export const stringToBoolean = (str: Str): boolean => {
  switch ((str || '').toLowerCase().trim()) {
    //true objs
    //  TRUE
    case 'true':
      return true;
    case 'yes':
      return true;
    case '1':
      return true;
    case 'on':
      return true;
    //False obj
    //  FALSE
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

//Replaces non number digits plus neg and decimal points
export const replaceNonNumber = (str: string): number =>
  +str.replace(/[^\d.-]/g, '');
