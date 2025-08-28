import type { Kid } from '../types';
import holdenImage from '../assets/HOLDEN.png';
import maudeImage from '../assets/MAUDE.png';

interface BottomNavigationProps {
  selectedKid: Kid;
  onSelectKid: (kid: Kid) => void;
}

export default function BottomNavigation({ selectedKid, onSelectKid }: BottomNavigationProps) {
  const kids = [
    { name: 'Holden' as Kid, image: holdenImage },
    { name: 'Maude' as Kid, image: maudeImage }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center py-2 px-4 max-w-2xl mx-auto">
        {kids.map((kid) => (
          <button
            key={kid.name}
            onClick={() => onSelectKid(kid.name)}
            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${
              selectedKid === kid.name
                ? 'bg-blue-50 scale-105'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-full overflow-hidden border-3 transition-all duration-200 ${
              selectedKid === kid.name
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-300'
            }`}>
              <img
                src={kid.image}
                alt={kid.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-xs font-medium mt-1 transition-colors ${
              selectedKid === kid.name
                ? 'text-blue-600'
                : 'text-gray-600'
            }`}>
              {kid.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}