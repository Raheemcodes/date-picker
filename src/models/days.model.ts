import { minMax } from './calendar/calendar.model';
import { DatePicker } from './../script';
import { SlideDay, SlideMonth } from './date-picker.model';

export const getWeekDay = (
  year: number,
  month: number,
  day: number
): string => {
  if (year < 100) year += 2000;
  const num: number = new Date(Date.UTC(year, month, day)).getDay();
  const weekDay = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

  return weekDay[num];
};

export const firstWkDay = (year: number, month: number): number => {
  if (year < 100) year += 2000;
  return new Date(Date.UTC(year, month)).getDay();
};

export const getDays = (
  picker: DatePicker,
  year: number,
  month: SlideMonth,
  day: SlideDay
): string => {
  let counter: number = 0;
  let next: number = 0;
  let days: string = '';
  const curYear: number = new Date().getFullYear();
  const curMonth: number = new Date().getMonth() + 1;
  const today: number = new Date().getDate();
  let length: number = 35;

  if (
    (day.first >= 5 && month.UTCNum == 31) ||
    (day.first == 6 && month.UTCNum == 30)
  ) {
    length = 42;
  }

  for (let i = 0; i < length; i++) {
    const prevMonth: number =
      month.num - 1 <= 0 ? month.num + 12 : month.num - 1;

    if (i < day.first) {
      const limited: boolean = minMax(picker, {
        year,
        month: month.num - 1,
        day: month.UTCPrevNum,
      });

      if (limited) {
        days =
          `<button tabindex="-1" id="${prevMonth}-${month.UTCPrevNum}" class="day not-cur prev limited">${month.UTCPrevNum}</button>` +
          days;
      } else {
        days =
          `<button tabindex="-1" id="${
            month.num - 1 <= 0 ? month.num + 11 : month.num - 1
          }-${month.UTCPrevNum}" class="day not-cur prev">${
            month.UTCPrevNum
          }</button>` + days;
      }

      month.UTCPrevNum--;
    } else if (i >= day.first && counter < month.UTCNum) {
      counter++;

      const limited: boolean = minMax(picker, {
        year,
        month: month.num,
        day: counter,
      });

      if (limited) {
        days += `<button tabindex="-1" id="${month.num}-${counter}" class="day limited">${counter}</button>`;
      } else if (year == curYear && month.num == curMonth && counter == today) {
        if (!!day.cur && day.cur == today) {
          days += `<button tabindex="0" id="${month.num}-${counter}" class="day today active">${counter}</button>`;
        } else {
          days += `<button tabindex="-1" id="${month.num}-${counter}" class="day today">${counter}</button>`;
        }
      } else if (!!day.cur && counter == day.cur) {
        days += `<button tabindex="0" id="${month.num}-${counter}" class="day active">${counter}</button>`;
      } else {
        days += `<button tabindex="-1" id="${month.num}-${counter}" class="day">${counter}</button>`;
      }
    } else {
      next++;

      const limited: boolean = minMax(picker, {
        year,
        month: month.num + 1,
        day: next,
      });

      if (limited) {
        days += `<button tabindex="-1" id="${
          month.num + 1 > 12 ? month.num - 11 : month.num + 1
        }-${next}" class="day not-cur next limited">${next}</button>`;
      } else {
        days += `<button tabindex="-1" id="${
          month.num + 1 > 12 ? month.num - 11 : month.num + 1
        }-${next}" class="day not-cur next">${next}</button>`;
      }
    }
  }

  return days;
};

export const updateActiveBtn = (btn: HTMLButtonElement) => {
  const AllBtn = btn.parentElement?.parentElement?.querySelectorAll('button');

  AllBtn!.forEach((el) => {
    if (el.classList.contains('active')) el.classList.remove('active');
  });

  btn.classList.add('active');
};
