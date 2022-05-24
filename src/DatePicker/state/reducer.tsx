import { getDateData, getDaysInMonth } from "../../util/dates";
import { ActionType, AppState, CalenderPageType, StateAction } from "./types";

export const reducer = (state: AppState, action: StateAction): AppState => {
  switch (action.type) {
    case ActionType.GET_CURRENT_MONTHS_DATA: {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const currMonthData: CalenderPageType = {
        days: getDaysInMonth(year, month),
        month,
        year
      };
      const nextMonthDate = new Date(year, month + 1);
      const nextMonthData: CalenderPageType = {
        days: getDaysInMonth(
          nextMonthDate.getFullYear(),
          nextMonthDate.getMonth()
        ),
        month: nextMonthDate.getMonth(),
        year: nextMonthDate.getFullYear()
      };
      state.currentMonthData = currMonthData;
      state.followingMonthData = nextMonthData;
      state.today = getDateData(date);
      return state;
    }
    case ActionType.GET_NEXT_MONTHS: {
      if (!state.followingMonthData) return state;
      const nextMonthDate = new Date(
        state.followingMonthData.year,
        state.followingMonthData.month + 1
      );
      const nextCurrentMonthData = state.followingMonthData;

      const nextFollowingMonthData: CalenderPageType = {
        days: getDaysInMonth(
          nextMonthDate.getFullYear(),
          nextMonthDate.getMonth()
        ),
        month: nextMonthDate.getMonth(),
        year: nextMonthDate.getFullYear()
      };
      state.currentMonthData = nextCurrentMonthData;
      state.followingMonthData = nextFollowingMonthData;

      return state;
    }
    case ActionType.GET_PREVIOUS_MONTHS: {
      if (!state.currentMonthData) return state;
      const previousMonthDate = new Date(
        state.currentMonthData.year,
        state.currentMonthData.month - 1
      );
      const nextFollowingMonthData = state.currentMonthData;

      const nextCurrentMonthData: CalenderPageType = {
        days: getDaysInMonth(
          previousMonthDate.getFullYear(),
          previousMonthDate.getMonth()
        ),
        month: previousMonthDate.getMonth(),
        year: previousMonthDate.getFullYear()
      };
      state.currentMonthData = nextCurrentMonthData;
      state.followingMonthData = nextFollowingMonthData;

      return state;
    }
    case ActionType.SELECT_DATE: {
      if (
        !state.selectedDateRange.fromDate &&
        !state.selectedDateRange.toDate
      ) {
        state.selectedDateRange = {
          fromDate: action.data,
          toDate: null
        };
      }
      if (state.selectedDateRange.fromDate) {
        const isDateAfter =
          action.data.milliseconds >
          state.selectedDateRange.fromDate.milliseconds;
        if (isDateAfter) {
          state.selectedDateRange.toDate = action.data;
        } else {
          state.selectedDateRange.fromDate = action.data;
          state.selectedDateRange.toDate = null;
        }
      }

      return state;
    }
    case ActionType.RESET_SELECTED_RANGE: {
      state.selectedDateRange = {
        fromDate: null,
        toDate: null
      };
      return state;
    }
    default:
      return state;
  }
};
