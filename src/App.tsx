import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import type { Kid, Transaction } from './types';
import BottomNavigation from './components/BottomNavigation';
import BalanceDisplay from './components/BalanceDisplay';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [selectedKid, setSelectedKid] = useState<Kid>('Holden');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions when kid changes
  useEffect(() => {
    fetchTransactions();
  }, [selectedKid]);

  // Calculate balance when transactions change
  useEffect(() => {
    const newBalance = transactions.reduce((acc, transaction) => {
      return acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
    setBalance(newBalance);
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('kid_name', selectedKid)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (transaction: {
    kid_name: Kid;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    date: string;
  }) => {
    setError(null);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([transaction])
        .select()
        .single();

      if (error) throw error;
      
      if (data) {
        setTransactions([data, ...transactions]);
      }
    } catch (err) {
      console.error('Error adding transaction:', err);
      setError('Failed to add transaction. Please try again.');
    }
  };

  const deleteTransaction = async (id: string) => {
    setError(null);
    try {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting transaction:', err);
      setError('Failed to delete transaction. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-20">
      <div className="max-w-2xl mx-auto p-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            <BalanceDisplay balance={balance} kidName={selectedKid} />
            <TransactionForm kidName={selectedKid} onSubmit={addTransaction} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </>
        )}
      </div>
      
      <BottomNavigation selectedKid={selectedKid} onSelectKid={setSelectedKid} />
    </div>
  );
}

export default App;