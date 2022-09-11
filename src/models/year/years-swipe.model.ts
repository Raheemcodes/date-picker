import { DatePicker } from '../../script';
import { generateNewYear } from '../../views/year/years.view';
import {
  goBack,
  updateRange,
  updateYearOnClick,
  updateYearOnKeyDown,
} from './years.models';

export class YearSwipe {
  picker!: DatePicker;
  shadowRoot!: ShadowRoot;
  isDragging: boolean = false;
  threshold!: number;
  element!: HTMLElement;
  width!: number;
  startPosX: number = 0;
  startPosY: number = 0;
  curIdx: number = 0;
  prevTranslate: number[] = [-352, 0, 352];
  currentTranslate: number = 0;
  prevIdx: number = 0;
  transitioning: boolean = false;

  constructor(picker: DatePicker) {
    this.picker = picker;
    this.shadowRoot = picker.shadowRoot!;
    const element = this.shadowRoot.querySelector('.year-view__slide');

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
    const dropdown = this.shadowRoot.querySelector('.year-view__btn');
    const left = this.shadowRoot.querySelector('.year-view__up-btn');
    const right = this.shadowRoot.querySelector('.year-view__down-btn');

    dropdown?.addEventListener('click', goBack.bind(this, this));
    left?.addEventListener('click', this.left.bind(this));
    right?.addEventListener('click', this.right.bind(this));

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
    window.addEventListener('keydown', this.onKeydown);
  }

  onKeydown = (e: KeyboardEvent) => {
    const postion: DOMRect = this.element.getBoundingClientRect();
    if (postion.top >= 0 && postion.bottom <= innerHeight) {
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)
      ) {
        e.preventDefault();
      }
      updateYearOnKeyDown(e, this);
    }
  };

  addListenersToBtn(element: Element) {
    element.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', (e: Event) => {
        updateYearOnClick(e, this);
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
    const childEl: HTMLElement = this.element.children[1] as HTMLElement;
    const id = childEl.id.split('-');
    const nextElement = childEl.nextElementSibling as HTMLElement;
    const newEl = generateNewYear(+id[0], 'left', this.picker);

    setTimeout(() => {
      this.element.removeChild(this.element.firstElementChild as Node);
      this.element.insertAdjacentHTML('beforeend', newEl);
      this.addListenersToBtn(this.element.children[2]);
      updateRange(nextElement, this);
    }, 300);
  }

  slideRight() {
    const childEl: HTMLElement = this.element.children[1] as HTMLElement;
    const id = childEl.id.split('-');
    const nextElement = childEl.previousElementSibling as HTMLElement;
    const newEl = generateNewYear(+id[0], 'right', this.picker);

    setTimeout(() => {
      this.element.removeChild(this.element.lastElementChild as Node);
      this.element.insertAdjacentHTML('afterbegin', newEl);
      this.addListenersToBtn(this.element.children[0]);
      updateRange(nextElement, this);
    }, 300);
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
    const [minyYear]: string[] = this.picker.min.split('-');
    const [maxyYear]: string[] = this.picker.max.split('-');
    const min: number = +minyYear;
    const max: number = +maxyYear;
    const firstArr = this.element.firstElementChild!.id.split('-');
    const lastArr = this.element.lastElementChild!.id.split('-');
    const lastChildId: number = +lastArr[lastArr.length - 1] - 27;
    const firstChildId: number = +firstArr[firstArr.length - 1];

    if (
      this.prevIdx < this.curIdx &&
      !this.transitioning &&
      lastChildId <= max
    ) {
      this.transitioning = true;
      this.currentTranslate = -352;
      this.slideLeft();
    } else if (
      this.prevIdx > this.curIdx &&
      !this.transitioning &&
      firstChildId >= min
    ) {
      this.transitioning = true;
      this.currentTranslate = 352;
      this.slideRight();
    } else {
      this.currentTranslate = 0;
    }

    this.setSliderPosition();
  }
}
