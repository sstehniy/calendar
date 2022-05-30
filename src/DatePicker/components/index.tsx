import { Calendar } from "./Calendar";
import { Input } from "./Input";

export const DatePicker = () => {
  return (
    <div className="flex flex-col items-center mt-72">
      <Input />
      <Calendar />
    </div>
  );
};
