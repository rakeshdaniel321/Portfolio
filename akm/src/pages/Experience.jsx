export default function Experience() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 pb-12 max-w-3xl mx-auto space-y-6 bg-transparent">
      <h2 className="text-2xl md:text-3xl font-black tracking-widest text-center w-full uppercase">// EXPERIENCE & CERTIFICATION</h2>
      
      <div className="w-full bg-white/90 border-2 border-black rounded-xl p-6 space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-2">
          <div>
            <h3 className="text-xl font-black">FSD Master Class Certificate</h3>
            <p className="text-xs font-bold">Institution: NoviTech R&D Private Limited</p>
          </div>
          <span className="bg-black text-white border border-black px-3 py-1 text-[10px] uppercase font-mono rounded font-bold">30-Days Intensive</span>
        </div>
        <p className="text-sm font-medium leading-relaxed">
          Successfully completed a 30-day intensive MasterClass covering foundational and advanced skills in modern web development architectures.
        </p>
      </div>
    </div>
  );
}