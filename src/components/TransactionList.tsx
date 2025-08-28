import type { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete?: (id: string) => void;
}

export default function TransactionList({ transactions, onDelete }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-gray-500">
        No transactions yet
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  let runningBalance = 0;
  const transactionsWithBalance = transactions.map(t => {
    runningBalance += t.type === 'income' ? t.amount : -t.amount;
    return { ...t, runningBalance };
  }).reverse();

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold text-gray-700">Recent Transactions</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {transactionsWithBalance.map((transaction) => (
          <div
            key={transaction.id}
            className="p-4 border-b hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{transaction.description}</div>
                <div className="text-sm text-gray-500">{formatDate(transaction.date)}</div>
              </div>
              <div className="text-right">
                <div
                  className={`font-semibold text-lg ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}$
                  {transaction.amount.toFixed(2)}
                </div>
                <div className="text-sm text-gray-500">
                  Balance: ${transaction.runningBalance.toFixed(2)}
                </div>
              </div>
              {onDelete && (
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Delete transaction"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}