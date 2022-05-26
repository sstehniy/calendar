import { useCalenderState } from "../state/context";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CalendarPage } from "./CalendarPage";
import { ActionType } from "../state/types";

export const Calendar: React.FC = () => {
  const {
    state: { currentMonthData, followingMonthData },
    dispatch
  } = useCalenderState();

  if (!currentMonthData || !followingMonthData) return null;
  return (
    <div className="rounded-2xl bg-cyan-50 shadow mt-5 p-6 pb-3 relative select-none">
      <div
        className="absolute left-2 w-6 h-6 rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300 grid place-items-center transition-colors ease-in duration-75"
        onClick={() => dispatch({ type: ActionType.GET_PREVIOUS_MONTHS })}
      >
        <HiOutlineChevronLeft size={18} />
      </div>
      <div
        className="absolute right-2 w-6 h-6 rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300 grid place-items-center transition-colors ease-in duration-75"
        onClick={() => dispatch({ type: ActionType.GET_NEXT_MONTHS })}
      >
        <HiOutlineChevronRight size={18} />
      </div>
      <div className="flex flex-nowrap gap-6">
        <CalendarPage data={currentMonthData} />
        <CalendarPage data={followingMonthData} />
      </div>
    </div>
  );
};
