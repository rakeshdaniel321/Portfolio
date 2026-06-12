export default function Skills() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-24 pb-12 max-w-3xl mx-auto bg-transparent">
      
      
      <div className="w-full bg-white border-2 border-black rounded-2xl p-6 md:p-8 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-2xl transition duration-300 space-y-6 font-mono text-sm text-black">
        
       
        <h2 className="text-xl md:text-2xl font-black text-center uppercase tracking-widest border-b-2 border-black pb-3">
           TECH_CAPABILITIES
        </h2>
        
        <div className="space-y-5 text-sm md:text-base">
          {/* Languages */}
          <div className="border-b border-black/20 pb-3 flex flex-col md:flex-row md:items-center">
            <span className="font-black uppercase tracking-wider min-w-[180px] text-zinc-900">
              Languages:
            </span>
            <p className="mt-1 md:mt-0 font-bold text-black bg-zinc-100 px-2 py-0.5 rounded md:inline-block">
              JavaScript (ES6+)
            </p>
          </div>

          {/* Frontend Stack */}
          <div className="border-b border-black/20 pb-3 flex flex-col md:flex-row md:items-center">
            <span className="font-black uppercase tracking-wider min-w-[180px] text-zinc-900">
              Frontend Stack:
            </span>
            <p className="mt-1 md:mt-0 font-bold text-black bg-zinc-100 px-2 py-0.5 rounded md:inline-block">
              HTML5, CSS3, React.js, Next.js
            </p>
          </div>

          {/* Backend Frameworks */}
          <div className="border-b border-black/20 pb-3 flex flex-col md:flex-row md:items-center">
            <span className="font-black uppercase tracking-wider min-w-[180px] text-zinc-900">
              Backend Stack:
            </span>
            <p className="mt-1 md:mt-0 font-bold text-black bg-zinc-100 px-2 py-0.5 rounded md:inline-block">
              Node.js, Express.js, REST APIs, Redis, BullMQ
            </p>
          </div>

          {/* Databases */}
          <div className="border-b border-black/20 pb-3 flex flex-col md:flex-row md:items-center">
            <span className="font-black uppercase tracking-wider min-w-[180px] text-zinc-900">
              Databases:
            </span>
            <p className="mt-1 md:mt-0 font-bold text-black bg-zinc-100 px-2 py-0.5 rounded md:inline-block">
              MongoDB, MySQL
            </p>
          </div>

          {/* Tools & Testing */}
          <div className="pt-1 flex flex-col md:flex-row md:items-center">
            <span className="font-black uppercase tracking-wider min-w-[180px] text-zinc-900">
              Tools & Testing:
            </span>
            <p className="mt-1 md:mt-0 font-bold text-black bg-zinc-100 px-2 py-0.5 rounded md:inline-block">
              Git, GitHub, Postman, Vercel, Render
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}