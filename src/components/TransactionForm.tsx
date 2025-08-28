import { useState } from 'react';
import { Kid, TransactionType } from '../types';

interface TransactionFormProps {
  kidName: Kid;
  onSubmit: (transaction: {
    kid_name: Kid;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
  }) => void;
}

export default function TransactionForm({ kidName, onSubmit }: TransactionFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    onSubmit({
      kid_name: kidName,
      type,
      amount: parseFloat(amount),
      description,
      date,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => {
            setType('income');
            setIsOpen(true);
          }}
          className="flex-1 bg-green-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
        >
          + Add Income
        </button>
        <button
          onClick={() => {
            setType('expense');
            setIsOpen(true);
          }}
          className="flex-1 bg-red-500 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-red-600 transition-colors"
        >
          - Add Expense
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">
        Add {type === 'income' ? 'Income' : 'Expense'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
            placeholder="0.00"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder={type === 'income' ? 'Laundry, allowance, etc.' : 'Toy, candy, etc.'}
            required
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="submit"
            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white ${
              type === 'income' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            } transition-colors`}
          >
            Add {type === 'income' ? 'Income' : 'Expense'}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 py-3 px-6 rounded-lg font-semibold bg-gray-300 text-gray-700 hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}