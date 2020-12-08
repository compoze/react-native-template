import { Str } from './StringUtils';
export type NullType = null | undefined;
type className = string | NullType;

export const makeCleanClassName = (classNames: className[]): string => {
  const CLASSES_SEPARATOR = ' ';
  // Filter with "Boolean" deleting empty values
  return classNames.filter(Boolean).join(CLASSES_SEPARATOR);
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
