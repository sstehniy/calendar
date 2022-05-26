import { DateData } from "../DatePicker/state/types";

export const getDaysInMonth = (year: number, month: number): DateData[] => {
  const daysCount = getDaysInMonthCount(year, month);
  const previousMonth = month - 1;
  const nextMonth = month + 1;
  const offsetStart = 7 - (7 - getWeekDay(new Date(year, month, 1).getDay()));
  const offsetEnd = 6 - getWeekDay(new Date(year, month, daysCount).getDay());
  const data: DateData[] = [];
  const previousMonthDays = getLastDaysInMonth(
    year,
    previousMonth,
    offsetStart
  );
  const nextMonthDays = getFirstDaysInMonth(year, nextMonth, offsetEnd);
  for (let i = 1; i <= daysCount; i++) {
    const date = new Date(year, month, i);
    data.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      weekday: getWeekDay(date.getDay()),
      milliseconds: date.getTime()
    });
  }
  return [...previousMonthDays, ...data, ...nextMonthDays];
};

const getLastDaysInMonth = (year: number, month: number, daysCount: number) => {
  const actualDate = new Date(year, month);
  const actualYear = actualDate.getFullYear();
  const actualMonth = actualDate.getMonth();
  const daysInMonth = getDaysInMonthCount(actualYear, actualMonth);
  const lastDays: DateData[] = [];
  for (let i = daysInMonth; i > daysInMonth - daysCount; i--) {
    const date = new Date(actualYear, actualMonth, i);

    lastDays.unshift({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      weekday: getWeekDay(date.getDay()),
      milliseconds: date.getTime()
    });
  }
  return lastDays;
};

const getFirstDaysInMonth = (
  year: number,
  month: number,
  daysCount: number
) => {
  const actualDate = new Date(year, month);
  const actualYear = actualDate.getFullYear();
  const actualMonth = actualDate.getMonth();
  const firstDays: DateData[] = [];
  for (let i = 1; i <= daysCount; i++) {
    const date = new Date(actualYear, actualMonth, i);

    firstDays.push({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      weekday: getWeekDay(date.getDay()),
      milliseconds: date.getTime()
    });
  }
  return firstDays;
};

export const getDaysInMonthCount = (year: number, month: number) => {
  let count = 0;
  while (new Date(year, month, count + 1).getMonth() === month) {
    count += 1;
  }
  return count;
};

const weekDayIndexToActual = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5
};

const getWeekDay = (weekDay: number) => {
  return weekDayIndexToActual[weekDay as keyof typeof weekDayIndexToActual];
};

export const getDateData = (date: Date): DateData => {
  return {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
    weekday: getWeekDay(date.getDay()),
    milliseconds: date.getTime()
  };
};

const monthIndexToName = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};
export const getMonthName = (month: number) => {
  return monthIndexToName[month as keyof typeof monthIndexToName];
};

export const checkDateInRange = (
  fromDate: DateData,
  toDate: DateData,
  dateToCkeck: DateData
) => {
  return (
    dateToCkeck.milliseconds > fromDate.milliseconds &&
    dateToCkeck.milliseconds < toDate.milliseconds
  );
};
