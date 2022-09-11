import { DatePicker } from './../../script';
import { CalendarModel, newDate } from './../../models/calendar/calendar.model';
import { getMonth } from './../../models/month/months.model';

export const calendar = (picker: DatePicker): string => {
  const { year, month, day } = picker._selected;
  const date: string = [year, month, day].join('-');
  const calView: CalendarModel = new CalendarModel(date);

  // Validate Date String from input
  // creating day rendering logic directly

  const monthSlides: string = `
        <div class="calendar-interface">
          <header>
            <h4 class="sub-heading">SELECT DATE</h4>
            <div class="header-container">
              <h2 class="heading">
                ${calView.day.weekday}, ${calView.month.short} ${
    calView.day.current
  }
              </h2>
              ${pen(picker)}
            </div>
          </header>
          <main>
            <div class="selection-container">
              <button class="dropdown" aria-label="dropdown">
                <span>${calView.month.long} ${calView.year}</span>
                <div class="dropdown-btn">
                  <svg width="23" height="15" viewBox="0 0 23 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5 15L0.674683 0L22.3253 0L11.5 15Z" fill="black"/>
                  </svg>
                </div>
              </button>
              <div class="nav-btn">
                <button class="nav-btn__left"><</button>
                <button class="nav-btn__right">></button>
              </div>
            </div>
            <div class="week-day">
              <div class="week">
                SUN
              </div>
              <div class="week">
                MON
              </div>
              <div class="week">
                TUE
              </div>
              <div class="week">
                WED
              </div>
              <div class="week">
                THU
              </div>
              <div class="week">
                FRI
              </div>
              <div class="week">
                SAT
              </div>
              <div class="calendar-view__days">
                <div class="calendar-view__slider">
                ${getMonth(picker, -2, calView.year, calView.month.num)}
                ${getMonth(picker, -1, calView.year, calView.month.num)}
                ${getMonth(
                  picker,
                  0,
                  calView.year,
                  calView.month.num,
                  calView.day.current
                )}
                ${getMonth(picker, +1, calView.year, calView.month.num)}
                ${getMonth(picker, +2, calView.year, calView.month.num)}
                </div>
              </div>
            </div>
            <div class="btn-cover">
              <button class="action cancel">CANCEL</button>
              <button class="action confirm">OK</button>
            </div>
          </main>
        </div>
    `;

  return monthSlides;
};

const pen = (picker: DatePicker): string => {
  if (picker.hasIcon) {
    return `
      <button class="pen-container" style="${
        picker.editable ? 'border-bottom: 2px solid #fff' : ''
      }">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.76288 32C1.51927 31.9996 1.27841 31.9484 1.05561 31.8499C0.832822 31.7513 0.632975 31.6074 0.46878 31.4274C0.301616 31.2489 0.174058 31.0371 0.0944721 30.8058C0.0148862 30.5746 -0.0149299 30.3291 0.00697814 30.0855L0.437174 25.3538L20.3105 5.48216L26.5211 11.6927L6.65306 31.5626L1.92267 31.993C1.86955 31.9979 1.81622 32.0002 1.76288 32ZM27.7607 10.451L21.5519 4.2404L25.2761 0.515123C25.4392 0.351821 25.6329 0.222272 25.846 0.133883C26.0592 0.0454949 26.2877 0 26.5184 0C26.7492 0 26.9777 0.0454949 27.1909 0.133883C27.404 0.222272 27.5977 0.351821 27.7607 0.515123L31.485 4.2404C31.6483 4.40352 31.7778 4.59723 31.8662 4.81045C31.9545 5.02368 32 5.25223 32 5.48304C32 5.71386 31.9545 5.94241 31.8662 6.15563C31.7778 6.36885 31.6483 6.56256 31.485 6.72568L27.7625 10.4492L27.7607 10.451Z" fill="#F8F8F8"/>
        </svg>
      </button>
    `;
  } else {
    return '';
  }
};
