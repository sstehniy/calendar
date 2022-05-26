import { getDaysInMonthCount, getMonthName } from "../../util/dates";
import { useCalenderState } from "../state/context";
import { ActionType, CalenderPageType, DateData } from "../state/types";
import "./index.css";

type CalendarPageTypeProps = {
  data: CalenderPageType;
};

enum DateStatus {
  FROM_DATE = "FROM_DATE",
  TO_DATE = "TO_DATE",
  IN_RANGE = "IN_RANGE",
  LAST_IN_ROW = "LAST_IN_ROW",
  FIRST_IN_ROW = "FIRST_IN_ROW",
  FIRST_IN_MONTH = "FIRST_IN_MONTH",
  LAST_IN_MONTH = "LAST_IN_MONTH"
}

export const CalendarPage: React.FC<CalendarPageTypeProps> = ({ data }) => {
  const {
    state: { today, selectedDateRange },
    dispatch
  } = useCalenderState();

  const getOutterStyle = (status: DateStatus[]): string => {
    const {
      FIRST_IN_MONTH,
      FIRST_IN_ROW,
      FROM_DATE,
      IN_RANGE,
      LAST_IN_MONTH,
      LAST_IN_ROW,
      TO_DATE
    } = DateStatus;
    let className = "";
    if (status.includes(FROM_DATE)) {
      className = className.concat(" from-date");
    }
    if (status.includes(TO_DATE)) {
      className = className.concat(" to-date");
    }
    if (status.includes(IN_RANGE)) {
      className = className.concat(" range-date");
    }
    if (
      (status.includes(IN_RANGE) || status.includes(TO_DATE)) &&
      (status.includes(FIRST_IN_MONTH) || status.includes(FIRST_IN_ROW))
    ) {
      className = className.concat(" fade-left");
    }
    if (
      (status.includes(IN_RANGE) || status.includes(FROM_DATE)) &&
      (status.includes(LAST_IN_MONTH) || status.includes(LAST_IN_ROW))
    ) {
      className = className.concat(" fade-right");
    }
    return className;
  };

  const getInnerStyle = (status: DateStatus[]): string => {
    const { FROM_DATE, TO_DATE } = DateStatus;

    if (status.includes(FROM_DATE) || status.includes(TO_DATE)) {
      return "text-slate-200 bg-stone-900 shadow-2xl hover:bg-stone-900";
    } else if (!status.includes(FROM_DATE) && !status.includes(TO_DATE)) {
      return "hover:bg-zinc-600 hover:shadow-xl hover:text-white";
    }
    return "";
  };

  const getDateStatus = (day: DateData): DateStatus[] => {
    const fromDate = selectedDateRange.fromDate;
    const toDate = selectedDateRange.toDate;
    const isFromDate =
      day.day === fromDate?.day &&
      day.month === fromDate.month &&
      day.year === fromDate.year;
    const isToDate =
      day.day === toDate?.day &&
      day.month === toDate.month &&
      day.year === toDate.year;
    const isDateInRange =
      day.milliseconds > (fromDate?.milliseconds || Infinity) &&
      day.milliseconds < (toDate?.milliseconds || -Infinity);
    const isFirstInRow = day.weekday === 0;
    const isLastInRow = day.weekday === 6;
    const isFirstInMonth = day.day === 1;
    const isLastInMonth = day.day === getDaysInMonthCount(day.year, day.month);

    const status: DateStatus[] = [];
    if (isFromDate) {
      status.push(DateStatus.FROM_DATE);
    }
    if (isToDate) {
      status.push(DateStatus.TO_DATE);
    }
    if (isDateInRange) {
      status.push(DateStatus.IN_RANGE);
    }
    if (isFirstInRow) {
      status.push(DateStatus.FIRST_IN_ROW);
    }
    if (isLastInRow) {
      status.push(DateStatus.LAST_IN_ROW);
    }
    if (isFirstInMonth) {
      status.push(DateStatus.FIRST_IN_MONTH);
    }
    if (isLastInMonth) {
      status.push(DateStatus.LAST_IN_MONTH);
    }
    return status;
  };

  if (!today) return null;
  return (
    <div className="w-1/2 flex-1 shrink-0 text-center">
      <h4 className="font-semibold">
        {getMonthName(data.month)} {data.year}
      </h4>
      <div className="w-full flex mt-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, idx) => (
          <div className="flex-1 shrink-0 text-sm" key={idx}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid-wrapper relative">
        <div className="grid grid-cols-7 gap-2 mt-3">
          {data.days.map((day) => {
            const status = getDateStatus(day);
            console.log(day, status);
            console.table({
              inner: getInnerStyle(status),
              outter: getOutterStyle(status)
            });
            return day.month === data.month ? (
              <div
                key={`${day.day}.${day.month}.${day.year}`}
                className={`relative tabular-nums text-sm font-semibold aspect-square rounded-full w-8 h-8 ${getOutterStyle(
                  status
                )}`}
                onClick={() =>
                  dispatch({ type: ActionType.SELECT_DATE, data: day })
                }
              >
                <div
                  className={`relative z-20 h-full w-full rounded-full cursor-pointer  transition-colors duration-75 ease ${getInnerStyle(
                    status
                  )}`}
                >
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
                    {day.day}
                  </span>
                </div>
              </div>
            ) : (
              <div />
            );
          })}
        </div>
      </div>
    </div>
  );
};
