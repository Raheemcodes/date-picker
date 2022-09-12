import {
  isYear,
  isMonth,
  isDay,
  validateInputFormat,
  validateFormat,
  validateVal,
  validateTheme,
} from './validation';
import { minMax, newDate } from './models/calendar/calendar.model';
import { DatePicker } from './script';
import { styles } from './views/styles';

export const toRem = (num: number): string => {
  return Math.round((num / 16) * 10000) / 10000 + 'rem';
};

export const clearInput = (picker: DatePicker) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput = picker.shadowRoot?.querySelector('input');

  if (input) {
    input.value = '';
    input.placeholder = picker.format;
  }

  if (shadowInput) {
    shadowInput.value = '';
    shadowInput.placeholder = picker.format;
  }
};

export const parseFormat = (picker: DatePicker) => {
  if (picker.hasAttribute('format')) {
    const formatVal: string = picker.getAttribute('format')!.toUpperCase();
    const format: string[] = formatVal.split('/');

    if (validateFormat(formatVal)) {
      picker.format = `${format[0]} / ${format[1]} / ${format[2]}`;
    }
    clearInput(picker);
  }
};

export const getFormat = (picker: DatePicker): 'UK' | 'US' | 'ISO' | void => {
  const UKFormat = /^(d|D){2}\s*\/\s*(m|M){2}\s*\/\s*(y|Y){2,4}$/;
  const USFormat = /^(m|M){2}\s*\/\s*(d|D){2}\s*\/\s*(y|Y){2,4}$/;
  const ISOFormat = /^(y|Y){2,4}\s*\/\s*(m|M){2}\s*\/\s*(d|D){2}$/;

  if (UKFormat.test(picker.format)) {
    return 'UK';
  } else if (USFormat.test(picker.format)) {
    return 'US';
  } else if (ISOFormat.test(picker.format)) {
    return 'ISO';
  }
};

export const parseInput = (str: string, picker: DatePicker): string => {
  const format: string = getFormat(picker)!;
  const strArr: string[] = str.split('/');
  const isValid = validateInputFormat(str, format);
  let result: string = '';

  if (!isValid) {
    result = '';
  } else if (format == 'ISO') {
    result = `${+strArr[0]}-${+strArr[1]}-${+strArr[2]}`;
  } else if (format == 'US') {
    result = `${+strArr[2]}-${+strArr[0]}-${+strArr[1]}`;
  } else if (format == 'UK') {
    result = `${+strArr[2]}-${+strArr[1]}-${+strArr[0]}`;
  }

  return result;
};

const pad = (arg: number): string => {
  let val: string = arg.toString();
  val = val.padStart(2, '0');

  return val;
};

export const parseOutput = (picker: DatePicker): string | void => {
  let { year, month, day } = picker._selected;
  let result: string = '';
  const format: string = getFormat(picker)!;
  const dateInput: string = new Date(
    Date.UTC(year, month - 1, day)
  ).toLocaleDateString();
  const curDate: string = new Date().toLocaleDateString();

  if (dateInput == curDate) {
    result = 'Today';
  } else if (format == 'ISO') {
    result = `${year}/${pad(month)}/${pad(day)}`;
  } else if (format == 'US') {
    result = `${pad(month)}/${pad(day)}/${year}`;
  } else if (format == 'UK') {
    result = `${pad(day)}/${pad(month)}/${year}`;
  }

  return result;
};

export const forceInput = (picker: DatePicker) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput: HTMLInputElement =
    picker.shadowRoot!.querySelector('input')!;

  if (input) {
    input.type = 'text';
    input.placeholder = picker.format;
    input.value = picker._value;
  } else {
    shadowInput.placeholder = picker.format;
    shadowInput.value = picker._value;
  }
};

export const toggleOpen = (picker: DatePicker) => {
  if (picker.hasAttribute('open')) {
    open(picker);
  } else {
    close(picker);
  }
};

export const open = (picker: DatePicker) => {
  const shadowIcon: HTMLElement =
    picker.shadowRoot?.querySelector('.calendar-icon')!;
  const pickerEl: HTMLElement =
    picker.shadowRoot?.querySelector('.date-picker')!;

  if (!shadowIcon.classList.contains('active')) {
    shadowIcon.classList.add('active');
  }

  editable(picker, true);
  picker.navigate('calendar');
  pickerEl.style.display = 'block';
  positionPicker(picker);
  picker.isOpen = true;
  setTimeout(() => {
    pickerEl.style.opacity = '1';
  }, 200);
};

const positionPicker = (picker: DatePicker) => {
  let curInput!: HTMLInputElement;
  const input: HTMLInputElement = picker.querySelector('[slot="input"]')!;
  const shadowInput: HTMLInputElement =
    picker.shadowRoot!.querySelector('input')!;
  const pickerEl: HTMLElement =
    picker.shadowRoot?.querySelector('.date-picker')!;

  if (input) curInput = input;
  else if (shadowInput) curInput = shadowInput;

  const top: number = curInput!.getBoundingClientRect().top;

  if (top <= pickerEl.clientHeight + 8) {
    pickerEl.style.top = `${toRem(curInput.clientHeight + 8)}`;
  } else {
    pickerEl.style.top = `-${toRem(pickerEl.clientHeight + 8)}`;
  }
};

export const onScroll = (picker: DatePicker) => {
  window.addEventListener('scroll', positionPicker.bind(this, picker));
};

export const close = (picker: DatePicker) => {
  const shadowIcon: HTMLElement =
    picker.shadowRoot?.querySelector('.calendar-icon')!;
  const pickerEl: HTMLElement =
    picker.shadowRoot?.querySelector('.date-picker')!;

  if (shadowIcon.classList.contains('active'))
    shadowIcon.classList.remove('active');
  editable(picker, false);
  window.removeEventListener('keydown', picker.calSwipe.onkeydown);
  pickerEl.style.opacity = '0';
  picker.isOpen = false;
  setTimeout(() => {
    pickerEl.style.display = 'none';
  }, 200);
};

export const _openCalendar = (picker: DatePicker) => {
  if (!picker.isOpen) picker.setAttribute('open', '');
};

export const _closeCalendar = (picker: DatePicker) => {
  if (picker.isOpen) picker.removeAttribute('open');
};

export const editable = (picker: DatePicker, val: boolean) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput: HTMLInputElement =
    picker.shadowRoot!.querySelector('input')!;

  if (val && !!input && picker.hasIcon) {
    input.readOnly = val;
    picker.editable = false;
  }
  if (!val && !!input && picker.hasIcon) {
    input.readOnly = val;
    picker.editable = true;
  }
  if (val && !!shadowInput && !input) {
    shadowInput.readOnly = val;
    picker.editable = false;
  }
  if (!val && !!shadowInput && !input) {
    shadowInput.readOnly = val;
    picker.editable = true;
  }
};

// Create Input Listener Next
export const addClickListener = (picker: DatePicker) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowIcon: HTMLElement =
    picker.shadowRoot?.querySelector('.calendar-icon')!;
  let icon!: HTMLElement;

  if (picker.hasAttribute('icon')) {
    const iconName: string = picker.getAttribute('icon')!;
    icon = picker.querySelector(`[aria-label='${iconName}']`)!;
  }

  if (!!icon && !!input) {
    picker.hasIcon = true;
    icon.addEventListener('click', onClickIcon.bind(this, picker));
  } else if (!!shadowIcon && !input) {
    picker.hasIcon = true;
    shadowIcon.addEventListener('click', onClickIcon.bind(this, picker));
  }
};

const onClickIcon = (picker: DatePicker) => {
  if (picker.isOpen) {
    _closeCalendar(picker);
  } else {
    _openCalendar(picker);
  }
};

export const updateComponent = (picker: DatePicker) => {
  let { year, month, day } = picker._selected;

  picker._value = `${year}-${month}-${day}`;
  picker.valueAsDate = new Date(Date.UTC(year, month, day));
  picker.valueAsNumber = Date.UTC(year, month, day);
  picker.valid = true;
  _closeCalendar(picker);
};

export const resetComponent = (picker: DatePicker) => {
  const [year, month, day] = picker._value.split('-');
  const strArr: string[] = newDate().split('-');

  picker._selected = {
    year: +year || +strArr[0],
    month: +month || +strArr[1],
    day: +day || +strArr[2],
  };
  _closeCalendar(picker);
};

export const onInput = (event: Event, picker: DatePicker) => {
  const val: string = (event.currentTarget as HTMLInputElement).value;
  if (!picker.hasIcon) _openCalendar(picker);

  updateValue(picker, val);
  setTimeout(() => {
    window.removeEventListener('keydown', picker.calSwipe.onkeydown);
  }, 201);
};

export const onBlur = (picker: DatePicker) => {
  window.addEventListener('keydown', picker.calSwipe.onkeydown);
};

export const collectInput = (picker: DatePicker) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput = picker.shadowRoot?.querySelector('input');

  if (!!input) {
    input.addEventListener('input', (e) => onInput(e, picker));
    input.addEventListener('blur', () => onBlur(picker));
  }
  if (!!shadowInput && !input) {
    shadowInput.addEventListener('input', (e) => onInput(e, picker));
    shadowInput.addEventListener('blur', () => onBlur(picker));
  }
};

export const updateValue = (picker: DatePicker, val: string) => {
  picker._value = parseInput(val || '', picker)!;
  const [year, month, day]: string[] = picker._value.split('-');
  picker.valid = !!picker.value;
  picker.valueAsNumber = NaN;
  picker.valueAsDate = null;
  const limit: boolean = minMax(picker, {
    year: +year,
    month: +month,
    day: +day,
  });

  if (!!picker.value && !limit) {
    picker.valueAsNumber = Date.UTC(+year, +month - 1, +day);
    picker.valueAsDate = new Date(picker.valueAsNumber);
    picker._selected = {
      year: +year,
      month: +month,
      day: +day,
    };
    picker.navigate('calendar');
  }
};

export const initialMinMax = (picker: DatePicker) => {
  if (picker.hasAttribute('min')) {
    const min: string = picker.getAttribute('min')!;
    const [year, month, day]: string[] = min.split('-');

    if (isYear(+year) && isMonth(+month) && isDay(+day)) {
      picker.min = min;
    } else {
      throw Error('Invaid min value');
    }
  }

  if (picker.hasAttribute('max')) {
    const max: string = picker.getAttribute('max')!;
    const [year, month, day]: string[] = max.split('-');

    if (isYear(+year) && isMonth(+month) && isDay(+day)) {
      picker.max = max;
    } else {
      throw Error('Invaid max value');
    }
  }

  const [minYear, minMonth, minDay]: string[] = picker.min.split('-');
  const [maxYear, maxMonth, maxDay]: string[] = picker.max.split('-');
  const min: number = Date.UTC(+minYear, +minMonth, +minDay);
  const max: number = Date.UTC(+maxYear, +maxMonth, +maxDay);

  if (min >= max) {
    throw Error('min attribute value must not be greater than max');
  }
};

export const changeVal = (picker: DatePicker, val: string) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput: HTMLInputElement =
    picker.shadowRoot!.querySelector('input')!;
  const isValid: boolean = validateVal(picker, val);

  if (isValid) {
    const [year, month, day] = val.split('-');
    picker._value = val;
    picker.valid = true;
    picker.valueAsNumber = Date.UTC(+year, +month, +day);
    picker.valueAsDate = new Date(picker.valueAsNumber);
    picker._selected = {
      year: +year,
      month: +month,
      day: +day,
    };

    if (!!input) input.value = parseOutput(picker)!;
    else shadowInput.value = parseOutput(picker)!;
    picker.navigate('calendar');
  } else {
    const [year, month, day] = picker.max.split('-');
    picker._value = picker.max;
    picker.valid = true;
    picker.valueAsNumber = Date.UTC(+year, +month, +day);
    picker.valueAsDate = new Date(picker.valueAsNumber);
    picker._selected = {
      year: +year,
      month: +month,
      day: +day,
    };

    if (!!input) input.value = parseOutput(picker)!;
    else shadowInput.value = parseOutput(picker)!;
    picker.navigate('calendar');
  }
};

export const changeTheme = (picker: DatePicker, val: string) => {
  const isValid: boolean = validateTheme(val);
  const styleEl: HTMLElement = picker.shadowRoot!.querySelector('style')!;

  if (isValid) {
    picker._theme = val;
    styleEl.textContent = styles(picker);
  }
};
