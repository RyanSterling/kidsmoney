-- Kids Money Tracker - Supabase Database Setup
-- Run this SQL in your Supabase project's SQL Editor

-- Create the transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kid_name TEXT NOT NULL CHECK (kid_name IN ('Holden', 'Maude')),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC(10,2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries by kid and date
CREATE INDEX idx_transactions_kid_date ON transactions(kid_name, date DESC, created_at DESC);

-- Enable Row Level Security (RLS) - optional but recommended
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now
-- (You can restrict this later if you add authentication)
CREATE POLICY "Allow all operations on transactions" ON transactions
  FOR ALL 
  USING (true)
  WITH CHECK (true);

-- Insert some sample data to test (optional - remove if you don't want sample data)
INSERT INTO transactions (kid_name, type, amount, description, date) VALUES
  ('Holden', 'income', 20.00, 'Laundry money', '2025-08-28'),
  ('Maude', 'income', 15.00, 'Allowance', '2025-08-28'),
  ('Holden', 'expense', 5.50, 'Candy at store', '2025-08-28');

-- Verify the table was created correctly
SELECT * FROM transactions ORDER BY created_at DESC;