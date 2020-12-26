export const isValidEmail = (email: string): boolean => {
  if (email) {
    const regex: RegExp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const string: string = String(email).toLowerCase().trim();
    const match =
      regex.test(string) && string.includes('.') && string.includes('@');
    return match;
  } else {
    return false;
  }
};

export enum PasswordHardeningLevels {
  zero = 0, // zero is an invalid password
  first = 1,
  second = 2,
  third = 3,
}

export const isHardenPassword = (
  psswd: string,
  passwordHardeningLevel?: PasswordHardeningLevels
): PasswordHardeningLevels | boolean => {
  const minLowerCaseCharCount = 8;
  const minUpperCaseCharCount = 2;
  const minSpecialCharCount = 2;
  const minNumberCharCount = 2;
  const minPasswordCharLength =
    minLowerCaseCharCount +
    minUpperCaseCharCount +
    minSpecialCharCount +
    minNumberCharCount;
  // const specialChars = `~!@#$%^&*()|/;:"'><,.?-_=+{}`;
  const lowercaseCharRegex: RegExp = new RegExp(
    `(?=.{${minLowerCaseCharCount},66}[a-z])`,
    'g'
  );
  const uppercaseCharRegex: RegExp = new RegExp(
    `(?=.{${minUpperCaseCharCount},66}[A-Z])`,
    'g'
  );
  const numberCharRegex: RegExp = new RegExp(
    `(?=.{${minSpecialCharCount},66}[0-9])`,
    'g'
  );
  const specialCharRegex: RegExp = new RegExp(
    `(?=.{${minNumberCharCount},66}[~!@#$%^&*|\\/;:"'><,.?-_=+{}()])`,
    'g'
  );
  const string: string = String(psswd || '').trim();

  const lowercaseMatch: boolean = lowercaseCharRegex.test(string);
  const uppercaseMatch: boolean = uppercaseCharRegex.test(string);
  const numberMatch: boolean = numberCharRegex.test(string);
  const specialMatch: boolean = specialCharRegex.test(string);

  const strongMatch: boolean =
    lowercaseMatch && uppercaseMatch && numberMatch && specialMatch;
  const mediumMatch: boolean =
    lowercaseMatch && uppercaseMatch && (numberMatch || specialMatch);
  const weakMatch: boolean = lowercaseMatch || uppercaseMatch;
  const evaluate = (): PasswordHardeningLevels => {
    if (string.length < minPasswordCharLength) {
      // if less than required amount it should be an invalid password
      return PasswordHardeningLevels.zero;
    } else if (weakMatch && !mediumMatch && !strongMatch) {
      return PasswordHardeningLevels.first;
    } else if (mediumMatch && !strongMatch) {
      return PasswordHardeningLevels.second;
    } else if (strongMatch) {
      return PasswordHardeningLevels.third;
    } else {
      return PasswordHardeningLevels.zero.valueOf();
    }
  };
  if (typeof passwordHardeningLevel === 'undefined') {
    return evaluate();
  } else {
    return evaluate() === passwordHardeningLevel;
  }
};
