import { getWeekDay } from './days.model';

describe('getWeekDay()', () => {
  it('should return week day', () => {
    const year: number = 2022;
    const month: number = 9;
    const day: number = 11;

    const result: string = getWeekDay(year, month - 1, day);

    expect(result).toBe('Sun');
  });

  it('should return same week day for year < hundred and year > 2000', () => {
    const result1: string = getWeekDay(1, 1, 1);
    const result2: string = getWeekDay(2001, 1, 1);

    const result3: string = getWeekDay(99, 1, 1);
    const result4: string = getWeekDay(2099, 1, 1);

    expect(result1).toEqual(result2);
    expect(result3).toEqual(result4);
  });
});
