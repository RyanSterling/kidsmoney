import { useState, useEffect } from 'react';
import type { Kid, TransactionType } from '../types';

interface TransactionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  kidName: Kid;
  onSubmit: (transaction: {
    kid_name: Kid;
    type: TransactionType;
    amount: number;
    description: string;
    date: string;
  }) => void;
}

export default function TransactionDrawer({ isOpen, onClose, kidName, onSubmit }: TransactionDrawerProps) {
  const [type, setType] = useState<TransactionType>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Reset form when drawer opens
  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
    }
  }, [isOpen]);

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

    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleBackdropClick}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          maxHeight: '85vh',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type Selector */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">Type</label>
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    type === 'income'
                      ? 'bg-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💰 Income
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    type === 'expense'
                      ? 'bg-red-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  💸 Expense
                </button>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500">$</span>
                <input
                  type="number"
                  inputMode="decimal"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  placeholder="0.00"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                placeholder={type === 'income' ? 'Laundry, allowance, etc.' : 'Toy, candy, etc.'}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 ${
                type === 'income'
                  ? 'bg-green-500 hover:bg-green-600 active:bg-green-700'
                  : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
              }`}
            >
              Save Transaction
            </button>
          </form>
        </div>
      </div>
    </>
  );
}