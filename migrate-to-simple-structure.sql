-- Migration to create simple transactions table for reverted app version
-- This preserves your multi-tenant data while adding the simple structure

-- First, create the simple transactions table that the app expects
CREATE TABLE IF NOT EXISTS public.transactions_simple (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  kid_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Copy existing transaction data from multi-tenant structure to simple structure
-- This assumes you have children named similar to 'Holden' and 'Maude'
-- Adjust the mapping as needed for your actual children's names

INSERT INTO public.transactions_simple (kid_name, type, amount, description, date, created_at)
SELECT 
  CASE 
    WHEN c.name ILIKE '%holden%' THEN 'Holden'
    WHEN c.name ILIKE '%maude%' THEN 'Maude'
    ELSE c.name -- fallback to actual name if no match
  END as kid_name,
  t.type,
  t.amount,
  t.description,
  t.date::DATE,
  t.created_at
FROM public.transactions t
JOIN public.children c ON t.child_id = c.id
WHERE t.child_id IS NOT NULL;

-- Now rename tables to preserve multi-tenant data and use simple structure
-- Step 1: Rename current transactions table to backup
ALTER TABLE IF EXISTS public.transactions RENAME TO transactions_multitenant_backup;

-- Step 2: Rename simple table to what the app expects
ALTER TABLE public.transactions_simple RENAME TO transactions;

-- Enable RLS but allow all access for this simple version
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (since this is single-tenant)
DROP POLICY IF EXISTS "Allow all operations on transactions" ON public.transactions;
CREATE POLICY "Allow all operations on transactions" 
  ON public.transactions 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- Optional: Create view to see your backed up multi-tenant data
CREATE OR REPLACE VIEW multitenant_data AS
SELECT 
  f.family_name,
  c.name as child_name,
  c.avatar_url,
  t.type,
  t.amount,
  t.description,
  t.date,
  t.created_at
FROM families f
JOIN children c ON f.id = c.family_id
LEFT JOIN transactions_multitenant_backup t ON c.id = t.child_id
ORDER BY f.family_name, c.name, t.created_at DESC;

-- Show summary of migration
SELECT 
  'Migration completed!' as status,
  COUNT(*) as transactions_migrated
FROM public.transactions;