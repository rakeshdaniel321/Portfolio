import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function SidebarSocials() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress(window.scrollY / totalHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Icons காம்போனென்ட்டில் LinkedIn, GitHub உடன் இப்போது டெலிகிராம் பாட்டும் உள்ளது
  const Icons = () => (
    <>
      <a href="https://www.linkedin.com/in/rakesh-daniel-8882b0406" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      </a>
      
      <a href="https://github.com/rakeshdaniel321" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>

      {/* புதிய Telegram Bot லிங்க் மற்றும் பிரீமியம் ஐகான் */}
      <a href="https://t.me/rakesh_akm_portfolio_bot" target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors" aria-label="Telegram Bot Assistant">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </a>
    </>
  );

  return (
    <>
      {/* மொபைலில் ஹோம் பேஜில் மட்டும் காட்டும் சிங்கிள் டாப் பார் செட்டப் */}
      {location.pathname === "/" && (
        <div className="flex lg:hidden justify-center items-center gap-8 w-full py-4 z-40 bg-transparent absolute top-4 left-0 right-0">
          <Icons />
        </div>
      )}

      {/* டெஸ்க்டாப் வியூ லெஃப்ட் சைட் பார் */}
      <div className="hidden lg:flex fixed left-6 bottom-0 z-40 flex-col items-center space-y-6 after:content-[''] after:w-[1px] after:h-24 after:bg-zinc-800">
        <Icons />
      </div>

      {/* டெஸ்க்டாப் வியூ ரைட் சைட் பார் ஸ்க்ரோல் பார் */}
      <div className="hidden lg:flex fixed right-6 top-0 bottom-0 z-40 flex flex-col items-center">
        <div className="w-[1.5px] bg-zinc-800 transition-all duration-75 origin-top" style={{ height: `${scrollProgress * 80}vh` }} />
        <div className="text-zinc-500 transition-transform duration-75 -translate-y-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
            <line x1="12" y1="5" x2="12" y2="22"></line>
            <path d="M12 22a7 7 0 0 0 7-7h-2a5 5 0 0 1-5 5 5 5 0 0 1-5-5H3a7 7 0 0 0 7 7z"></path>
            <circle cx="12" cy="5" r="3"></circle>
          </svg>
        </div>
      </div>
    </>
  );
}