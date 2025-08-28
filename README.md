# Kids Money Tracker

A simple, mobile-first web app to track kids' income and expenses. Perfect for teaching kids about money management and keeping a running balance of their savings.

## Features

- 📱 Mobile-optimized interface
- 👦👧 Track money for multiple kids (Holden & Maude)
- ➕ Quick add income (allowance, chores, etc.)
- ➖ Quick add expenses (toys, candy, etc.)
- 💰 Running balance display
- 📅 Date tracking for all transactions
- 🗑️ Delete transactions if needed
- 📲 Installable as a PWA (Progressive Web App)
- 🔄 Works offline after first load

## Setup Instructions

### 1. Supabase Database Setup

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Once your project is ready, go to the SQL Editor
4. Run this SQL to create the transactions table:

```sql
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kid_name TEXT NOT NULL CHECK (kid_name IN ('Holden', 'Maude')),
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  amount NUMERIC(10,2) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index for faster queries
CREATE INDEX idx_transactions_kid_date ON transactions(kid_name, date DESC);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed)
CREATE POLICY "Allow all operations" ON transactions
  FOR ALL USING (true);
```

5. Go to Settings → API in your Supabase project
6. Copy your project URL and anon key
7. Update the `.env` file with your credentials:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open on your phone by visiting the local network URL shown in the terminal (e.g., `http://192.168.1.100:5173`)

### 3. Deployment

#### Option A: Deploy to Vercel (Recommended)

1. Push this code to a GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Deploy!

#### Option B: Deploy to Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify settings

### 4. Install on Your Phone

Once deployed:
1. Open the app URL on your phone
2. iOS: Tap the share button → "Add to Home Screen"
3. Android: Tap the menu → "Install app" or "Add to Home Screen"

## Usage

1. **Select a kid**: Tap on Holden or Maude at the top
2. **Add income**: Tap "Add Income" and enter amount and description
3. **Add expense**: Tap "Add Expense" and enter what they spent money on
4. **View balance**: The current balance is always shown prominently
5. **See history**: Scroll down to see all transactions with running balance
6. **Delete mistakes**: Tap the trash icon next to any transaction to delete it

## Tech Stack

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Supabase for database
- PWA for mobile app experience

## Notes

- The app auto-fills today's date but you can change it if entering past transactions
- All data is stored in your Supabase database
- The app works offline after first load (reads cached data)
- Perfect for quick entries while at the store with your kids