export type Kid = 'Holden' | 'Maude';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  kid_name: Kid;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}