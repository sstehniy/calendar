import { DatePicker } from "./components";
import { StateContextProvider } from "./state/context";

export const DatePickerApp: React.FC = () => {
  return (
    <StateContextProvider>
      <DatePicker />
    </StateContextProvider>
  );
};
