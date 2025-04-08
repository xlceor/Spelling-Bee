"use client";
import { motion } from 'framer-motion';

interface WordButtonProps {
  word: string;
  onClick: () => void;
  isDarkMode: boolean;
}

export default function WordButton({ word, onClick, isDarkMode }: WordButtonProps) {
  return (
    <motion.button
      className={`w-full py-3 px-4 text-lg font-semibold rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1e293b] text-white border-[#475569] hover:bg-[#334155]' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
      onClick={onClick}
      whileHover={isDarkMode ? { backgroundColor: "#616161" } : { backgroundColor: "#e2e2e2" }}
      whileTap={{ scale: 0.95, backgroundColor: "#d0d0d0" }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {word}
    </motion.button>
  );
}