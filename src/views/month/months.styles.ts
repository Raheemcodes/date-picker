import { toRem } from '../../utility';

export const monthStyles = (mainColor: string): string => {
  return `
    .month-interface {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%; 
      padding: ${toRem(24)} ${toRem(25)} 0;
    }

    .month-view__1st-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .month-view__year {
      color: ${mainColor};
      font-weight: 700;
      font-size: ${toRem(16)};
    }

    .month-view__nav-btn__cover {
      display: flex;
      jusify-content: space-between;
    }

    .month-view__nav-btn__cover button {
      transform: rotateZ(90deg);
      color: #000;
      font-weight: 900;
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }

    .month-view__2nd-row {
      margin-top: ${toRem(16)};
      display: grid;
      grid-template-rows: repeat(4, 1fr);
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem 0.5rem;
    }

    .month {
      width: 100%;
      height: 3rem;
      font-weight: 500;
      font-size: ${toRem(14)};
      background: rgba(196, 196, 196, 0.5);
      border-radius: 5px;
    }

    .month.active {
      background: ${mainColor};
      color: #fff;
    }

    .month.limited {
      color: rgba(0, 0, 0, 0.3);
    }

    .month-view__btn {
      margin-top: 1rem;
      width: 45%;
      height: 3rem;
      font-weight: 500;
      font-size: ${toRem(14)};
      background: ${mainColor};
      color: #fff;
      align-self: flex-end;
      border-radius: 5px;
    }
  `;
};
