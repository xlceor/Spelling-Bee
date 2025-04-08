// import { useState } from 'react';

// const SpellingTrainer = () => {
//   const [word, setWord] = useState('cat'); // Palabra objetivo
//   const [input, setInput] = useState('');
//   const [feedback, setFeedback] = useState('');

//   // Función que reproduce el audio de cada letra en secuencia
//   const playAudio = async () => {
//     for (let char of word.toLowerCase()) {
//       if (char === ' ') continue; // Omitir espacios
//       const audio = new Audio(`@/app/public/audio/${char}.mp3`);
//       await new Promise(resolve => {
//         audio.onended = resolve;
//         audio.onerror = resolve; // En caso de error, continúa
//         audio.play();
//       });
//     }
//   };

//   // Maneja el envío del formulario y compara la entrada del usuario con la palabra
//   const handleSubmit = (e : Event) => {
//     e.preventDefault();
//     if (input.trim().toLowerCase() === word.toLowerCase()) {
//       setFeedback('¡Correcto!');
//     } else {
//       setFeedback(`Incorrecto. Intentaste: "${input.trim()}"`);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Entrenador de Deletreo</h1>
//       <button
//         onClick={playAudio}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mb-4"
//       >
//         Reproducir palabra
//       </button>
//       <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
//         <input
//           type="text"
//           placeholder="Escribe la palabra"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="border border-gray-300 p-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
//         >
//           Enviar
//         </button>
//       </form>
//       {feedback && (
//         <div className="mt-4 p-2 border rounded bg-gray-100">
//           {feedback}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SpellingTrainer;