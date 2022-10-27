import { CalendarSwipe } from './models/calendar/calendar-swipe.model';
import { newDate } from './models/calendar/calendar.model';
import { Color } from './models/color';
import { Selected } from './models/date-picker.model';
import { handleMonthListeners } from './models/month/months.model';
import { YearSwipe } from './models/year/years-swipe.model';
import {
  addClickListener,
  changeTheme,
  changeVal,
  collectInput,
  forceInput,
  initialMinMax,
  onScroll,
  parseFormat,
  toggleOpen,
} from './utility';
import { calendar } from './views/calendar/calendar.view';
import { months } from './views/month/months.view';
import { header, overview } from './views/overview';
import { years } from './views/year/years.view';

export class DatePicker extends HTMLElement {
  _theme: string = '#101010';
  for!: string;
  format: string = 'MM / DD / YYYY';
  _value: string = '';
  valueAsDate: Date | null = null;
  valueAsNumber: number = NaN;
  valid: boolean = false;
  min: string = '1-1-1';
  max: string = '99999-12-31';
  _selected: Selected = {
    year: +newDate().split('-')[0],
    month: +newDate().split('-')[1],
    day: +newDate().split('-')[2],
  };
  color: Color = new Color();
  hasIcon: boolean = false;
  isOpen: boolean = false;
  calSwipe!: CalendarSwipe;
  yearSwipe!: YearSwipe;
  editable: boolean = false;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.initialize();
  }

  connectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name == 'format') parseFormat(this);
    if (name == 'open') toggleOpen(this);
    if (name == 'value') changeVal(this, newValue);
    if (name == 'theme') changeTheme(this, newValue);
  }

  static get observedAttributes() {
    return ['open', 'value', 'format', 'theme'];
  }

  initialize() {
    this.shadowRoot!.innerHTML = header(this);
    initialMinMax(this);
    this.shadowRoot!.innerHTML = overview(this);
    forceInput(this);
    addClickListener(this);
    this._construct('calendar');
    collectInput(this);
    onScroll(this);
  }

  set value(val: string) {
    changeVal(this, val);
  }

  get value() {
    return this._value;
  }

  set theme(val: string) {
    changeTheme(this, val);
  }

  get theme() {
    return this._theme;
  }

  _construct(type: 'calendar' | 'year' | 'month') {
    if (type == 'calendar') this.calSwipe = new CalendarSwipe(this);
    if (type == 'month') handleMonthListeners(this, 'add');
    if (type == 'year') this.yearSwipe = new YearSwipe(this);
  }

  valueOf() {
    return this;
  }

  navigate(route: 'year' | 'month' | 'calendar') {
    const pickerEl = this.shadowRoot?.querySelector('.date-picker');

    setTimeout(() => {
      pickerEl?.removeChild(pickerEl.firstElementChild!);
      if (this.yearSwipe)
        window.removeEventListener('keydown', this.yearSwipe.onKeydown);

      if (route == 'year') {
        pickerEl?.insertAdjacentHTML('afterbegin', years(this));
        this._construct('year');
      } else if (route == 'month') {
        pickerEl?.insertAdjacentHTML('afterbegin', months(this));

        this._construct('month');
      } else if (route == 'calendar') {
        window.removeEventListener('keydown', this.calSwipe.onkeydown);
        pickerEl?.insertAdjacentHTML('afterbegin', calendar(this));
        this._construct('calendar');
      }
    }, 200);
  }
}

customElements.define('aray-datepicker', DatePicker);
// export const createDatePicker = (name: string) => {
//   customElements.define(name, DatePicker);
// };

// FA0606 - red
// FA5E06 - orange
// 096117 - dark green
// 1E419A - light blue
// f343d3 - purple pink
// 9A1E3C
// 101010 - black
// 44FB44 - Lemon
// 55C718 - mid-green
// 3E423C - almost-blck
