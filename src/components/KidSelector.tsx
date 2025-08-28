import type { Kid } from '../types';

interface KidSelectorProps {
  selectedKid: Kid;
  onSelectKid: (kid: Kid) => void;
}

export default function KidSelector({ selectedKid, onSelectKid }: KidSelectorProps) {
  const kids: Kid[] = ['Holden', 'Maude'];

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {kids.map((kid) => (
        <button
          key={kid}
          onClick={() => onSelectKid(kid)}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all ${
            selectedKid === kid
              ? 'bg-blue-500 text-white shadow-lg scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {kid}
        </button>
      ))}
    </div>
  );
}