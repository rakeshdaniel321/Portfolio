import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

// உங்களுடைய காம்போனென்ட்கள் மற்றும் பக்கங்கள்
import GoldCoins from './components/GoldCoins';
import Home from './pages/Home';
import DestinyAboutCard from './pages/DestinyAboutCard'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import FlamesModal from './components/FlamesModal';
import SidebarSocials from './components/SidebarSocials';
import About from './pages/About';

// 📊 அனலிட்டிக்ஸ் மற்றும் வாட்ஸ்அப் போல துல்லியமான GPS லொகேஷன் டிராக்கிங் செய்யும் காம்போனென்ட்
function AnalyticsTracker() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    // 🔍 1. URL-ல் இருந்து 'tgId' பேராமீட்டரை டைனமிக்காக எடுத்தல்
    const urlParams = new URLSearchParams(window.location.search);
    let currentUserId = urlParams.get('tgId');

    // ஒருவேளை URL-ல் இல்லை என்றால், டெலிகிராம் WebApp இன்டர்பேஸ் மூலம் சோதித்தல்
    if (!currentUserId && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); // வெப்-ஆப்பை முழு திரையாக்குதல்
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        currentUserId = tg.initDataUnsafe.user.id.toString();
      }
    }

    // டெலிகிராம் இல்லாத சாதாரண பொதுவான வெப் விசிட்டர் என்றால் ஒரு தற்காலிக ID உருவாக்குதல்
    if (!currentUserId) {
      currentUserId = "WEB_" + Math.floor(100000 + Math.random() * 900000);
    }

    setUserId(currentUserId);
    sendInitialMetrics(currentUserId);

    // 2. பயனர் வெப்சைட்டை விட்டு வெளியேறும்போது இறுதி Screen Time-ஐப் பின்னணியில் அனுப்புதல்
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

  // பயனரின் தற்போதைய பக்கம் மாறும்போது அதைத் தனியாகப் பதிவு செய்தல்
  useEffect(() => {
    if (userId) {
      axios.post('https://rakeshakmbot.onrender.com/api/track-page', {
        telegramId: userId,
        page: location.pathname
      }).catch(err => console.error("Page track error:", err.message));
    }
  }, [location, userId]);

  // சாதனத்தின் திரையளவு, பிரவுசர் மற்றும் துல்லியமான GPS விவரங்களைச் சேகரிக்கும் ஃபங்ஷன்
  const sendInitialMetrics = async (tgId) => {
    const browser = navigator.userAgent;
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;

    if (navigator.geolocation) {
      // 🎯 வாட்ஸ்அப் போல மிகத் துல்லியமான GPS ஆன் செய்யும் ஆப்சன்கள்
      const geoOptions = {
        enableHighAccuracy: true, 
        timeout: 15000,           
        maximumAge: 0             
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          let resolvedLocation = "Geocode Failed / N/A";

          try {
            // 🗺️ OpenStreetMap API மூலமாக லொகேஷனை கிராமம்/நகரம்/ஏரியா பெயராக மாற்றுதல்
            const geoRes = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
              {
                headers: { 'User-Agent': 'RakeshPortfolioAnalytics/1.0' }
              }
            );
            
            const address = geoRes.data.address;
            
            // கிராமம், நகரம், ஏரியா விபரங்களை மிகத் துல்லியமாகப் பிரித்து எடுத்தல்
            const currentArea = address.suburb || address.neighbourhood || address.village || address.road || "Unknown Area";
            const city = address.city || address.town || address.district || "Unknown City";
            const state = address.state || "";
            
            resolvedLocation = `${currentArea}, ${city}, ${state}`;
          } catch (err) {
            resolvedLocation = `Lat: ${lat}, Lon: ${lon} (Name Fetch Timeout)`;
          }

          // சேகரிக்கப்பட்ட முழுமையான லொகேஷன் தரவை பேக்-எண்டிற்கு அனுப்புதல்
          await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
            telegramId: tgId,
            browser,
            screenSize,
            latitude: lat,
            longitude: lon,
            resolvedLocation
          }).catch(err => console.error("Metrics send error:", err.message));
        },
        async (error) => {
          // லொகேஷன் அனுமதி மறுக்கப்பட்டால் அடிப்படை விவரங்களை மட்டும் அனுப்புதல்
          await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
            telegramId: tgId,
            browser,
            screenSize,
            latitude: null,
            longitude: null,
            resolvedLocation: "Permission Denied / N/A"
          }).catch(err => console.error("Metrics backup error:", err.message));
        },
        geoOptions
      );
    } else {
      // Geolocation வசதி பிரவுசரில் இல்லை என்றால் அடிப்படை விவரங்களை மட்டும் அனுப்புதல்
      await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
        telegramId: tgId,
        browser,
        screenSize,
        latitude: null,
        longitude: null,
        resolvedLocation: "Geolocation Not Supported"
      }).catch(err => console.error("Metrics fallback error:", err.message));
    }
  };

  return null; // பின்னணி டிராக்கர் என்பதால் UI ஏதும் இல்லை
}

// பெயர் மற்றும் கிளிக் டெக்ஸ்ட் மட்டும் கொண்ட சென்டர் ட்ரிகர் காம்போனென்ட்
function CenterNavigationTrigger() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname !== "/") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
      <button
        onClick={() => navigate('/here')}
        className="group flex flex-col items-center justify-center pointer-events-auto bg-transparent border-none outline-none focus:outline-none active:scale-95 transition-transform duration-200"
        aria-label="Click here to go to About Page"
      >
        <h1 className="font-sans text-4xl md:text-5xl font-black uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-red-500">
          RAKESH DANIEL
        </h1>
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