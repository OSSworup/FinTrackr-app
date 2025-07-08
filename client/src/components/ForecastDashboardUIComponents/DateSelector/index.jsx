import { useState } from "react";

function DateSelector({ onApply }) {
  const [date, setDate] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply(date);
      }}
      className="bg-[#E8F5E9] p-4 rounded-md shadow flex flex-col sm:flex-row items-center gap-4"
    >
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        aria-label="Select forecast date"
        className="border border-blue-700 p-2 rounded w-full sm:w-auto"
        required
      />
      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        Apply
      </button>
    </form>
  );
}

export default DateSelector;
