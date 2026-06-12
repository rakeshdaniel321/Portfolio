import { useNavigate } from 'react-router-dom';
import NameAnimation from '../components/NameAnimation';

export default function Home() {
  const navigate = useNavigate();

  const openDirectGmail = () => {
    const email = "rakeshdaniel321@gmail.com";
    const subject = encodeURIComponent("Hello Rakesh, Visited Your Portfolio");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-12 bg-transparent z-10">
      
      {/* Top Bar Navigation */}
      <div className="flex justify-between items-center text-2xl font-black px-2 pt-2">
        <span className="infinite-color-text cursor-pointer tracking-tighter" onClick={() => navigate('/')}>RD</span>
        <div className="flex gap-6 text-sm md:text-base font-black">
          <span onClick={openDirectGmail} className="infinite-color-text hover:underline cursor-pointer">Say hi..</span>
        </div>
      </div>

      {/* Center Row */}
      <div className="flex flex-col items-center my-auto w-full">
        <NameAnimation />
      </div>

      
      <div className="w-full bg-zinc-950/40 backdrop-blur-md border-t border-white/10 pt-4 pb-5 md:pb-4 md:border md:rounded-2xl md:max-w-4xl md:mx-auto">
        <div className="max-w-xs mx-auto flex flex-col items-center gap-4 text-xs uppercase tracking-widest font-black text-center md:max-w-full md:flex-row md:justify-between md:px-12 md:text-sm">
          <span onClick={() => navigate('/projects')} className="infinite-color-text cursor-pointer hover:underline py-1.5 w-full md:w-auto">Projects</span>
          <span onClick={() => navigate('/about')} className="infinite-color-text cursor-pointer hover:underline py-1.5 w-full md:w-auto">About</span>
          <span onClick={() => navigate('/skills')} className="infinite-color-text cursor-pointer hover:underline py-1.5 w-full md:w-auto">My Skills</span>
          
          <button 
            onClick={() => navigate('/flames')} 
            className="infinite-color-text border border-white/20 px-5 py-2 rounded-xl bg-zinc-900/50 font-black hover:bg-white hover:text-black transition-all active:scale-95 text-xs tracking-widest w-full md:w-auto shadow-md"
          >
            Flames Game
          </button>
        </div>
      </div>

    </div>
  );
}