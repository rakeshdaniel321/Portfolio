export default function Projects() {
  const projs = [
    {
      title: "1. Secure & Scalable User Login System (Backend)",
      desc: "Engineered a high-availability authentication system using Node.js and Express.js. Implemented Token Bucket Algorithm for API Rate Limiting and managed heavy background jobs using Redis and BullMQ distributed queues.",
      tech: ["Node.js", "Express.js", "Redis", "BullMQ", "JWT"]
    },
    {
      title: "2. Hotel Booking & Management System",
      desc: "Developed a complete Hotel Booking Management web application using the MERN stack. Architected seamless user workflows for exploring hotel rooms.",
      tech: ["MongoDB", "Express.js", "React", "Node.js"],
      link: "https://hotel-booking-management-navy.vercel.app"
    },
    {
      title: "3. Mobile Shop E-Commerce Platform",
      desc: "Built a responsive e-commerce platform for mobile accessories using Next.js, React, and MongoDB. Developed advanced Real-time Filtering & Search functionality.",
      tech: ["Next.js", "React", "MongoDB", "Tailwind CSS"]
    }
  ];

  return (
    <div className="min-h-screen p-4 pt-24 pb-12 max-w-4xl mx-auto space-y-10 bg-transparent flex flex-col justify-center">
      
      {/* ப்ராஜெக்ட் ஹெட்டிங் டைட்டில் */}
      <div className="flex justify-center">
        <h2 className="text-xl md:text-3xl font-black tracking-widest text-center uppercase bg-white text-black px-6 py-2 border-2 border-black rounded-xl shadow-md">
           WORK_PORTFOLIO
        </h2>
      </div>

      {/* 
        மொபைல் வியூவில் ஸ்லைடராகவும் (Horizontal Paper Slide), 
        டெஸ்க்டாப்பில் 2 Column கிரிட் வியூவாகவும் மாறும் கன்டைனர்.
      */}
      <div className="flex overflow-x-auto pb-6 pt-2 px-4 gap-6 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0 md:px-0 scrollbar-hide">
        {projs.map((p, idx) => (
          <div 
            key={idx} 
            className="min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-center bg-white border-2 border-black rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] md:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-xl space-y-5 relative overflow-hidden"
          >
            {/* புக் பேப்பர் எஃபெக்ட் தரும் கார்னர் ரிப்பன் (மொபைலுக்கு மட்டும்) */}
            <div className="absolute top-0 right-0 w-3 h-3 bg-zinc-300 rounded-bl-lg md:hidden shadow-inner" />

            <div className="space-y-3">
              {/* ப்ராஜெக்ட் தலைப்பு */}
              <h3 className="text-base md:text-xl font-black tracking-tight text-black">
                {p.title}
              </h3>
              
              {/* ப்ராஜெக்ட் விளக்கம் */}
              <p className="text-xs md:text-sm leading-relaxed font-bold text-zinc-900 text-justify">
                {p.desc}
              </p>
            </div>

            <div className="space-y-4">
              {/* டெக்னாலஜி டேக்குகள் */}
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t, i) => (
                  <span 
                    key={i} 
                    className="text-[9px] md:text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded border border-black font-bold uppercase tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
              {/* லைவ் லிங்க் இருந்தால் மட்டும் காட்டும் */}
              {p.link && (
                <div className="pt-1">
                  <a 
                    href={p.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-black text-black underline underline-offset-2 hover:text-zinc-700 block transition-colors"
                  >
                    Live Link &rarr;
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* மொபைல் வியூவில் பயனர்களுக்கு ஸ்லைடு செய்யக் காட்டும் சிறிய இண்டிகேட்டர் குறிப்பு */}
      <div className="text-center md:hidden animate-pulse">
        <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          ← Swipe to flip pages →
        </span>
      </div>

      {/* குளோபல் ஸ்க்ரோல்பார் ஹார்ட் ரீசெட் ஸ்டைல் */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}