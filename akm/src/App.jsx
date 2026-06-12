import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import GoldCoins from './components/GoldCoins';
import Home from './pages/Home';
import DestinyAboutCard from './pages/DestinyAboutCard'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import FlamesModal from './components/FlamesModal';
import SidebarSocials from './components/SidebarSocials';
import About from './pages/About';

// வட்ட வடிவம் இல்லாமல், பெயர் மற்றும் கிளிக் டெக்ஸ்ட் மட்டும் கொண்ட காம்போனென்ட்
function CenterNavigationTrigger() {
  const location = useLocation();
  const navigate = useNavigate();

  // Root path ("/") இல் மட்டும் தான் இந்த பட்டன் தெரிய வேண்டும்
  if (location.pathname !== "/") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
      {/* க்ளிக் செய்யக்கூடிய வகையில் pointer-events-auto சேர்க்கப்பட்டுள்ளது */}
      <button
        onClick={() => navigate('/about')}
        className="group flex flex-col items-center justify-center pointer-events-auto bg-transparent border-none outline-none focus:outline-none active:scale-95 transition-transform duration-200"
        aria-label="Click here to go to About Page"
      >
        {/* உங்கள் பெயர் - பெரிய மற்றும் தடிமனான பிரீமியம் எழுத்துக்களில் */}
        <h1 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-red-500">
         
        </h1>
        
        {/* பெயருக்கு கீழே வரும் "click here" சிறிய உரைவடிவம் */}
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-2 transition-colors duration-300 group-hover:text-zinc-200 animate-pulse">
          click here
        </span>
      </button>
    </div>
  );
}

function GlobalBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/" || location.pathname === "/flames") return null;

  return (
    <button 
      onClick={() => navigate('/')} 
      className="fixed top-4 left-4 z-50 p-2.5 rounded-full border border-white/20 bg-zinc-900/60 backdrop-blur-md shadow-lg active:scale-95 transition flex items-center justify-center text-white/80 hover:text-white"
      aria-label="Go Back"
    >
      <ArrowLeft size={20} />
    </button>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden select-none">
        
        <GoldCoins />
        <SidebarSocials />
        <GlobalBackButton />
        
        {/* உங்கள் பெயரைக் கொண்ட சென்ட்ரல் ட்ரிகர் */}
        <CenterNavigationTrigger />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/flames" element={<FlamesModal isOpen={true} onClose={() => window.location.href = '/'} />} />
        </Routes>

        <style>{`
          body {
            background-color: #000000 !important;
          }
          .infinite-color-text {
            animation: textFourColors 5s infinite linear !important;
          }
          @keyframes textFourColors {
            0%, 100% { color: #ff3333 !important; }
            25% { color: #3366ff !important; }
            50% { color: #22cc22 !important; }
            75% { color: #eecc00 !important; }
          }
        `}</style>
      </div>
    </Router>
  );
}