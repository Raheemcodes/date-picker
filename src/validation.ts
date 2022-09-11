import { DatePicker } from './script';
import { minMax } from './models/calendar/calendar.model';
export const isYear = (num: number): boolean => {
  if (num > 0 && num <= 99999) {
    return true;
  } else {
    return false;
  }
};

export const isMonth = (num: number): boolean => {
  if (num > 0 && num <= 12) {
    return true;
  } else {
    return false;
  }
};

export const isDay = (num: number): boolean => {
  if (num > 0 && num <= 31) {
    return true;
  } else {
    return false;
  }
};

export const validateFormat = (str: string) => {
  const regex =
    /^((d|D){2}\s*\/\s*(m|M){2}\s*\/\s*(y|Y){2,4})|((m|M){2}\s*\/\s*(d|D){2}\s*\/\s*(y|Y){2,4})|((y|Y){2,4}\s*\/\s*(m|M){2}\s*\/\s*(d|D){2})$/;

  if (regex.test(str)) {
    return true;
  } else {
    console.error(
      'Invalid Date Format! Valid formats are dd/mm/yyyy, mm/dd/yyyy or yyyy/dd/mm'
    );
  }
};

export const validateInput = (str: string) => {
  const regex = /^(\s*\d*\s*\/\s*){2}\d*\s*$/;

  return regex.test(str);
};

export const validateInputFormat = (str: string, format: string): boolean => {
  const isValid: boolean = validateInput(str);
  const strArr: string[] = str.split('/');
  let result: boolean = false;

  if (
    isValid &&
    format == 'ISO' &&
    isYear(+strArr[0]) &&
    isMonth(+strArr[1]) &&
    isDay(+strArr[2])
  ) {
    result = true;
  } else if (
    isValid &&
    format == 'US' &&
    isMonth(+strArr[0]) &&
    isDay(+strArr[1]) &&
    isYear(+strArr[2])
  ) {
    result = true;
  } else if (
    isValid &&
    format == 'UK' &&
    isDay(+strArr[0]) &&
    isMonth(+strArr[1]) &&
    isYear(+strArr[2])
  ) {
    result = true;
  }

  return result;
};

export const validateVal = (picker: DatePicker, val: string): boolean => {
  const [year, month, day]: string[] = val.split('-');

  const limit: boolean = minMax(picker, {
    year: +year,
    month: +month,
    day: +day,
  });

  if (limit) {
    console.error('Value has exceeded min or max value');
    return false;
  } else if (isYear(+year) && isMonth(+month) && isDay(+day)) {
    return true;
  } else {
    console.error('Invalid value at the value atrribute! Try YYYY-MM-DD');
    return false;
  }
};

export const validateTheme = (color: string): boolean => {
  const hex = /^#[0-9a-fA-F]{3,6}$/;
  const rgba = new RegExp(
    /rgba?\(((25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,\s*?){2}(25[0-5]|2[0-4]\d|1\d{1,2}|\d\d?)\s*,?\s*([01]\.?\d*?)?\)/
  );

  if (hex.test(color)) return true;
  else if (rgba.test(color)) return true;
  else return false;
};
