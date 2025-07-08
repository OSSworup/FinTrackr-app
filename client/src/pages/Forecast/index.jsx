import Header from "../../components/DashboardUIComponents/Header";
import DateSelector from "../../components/ForecastDashboardUIComponents/DateSelector";
import ProjectedBalanceCard from "../../components/ForecastDashboardUIComponents/ProjectedBalanceCard";
import ForecastForm from "../../components/ForecastDashboardUIComponents/ForecastForm";
import ForecastTable from "../../components/ForecastDashboardUIComponents/ForecastTable";
import SidebarForecastStats from "../../components/ForecastDashboardUIComponents/SideBarForcastStats";
import { useState } from "react";

function Forecast() {
  const [selectedDate, setSelectedDate] = useState("");
  const [forecasts, setForecasts] = useState([]);

  // Fake current balance; in a real app fetch from backend / context
  const currentBalance = 2500;

  const projectedBalance = forecasts.reduce((sum, txn) => {
    return txn.type === "Credit"
      ? sum + Number(txn.amount)
      : sum - Number(txn.amount);
  }, currentBalance);

  const handleAddForecast = (txn) => {
    setForecasts([...forecasts, txn]);
  };

  return (
    <div className="pt-20 px-6 space-y-8">
      <Header />

      <DateSelector onApply={setSelectedDate} />
      <ProjectedBalanceCard
        date={selectedDate || "selected date"}
        balance={projectedBalance.toFixed(2)}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/5">
          <ForecastForm onAdd={handleAddForecast} />
        </div>
        <div className="lg:w-3/5">
          <ForecastTable data={forecasts} />
        </div>
        <SidebarForecastStats
          income={forecasts
            .filter((t) => t.type === "Credit")
            .reduce((s, t) => s + Number(t.amount), 0)}
          expenses={forecasts
            .filter((t) => t.type === "Debit")
            .reduce((s, t) => s + Number(t.amount), 0)}
        />
      </div>
    </div>
  );
}

export default Forecast;
