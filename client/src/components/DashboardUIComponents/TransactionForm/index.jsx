import { useForm } from "react-hook-form";
import api from "../../components/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function TransactionForm({ balance }) {
  const { register, formState: { errors }, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      type: 'credit',
      amount: '',
      label: '',
      date: '',
      isRecurring: false,
      recurrence: '',
      endDate: ''
    }
  });

  const today = new Date().toISOString().split('T')[0];

  const isRecurring = watch('isRecurring');

  async function addTransaction(data) {
    try {
      let link = '';
      isRecurring ? link = '/recurringTransaction/add' : link = '/transaction/add';
      const res = await api.post(link, data);
      return res.data;
    } catch (error) {
      if (error.response) {
        console.log('Server Error:', error.response.data.message || error.response.data);
      } else {
        console.log('Network or client error:', error.message);
      }
    }
  }

  const queryClient = useQueryClient();

  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: addTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries(['transactions']);
    }
  });

  async function onSubmit(data) {
    try {
      const amount = parseFloat(data.amount);
      const formattedData = { ...data };
      formattedData.type = data.type.toLowerCase();

      const isDebit = formattedData.type === 'debit';

      if (!data.isRecurring && isDebit && amount > balance) {
        alert(`And who, may I ask, will nobly handle the remaining ₹${amount - balance} ?`);
        return;
      }

      if (data.isRecurring) {
        formattedData.startDate = data.date;
        delete formattedData.date;
      } else {
        delete formattedData.recurrence;
        delete formattedData.isRecurring;
        delete formattedData.endDate;
      }

      await mutateAsync(formattedData);
      reset();
    } catch (error) {
      console.log("Failed to add transaction", error.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#E8F5E9] rounded-md p-6 space-y-4 shadow"
    >
      <div>
        <label className="block text-sm text-gray-700 mb-1">Transaction Type</label>
        <select
          {...register('type')}
          className="w-full border border-blue-700 p-2 rounded"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Amount</label>
        <input
          {...register('amount')}
          type="number"
          placeholder="Amount"
          className="w-full border border-blue-700 p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">Description</label>
        <input
          {...register('label')}
          placeholder="Description"
          className="w-full border border-blue-700 p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-gray-700 mb-1">
          {isRecurring ? 'Start Date' : 'Date'}
        </label>
        <input
          {...register('date')}
          type="date"
          className="w-full border border-blue-700 p-2 rounded"
          required
          max={!isRecurring ? today : undefined}
        />
      </div>

      <label className="flex items-center">
        <input
          {...register('isRecurring')}
          type="checkbox"
          className="border border-blue-700 rounded"
        />
        <span className="ml-2 text-sm text-gray-700">Is this recurring?</span>
      </label>

      {isRecurring && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Recurrence</label>
            <select
              {...register('recurrence',{required:true})}
              className="w-full border border-blue-700 p-2 rounded"
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Date (Optional)</label>
            <input
              {...register('endDate')}
              type="date"
              className="w-full border border-blue-700 p-2 rounded"
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-900"
      >
        {isPending ? 'Adding...' : 'Add Transaction'}
      </button>
      {isError && <p className="text-red-600">Error: {error.message}</p>}
    </form>
  );
}

export default TransactionForm;
