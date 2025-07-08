import { useQuery } from "@tanstack/react-query";
import api from "../../components/axios";
import { useContext } from "react";
import { TransactionContext } from "../../../context/TransactionContext";

function BalanceCard({balance,isLoading,data}) {
  const date = new Date().toLocaleDateString();

  if(isLoading) return <div>Loading...</div>
  if (!data || !data.transactions) return <div>No data available</div>;

  return (
    <div className="bg-white border border-green-700 rounded-md p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-900">₹{balance}</h2>
      <p className="text-sm text-gray-500 mt-1">As of {date}</p>
    </div>
  );
}

export default BalanceCard;