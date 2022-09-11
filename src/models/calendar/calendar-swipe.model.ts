import { DatePicker } from '../../script';
import { getNewMonth, updateMonth } from '../month/months.model';
import {
  onCancel,
  onConfirm,
  updateDateOnClick,
  updateDateOnKeyDown,
} from './calendar-update.model';
import { togglePen, minMaxCalc } from './calendar.model';

export class CalendarSwipe {
  picker!: DatePicker;
  shadowRoot!: ShadowRoot;
  isDragging: boolean = false;
  threshold!: number;
  element!: HTMLElement;
  width!: number;
  startPosX: number = 0;
  startPosY: number = 0;
  curIdx: number = 0;
  prevTranslate: number[] = [-2 * 304, -304, 0, 304, 304 * 2];
  currentTranslate: number = 0;
  prevIdx: number = 0;
  transitioning: boolean = false;

  constructor(picker: DatePicker) {
    this.picker = picker;
    this.shadowRoot = this.picker.shadowRoot!;
    const element = this.shadowRoot.querySelector('.calendar-view__slider');

    this.initialize(element as HTMLElement);
    this.addListeners();
  }

  getPositionX(event: TouchEvent): number {
    return event.touches[0].clientX;
  }

  getPositionY(event: TouchEvent): number {
    return event.touches[0].clientY;
  }

  touchStart(event: TouchEvent) {
    this.isDragging = true;
    this.startPosX = this.getPositionX(event);
    this.startPosY = this.getPositionY(event);
  }

  touchMove(event: TouchEvent) {
    if (this.isDragging && !this.transitioning) {
      const currentPosition = this.getPositionX(event);
      const currentTranslateX = this.getPositionX(event) - this.startPosX;
      const currentTranslateY = this.getPositionY(event) - this.startPosY;

      if (Math.abs(currentTranslateY) < Math.abs(currentTranslateX)) {
        if (event.cancelable) event.preventDefault();

        this.currentTranslate = currentPosition - this.startPosX;
        this.setSliderPosition();
      }
    }
  }

  touchEnd() {
    this.isDragging = false;

    const movedBy = this.currentTranslate;

    if (movedBy == 0) return;
    if (movedBy < -this.threshold) this.curIdx++;
    if (movedBy > this.threshold) this.curIdx--;

    this.setPositionByIndex();
  }

  initialize(element: HTMLElement) {
    this.element = element;
    this.width = this.element.firstElementChild!.clientWidth;
    this.threshold = this.width / 5;
  }

  addListeners() {
    const left: HTMLElement = this.shadowRoot.querySelector('.nav-btn__left')!;
    const right: HTMLElement =
      this.shadowRoot.querySelector('.nav-btn__right')!;
    const dropdown: HTMLElement = this.shadowRoot.querySelector('.dropdown')!;
    const confimBtn: HTMLElement = this.shadowRoot.querySelector('.confirm')!;
    const cancelBtn: HTMLElement = this.shadowRoot.querySelector('.cancel')!;
    const pen: HTMLElement = this.shadowRoot.querySelector('.pen-container')!;

    left?.addEventListener('click', this.left.bind(this));
    right?.addEventListener('click', this.right.bind(this));
    dropdown?.addEventListener('click', this.onClickDropdown);
    confimBtn?.addEventListener('click', onConfirm.bind(this, this.picker));
    cancelBtn?.addEventListener('click', onCancel.bind(this, this.picker));
    pen?.addEventListener('click', (e: Event) => togglePen(e, this));

    this.element.addEventListener('touchstart', this.touchStart.bind(this), {
      passive: false,
    });
    this.element.addEventListener('touchmove', this.touchMove.bind(this), {
      passive: false,
    });
    this.element.addEventListener('touchend', this.touchEnd.bind(this), {
      passive: false,
    });

    this.addListenersToBtn(this.element);
    window.addEventListener('keydown', this.onkeydown);
  }

  onkeydown = (e: KeyboardEvent) => {
    const postion: DOMRect = this.picker.getBoundingClientRect();
    if (postion.top >= 0 && postion.bottom <= innerHeight) {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        e.preventDefault();
      }
      updateDateOnKeyDown(e, this);
    }
  };

  onClickDropdown = (e: Event) => {
    this.changeSelect();
    window.removeEventListener('keydown', this.onkeydown);
    this.picker.navigate('year');
  };

  addListenersToBtn(element: Element) {
    element.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        updateDateOnClick(e, this);
      });
    });
  }

  left() {
    if (this.transitioning) return;
    this.curIdx--;
    this.setPositionByIndex();
  }

  right() {
    if (this.transitioning) return;
    this.curIdx++;
    this.setPositionByIndex();
  }

  slideLeft() {
    const childEl: HTMLElement = this.element.children[2] as HTMLElement;
    const id = childEl.id.split('-');
    const nextElement = childEl.nextElementSibling as HTMLElement;
    const newEl = getNewMonth(this.picker, 'left', +id[0], +id[1]);

    setTimeout(() => {
      this.element.removeChild(this.element.firstElementChild as Node);
      this.element.insertAdjacentHTML('beforeend', newEl);
      this.changeSelect();
      this.addListenersToBtn(this.element.children[4]);
      updateMonth(nextElement, this);
    }, 300);
  }

  slideRight() {
    const childEl: HTMLElement = this.element.children[2] as HTMLElement;
    const id = childEl.id.split('-');
    const nextElement = childEl.previousElementSibling as HTMLElement;
    const newEl = getNewMonth(this.picker, 'right', +id[0], +id[1]);

    setTimeout(() => {
      this.element.removeChild(this.element.lastElementChild as Node);
      this.element.insertAdjacentHTML('afterbegin', newEl);
      this.changeSelect();
      this.addListenersToBtn(this.element.children[0]);
      updateMonth(nextElement, this);
    }, 300);
  }

  changeSelect() {
    const id: string[] = this.element.children[2].id.split('-');
    this.picker._selected = {
      year: +id[0],
      month: +id[1],
      day: 1,
    };
  }

  setSliderPosition() {
    Array.from(this.element.children).forEach((child, index) => {
      const childEl: HTMLElement = child as HTMLElement;

      childEl.style.left = `${
        (this.prevTranslate[index] + this.currentTranslate) / 16
      }rem`;

      this.prevIdx = this.curIdx;
    });
  }

  setPositionByIndex() {
    const [firstYear, firstMonth]: string[] =
      this.element.firstElementChild!.id.split('-');
    const [lastYear, lastMonth]: string[] =
      this.element.lastElementChild!.id.split('-');

    const leftLimit: boolean = minMaxCalc(this.picker, {
      year: +lastYear,
      month: +lastMonth,
      day: 0,
    });

    const rightLimit: boolean = minMaxCalc(this.picker, {
      year: +firstYear,
      month: +firstMonth,
      day: 0,
    });

    if (this.prevIdx < this.curIdx && !this.transitioning && leftLimit) {
      this.transitioning = true;
      this.currentTranslate = -304;
      this.slideLeft();
    } else if (
      this.prevIdx > this.curIdx &&
      !this.transitioning &&
      rightLimit
    ) {
      this.transitioning = true;
      this.currentTranslate = 304;
      this.slideRight();
    } else {
      this.currentTranslate = 0;
    }

    this.setSliderPosition();
  }
}
