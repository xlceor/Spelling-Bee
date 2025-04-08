"use client";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion"; // Importamos framer-motion
import Header from "@/app/components/header";
import WordButton from "@/app/components/wordButton";
import Modal from "@/app/components/modal";

type Category = {
  name: string;
  words: string[];
};

const getThemeClasses = (isDarkMode: boolean) => {
  return isDarkMode 
    ? 'bg-[#1e293b] text-white border-[#475569]' 
    : 'bg-gray-50 text-gray-900';
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then((data) => {
        // Verifica que data sea un arreglo
        if (Array.isArray(data)) {
          setCategories(data);
          console.log("Arreglo:");
          console.log(data);
        } else {
          console.error("La respuesta no es un arreglo:", data);
        }
      })
      .catch(err => console.error("Error al cargar las categorías:", err));
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle("dark");
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

  return (
    <div className={getThemeClasses(isDarkMode)}>
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
      <main className="p-6">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
        >
          {Array.isArray(categories) ? (
            categories.map((category, i) => (
              <motion.div 
                key={i}
                className={`rounded-2xl p-6 border ${getThemeClasses(isDarkMode)} shadow-md hover:shadow-lg transition`}
                variants={categoryVariants}
                initial="hidden"
                animate="show"
              >
                <h2 className="text-2xl font-semibold mb-4 text-center text-yellow-500">
                  {category.name}
                </h2>
                <div className="space-y-4">
                  {category.words.map((word, j) => (
                    <WordButton
                      key={j}
                      word={word}
                      onClick={() => {
                        setSelectedWord(word);
                        setCategory(category.name);
                      }}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>
              </motion.div>
            ))
          ) : (
            <p>Hubo un error al cargar las categorías.</p>
          )}
        </motion.div>
      </main>
      <Modal
        isOpen={!!selectedWord}
        onClose={() => setSelectedWord(null)}
        word={selectedWord || ""}
        isDarkMode={isDarkMode}
        category={category}
      />
    </div>
  );
}