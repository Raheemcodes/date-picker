import { DatePicker } from '../../script';
import { Day, Month, SlideDay, SlideMonth } from '../date-picker.model';
import { firstWkDay, getWeekDay } from '../days.model';
import { getMonthName, MonthDays } from '../month/months.model';
import { editable } from './../../utility';
import { Selected } from './../date-picker.model';
import { CalendarSwipe } from './calendar-swipe.model';

export class CalendarModel {
  year: number;
  month: Month;
  day: Day;

  constructor(date: string) {
    const value = date.split('-');

    this.year = +value[0];
    this.day = {
      weekday: getWeekDay(+value[0], +value[1] - 1, +value[2]),
      current: +value[2],
    };
    this.month = {
      long: getMonthName(+value[0], +value[1] - 1, +value[2], 'long'),
      short: getMonthName(+value[0], +value[1] - 1, +value[2], 'short'),
      num: +value[1],
    };
  }
}

export class Slide {
  year: number;
  month: SlideMonth;
  day: SlideDay;

  constructor(increment: number = 0, year: number, month: number, day: number) {
    this.year = year;

    month += increment;
    month = this.updateFn(month);

    const prevMonth = this.updatePrevFn(month - 1);
    const monthsDays: MonthDays = new MonthDays(this.year);

    this.month = {
      num: month,
      UTCNum: monthsDays.getMonthDays(month - 1),
      UTCPrevNum: monthsDays.getMonthDays(prevMonth - 1),
    };

    this.day = {
      first: firstWkDay(this.year, month - 1),
      cur: day,
    };
  }

  updateFn = (month: number) => {
    if (month < 1) {
      month += 12;
      this.year--;
    }
    if (month > 12) {
      month -= 12;
      this.year++;
    }
    return month;
  };

  updatePrevFn = (month: number) => {
    if (month < 1) {
      month += 12;
    }
    if (month > 12) {
      month -= 12;
    }
    return month;
  };
}

export const updateCalendarTitle = (
  date: string,
  calTitleEl: HTMLElement,
  picker: DatePicker
) => {
  const activeDate: string[] = date.split('-');
  const calModel = new CalendarModel(date);

  picker._selected = {
    year: +activeDate[0],
    month: +activeDate[1],
    day: +activeDate[2],
  };
  calTitleEl.textContent = `${calModel.day.weekday}, ${calModel.month.short} ${calModel.day.current}`;
};

export const newDate = (): string => {
  const date: string[] = new Date().toLocaleDateString('en-GB').split('/');
  return [date[2], date[1], date[0]].join('-');
};

export const togglePen = (e: Event, swiper: CalendarSwipe) => {
  const pointer = e.currentTarget as HTMLElement;
  if (!swiper.picker.editable) {
    window.removeEventListener('keydown', swiper.onkeydown);
    pointer.style['border-bottom'] = '2px solid #fff';
    editable(swiper.picker, swiper.picker.editable);
  } else {
    window.addEventListener('keydown', swiper.onkeydown);
    pointer.style['border-bottom'] = 'none';
    editable(swiper.picker, swiper.picker.editable);
  }
};

export const minMax = (picker: DatePicker, date: Selected): boolean => {
  const [minYear, minMon, minDay]: string[] = picker.min.split('-');
  const [maxYear, maxMon, maxDay]: string[] = picker.max.split('-');
  const { year, month, day }: Selected = date;
  const minDate: number = Date.UTC(+minYear, +minMon - 1, +minDay);
  const maxDate: number = Date.UTC(+maxYear, +maxMon - 1, +maxDay);
  const curDate: number = Date.UTC(year, +month - 1, +day);

  if (curDate >= minDate && curDate <= maxDate) {
    return false;
  } else {
    return true;
  }
};

export const minMaxCalc = (picker: DatePicker, date: Selected): boolean => {
  const [minYear, minMon]: string[] = picker.min.split('-');
  const [maxYear, maxMon]: string[] = picker.max.split('-');
  const { year, month }: Selected = date;
  const minDate: number = Date.UTC(+minYear, +minMon - 2 - 1);
  const maxDate: number = Date.UTC(+maxYear, +maxMon + 2 - 1);
  const curDate: number = Date.UTC(year, +month - 1);

  if (curDate > minDate && curDate < maxDate) {
    return true;
  } else {
    return false;
  }
};

export const minMaxMonth = (picker: DatePicker, date: Selected): boolean => {
  const [minYear, minMon]: string[] = picker.min.split('-');
  const [maxYear, maxMon]: string[] = picker.max.split('-');
  const { year, month }: Selected = date;
  const minDate: number = Date.UTC(+minYear, +minMon - 1);
  const maxDate: number = Date.UTC(+maxYear, +maxMon - 1);
  const curDate: number = Date.UTC(year, month);

  if (curDate >= minDate && curDate <= maxDate) {
    return false;
  } else {
    return true;
  }
};

export const minMaxYear = (picker: DatePicker, date: Selected): boolean => {
  const [minYear]: string[] = picker.min.split('-');
  const [maxYear]: string[] = picker.max.split('-');
  const { year }: Selected = date;
  const minDate: number = Date.UTC(+minYear, 0);
  const maxDate: number = Date.UTC(+maxYear, 0);
  const curDate: number = Date.UTC(year, 0);

  if (curDate >= minDate && curDate <= maxDate) {
    return false;
  } else {
    return true;
  }
};
