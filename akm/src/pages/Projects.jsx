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
    <div className="min-h-screen p-4 pt-24 pb-12 max-w-4xl mx-auto space-y-12 bg-transparent">
      

      <div className="flex justify-center">
        <h2 className="text-2xl md:text-3xl font-black tracking-widest text-center uppercase bg-white text-black px-6 py-2 border-2 border-black rounded-xl shadow-md">
           WORK_PORTFOLIO
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projs.map((p, idx) => (
         
          <div 
            key={idx} 
            className="bg-white border-2 border-black rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition duration-300 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-xl space-y-5"
          >
            <div className="space-y-3">
             
              <h3 className="text-lg md:text-xl font-black tracking-tight text-black">
                {p.title}
              </h3>
              
              <p className="text-xs md:text-sm leading-relaxed font-bold text-zinc-900">
                {p.desc}
              </p>
            </div>

            <div className="space-y-4">
           
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t, i) => (
                  <span 
                    key={i} 
                    className="text-[10px] font-mono bg-black text-white px-2 py-0.5 rounded border border-black font-bold uppercase tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>
              
             
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
    </div>
  );
}