import { DatePicker } from './../../script';
import { toRem } from '../../utility';

export const calendarStyles = (picker: DatePicker): string => {
  const mainColor: string = picker._theme;
  const minMaxColor: string = picker.color.lightness(mainColor, 25);

  return `
    .calendar-interface {
        width: 100%;
        height: 100%;
      }

      .calendar-interface > header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0.75rem 1rem;
        width: 100%;
        height: ${toRem(75)};
        background: ${mainColor};
      }

      .sub-heading {
        font-weight: 700;
        font-size: ${toRem(10)};
        color: rgba(255, 255, 255, 0.65);
      }

      .heading {
        font-weight: 700;
        font-size: ${toRem(20)};
        color: #fff;
      }

      .header-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .pen-container {
        width: 2rem;
        height: 2rem;
        padding: 0.5rem;
      }

      .pen-container svg {
        width: 100%;
        height: 100%;
      }

      .calendar-interface > main {
        display: flex;
        align-items: center;
        flex-direction: column;
        padding: 0.75rem 1rem;
      }  

      .selection-container {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .dropdown {
        border: none;
        background: #0000;
        display: flex;
        align-items: flex-end;
        gap: 0.5rem;
      }

      .dropdown:focus-visible {
        outline: none;
      }

      .dropdown span {
        color: #000;
        font-weight: bold;
        font-size: 1rem;
        margin: 0.25rem 0;
      }

      .dropdown-btn {
        width: 0.75rem;
        margin: 0.25rem 0;
      }

      .dropdown-btn svg {
        width: 100%; 
      }

      .nav-btn {
        display: flex;
        gap: 0.5rem;
      }

      .nav-btn__left, .nav-btn__right {
        color: #000;
        font-weight: 700;
        width: 2rem;
        font-size: 1rem;
      }

      .week-day {
        display: grid;
        grid-template-columns: repeat(7, 2rem);
        grid-template-rows: auto auto;
        justify-items: center;
        grid-gap: 0.25rem 0.5rem;
        margin: ${toRem(18)} 0 0.3rem;
      }

      .week {
        margin-bottom: 0.5rem;
        font-weight: 700;
        font-size: ${toRem(12)};
        color: rgba(145, 141, 141, 0.8);
      }

      .calendar-view__days {
        width: 100%;
        position: relative;
        height: ${toRem(185)};
        display: flex;
        justify-content: center;
        grid-column: span 7;
        overflow: hidden;
      }
      
      .calendar-view__slider {
        position: relative;
        width: 100%;
        box-sizing: content-box;
      }
      
      .calendar-view___month {
        position: absolute;
        box-sizing: content-box;
        display: grid;
        grid-template-columns: repeat(7, auto);
        justify-items: center;
        grid-gap: 0.1rem 0.5rem;
        -webkit-transition: left 300ms ease-out;
        -moz-trantransition: left 300ms ease-out;
        -o-trantransition: left 300ms ease-out;
        transition: left 300ms ease-out;
      }

      .day {
        box-sizing: content-box;
        width: 2rem;
        height: 1.8rem;
        color: #000;
        font-weight: 700;
        font-size: ${toRem(18)};
      }
      .day.today {
        color: ${mainColor};
        border-bottom: ${toRem(2)} solid ${mainColor};
      }
      .day.active {
        border-radius: ${toRem(5)};
        background: rgba(196, 196, 196, 0.6);
      }
      .day:focus-visible, .day:focus {
        outline: none;
      }
      @media (hover: hover) { 
        .day:hover {
          border-radius: ${toRem(5)};
          background: rgba(196, 196, 196, 0.3);
        }
        .day.active:hover {
          border-radius: ${toRem(5)};
          background: rgba(196, 196, 196, 0.6);
        }
      }
      .day.not-cur {
        color: rgba(196, 196, 196, 0.7);
      }
      .day.limited {
        color: ${minMaxColor};
      }

      .btn-cover {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 1rem;
      }
      
      .action {
        font-weight: 700;
        font-size: ${toRem(12)};
        padding: 0.5rem 1rem;
        color: ${mainColor}
      }
  `;
};
