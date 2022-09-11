import { minMaxYear } from './../../models/calendar/calendar.model';
import { YearRange } from './../../models/date-picker.model';
import { getRange } from './../../models/year/years.models';
import { DatePicker } from './../../script';
import { toRem } from './../../utility';

export const years = (picker: DatePicker): string => {
  const { year } = picker._selected;
  const range: YearRange = getRange(year);

  return `
    <div class="year-interface">
      <div class="year-view__1st-row">
          <button class="year-view__btn">
            <span class="year-view__range">${range.from} - ${range.to}</span>
            <div class="year-view__dropdown">
              <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 0L22.3253 15H0.674683L11.5 0Z" fill="black"/>
              </svg>
            </div>
          </button>

          <div class="year-view__nav-btn__cover">
            <button class="year-view__up-btn">
              <
            </button>
            <button class="year-view__down-btn">
              >
            </button>
          </div>
      </div>

      <div class="year-view__slide">
        ${generateYear(range.from, -1, picker)}
        ${generateYear(range.from, 0, picker)}
        ${generateYear(range.from, 1, picker)}
      </div>
      
    </div>
  `;
};

export const generateYear = (
  from: number,
  increment: number,
  picker: DatePicker
) => {
  from += increment * 28;
  let years: string = getYears(from, picker);

  years = `<div style="left: ${toRem(352 * increment)};" id="${from} - ${
    from + 27
  }" class="year-view__years">${years}</div>`;

  return years;
};

export const generateNewYear = (
  from: number,
  increment: 'left' | 'right',
  picker: DatePicker
) => {
  from += increment == 'left' ? 56 : -56;
  let years: string = getYears(from, picker);

  years = `<div style="left: ${toRem(
    increment == 'left' ? 352 : -352
  )};" id="${from} - ${from + 27}" class="year-view__years">${years}</div>`;

  return years;
};

const getYears = (from: number, picker: DatePicker) => {
  let years: string = '';
  const activeYear: number = picker._selected.year;

  for (let i = 0; i < 28; i++) {
    const limit: boolean = minMaxYear(picker, {
      year: from,
      month: 0,
      day: 15,
    });
    if (limit) {
      years += `<button id="y-${from}" class="year-view__year limited">${from}</button>`;
    } else if (!!activeYear && from == activeYear) {
      years += `<button id="y-${from}" class="year-view__year active selected">${from}</button>`;
    } else {
      years += `<button id="y-${from}" class="year-view__year">${from}</button>`;
    }
    from++;
  }

  return years;
};
