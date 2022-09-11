export interface RGBColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface Selected {
  year: number;
  month: number;
  day: number;
}

export interface YearRange {
  from: number;
  to: number;
}

export interface Month {
  num: number;
  long: string;
  short: string;
}

export interface Day {
  current: number;
  weekday: string;
}

export interface SlideMonth {
  num: number;
  UTCNum: number;
  UTCPrevNum: number;
}

export interface SlideDay {
  first: number;
  cur: number;
}
