import { useEffect, useState } from 'react';

export default function NameAnimation() {
  const letters = "RAKESH AKM".split("");
  const [animatedLetters, setAnimatedLetters] = useState([]);

  useEffect(() => {
    // Mobile layout-la letter eppovume fast-ah repeat aahi odite irukkira mathri looping trigger
    const interval = setInterval(() => {
      setAnimatedLetters([...letters].sort(() => 0.5 - Math.random()));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center gap-1.5 md:gap-3 px-4 py-8 select-none">
      {letters.map((char, index) => (
        <div 
          key={index} 
          className="w-12 h-12 md:w-16 md:h-16 bg-black border-2 border-zinc-950 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg transform transition-all active:scale-90"
        >
          {/* Intha letter-uku infinite color text class koduthathal ithu nirkamal color maarum */}
          <span className="infinite-color-text text-2xl md:text-4xl font-black tracking-tight select-none">
            {char === " " ? "⚡" : char}
          </span>
        </div>
      ))}
    </div>
  );
}