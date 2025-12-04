

import { motion } from 'framer-motion';
import LetterCard from './letterCard';
import { speak } from './letterCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  word: string;
  isDarkMode: boolean;
  category : string
}
const speakWord = (text: string, category : string) => {
  const audio = new Audio(`/Words/${category}/${text}.mp3`);
  audio.play().catch((error) => {
    console.error('Error al reproducir el audio:', error);
  });
};
export default function Modal({ isOpen, onClose, word, isDarkMode, category }: ModalProps) {

  if (!isOpen) return null;

  const letters = word.split("");

  // Función para reproducir la secuencia de la palabra
  const playWordSequence = () => {

    
    // Paso 1: Reproducir la palabra completa al inicio
    speakWord(word, category);
  
    // Paso 2: Esperar 2 segundos antes de empezar a deletrear
    const initialDelay = 1000;
  
    // Paso 3: Reproducir cada letra con 0.5 segundos entre ellas
    letters.forEach((letter, index) => {
      setTimeout(() => {
        speak(letter);
      }, initialDelay + index * 600);
    });
  
    // Paso 4: Esperar 1 segundo después del deletreo para decir la palabra de nuevo
    const finalDelay = initialDelay + letters.length * 500 + 1000;
  
    setTimeout(() => {
      speakWord(word, category);
    }, finalDelay);
  };


  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`rounded-2xl p-8 max-w-md w-full shadow-xl border ring-1 ring-yellow-300/30 backdrop-blur-md ${
          isDarkMode ? "bg-gray-800 text-white border-[#475569]" : "bg-gray-100 text-gray-900"
        }`}
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
        <div className="flex justify-center flex-wrap gap-2">
          {letters.map((letter, index) => (
            <LetterCard key={index} letter={letter} isDarkMode={isDarkMode} />
          ))}
        </div>
        {/* Botón para iniciar la secuencia */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={playWordSequence}
            className="bg-yellow-400 text-white p-3 rounded-lg shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-110"
          >
            Reproducir secuencia
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}