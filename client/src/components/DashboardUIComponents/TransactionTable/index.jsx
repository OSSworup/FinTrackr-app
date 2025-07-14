import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../components/axios";
import { useMemo, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { Repeat, Pencil, Trash2 } from "lucide-react";

function TransactionTable() {
  async function fetchTransaction() {
    try {
      const res = await api.get('/transaction/get');
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data.message || error.response.data);
      } else {
        console.log('Network or client error:', error.message);
      }
    }
  }

  async function updateTxn(id, data) {
    try {
      const res = await api.put(`/transaction/update/${id}`, data);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data.message || error.response.data);
      } else {
        console.log('Network or client error:', error.message);
      }
    }
  }

  async function deleteTxn(id) {
    try {
      const res = await api.delete(`/transaction/delete/${id}`);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data.message || error.response.data);
      } else {
        console.log('Network or client error:', error.message);
      }
    }
  }

  const { register, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues: {
      date: '',
      label: '',
      type: '',
      amount: 0
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const openModal = (txn) => {
    setSelectedTxn(txn);
    reset({
      date: txn.date,
      label: txn.label,
      type: txn.type,
      amount: txn.amount
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTxn(null);
    reset();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransaction
  });

  const sortedTransaction = useMemo(() => {
    if (!data?.transactions) return [];
    return [...data?.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [data]);

  const queryClient = useQueryClient();

  const { mutateAsync: updateTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateTxn(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    },
    onError: (error) => {
      console.log('Mutation Error:', error.message);
    }
  });

  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: deleteTxn,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    }
  });

  async function onSubmit(data) {
    try {
      if (!selectedTxn?._id) throw new Error('No transaction selected');
      await updateTransaction({ id: selectedTxn._id, data });
      closeModal();
    } catch (error) {
      console.log("Failed to update transaction", error.message);
    }
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  if (isLoading) return <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">Loading...</div>;

  return (
    <>
      <div className="mt-6 rounded-lg shadow bg-white">
        {/* Table for larger screens (sm and up) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3 text-left w-28">Date</th>
                <th className="px-6 py-3 text-left w-40">Description</th>
                <th className="px-6 py-3 text-center w-24">Amount</th>
                <th className="px-6 py-3 text-center w-20">Type</th>
                <th className="px-6 py-3 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransaction.map((txn) => (
                <tr key={txn._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-3">{formatDate(txn.date)}</td>
                  <td className="px-6 py-3 truncate max-w-[150px]">{txn.label}</td>
                  <td className={`px-6 py-3 text-center ${txn.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                    {txn.type === 'debit' ? '–' : '+'} ₹{txn.amount}
                  </td>
                  <td className="px-6 py-3 text-center">{txn.type}</td>
                  <td className="px-6 py-3 flex justify-center gap-4">
                    <button
                      onClick={() => openModal(txn)}
                      className="text-gray-600 hover:text-gray-800"
                      aria-label="Edit transaction"
                      disabled={isUpdating || isDeleting}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(txn._id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete transaction"
                      disabled={isUpdating || isDeleting}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for mobile (below sm) */}
        <div className="block sm:hidden space-y-4 p-4">
          {sortedTransaction.map((txn) => (
            <div key={txn._id} className="border rounded-lg p-3 bg-gray-50">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* <Repeat className="text-blue-600" size={16} /> */}
                  <span className="font-semibold text-sm text-blue-600">Transaction</span>
                </div>
                <span className={`text-sm font-medium ${txn.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                  {txn.type === 'debit' ? '–' : '+'} ₹{txn.amount}
                </span>
              </div>
              <div className="text-sm mt-1 truncate">{txn.label}</div>
              <div className="text-sm text-gray-600 mt-1">Date: {formatDate(txn.date)}</div>
              <div className="text-sm text-gray-600">Type: {txn.type}</div>
              <div className="flex space-x-2 mt-2">
                <button
                  aria-label="Edit transaction"
                  onClick={() => openModal(txn)}
                  disabled={isUpdating || isDeleting}
                  className="text-gray-600 hover:text-gray-800 text-sm disabled:opacity-50"
                >
                  <Pencil size={16} />
                </button>
                <button
                  aria-label="Delete transaction"
                  onClick={() => deleteTransaction(txn._id)}
                  disabled={isUpdating || isDeleting}
                  className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Transition show={isModalOpen}>
        <Dialog className="relative z-10" onClose={closeModal}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
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
              <DialogPanel className="bg-white rounded-lg p-6 w-full max-w-md">
                <DialogTitle className="text-lg font-semibold text-gray-900">Edit Transaction</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      {...register("date", { required: "Date is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                    {errors.date && <p className="text-red-600 text-sm mt-1">{errors.date.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      {...register("label", { required: "Description is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                    {errors.label && <p className="text-red-600 text-sm mt-1">{errors.label.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      {...register("type", { required: "Type is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    >
                      <option value="">Select type</option>
                      <option value="credit">Credit</option>
                      <option value="debit">Debit</option>
                    </select>
                    {errors.type && <p className="text-red-600 text-sm mt-1">{errors.type.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("amount", { required: "Amount is required", min: { value: 0.01, message: "Amount must be greater than 0" } })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600"
                    />
                    {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>}
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isUpdating}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
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
    </>
  );
}

export default TransactionTable;
