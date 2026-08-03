import { useNavigate } from 'react-router-dom';

import rakeshPic from '../assets/rakesh-pic.jpeg'; // உங்களது assets ஃபோல்டர் பாத்

export default function DestinyAboutCard() {
  const navigate = useNavigate();

  
  const heartsCount = [...Array(12)];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12 relative overflow-x-hidden overflow-y-auto selection:bg-red-600 selection:text-white">
      
     
    
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {heartsCount.map((_, index) => {
          const heartTypes = ['❤️', '💖', '💕', '💝'];
          const currentHeart = heartTypes[index % heartTypes.length];
          return (
            <div 
              key={index} 
              className="absolute text-xl md:text-2xl opacity-0 animate-heart-flow"
              style={{
                left: `${8 + index * 7.8}%`, 
                top: `-${20 + (index % 3) * 12}px`,
                animationDelay: `${index * 0.18}s`,
                animationDuration: `${3.8 + (index % 3) * 1.2}s`
              }}
            >
              {currentHeart}
            </div>
          );
        })}
      </div>

      <div className="max-w-xl mx-auto pt-16 pb-12 relative z-10 px-2 flex flex-col items-center justify-center min-h-[75vh]">
        
      
        <div className="w-full border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(239,68,68,0.08)] flex flex-col animate-card-fade">
          
         
          <div className="bg-zinc-950 p-6 flex justify-center items-center border-b border-white/10">
            <div className="border border-white/20 p-2 bg-black rounded-xl shadow-2xl max-w-[200px] w-full transition-transform duration-300 hover:scale-102">
              <div className="overflow-hidden rounded-lg bg-zinc-900 aspect-[3/4]">
                <img 
                  src={rakeshPic} 
                  alt="Rakesh Profile" 
                
                  className="w-full h-full object-cover block" 
                />
              </div>
              <p className="text-center text-[8px] font-mono mt-2 uppercase tracking-wider font-black text-zinc-600">
                Fig 1.0: Rakesh AKM
              </p>
            </div>
          </div>

      
          <div className="bg-zinc-900/90 backdrop-blur-sm p-6 space-y-4 text-center">
           
            {/* <div className="space-y-1.5">
              <h3 className="text-[9px] font-mono text-red-500 uppercase tracking-widest font-black">
                 THE SOUL EXPRESSION
              </h3>
              <p className="text-sm md:text-base text-zinc-100 font-serif font-medium leading-relaxed italic px-1">
                "Expecting nothing from the world, just carrying an endless ocean of love for my family."
              </p>
            </div>

            
            <div className="w-10 h-[1px] bg-white/10 mx-auto" />

           
            <div className="space-y-1">
              <p className="text-xs md:text-sm text-zinc-400 font-serif leading-relaxed px-2">
                "வாழ்க்கையில் ஆடம்பரங்களை விட, அம்மா மற்றும் குடும்பத்தின் மகிழ்ச்சியே எனது முதல் இலக்கு."
              </p>
            </div> */}

            
            <div className="pt-2">
              <button 
                onClick={() => navigate('/')}
                className="text-[9px] font-mono text-zinc-500 hover:text-zinc-400 uppercase tracking-wider underline underline-offset-4 transition-colors"
              >
                [ Back to Main Hub ]
              </button>
            </div>
          </div>

        </div>

      </div>

     
      <style>{`
        @keyframes fallAndSpread {
          0% {
            transform: translateY(0) scale(0.6) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) scale(1.1) rotate(35deg);
            opacity: 0;
          }
        }
        @keyframes smoothCardUp {
          from {
            opacity: 0;
            transform: scale(0.97) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-heart-flow {
          animation: fallAndSpread infinite linear;
        }
        .animate-card-fade {
          animation: smoothCardUp 0.45s ease-out forwards;
        }
      `}</style>
    </div>
  );
}