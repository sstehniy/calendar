import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { reducer } from "./reducer";
import { ActionType, AppState, StateAction } from "./types";

type StateContextType = {
  state: AppState;
  dispatch: React.Dispatch<StateAction>;
};

const StateContext = createContext(null as unknown as StateContextType);

const initialState: AppState = {
  currentMonthData: null,
  followingMonthData: null,
  selectedDateRange: {
    fromDate: null,
    toDate: null
  },
  today: null
};

export const useCalenderState = () => useContext(StateContext);

export const StateContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children
}) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: ActionType.GET_CURRENT_MONTHS_DATA });
    if (state.today) {
      dispatch({ type: ActionType.SELECT_DATE, data: state.today });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
