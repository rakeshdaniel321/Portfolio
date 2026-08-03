import { useNavigate } from 'react-router-dom';


export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-3 md:p-12 relative overflow-x-hidden overflow-y-auto selection:bg-yellow-500 selection:text-black">
      
      
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bottom-[-50px] bg-gradient-to-t from-red-500/20 to-amber-500/30 rounded-full animate-balloon"
            style={{
              left: `${10 + i * 12}%`,
              width: `${15 + (i % 3) * 10}px`,
              height: `${20 + (i % 3) * 12}px`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${6 + (i % 2) * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-3xl mx-auto pt-12 pb-12 space-y-6 relative z-10 px-2 md:px-0">
        
        <div className="text-center border-b-4 border-double border-white/40 pb-3">
          <h1 className="infinite-color-text text-2xl md:text-5xl font-black tracking-tight uppercase font-serif">
            The Rakesh Chronicle
          </h1>
          <p className="text-[9px] font-mono uppercase mt-1 tracking-widest font-black text-zinc-400">
            Tirunelveli Edition • Special Portfolio Feature
          </p>
        </div>

       
        <div className="flex flex-row items-start gap-4 border-b border-white/10 pb-5">
         
          <div className="border border-white/20 p-1.5 bg-zinc-950 rounded-xl shadow-xl w-28 md:w-36 shrink-0">
            <div className="overflow-hidden rounded-lg bg-zinc-900 aspect-[3/4]">
              <img 
                src="/rakesh.jpeg" 
                alt="Rakesh AKM Profile" 
                className="w-full h-full object-cover grayscale opacity-90 contrast-125" 
              />
            </div>
            <p className="text-center text-[8px] font-mono mt-1 uppercase tracking-wider font-black text-zinc-500">
              Fig 1.0: Rakesh
            </p>
          </div>

          
          <div className="flex-1 space-y-2 pt-1">
            <h3 className="text-xs md:text-sm font-black tracking-wider text-zinc-400 uppercase">/ RESUME OVERVIEW</h3>
            <div className="space-y-1 font-mono text-[10px] md:text-xs font-bold text-zinc-300">
              <p className="flex items-center gap-1">📍 <span>Base: Tirunelveli</span></p>
              <p className="flex items-center gap-1">🎓 <span>Degree: BCA (23-26)</span></p>
              <p className="flex items-center gap-1">🏫 <span>MS University</span></p>
            </div>
            <div className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded text-amber-400 font-mono inline-block">
              Aspiring Full-Stack Dev
            </div>
          </div>
        </div>

      
        <div className="w-full border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
          
       
          <div className="bg-zinc-950 p-4 md:p-6 space-y-3 border-b border-white/10">
            <h2 className="infinite-color-text text-sm md:text-base font-black uppercase tracking-wider border-b border-white/10 pb-1.5">
               THE DISCIPLINED SON
            </h2>
            <p className="text-xs md:text-sm text-zinc-300 leading-relaxed text-justify font-serif first-letter:text-3xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:text-white">
              I am a responsible and genuine individual who stays away from social media, focusing entirely on growth, coding, and the well-being of my family.
            </p>
          </div>

         

        </div>

      </div>

    
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-105vh) rotate(20deg);
            opacity: 0;
          }
        }
        .animate-balloon {
          animation: floatUp infinite linear;
        }
      `}</style>
    </div>
  );
}