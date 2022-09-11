import { minMax, minMaxMonth } from './../../models/calendar/calendar.model';
import { monthModel } from '../../models/month/months.model';
import { DatePicker } from './../../script';

export const months = (picker: DatePicker): string => {
  const year: number = picker._selected.year;

  return `
    <div class="month-interface">
      <div class="month-view__1st-row">
        <div class="month-view__year" id="y-${year}">${year}</div>
        <div class="month-view__nav-btn__cover">
          <button class="month-view__up-btn">
            <
          </button>
          <button class="month-view__down-btn">
            >
          </button>
        </div>
      </div>

      <div class="month-view__2nd-row">
        ${genrateMonth(picker)}
      </div>

      <button class="month-view__btn">Today</button>
    </div>
  `;
};

export const genrateMonth = (picker: DatePicker): string => {
  let months: string = '';
  const year: number = picker._selected.year;
  const monthNames: string[] = monthModel;

  for (let i = 0; i < 12; i++) {
    const limit: boolean = minMaxMonth(picker, { year, month: i, day: 1 });
    if (limit) {
      months += `<button class="month limited" id="m-${i + 1}">${
        monthNames[i]
      }</button>`;
    } else {
      months += `<button class="month" id="m-${i + 1}">${
        monthNames[i]
      }</button>`;
    }
  }

  return months;
};
