"use client";

import { useState } from 'react';
import { motion, Variants } from 'framer-motion'; // Importamos framer-motion
import categoriesData from '@/app/categories.json';

const letterPronunciation: Record<string, string> = {
  a: 'ei', b: 'bi', c: 'si', d: 'di', e: 'i',
  f: 'ef', g: 'yi', h: 'eich', i: 'ai', j: 'yei',
  k: 'kei', l: 'el', m: 'em', n: 'en', o: 'ou',
  p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti',
  u: 'iu', v: 'vi', w: 'double u', x: 'ex', y: 'wai',
  z: 'zi'
};
const speak = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";  // Aseguramos que siempre use inglés
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
};

const syllableMap: Record<string, string> = {
  together: "t-o_g-e_t_h-e_r"
};

const getThemeClasses = (isDarkMode: boolean) => {
  return isDarkMode 
    ? 'bg-[#1e293b] text-white border-[#475569]' 
    : 'bg-gray-50 text-gray-900';
};

const syllableBreakdown = (word: string) => {
  return word.split('').join('-'); // Esto es un ejemplo simple
};

interface LetterCardProps {
  letter: string;
  isDarkMode: boolean; 
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
}

function LetterCard({ letter, isDarkMode }: LetterCardProps) {
  const pronunciation = letterPronunciation[letter.toLowerCase()] || letter;
  return (
    <button
      onClick={() => speak(pronunciation)}
      className={`flex flex-col items-center border border-yellow-400 ${isDarkMode ? "bg-gray-800 text-yellow-100" : "bg-gray-100 text-yellow-400"}  rounded-lg p-3 m-1 transition-transform hover:scale-110 shadow-md hover:bg-gray-700`}
    >
      <span className="text-xl font-bold">{letter}</span>
      <span className="text-sm text-gray-800">{pronunciation}</span>
    </button>
  );
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  isDarkMode: boolean;  // Agrega esta prop
}

const Modal = ({ isOpen, onClose, word, isDarkMode }: ModalProps) => {
  if (!isOpen) return null;

  const lower = word.toLowerCase();
  const breakdownStr = syllableMap[lower] ?? syllableBreakdown(lower);
  const groups = breakdownStr.split('_').map(g => g.split('-'));

  return (
    <motion.div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ${getThemeClasses(isDarkMode)}`}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={` rounded-2xl p-8 text-black max-w-md w-full shadow-xl border ${isDarkMode ? "bg-gray-800" : "bg-gray-100"} ring-1 ring-yellow-300/30 backdrop-blur-md`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-end">
          <button
            className="text-yellow-300 hover:text-yellow-500 text-3xl transition-transform hover:scale-125"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <h2 className="text-center text-4xl font-bold mb-8 text-yellow-400 drop-shadow-md">{word}</h2>
        <div className="space-y-6">
          {groups.map((group, i) => (
            <div key={i} className="flex justify-center space-x-2">
              {group.map((letter, j) => (
                <LetterCard key={j} letter={letter} isDarkMode={isDarkMode} />
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

interface WordButtonProps {
  word: string;
  onClick: () => void;
  isDarkMode: boolean;
}

function WordButton({ word, onClick, isDarkMode }: WordButtonProps) {
  return (
    <motion.button
      className={`w-full py-3 px-4 text-lg font-semibold rounded-lg border transition-all duration-200 shadow-sm hover:shadow-md ${isDarkMode ? 'bg-[#1e293b] text-white border-[#475569] hover:bg-[#334155]' : 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200'}`}
      onClick={onClick}
      whileHover={isDarkMode ? { backgroundColor: "#616161" } : { backgroundColor: "#e2e2e2" }} // Efecto de escalado y cambio de color
      whileTap={{ scale: 0.95, backgroundColor: "#d0d0d0" }} // Efecto de "presionar" con cambio de color
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {word}
    </motion.button>
  );
}

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);


  const openModal = (word: string) => {
    setSelectedWord(word);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedWord("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const categoryVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  
  interface Categories {
    [key: string]: string[]; // Definimos el tipo de categories
  }
  
  const categories: Categories = categoriesData;

  return (
    <div className={getThemeClasses(isDarkMode)}>
      <header className={`py-6 px-8 shadow-md ${isDarkMode ? 'bg-[#1e293b]' : 'bg-white'} flex justify-between items-center`}>
        <h1 className="text-5xl font-extrabold bg-gradient-to-br from-yellow-300  to-yellow-500 text-transparent bg-clip-text drop-shadow-lg tracking-wide italic">
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
      <main className="p-6">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {Object.keys(categories).map((categoryKey, index) => (
            <motion.div 
              key={categoryKey}
              className={`rounded-2xl p-6 border ${getThemeClasses(isDarkMode)} shadow-md hover:shadow-lg transition`}
              variants={categoryVariants}
              initial="hidden"
              animate="show"
              custom={index}
            >
              <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-500">
                {categoryKey.replace(/^\w/, c => c.toUpperCase())}
              </h2>
              <div className="space-y-4">
                {categories[categoryKey].map((word, index) => (
                  <WordButton key={index} word={word} onClick={() => openModal(word)} isDarkMode={isDarkMode} />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      {modalOpen && <Modal isOpen={modalOpen} onClose={closeModal} word={selectedWord} isDarkMode={isDarkMode} />}
    </div>
  );
}