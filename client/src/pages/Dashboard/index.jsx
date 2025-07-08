import Header from "../../components/DashboardUIComponents/Header";
import BalanceCard from "../../components/DashboardUIComponents/BalanceCard";
import TransactionForm from "../../components/DashboardUIComponents/TransactionForm";
import TransactionTable from "../../components/DashboardUIComponents/TransactionTable";
import SidebarStats from "../../components/DashboardUIComponents/SidebarStats";
import { useState } from "react";
import api from "../../components/components/axios";
import { useQuery } from "@tanstack/react-query";
import RecurringTable from "../../components/DashboardUIComponents/RecurringTable";

function Dashboard() {
  
  async function fetchTransaction(){
    try{
      const res=await api.get('/transaction/get');
      return res.data;
    }catch(error){
      if(error.response){
        console.log('Server Error:',error.response.data.message || error.response.data);
      }else{
        console.log('Network or client error:', error.message)
      }
    }
  }

  const {data,isLoading}=useQuery({
    queryKey:['transactions'],
    queryFn:fetchTransaction
  });

  const totalBalance=data?.transactions?.reduce((acc,txn)=>{
     return txn.type === 'credit' ? acc+txn.amount : acc-txn.amount;
   },0) ??0;

   console.log(totalBalance)
  
  return (
    <div className="pt-20 px-6 space-y-8">
      <Header />

      <BalanceCard balance={totalBalance.toFixed(2)} isLoading={isLoading} data={data} />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/5">
          <TransactionForm balance={totalBalance.toFixed(2)}/>
        </div>
        <div className="lg:w-3/5">
          <TransactionTable/>
          <RecurringTable/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
