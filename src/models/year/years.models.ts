import { DatePicker } from '../../script';
import { YearSwipe } from './years-swipe.model';
import { YearRange } from '../date-picker.model';

export const getYear = (year: number, month: number, day: number): number => {
  const date: number = Date.UTC(year, month, day);

  return new Date(date).getFullYear();
};

export const getRange = (year: number): YearRange => {
  const remaindar: number = year % 28;
  const from: number = year - remaindar + 1;
  const to: number = year - remaindar + 28;

  return { from, to };
};

export const updateRange = (nextYearEl: HTMLElement, swipe: YearSwipe) => {
  const rangeEl = swipe.shadowRoot.querySelector('.year-view__range')!;

  rangeEl!.textContent = `${nextYearEl.id}`;
  swipe.currentTranslate = 0;
  swipe.transitioning = false;
};

export const updateYearOnClick = (event: Event, swipe: YearSwipe) => {
  let btn = event.currentTarget as HTMLButtonElement;

  updateSelectedBtn(btn, swipe);
};

export const updateSelectedBtn = (btn: HTMLButtonElement, swipe: YearSwipe) => {
  const picker: DatePicker = swipe.picker;
  const AllBtn = btn.parentElement?.parentElement?.querySelectorAll('button');

  if (btn.classList.contains('limited')) return;

  AllBtn!.forEach((el) => {
    if (el.classList.contains('active') || el.classList.contains('selected')) {
      el.classList.remove('selected');
      el.classList.remove('active');
    }
  });
  btn.classList.add('active');
  btn.classList.add('selected');
  picker._selected.year = +btn.id.split('-')[1];
  picker._selected.day = 1;
  picker.navigate('month');
  window.removeEventListener('keydown', swipe.onKeydown);
};

export const goBack = (swipe: YearSwipe) => {
  window.removeEventListener('keydown', swipe.onKeydown);
  swipe.picker.navigate('calendar');
};

export const updateActiveBtn = (btn: HTMLButtonElement) => {
  const AllBtn = btn.parentElement?.parentElement?.querySelectorAll('button');

  AllBtn!.forEach((el) => {
    if (el.classList.contains('active')) el.classList.remove('active');
  });

  btn.classList.add('active');
};

export const updateYearOnKeyDown = (event: KeyboardEvent, swipe: YearSwipe) => {
  if (!!swipe.transitioning) return;

  const parentEl = swipe.element.children[1];
  const activeBtn: HTMLElement = parentEl.querySelector(
    '.year-view__year.active'
  )!;

  if (!activeBtn) return;

  let from: number = +parentEl.id.split('-')[0];
  let to: number = +parentEl.id.split('-')[1];
  let btn!: HTMLButtonElement;
  let year: number = +activeBtn.id.split('-')[1];

  if (event.key == 'ArrowLeft') {
    year--;

    btn = navigateBack(year, parentEl.parentElement!, from, swipe)!;
  } else if (event.key == 'ArrowRight') {
    year++;

    btn = navigateForward(year, parentEl.parentElement!, to, swipe)!;
  } else if (event.key == 'ArrowUp') {
    year -= 4;

    btn = navigateBack(year, parentEl.parentElement!, from, swipe)!;
  } else if (event.key == 'ArrowDown') {
    year += 4;

    btn = navigateForward(year, parentEl.parentElement!, to, swipe)!;
  } else if (event.key == 'Enter') {
    btn = parentEl.querySelector('.year-view__year.active')!;

    updateSelectedBtn(btn, swipe);
    return;
  } else return;

  if (btn.classList.contains('limited')) return;

  updateActiveBtn(btn);
};

const navigateBack = (
  year: number,
  parentEl: Element,
  from: number,
  swipe: YearSwipe
) => {
  if (year <= 0) return;

  if (year < from) swipe.left();

  const btn: HTMLButtonElement = parentEl.querySelector(`#y-${year}`)!;

  return btn;
};

const navigateForward = (
  year: number,
  parentEl: Element,
  to: number,
  swipe: YearSwipe
) => {
  if (year > to) swipe.right();

  const btn: HTMLButtonElement = parentEl.querySelector(`#y-${year}`)!;

  return btn;
};
