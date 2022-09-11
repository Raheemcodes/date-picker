import { minMaxYear } from './../calendar/calendar.model';
import { DatePicker } from '../../script';
import { CalendarSwipe } from '../calendar/calendar-swipe.model';
import { CalendarModel, Slide } from '../calendar/calendar.model';
import { getDays } from '../days.model';

export class MonthDays {
  jan: number = 31;
  feb: number = 28;
  mar: number = 31;
  apr: number = 30;
  may: number = 31;
  jun: number = 30;
  jul: number = 31;
  aug: number = 31;
  sep: number = 30;
  oct: number = 31;
  nov: number = 30;
  dec: number = 31;

  constructor(year: number) {
    if (year % 4 == 0) {
      this.feb = 29;
    }
  }

  totalDaysInYear() {
    const monthDays: number[] = Object.values(this);

    let totalDaysInYear: number = 0;

    for (let month of monthDays) {
      totalDaysInYear += month;
    }

    console.log(totalDaysInYear);
  }

  getMonthDays(num: number): number {
    const monthsDays: number[] = Object.values(this);

    return monthsDays[num];
  }
}

export const monthModel: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const getMonthName = (
  year: number,
  month: number,
  day: number,
  option: string
): string => {
  if (option == 'short') {
    return new Date(Date.UTC(year, month, day)).toLocaleString('default', {
      month: 'short',
    });
  } else {
    return new Date(Date.UTC(year, month, day)).toLocaleString('default', {
      month: 'long',
    });
  }
};

export const getMonthNum = (date: string): number => {
  const value: any = date.split('-');

  return new Date(Date.UTC(value[0], value[1])).getMonth();
};

export const getMonth = (
  picker: DatePicker,
  increment: number,
  yr: number,
  mth: number,
  curDate: number = 0
): string | void => {
  const slide: Slide = new Slide(increment, yr, mth, curDate);

  let { year, month, day } = slide;

  let days = getDays(picker, year, month, day);

  const widthAndGap = 304 / 16;

  days = `<div style="left: ${increment * widthAndGap}rem" id="${year}-${
    month.num
  }" class="calendar-view___month">${days}</div>`;

  return days;
};

export const getNewMonth = (
  picker: DatePicker,
  increment: 'left' | 'right',
  yr: number,
  mth: number,
  curDate: number = 0
): string => {
  const slide: Slide = new Slide(
    increment == 'right' ? -3 : 3,
    yr,
    mth,
    curDate
  );

  let { year, month, day } = slide;

  let days = getDays(picker, year, month, day);

  const widthAndGap = 608 / 16;

  days = `<div style="left: ${
    increment == 'right' ? -widthAndGap : widthAndGap
  }rem;" id="${year}-${month.num}" class="calendar-view___month">${days}</div>`;

  return days;
};

export const updateMonth = (newMonthEl: HTMLElement, swipe: CalendarSwipe) => {
  const date: string = newMonthEl.id + '-15';
  const calModel: CalendarModel = new CalendarModel(date);
  const month: HTMLElement = swipe.shadowRoot.querySelector('.dropdown span')!;

  month!.textContent = `${calModel.month.long} ${calModel.year}`;
  swipe.currentTranslate = 0;
  swipe.transitioning = false;
};

export const handleMonthListeners = (
  picker: DatePicker,
  action: 'add' | 'remove'
): void => {
  const shadowRoot: ShadowRoot = picker.shadowRoot!;
  const upBtn: HTMLElement = shadowRoot.querySelector('.month-view__up-btn')!;
  const downBtn: HTMLElement = shadowRoot.querySelector(
    '.month-view__down-btn'
  )!;
  const todayBtn: HTMLElement = shadowRoot.querySelector('.month-view__btn')!;
  const monthBtns: NodeListOf<HTMLElement> =
    shadowRoot.querySelectorAll('.month');

  if (action == 'add') {
    upBtn?.addEventListener('click', navigateUp.bind(this, picker));
    downBtn?.addEventListener('click', navigateDown.bind(this, picker));
    todayBtn?.addEventListener('click', onClickToday.bind(this, picker));
    monthBtns.forEach((el) => {
      el.addEventListener('click', (event: Event) => {
        onClickMonth(event, picker);
      });
    });
  }
};

const navigateUp = (picker: DatePicker): void => {
  const shadowRoot: ShadowRoot = picker.shadowRoot!;
  const yearEl: HTMLElement = shadowRoot.querySelector('.month-view__year')!;
  const year: number = +yearEl.id.split('-')[1];
  const limited: boolean = minMaxYear(picker, {
    year: year - 1,
    month: 0,
    day: 1,
  });

  if (limited) return;

  picker._selected.year = year - 1;
  picker.navigate('month');
};

const navigateDown = (picker: DatePicker): void => {
  const shadowRoot: ShadowRoot = picker.shadowRoot!;
  const yearEl: HTMLElement = shadowRoot.querySelector('.month-view__year')!;
  const year: number = +yearEl.id.split('-')[1];
  const limited: boolean = minMaxYear(picker, {
    year: year + 1,
    month: 0,
    day: 1,
  });

  if (limited) return;

  picker._selected.year = year + 1;
  picker.navigate('month');
};

const onClickMonth = (event: Event, picker: DatePicker) => {
  const activeBtn = event.currentTarget as HTMLElement;
  const elmentId: string = activeBtn.id;
  const monthBtns: NodeListOf<HTMLButtonElement> =
    picker.shadowRoot?.querySelectorAll('button.month')!;

  if (activeBtn.classList.contains('limited')) return;

  monthBtns?.forEach((btn) => {
    if (btn.classList.contains('active')) btn.classList.remove('active');
  });
  activeBtn.classList.add('active');
  picker._selected.month = +elmentId.split('-')[1];
  picker.navigate('calendar');
};

const onClickToday = (picker: DatePicker) => {
  const monthBtns: NodeListOf<HTMLButtonElement> =
    picker.shadowRoot?.querySelectorAll('button.month')!;

  monthBtns?.forEach((btn) => {
    if (btn.classList.contains('active')) btn.classList.remove('active');
  });

  picker._selected = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  picker.navigate('calendar');
};
