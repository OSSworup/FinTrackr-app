function ProjectedBalanceCard({ date, balance }) {
  return (
    <div className="bg-white border border-green-700 rounded-md p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-900">
        Projected Balance on {date || "—"}: ${balance}
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Based on current and forecasted transactions
      </p>
    </div>
  );
}

export default ProjectedBalanceCard;
