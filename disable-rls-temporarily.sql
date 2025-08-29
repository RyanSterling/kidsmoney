-- TEMPORARY: Disable RLS to test if that's causing slow queries
-- This is ONLY for debugging - re-enable afterwards!

ALTER TABLE families DISABLE ROW LEVEL SECURITY;
ALTER TABLE children DISABLE ROW LEVEL SECURITY;
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE savings_goals DISABLE ROW LEVEL SECURITY;

-- Test query - should be instant
SELECT COUNT(*) as total_families FROM families;

SELECT 'RLS disabled for testing - REMEMBER TO RE-ENABLE!' as warning;