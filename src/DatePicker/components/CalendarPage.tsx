import { getMonthName } from "../../util/dates";
import { useCalenderState } from "../state/context";
import { CalenderPageType } from "../state/types";

type CalendarPageTypeProps = {
  data: CalenderPageType;
};

export const CalendarPage: React.FC<CalendarPageTypeProps> = ({ data }) => {
  const {
    state: { today, selectedDateRange }
  } = useCalenderState();

  if (!today) return null;
  return (
    <div className="w-1/2 flex-1 shrink-0 text-center">
      <h4 className="text-sm">
        {getMonthName(data.month)} {data.year}
      </h4>
      <div className="w-full flex mt-2">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, idx) => (
          <div className="flex-1 shrink-0 text-sm" key={idx}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 mt-3 place-content-center justify-items-center content-center justify-center">
        {data.days.map((day) => {
          const isDisabled = day.milliseconds < today.milliseconds;
          const isFromDate = selectedDateRange.fromDate
            ? day.day === selectedDateRange.fromDate.day &&
              day.month === selectedDateRange.fromDate.month &&
              day.year === selectedDateRange.fromDate.year
            : false;
          const isToDate = selectedDateRange.toDate
            ? day.day === selectedDateRange.toDate.day &&
              day.month === selectedDateRange.toDate.month &&
              day.year === selectedDateRange.toDate.year
            : false;

          return day.month === data.month ? (
            <div
              key={`${day.day}.${day.month}.${day.year}`}
              className={`tabular-nums text-sm font-semibold aspect-square rounded-full w-8 h-8 pt-1.5 ${
                isDisabled ? "opacity-40 pointer-events-none" : is
              }`}
            >
              <span className="h-full w-full rounded-full">{day.day}</span>
            </div>
          ) : (
            <div />
          );
        })}
      </div>
    </div>
  );
};
