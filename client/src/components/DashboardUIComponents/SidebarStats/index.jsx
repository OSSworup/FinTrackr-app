function SidebarStats({ income, expenses }) {
  return (
    <aside className="hidden lg:block w-1/5 bg-gray-100 p-4 rounded shadow text-sm text-gray-700">
      <h3 className="font-semibold mb-2">Quick Stats</h3>
      <p>Monthly Income: ${income}</p>
      <p>Monthly Expenses: ${expenses}</p>
    </aside>
  );
}

export default SidebarStats;