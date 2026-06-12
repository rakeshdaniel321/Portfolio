import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function NameAnimation() {
  const letters = ["R", "A", "K", "E", "S", "H", " ", "A", "K", "M"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFullName, setShowFullName] = useState(false);

  useEffect(() => {
    // 10 செகண்ட் வரை எழுத்துக்கள் ஒவ்வொன்றாக மாறும்
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= letters.length - 1) {
          clearInterval(interval);
          setShowFullName(true);
          triggerFestivalFireworks();
          return prev;
        }
        return prev + 1;
      });
    }, 1000); // ஒவ்வொரு செகண்டிற்கும் மாறும் (மொத்தம் 10 வினாடிகள்)

    return () => clearInterval(interval);
  }, []);

  const triggerFestivalFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      {!showFullName ? (
        <div className="bg-black text-yellow-400 font-mono text-5xl md:text-7xl font-black px-6 py-4 rounded-xl border-4 border-zinc-800 shadow-2xl animate-pulse tracking-wider">
          <AnimatePresence mode="wait">
            <motion.span
              key={currentIndex}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {letters[currentIndex] === " " ? "•" : letters[currentIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      ) : (
        <motion.h1 
          initial={{ scale: 0.5, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-black text-center select-none uppercase drop-shadow-[0_5px_15px_rgba(245,158,11,0.4)]"
        >
          RAKESH AKM
        </motion.h1>
      )}
    </div>
  );
}