import { DatePicker } from './../script';
import { monthStyles } from './month/months.styles';
import { calendarStyles } from './calendar/calendar.styles';
import { toRem } from './../utility';
import { yearStyles } from './year/years.styles';

export const styles = (picker: DatePicker): string => {
  const mainColor: string = picker._theme;
  const lightened: string = picker.color.lightness(mainColor, 50);

  return `    
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');

      * {
        box-sizing: border-box;
        font-family: 'Inter', sans-serif;
        margin: 0;
        padding: 0;
      }

      button {
        cursor: pointer;
        border: none;
        background: #0000;
        color: #000;
      }
      
      :host {
        position: relative
      }

      .input {
        border: ${toRem(2)} solid ${mainColor};
        width: 10rem;
        height: 2.5rem; 
        display: flex;
        justify-content: space-between;
        align-items: center;
        overflow: hidden;
        border-radius: ${toRem(5)};
        background: #fff;
        padding: 0 0.75rem;
      }

      span input {
        border: none;
        outline:none;
        margin: 0;
        padding: 0;
        width: 70%;
        height: 100%;
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
      }
      
      span input::placeholder {
        font-family: 'Inter', sans-serif;
        font-size: 0.7rem;
        font-weight: 700;
        color: rgba(196, 196, 196);
      }

      .calendar-icon {
        width: 1.5rem;
        display: flex;
        align-items: center;
      }

      .calendar-icon:focus {
        outline: none;
      }
      
      .calendar-icon.active {
        stroke: ${mainColor};
      }

      .date-picker {
        display: none;
        opacity: 0;
        background: #fff;
        max-width: 20rem;
        width: 90vw;
        min-width: 18.5rem;
        height: ${toRem(386)};
        top: 3rem;
        position: absolute;
        border-radius: ${toRem(5)};
        overflow: hidden;
        box-shadow: ${toRem(-10)} ${toRem(-10)} 
        20px rgba(0, 0, 0, 0.15), 
        ${toRem(10)} ${toRem(10)}
          20px rgba(0, 0, 0, 0.25);
        -webkit-transition: all 200ms ease-out;
        -moz-trantransition: all 200ms ease-out;
        -o-trantransition: all 200ms ease-out;
        transition: all 200ms ease-out;
      }

      ${calendarStyles(picker)}
      ${monthStyles(mainColor)}
      ${yearStyles(mainColor, lightened)}
    
  `;
};
