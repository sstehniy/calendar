import { BiSearchAlt } from "react-icons/bi";

export const Input: React.FC = () => {
  return (
    <button
      type="button"
      className="rounded-full bg-cyan-50 w-56 h-12 shadow flex items-center gap-4"
    >
      <div className="grid place-items-center h-12 w-12">
        <BiSearchAlt size={25} fill="#343434" />
      </div>
      <p className="text-slate-700">Select Dates!</p>
    </button>
  );
};
