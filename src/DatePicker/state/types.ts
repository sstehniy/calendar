export type DateData = {
  day: number;
  month: number;
  year: number;
  milliseconds: number;
  weekday: number;
};

type DateRange = {
  fromDate: DateData | null;
  toDate: DateData | null;
};

type CalenderPageType = {
  month: number;
  days: DateData[];
  year: number;
};

type AppState = {
  selectedDateRange: DateRange;
  currentMonthData: CalenderPageType | null;
  followingMonthData: CalenderPageType | null;
  today: DateData | null;
};

export enum ActionType {
  SELECT_DATE = "SELECT_DATE",
  GET_NEXT_MONTHS = "NEXT_PAGE",
  GET_PREVIOUS_MONTHS = "PREVIOUS_PAGE",
  RESET_SELECTED_RANGE = "RESET_SELECTED_RANGE",
  GET_CURRENT_MONTHS_DATA = "SET_CURRENT_MONTHS_DATA"
}

type StateAction =
  | {
      type: ActionType.SELECT_DATE;
      data: DateData;
    }
  | {
      type:
        | ActionType.GET_NEXT_MONTHS
        | ActionType.GET_CURRENT_MONTHS_DATA
        | ActionType.RESET_SELECTED_RANGE
        | ActionType.GET_PREVIOUS_MONTHS;
    };

export type { CalenderPageType, DateRange, AppState, StateAction };
