import { replaceNonNumber } from './StringUtils';
//Replace every 3 digits with commas for easier reading humans
export const commafy = (number: number) => {
  return number
    .toString()
    .trim()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .toLocaleString();
};

export const titleCase = (str: string) => {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

export const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length);
};
export const uppercaseFirstLetterLowercaseRest = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1, str.length).toLowerCase();
};

export const toPercent = (number: number | string, decimals = 0) => {
  let percent = number;
  if (typeof percent === 'string') {
    percent = replaceNonNumber(percent);
  }
  if (!isNaN(+percent)) {
    //If is less than one e.g. .45 * 100 turn into 45
    percent = percent < 1 ? +percent * 100 : +percent;
    return (+percent).toFixed(decimals) + '%';
  } else return '0%';
};

export const toDollarAmount = (amount: number | string) => {
  let dollars = amount;
  if (typeof dollars === 'string') {
    dollars = replaceNonNumber(dollars);
  }
  if (!isNaN(+dollars)) return '$' + (+dollars).toFixed(2);
  else return '$0.00';
};
