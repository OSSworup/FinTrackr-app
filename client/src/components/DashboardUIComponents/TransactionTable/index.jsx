import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../components/axios";
import { useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "react-hook-form";

function TransactionTable() {

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

  async function updateTxn(id,data){
    try{
      const res=await api.put(`/transaction/update/${id}`,data);
      return res.data;
    }catch(error){
      if(error.response){
        console.log('Server Error:',error.response.data.message || error.response.data);
      }else{
        console.log('Network or client error:', error.message)
      }
    }
  }

  async function deleteTxn(id){
    try{
      const res=await api.delete(`/transaction/delete/${id}`);
      return res.data;
    }catch(error){
      if(error.response){
        console.log('Server Error:',error.response.data.message || error.response.data);
      }else{
        console.log('Network or client error:', error.message)
      }
    }
  }

  const {register,formState:{errors},handleSubmit,reset}=useForm({
    defaultValues:{
    date:'',
    label:'',
    type:'',
    amount:0
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  // Open modal with selected transaction data
  const openModal = (txn) => {
    setSelectedTxn(txn);
    reset({
      date:txn.date,
      label:txn.label,
      type:txn.type,
      amount:txn.amount
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTxn(null);
  };

  const {data,isLoading}=useQuery({
    queryKey:['transactions'],
    queryFn:fetchTransaction
  })

  const sortedTransaction=useMemo(()=>{
    if (!data?.transactions) return [];
    return [...data?.transactions].sort((a,b)=> new Date(b.date) - new Date(a.date))
  },[data])

  const queryClient=useQueryClient();

  const {mutateAsync:updateTransaction,isPending:isUpdating}=useMutation({
    mutationFn:({id,data})=>updateTxn(id,data),
    onSuccess:()=>{
      queryClient.invalidateQueries(['transactions']);
    },
    onError:(error)=>{
      console.log('Mutation Error:',error.message);
    }
  });

  const {mutateAsync:deleteTransaction,isPending:isDeleting}=useMutation({
    mutationFn:deleteTxn,
    onSuccess:()=>{
      queryClient.invalidateQueries(['transactions']);
    }
  });

  async function onSubmit(data){
    try{
      const id=selectedTxn._id;
      await updateTransaction({id,data});
      closeModal();
    }catch(error){
      console.log("Failed to add transaction",error.message);
    }
  };

  if(isLoading) return <div>Loading Transactions</div>

  return (
    <div className="bg-white p-2 sm:p-4 rounded-lg shadow-md">
      {/* Table for larger screens (sm and up) */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-1 sm:p-2">Date</th>
              <th className="p-1 sm:p-2">Description</th>
              <th className="p-1 sm:p-2">Type</th>
              <th className="p-1 sm:p-2">Amount</th>
              <th className="p-1 sm:p-2">Balance Impact</th>
              <th className="p-1 sm:p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransaction.map((txn, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50 text-gray-900"}
              >
                <td className="p-1 sm:p-2">
                  {txn.date
                    ? new Date(txn.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Invalid Date"}
                </td>
                <td className="p-1 sm:p-2 truncate max-w-[100px] sm:max-w-[150px]">
                  {txn.label}
                </td>
                <td className="p-1 sm:p-2">{txn.type}</td>
                <td className="p-1 sm:p-2"> ₹{txn.amount}</td>
                <td className="p-1 sm:p-2">
                  {txn.type === "credit" ? "+" : "-"} ₹{txn.amount}
                </td>
                <td className="p-1 sm:p-2 flex space-x-1">
                  <button
                    aria-label="Edit transaction"
                    onClick={() => openModal(txn)}
                    disabled={isUpdating || isDeleting}
                    className="text-yellow-500 hover:text-yellow-600 text-sm disabled:opacity-50">
                    ✏️
                  </button>
                  <button
                    onClick={()=> deleteTransaction(txn._id)}
                    disabled={isUpdating || isDeleting}
                    aria-label="Delete transaction"
                    className="text-red-500 hover:text-red-600 text-sm disabled:opacity-50">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile (below sm) */}
      <div className="block sm:hidden space-y-4">
        {sortedTransaction.map((txn, i) => (
          <div key={i} className="border rounded-lg p-3 bg-gray-50">
            <div className="flex justify-between">
              <span className="font-semibold text-sm">
                {txn.date
                  ? new Date(txn.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Invalid Date"}
              </span>
              <span className="text-sm"> ₹{txn.amount}</span>
            </div>
            <div className="text-sm truncate">{txn.label}</div>
            <div className="text-sm text-gray-600">{txn.type}</div>
            <div className="text-sm">
              Impact: {txn.type === "credit" ? "+" : "-"} ₹{txn.amount}
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                aria-label="Edit transaction"
                onClick={() => openModal(txn)}
                disabled={isUpdating || isDeleting}
                className="text-yellow-500 hover:text-yellow-600 text-sm disabled:opacity-50">
                ✏️
              </button>
              <button
                onClick={()=> deleteTransaction(txn._id)}
                disabled={isUpdating || isDeleting}
                aria-label="Delete transaction"
                className="text-red-500 hover:text-red-600 text-sm disabled:opacity-50">
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Headless UI Modal with Transitions */}
      <Transition show={isModalOpen}>
        <Dialog className="relative z-50" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" aria-hidden="true" />
          </TransitionChild>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="w-full max-w-md bg-white rounded-lg p-4 sm:p-6">
                <DialogTitle className="text-lg font-semibold mb-4">
                  Edit Transaction
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      {...register("date", { required: true })}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Description</label>
                    <input
                      {...register("label")}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Type</label>
                    <select
                      {...register("type")}
                      className="w-full p-2 border rounded text-sm"
                    >
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Amount</label>
                    <input
                      type="number"
                      {...register("amount", { required: true, min: 0 })}
                      className="w-full p-2 border rounded text-sm"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                    >
                      {isUpdating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default TransactionTable;
