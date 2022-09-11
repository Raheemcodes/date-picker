import { updateComponent, parseOutput, resetComponent } from './../../utility';
import { DatePicker } from './../../script';
import { MonthDays } from '../month/months.model';
import { CalendarSwipe } from './calendar-swipe.model';
import { updateCalendarTitle } from './calendar.model';
import { updateActiveBtn } from '../days.model';

export const updateDateOnClick = (event: Event, swipe: CalendarSwipe) => {
  let btn = event.currentTarget as HTMLButtonElement;
  const btnId: string[] = btn.id.split('-');
  const btnParentId: string[] = btn.parentElement!.id.split('-');
  const calTitle: HTMLElement = swipe.shadowRoot.querySelector('.heading')!;
  let date: string;
  let newBtnParentId: string[] = [];

  if (btn.classList.contains('limited')) return;
  if (btn.classList.contains('next')) {
    newBtnParentId = btn.parentElement?.nextElementSibling?.id.split('-')!;

    swipe.right();
    btn = btn.parentElement?.nextElementSibling?.querySelector(
      `[id='${btn.id}']`
    )!;
  }
  if (btn.classList.contains('prev')) {
    newBtnParentId = btn.parentElement?.previousElementSibling?.id.split('-')!;

    swipe.left();
    btn = btn.parentElement?.previousElementSibling?.querySelector(
      `[id='${btn.id}']`
    )!;
  }

  if (newBtnParentId.length == 0) {
    date = [...btnParentId, btnId[1]].join('-');
  } else {
    date = [...newBtnParentId, btnId[1]].join('-');
  }

  updateActiveBtn(btn);
  setTimeout(() => {
    updateCalendarTitle(date, calTitle, swipe.picker);
  }, 300);
};

export const updateDateOnKeyDown = (
  event: KeyboardEvent,
  swipe: CalendarSwipe
) => {
  if (!!swipe.transitioning) return;

  const parentEl = swipe.element.children[2];
  const activeBtn: HTMLElement = parentEl.querySelector('.day.active')!;

  if (!activeBtn) return;

  let year: number = +parentEl.id.split('-')[0];
  let month: number = +parentEl.id.split('-')[1];
  let btn!: HTMLButtonElement;
  let day: number = +activeBtn!.id.split('-')[1];

  if (event.key == 'ArrowLeft') {
    day--;
    btn = navigateBack(year, month, day, parentEl, swipe);
  } else if (event.key == 'ArrowRight') {
    day++;
    btn = navigateForward(year, month, day, parentEl, swipe);
  } else if (event.key == 'ArrowUp') {
    day -= 7;
    btn = navigateBack(year, month, day, parentEl, swipe);
  } else if (event.key == 'ArrowDown') {
    day += 7;

    btn = navigateForward(year, month, day, parentEl, swipe);
  } else {
    return;
  }

  const btnId: string[] = btn.id.split('-');
  const date: string = [year, ...btnId].join('-');
  const calTitle: HTMLElement = swipe.shadowRoot.querySelector('.heading')!;

  if (btn.classList.contains('limited')) return;

  updateActiveBtn(btn);
  updateCalendarTitle(date, calTitle, swipe.picker);
};

const navigateBack = (
  year: number,
  month: number,
  day: number,
  parentEl: Element,
  swipe: CalendarSwipe
) => {
  let btn: HTMLButtonElement;

  if (day < 1) {
    month--;
    if (month <= 0) {
      month += 12;
      year--;
    }

    const notCurTotalDays = new MonthDays(year).getMonthDays(month - 1);
    swipe.left();
    btn = parentEl.previousElementSibling!.querySelector(
      `[id='${month}-${day + notCurTotalDays}']`
    )!;
  } else {
    btn = parentEl.querySelector(`[id='${month}-${day}']`)!;
  }

  return btn;
};

const navigateForward = (
  year: number,
  month: number,
  day: number,
  parentEl: Element,
  swipe: CalendarSwipe
) => {
  const curTotalDays: number = new MonthDays(year).getMonthDays(month - 1);
  let btn: HTMLButtonElement;

  if (day > curTotalDays) {
    month++;
    if (month > 12) {
      month -= 12;
      year++;
    }
    swipe.right();
    btn = parentEl.nextElementSibling!.querySelector(
      `[id='${month}-${day - curTotalDays}']`
    )!;
  } else {
    btn = parentEl.querySelector(`[id='${month}-${day}']`)!;
  }

  return btn;
};

export const onConfirm = (picker: DatePicker) => {
  const input: HTMLInputElement = picker.querySelector('input')!;
  const shadowInput: HTMLInputElement =
    picker.shadowRoot!.querySelector('input')!;

  updateComponent(picker);
  if (!!input) {
    input.value = parseOutput(picker)!;
  } else {
    shadowInput.value = parseOutput(picker)!;
  }
};

export const onCancel = (picker: DatePicker) => {
  resetComponent(picker);
};
