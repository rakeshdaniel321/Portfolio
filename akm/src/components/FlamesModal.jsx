import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import { ArrowLeft } from 'lucide-react'; 

const FLAMES_CONFIG = {
  'Friends 🤝': { emoji: '🤝', kavithai: 'ஆயிரம் உறவுகள் மண்ணில் வரலாம், ஆனால் மரணம் வரை மாறுவது இல்லை நம் நட்பு!', bg: 'bg-black/40' },
  'Love ❤️': { emoji: '❤️', kavithai: 'உன் மௌனத்தின் அர்த்தம் தேடி அலையும், என் இதயத்தின் ஒற்றைப் பயணம் நீ!', bg: 'bg-black/40' },
  'Affection 💖': { emoji: '💖', kavithai: 'சொல்ல முடியாத பல நினைவுகள், உன்னோடு மட்டும் வாழத் துடிக்கும் என் பாசம்!', bg: 'bg-black/40' },
  'Marriage 💍': { emoji: '💍', kavithai: 'ஏழு ஜென்ம பந்தத்தின் தொடக்கம், உன் கரம் கோர்த்து வாழும் அழகிய தருணம்!', bg: 'bg-black/40' },
  'Enemy ⚔️': { emoji: '⚔️', kavithai: 'துப்பாக்கி தோட்டாக்கள் தேவையில்லை, உன் ஒற்றைப் பார்வையே என்னை வீழ்த்த போதுமானது!', bg: 'bg-black/40' },
  'Sister 🧑‍🤝‍🧑': { emoji: '🧑‍🤝‍🧑', kavithai: 'தாயின் மடியில் கிடைக்காத பாதுகாப்பு, என் அன்பு சகோதரியின் பாசத்தில் கண்டேன்!', bg: 'bg-black/40' }
};

export default function FlamesModal({ isOpen, onClose }) {
  const [yourName, setYourName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    if (!isOpen) return;
    const icons = ['❄️', '🌨️', '🩵', '✧'];
    const generatedSnow = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 5,
      size: 10 + Math.random() * 15,
      icon: icons[Math.floor(Math.random() * icons.length)]
    }));
    setSnowflakes(generatedSnow);
  }, [isOpen]);

  
  const handleBackToGame = () => {
    setResult(null);
  };

  const triggerInstagramStyleBurst = (emoji) => {
    const scalar = 4.5;
    const customEmoji = confetti.shapeFromText({ text: emoji, scalar });
    const end = Date.now() + 3.5 * 1000;

    (function frame() {
      confetti({ particleCount: 7, angle: 60, spread: 80, origin: { x: 0, y: 0.8 }, shapes: [customEmoji], scalar });
      confetti({ particleCount: 7, angle: 120, spread: 80, origin: { x: 1, y: 0.8 }, shapes: [customEmoji], scalar });
      confetti({ particleCount: 5, angle: 90, spread: 100, origin: { x: 0.5, y: 0.4 }, shapes: [customEmoji], scalar });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const checkFlames = (e) => {
    e.preventDefault();
    if (!yourName || !partnerName) return;
    setLoading(true);

    let n1 = yourName.toLowerCase().replace(/\s+/g, '');
    let n2 = partnerName.toLowerCase().replace(/\s+/g, '');

    for (let char of n1) {
      if (n2.includes(char)) {
        n1 = n1.replace(char, '');
        n2 = n2.replace(char, '');
      }
    }

    const count = n1.length + n2.length;
    const flames = ['Friends 🤝', 'Love ❤️', 'Affection 💖', 'Marriage 💍', 'Enemy ⚔️', 'Sister 🧑‍🤝‍🧑'];
    
    let startIndex = 0; 
    
    while (flames.length > 1) {
      const removeIndex = (startIndex + count - 1) % flames.length;
      flames.splice(removeIndex, 1);
      startIndex = removeIndex % flames.length;
    }
    const finalResult = flames[0];
    setResult(finalResult);
    triggerInstagramStyleBurst(FLAMES_CONFIG[finalResult].emoji);

    const emailParams = {
      from_name: 'Portfolio FLAMES System',
      your_name: yourName,
      partner_name: partnerName,
      flames_result: finalResult,
      to_email: 'rakeshdaniel321@gmail.com'
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceId, templateId, emailParams, publicKey)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => { 
        console.error("Email error: ", err); 
        setLoading(false); 
        alert(`Email failed: ${err.text || "check your console"}`);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden p-4">
      
      {/* Snowfall Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((snow) => (
          <span
            key={snow.id}
            className="absolute text-white/40 select-none animate-snowfall"
            style={{
              left: `${snow.x}%`,
              top: `-5%`,
              fontSize: `${snow.size}px`,
              animationDelay: `${snow.delay}s`,
              animationDuration: `${snow.duration}s`,
            }}
          >
            {snow.icon}
          </span>
        ))}
      </div>

      {/* Main Container: Added max-h and touch scroll for mobile layout */}
      <div className="w-full max-w-[92%] sm:max-w-md bg-zinc-950/40 backdrop-blur-md border border-white/20 rounded-[2rem] p-5 sm:p-7 relative shadow-[0_0_40px_rgba(255,255,255,0.03)] text-white z-10 transition-all duration-300 max-h-[88vh] overflow-y-auto scrollbar-thin">
        
        {/* Dynamic Back Button (Form-ல் இருந்தால் க்ளோஸ் ஆகும், ரிசல்ட்டில் இருந்தால் ஃபார்மிற்கு திரும்பும்) */}
        <button 
          onClick={result ? handleBackToGame : onClose} 
          className="absolute top-5 left-5 text-white/70 hover:text-white transition-colors active:scale-90 z-20"
          aria-label="Go Back"
        >
          <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Top Close Cross Button */}
        <button 
          onClick={onClose} 
          className="infinite-color-text absolute top-3 right-5 font-black text-2xl sm:text-3xl hover:opacity-75 active:scale-95 transition-transform z-20"
        >
          &times;
        </button>
        
        <h3 className="infinite-color-text text-sm sm:text-lg font-mono font-black tracking-widest text-center mb-5 border-b border-white/10 pb-2.5 mt-2">// DESTINY BOX</h3>
        
        {!result ? (
          <form onSubmit={checkFlames} className="space-y-4 sm:space-y-6">
            <div className="space-y-1">
              <label className="infinite-color-text block text-[10px] sm:text-xs uppercase tracking-widest font-black pl-1">Your Name</label>
              <input 
                type="text" 
                required 
                value={yourName} 
                onChange={e => setYourName(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 sm:py-3 text-sm sm:text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter your name..."
              />
            </div>
            
            <div className="space-y-1">
              <label className="infinite-color-text block text-[10px] sm:text-xs uppercase tracking-widest font-black pl-1">Partner Name</label>
              <input 
                type="text" 
                required 
                value={partnerName} 
                onChange={e => setPartnerName(e.target.value)} 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 sm:py-3 text-sm sm:text-base font-bold text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors"
                placeholder="Enter partner name..."
              />
            </div>

            <div className="flex justify-center pt-1.5">
              <button 
                type="submit" 
                disabled={loading} 
                className="heart-btn relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-all active:scale-90 select-none group"
                aria-label="Calculate Destiny"
              >
                <svg className="absolute inset-0 w-full h-full drop-shadow-[0_6px_12px_rgba(239,68,68,0.35)] animate-pulse-slow group-hover:scale-105 transition-transform" viewBox="0 0 24 24" fill="url(#photoreal-heart-gradient-v3)">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  <defs>
                    <radialGradient id="photoreal-heart-gradient-v3" cx="30%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#ff5e7e" />
                      <stop offset="40%" stopColor="#ef4444" />
                      <stop offset="85%" stopColor="#991b1b" />
                      <stop offset="100%" stopColor="#3b0712" />
                    </radialGradient>
                  </defs>
                </svg>
                <span className="relative z-10 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-center px-2 leading-tight">
                  {loading ? 'Sending...' : 'Check'}
                </span>
              </button>
            </div>
          </form>
        ) : (
          /* Result UI: Perfectly padded and fitted for mobile responsiveness */
          <div className="text-center p-1 space-y-4 sm:space-y-6 animate-fade-in">
            <div className="text-6xl sm:text-8xl animate-bounce drop-shadow-[0_8px_16px_rgba(255,255,255,0.08)] select-none mt-2">
              {FLAMES_CONFIG[result].emoji}
            </div>
            
            <h4 className="infinite-color-text text-xl sm:text-3xl font-black uppercase tracking-widest border-b border-white/20 inline-block px-5 pb-0.5">
              {result.split(' ')[0]}
            </h4>
            
            <p className="font-bold italic text-xs sm:text-base leading-relaxed bg-white/5 p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 text-zinc-200 shadow-inner">
              "{FLAMES_CONFIG[result].kavithai}"
            </p>
            
            <div className="pt-3 border-t border-white/10 space-y-3">
              <p className="infinite-color-text text-[9px] sm:text-xs font-black tracking-widest uppercase opacity-75">Thank you for playing!</p>
              <button 
                onClick={onClose} 
                className="w-full bg-white text-black font-black py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm uppercase tracking-widest active:scale-95 shadow-lg transition-transform hover:bg-zinc-100"
              >
                Close Gift Box
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .infinite-color-text {
          animation: textFourColors 6s infinite linear !important;
        }
        @keyframes textFourColors {
          0%, 100% { color: #ff3333 !important; }
          25% { color: #3366ff !important; }
          50% { color: #22cc22 !important; }
          75% { color: #eecc00 !important; }
        }

        @keyframes snowfall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        .animate-snowfall {
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 1.4s infinite ease-in-out;
        }

        /* Smooth scrollbar styling for the modal */
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}