import { toRem } from '../../utility';

export const yearStyles = (mainColor: string, lightened: string): string => {
  return `
    .year-interface {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%; 
    }
    
    .year-view__1st-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      padding: ${toRem(24)} ${toRem(20)} 1rem;
    }

    .year-view__btn {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .year-view__range {
      margin: 0.5rem 0;
      font-weight: 700;
      font-size: ${toRem(16)};
    }

    .year-view__dropdown {
      width: ${toRem(12)};
      height: ${toRem(12)};
    }

    .year-view__dropdown svg {
      width: 100%;
      height: 100%;
    }

     .year-view__nav-btn__cover {
      display: flex;
      gap: 1rem;
    }

    .year-view__nav-btn__cover button {
      color: #000;
      font-weight: 700;
      width: 2rem;
      height: 2rem;
      font-size: 1rem;
    }

    .year-view__slide {
      margin-top: 1.2rem;
      position: relative;
      overflow: hidden;
      width: 100%;
      height: ${toRem(272)};
    }

    .year-view__years {
      position: absolute;
      width: 100%;
      display: grid;
      place-items: center;
      grid-template-rows: repeat(7, 1fr);
      grid-template-columns: repeat(4, 1fr);
      grid-row-gap: 0.5rem;
      -webkit-transition: left 300ms ease-out;
      -moz-trantransition: left 300ms ease-out;
      -o-trantransition: left 300ms ease-out;
      transition: left 300ms ease-out;
    }

    .year-view__year {
      place-items: center;
      width: 3rem;
      height: 2rem;
      font-weight: 500;
      font-size: ${toRem(15)};
    }

    .year-view__year.active {
      border-radius: ${toRem(8)};
      background: ${lightened};
    }

    .year-view__year:focus-visible {
      outline: none;
    }

    .year-view__year.selected {
      border-radius: ${toRem(8)};
      border: 1px solid ${mainColor};
    }
     @media (hover: hover) { 
        .year-view__year:hover {
          border-radius: ${toRem(8)};
          background: ${lightened};
        }
      }
    .year-view__year.limited {
      color: rgba(0, 0, 0, 0.3);
    }
  `;
};
