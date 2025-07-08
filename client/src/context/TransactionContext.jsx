import { createContext } from "react";
import api from "../components/components/axios";
import { useQuery } from "@tanstack/react-query";

export const TransactionContext=createContext();

export function TransactionProvider({children}){
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

  const {data}=useQuery({
    queryKey:['transactions'],
    queryFn:fetchTransaction
  });

   const total=data.transactions.reduce((acc,txn)=>{
     return txn.type === 'credit' ? acc+txn.amount : acc-txn.amount;
   },0);

   return <TransactionContext.Provider value={total}>
        {children}
   </TransactionContext.Provider>

}