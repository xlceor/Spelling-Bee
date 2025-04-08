"use client";
interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Header({ isDarkMode, toggleTheme }: HeaderProps) {
  return (
    <header className={`py-6 px-8 shadow-md ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'} flex justify-between items-center`}>
      <h1 className="text-5xl font-extrabold bg-gradient-to-br from-yellow-300 to-yellow-500 text-transparent bg-clip-text drop-shadow-lg tracking-wide italic">
        🐝 Spelling Bee 2025
      </h1>
      <button 
        onClick={toggleTheme}
        className="text-2xl p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle theme"
      >
        {isDarkMode ? '🌙' : '🌞'}
      </button>
    </header>
  );
}