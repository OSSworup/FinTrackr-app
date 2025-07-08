import { useState } from "react";

function ForecastForm({ onAdd }) {
  const [form, setForm] = useState({
    type: "Credit",
    amount: "",
    description: "",
    date: "",
    isRecurring: false,
    frequency: "",
    endDate: "",
  });

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(form);
      }}
      className="bg-[#E8F5E9] rounded-md p-6 space-y-4 shadow"
    >
      {/* Same field set as Transactions Form */}
      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full border border-blue-700 p-2 rounded"
      >
        <option>Credit</option>
        <option>Debit</option>
      </select>

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full border border-blue-700 p-2 rounded"
        required
      />

      <input
        name="description"
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-blue-700 p-2 rounded"
        required
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full border border-blue-700 p-2 rounded"
        required
      />

      <label className="block">
        <input
          type="checkbox"
          name="isRecurring"
          checked={form.isRecurring}
          onChange={handleChange}
        />
        <span className="ml-2 text-gray-700">Is this recurring?</span>
      </label>

      {form.isRecurring && (
        <div className="space-y-2">
          <select
            name="frequency"
            value={form.frequency}
            onChange={handleChange}
            className="w-full border border-blue-700 p-2 rounded"
          >
            <option value="">Select Frequency</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <input
            name="endDate"
            type="date"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border border-blue-700 p-2 rounded"
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        Add to Forecast
      </button>

      <p className="text-xs text-gray-500">These transactions are not saved.</p>
    </form>
  );
}

export default ForecastForm;
