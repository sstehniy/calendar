import { useCalenderState } from "../state/context";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CalendarPage } from "./CalendarPage";
import { ActionType } from "../state/types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { cloneElement, useEffect, useRef, useState } from "react";
import "./index.css";
import { ImSun } from "react-icons/im";
import { BiReset } from "react-icons/bi";

export const Calendar: React.FC = () => {
  const {
    state: { currentMonthData, followingMonthData },
    dispatch
  } = useCalenderState();
  const [slideDirection, setSlideDirection] = useState<
    "forward" | "backwards" | "none"
  >("none");
  const [pageHeight, setPageHeight] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    setPageHeight(pageRef.current.getBoundingClientRect().height);
  }, [pageRef, currentMonthData]);

  if (!currentMonthData || !followingMonthData) return null;
  return (
    <div
      className="rounded-2xl bg-cyan-50 shadow-xl mt-5 p-6 pb-3 relative select-none overflow-hidden"
      style={{
        width: 608,
        minHeight: pageHeight + 72,
        transition: "min-height 0.2s ease-in"
      }}
    >
      <div
        className="absolute z-50 top-3 left-2 w-7 h-7 rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300 grid place-items-center transition-colors ease-in duration-75"
        onClick={() => {
          dispatch({ type: ActionType.GET_PREVIOUS_MONTHS });
          setSlideDirection("backwards");
        }}
      >
        <HiOutlineChevronLeft size={20} />
      </div>
      <div
        className="absolute z-50 top-3 right-2 w-7 h-7 rounded-full cursor-pointer hover:bg-slate-200 active:bg-slate-300 grid place-items-center transition-colors ease-in duration-75"
        onClick={() => {
          dispatch({ type: ActionType.GET_NEXT_MONTHS });
          setSlideDirection("forward");
        }}
      >
        <HiOutlineChevronRight size={20} />
      </div>
      <TransitionGroup
        className="relative"
        childFactory={(child) =>
          cloneElement(child, {
            classNames:
              slideDirection === "forward"
                ? "right-to-left"
                : slideDirection === "backwards"
                ? "left-to-right"
                : "",
            timeout: 800
          })
        }
      >
        <CSSTransition
          timeout={800}
          key={`${currentMonthData.days}_${currentMonthData.month}_${currentMonthData.year}`}
          addEndListener={(node, done) => {
            node.addEventListener(
              "transitionend",
              () => {
                setSlideDirection("none");
                done();
              },
              false
            );
          }}
        >
          <div className="flex flex-nowrap gap-4 overflow-hidden" ref={pageRef}>
            <CalendarPage data={currentMonthData} />
            <CalendarPage data={followingMonthData} />
          </div>
        </CSSTransition>
      </TransitionGroup>
      <footer className="flex absolute bottom-3 left-6 right-6 justify-between">
        <div className="flex gap-3">
          <button
            className={`flex items-center gap-1 px-2 py-1 rounded-md bg-gradient-to-br shadow from-green-400 to-blue-500 text-slate-50 duration-100 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease text-sm`}
            onClick={() => {
              new Date().getTime() < currentMonthData.days[27].milliseconds
                ? setSlideDirection("backwards")
                : setSlideDirection("forward");
              dispatch({ type: ActionType.GET_CURRENT_MONTHS_DATA });
            }}
          >
            <ImSun size={15} />
            Today
          </button>
          <button
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 bg-transparent duration-100 transition-all ease text-sm hover:ring-2 hover:ring-slate-500 active:bg-slate-400 active:text-slate-50`}
            onClick={() => dispatch({ type: ActionType.RESET_SELECTED_RANGE })}
          >
            <BiReset size={15} />
            Reset
          </button>
        </div>
        <div>
          <button
            className={`px-3 py-1 rounded-md shadow-md bg-gradient-to-r bg-blue-500 text-sm text-white hover:ring-blue-500 hover:ring-2 hover:ring-offset-2 duration-100 transition-all ease`}
          >
            Select
          </button>
        </div>
      </footer>
    </div>
  );
};
