interface BalanceDisplayProps {
  balance: number;
  kidName: string;
}

export default function BalanceDisplay({ balance, kidName }: BalanceDisplayProps) {
  const isPositive = balance >= 0;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-gray-600 text-lg mb-2">{kidName}'s Balance</h2>
      <div className={`text-4xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        ${Math.abs(balance).toFixed(2)}
      </div>
    </div>
  );
}