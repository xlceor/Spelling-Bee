"use client";
const letterPronunciation: Record<string, string> = {
  a: 'ei', b: 'bi', c: 'si', d: 'di', e: 'i',
  f: 'ef', g: 'yi', h: 'eich', i: 'ai', j: 'yei',
  k: 'kei', l: 'el', m: 'em', n: 'en', o: 'ou',
  p: 'pi', q: 'kiu', r: 'ar', s: 'es', t: 'ti',
  u: 'iu', v: 'vi', w: 'double u', x: 'ex', y: 'wai',
  z: 'zi'
};

// const speak = (text: string) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = "en-US";
//   utterance.rate = 0.9;
//   speechSynthesis.speak(utterance);
// };
export const speak = (text: string) => {
  const audio = new Audio(`/audio/${text}.mp3`);
  audio.play().catch((error) => {
    console.error('Error al reproducir el audio:', error);
  });
};

interface LetterCardProps {
  letter: string;
  isDarkMode: boolean; 
}

export default function LetterCard({ letter, isDarkMode }: LetterCardProps) {
  const pronunciation = letterPronunciation[letter.toLowerCase()] || letter;
  return (
    <button
      onClick={() => speak(letter)}
      className={`flex flex-col items-center border border-yellow-400 ${isDarkMode ? "bg-gray-800 text-yellow-100" : "bg-gray-100 text-yellow-400"} rounded-lg p-3 m-1 transition-transform hover:scale-110 shadow-md hover:bg-gray-700`}
    >
      <span className="text-xl font-bold">{letter}</span>
      <span className={`text-sm ${!isDarkMode && "text-gray-800"}`}>{pronunciation}</span>
    </button>
  );
}