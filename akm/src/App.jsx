import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

// உங்களது காம்போனென்ட்கள் மற்றும் பக்கங்கள்
import GoldCoins from './components/GoldCoins';
import Home from './pages/Home';
import DestinyAboutCard from './pages/DestinyAboutCard'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import FlamesModal from './components/FlamesModal';
import SidebarSocials from './components/SidebarSocials';
import About from './pages/About';

// 📊 அனலிட்டிக்ஸ் டிராக்கிங் செய்ய உதவும் ஒரு உட்புற காம்போனென்ட்
function AnalyticsTracker() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    let currentUserId = null;

    // 1. டெலிகிராம் WebApp மூலம் பயனரின் தனித்துவமான ID-யைப் பெறுதல்
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        currentUserId = tg.initDataUnsafe.user.id;
        setUserId(currentUserId);
        sendInitialMetrics(currentUserId);
      }
    }

    // டெலிகிராம் இல்லாத சாதாரண பிரவுசர் என்றால் ஒரு தற்காலிக ID
    if (!currentUserId) {
      currentUserId = "WEB_" + Math.floor(100000 + Math.random() * 900000);
      setUserId(currentUserId);
      sendInitialMetrics(currentUserId);
    }

    // 2. பயனர் வெப்சைட்டை விட்டு வெளியேறும்போது இறுதி Screen Time-ஐ அனுப்புதல்
    return () => {
      const totalScreenTimeSec = Math.floor((Date.now() - startTime) / 1000);
      if (currentUserId) {
        navigator.sendBeacon(
          'https://rakeshakmbot.onrender.com/api/update-screen-time',
          JSON.stringify({ telegramId: currentUserId, screenTime: totalScreenTimeSec })
        );
      }
    };
  }, []);

  // சாதனத்தின் திரையளவு, பிரவுசர் மற்றும் GPS விவரங்களைச் சேகரிக்கும் ஃபங்ஷன்
  const sendInitialMetrics = async (tgId) => {
    const browser = navigator.userAgent;
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;
    let resolvedLocation = "Permission Denied / N/A";
    let lat = null, lon = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        try {
          // OpenStreetMap API மூலம் லொகேஷனை கிராமம்/நகரமாக மாற்றுதல் (Reverse Geocoding)
          const geoRes = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
          resolvedLocation = geoRes.data.display_name;
        } catch (err) {
          resolvedLocation = `Lat: ${lat}, Lon: ${lon} (Geocode Failed)`;
        }

        // சேகரிக்கப்பட்ட தரவை பேக்-எண்டிற்கு அனுப்புதல்
        await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
          telegramId: tgId,
          browser,
          screenSize,
          latitude: lat,
          longitude: lon,
          resolvedLocation
        });
      }, () => {
        // லொகேஷன் அனுமதி மறுக்கப்பட்டால் அடிப்படை விவரங்களை மட்டும் அனுப்புதல்
        axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
          telegramId: tgId,
          browser,
          screenSize,
          latitude: null,
          longitude: null,
          resolvedLocation: "Permission Denied"
        });
      });
    }
  };

  return null; // இது ஒரு பின்னணி டிராக்கர் என்பதால் UI எதுவும் தேவையில்லை
}

// வட்ட வடிவம் இல்லாமல், பெயர் மற்றும் கிளிக் டெக்ஸ்ட் மட்டும் கொண்ட காம்போனென்ட்
function CenterNavigationTrigger() {
  const location = useLocation();
  const navigate = useNavigate();

  // Root path ("/") இல் மட்டும் தான் இந்த பட்டன் தெரிய வேண்டும்
  if (location.pathname !== "/") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
      <button
        onClick={() => navigate('/here')}
        className="group flex flex-col items-center justify-center pointer-events-auto bg-transparent border-none outline-none focus:outline-none active:scale-95 transition-transform duration-200"
        aria-label="Click here to go to About Page"
      >
        {/* உங்கள் பெயர் - பெரிய மற்றும் தடிமனான பிரீமியம் எழுத்துக்களில் */}
        <h1 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-red-500">
          RAKESH DANIEL
        </h1>
        
        {/* பெயருக்கு கீழே வரும் "click here" சிறிய உரைவடிவம் */}
        <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest mt-2 transition-colors duration-300 group-hover:text-zinc-200 animate-pulse">
          click here
        </span>
      </button>
    </div>
  );
}

// குளோபல் பேக் பட்டன் - ஹோம் மற்றும் பிளேம்ஸ் பக்கங்களில் தெரியாது
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
        
        {/* லைவ் டிராக்கிங் சிஸ்டம் காம்போனென்ட் */}
        <AnalyticsTracker />

        {/* அனிமேஷன் எஃபெக்ட்ஸ் */}
        <GoldCoins />
        
        {/* பேக் பட்டன் */}
        <GlobalBackButton />
        
        {/* சென்ட்ரல் "Click Here" ட்ரிகர் */}
        <CenterNavigationTrigger />
        
        {/* ஆப் ரூட்டிங் செட்டப் */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/here" element={<DestinyAboutCard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/flames" element={<FlamesModal isOpen={true} onClose={() => window.location.href = '/'} />} />
        </Routes>

        <SidebarSocials /> 

        {/* குளோபல் இன்ஃபினைட் கலர் டெக்ஸ்ட் ஸ்டைல் */}
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