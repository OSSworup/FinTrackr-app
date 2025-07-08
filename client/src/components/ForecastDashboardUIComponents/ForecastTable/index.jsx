function ForecastTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-600 border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Description</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Impact</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((txn, i) => (
            <tr
              key={i}
              className={i % 2 ? "bg-gray-100" : "bg-white"}
            >
              <td className="p-2">{txn.date}</td>
              <td className="p-2">{txn.description}</td>
              <td className="p-2">{txn.type}</td>
              <td className="p-2">${txn.amount}</td>
              <td className="p-2">
                {txn.type === "Credit" ? "+" : "-"}${txn.amount}
              </td>
              <td className="p-2 space-x-1">
                <button className="text-yellow-500">✏️</button>
                <button className="text-red-500">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ForecastTable;
