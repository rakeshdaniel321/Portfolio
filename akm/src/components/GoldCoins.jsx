import { useEffect, useState } from 'react';

export default function GoldCoins() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // 50 realistic continuous coins
    const generatedCoins = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -10}s`, // Negative delay starts them instantly
      duration: `${Math.random() * 4 + 4}s`,
      size: `${Math.random() * 14 + 14}px`,
      rotation: `${Math.random() * 360}deg`,
    }));
    setCoins(generatedCoins);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="absolute rounded-full bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-600 shadow-[0_4px_8px_rgba(0,0,0,0.25)] flex items-center justify-center font-bold text-[10px] text-amber-900 border border-amber-200/50"
          style={{
            top: '-10%',
            left: coin.left,
            width: coin.size,
            height: coin.size,
            transform: `rotate(${coin.rotation})`,
            animation: `realisticCoinDrop ${coin.duration} linear infinite`,
            animationDelay: coin.delay,
          }}
        >
          🪙
        </div>
      ))}
      <style>{`
        @keyframes realisticCoinDrop {
          0% { transform: translateY(0) rotateY(0deg) rotateX(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(115vh) rotateY(1080deg) rotateX(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}