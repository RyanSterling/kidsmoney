interface FloatingActionButtonProps {
  onPress: () => void;
}

export default function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onPress}
      className="fixed bottom-24 right-6 w-14 h-14 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-full shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center z-50 transition-all duration-200"
      style={{
        boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </button>
  );
}