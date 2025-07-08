import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Repeat, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import api from "../../components/axios";
import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";

function getNextRun({ startDate, recurrence, endDate }) {
  const today = new Date();
  let next = new Date(startDate);

  if (next > today) return next;

  const step = {
    Daily: 1,
    Weekly: 7,
    Monthly: 30, // approximation
  }[recurrence];

  if (!step) return null;

  while (next <= today) {
    next = new Date(next.getTime() + step * 24 * 60 * 60 * 1000);
  }

  if (endDate && next > new Date(endDate)) return null;

  return next;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function RecurringTable() {
  async function fetchTransaction() {
    try {
      const res = await api.get('/RecurringTransaction/get');
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
      const res = await api.put(`/RecurringTransaction/update/${id}`, data);
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
      const res = await api.delete(`/RecurringTransaction/delete/${id}`);
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
      startDate: '',
      label: '',
      type: '',
      amount: 0,
      recurrence: ''
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  const openModal = (txn) => {
    setSelectedTxn(txn);
    reset({
      startDate: txn.startDate,
      label: txn.label,
      type: txn.type,
      amount: txn.amount,
      recurrence: txn.recurrence
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTxn(null);
    reset();
  };

  const { data, isLoading } = useQuery({
    queryKey: ['recurringTransaction'],
    queryFn: fetchTransaction
  });

  const sortedTransactions = useMemo(() => {
    if (!data?.recurringTransactions) return [];
    return [...data.recurringTransactions].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  }, [data]);

  const queryClient = useQueryClient();

  const { mutateAsync: updateTransaction, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => updateTxn(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['recurringTransaction']);
    },
    onError: (error) => {
      console.log('Mutation Error:', error.message);
    }
  });

  const { mutateAsync: deleteTransaction, isPending: isDeleting } = useMutation({
    mutationFn: deleteTxn,
    onSuccess: () => {
      queryClient.invalidateQueries(['recurringTransaction']);
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

  if (isLoading) return <div className="animate-pulse bg-gray-200 h-32 rounded-lg flex items-center justify-center">Loading...</div>;

  return (
    <>
      <div className="mt-6 rounded-lg shadow bg-white">
        <div className="flex items-center gap-2 px-6 py-4 border-b">
          <Repeat className="text-green-600" />
          <h2 className="font-semibold">Recurring Transactions</h2>
        </div>

        {/* Table for larger screens (sm and up) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-3 text-left w-28">Next Run</th>
                <th className="px-6 py-3 text-left w-40">Description</th>
                <th className="px-6 py-3 text-center w-24">Amount</th>
                <th className="px-6 py-3 text-center w-20">Freq</th>
                <th className="px-6 py-3 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map(r => {
                const nextRun = getNextRun(r);
                if (!nextRun) return null;

                return (
                  <tr key={r._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{formatDate(nextRun)}</td>
                    <td className="px-6 py-3">{r.label}</td>
                    <td className={`px-6 py-3 text-center ${r.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                      {r.type === 'debit' ? '–' : '+'} ₹{r.amount}
                    </td>
                    <td className="px-6 py-3 text-center">{r.recurrence}</td>
                    <td className="px-6 py-3 flex justify-center gap-4">
                      <button onClick={() => openModal(r)} className="text-gray-600 hover:text-gray-800">
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => deleteTransaction(r._id)}
                        className="text-red-600 hover:text-red-800"
                        disabled={isDeleting}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Card layout for mobile (below sm) */}
        <div className="block sm:hidden space-y-4 p-4">
          {sortedTransactions.map(r => {
            const nextRun = getNextRun(r);
            if (!nextRun) return null;

            return (
              <div key={r._id} className="border rounded-lg p-3 bg-gray-50">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Repeat className="text-green-600" size={16} />
                    <span className="font-semibold text-sm text-green-600">Recurring</span>
                  </div>
                  <span className={`text-sm font-medium ${r.type === 'debit' ? 'text-red-600' : 'text-green-600'}`}>
                    {r.type === 'debit' ? '–' : '+'} ₹{r.amount}
                  </span>
                </div>
                <div className="text-sm mt-1 truncate">{r.label}</div>
                <div className="text-sm text-gray-600 mt-1">Next Run: {formatDate(nextRun)}</div>
                <div className="text-sm text-gray-600">Freq: {r.recurrence}</div>
                <div className="flex space-x-2 mt-2">
                  <button
                    aria-label="Edit recurring transaction"
                    onClick={() => openModal(r)}
                    disabled={isUpdating || isDeleting}
                    className="text-gray-600 hover:text-gray-800 text-sm disabled:opacity-50"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    aria-label="Delete recurring transaction"
                    onClick={() => deleteTransaction(r._id)}
                    disabled={isUpdating || isDeleting}
                    className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
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
                <DialogTitle className="text-lg font-semibold text-gray-900">Edit Recurring Transaction</DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Date</label>
                    <input
                      type="date"
                      {...register("startDate", { required: "Start date is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                    {errors.startDate && <p className="text-red-600 text-sm mt-1">{errors.startDate.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      type="text"
                      {...register("label", { required: "Description is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                    {errors.label && <p className="text-red-600 text-sm mt-1">{errors.label.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      {...register("type", { required: "Type is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
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
                      {...register("amount", { required: "Amount is required", coached: { value: 0.01, message: "Amount must be greater than 0" } })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                    {errors.amount && <p className="text-red-600 text-sm mt-1">{errors.amount.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recurrence</label>
                    <select
                      {...register("recurrence", { required: "Recurrence is required" })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    >
                      <option value="">Select recurrence</option>
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                    </select>
                    {errors.recurrence && <p className="text-red-600 text-sm mt-1">{errors.recurrence.message}</p>}
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
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-400"
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

export default RecurringTable;

