import React from 'react';

const KeycapStack: React.FC = () => {
  return (
    <section className="relative w-full min-h-[800px] bg-[#000000] flex items-center justify-center overflow-hidden py-20">
      
      {/* --- BACKGROUND BLOBS / GLOWS --- */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-brand-orange/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[500px] bg-brand-green/20 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>

      {/* --- FLOATING KEYCAPS BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* We can programmatically generate these or hardcode a few for the effect */}
         {Array.from({ length: 15 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-12 h-12 rounded-lg"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`,
                filter: `blur(${2 + Math.random() * 4}px)`,
                backgroundColor: ['#FF9F43', '#FFFFFF', '#4ECDC4'][Math.floor(Math.random() * 3)],
                opacity: 0.3 + Math.random() * 0.3,
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2), 4px 4px 0 rgba(0,0,0,0.3)'
              }}
            />
         ))}
      </div>

      {/* --- MAIN STACK CONTAINER --- */}
      <div className="relative z-10 flex flex-col gap-6 items-center">
        
        {/* -- TECLA 1: 'i' (Cream) -- */}
        <div className="group relative w-32 h-32 md:w-40 md:h-40 transition-transform active:scale-95 duration-100">
           {/* Keycap Shape */}
           <div className="absolute inset-0 bg-[#F5F5DC] rounded-xl shadow-[0px_10px_0px_#C4C4B5,0px_15px_20px_rgba(0,0,0,0.4)] flex items-center justify-center border-b-4 border-[#E6E6C8]">
              {/* Top Face */}
              <div className="w-[80%] h-[80%] bg-[#FFFDD0] rounded-lg shadow-[inset_0px_2px_5px_rgba(0,0,0,0.05),0px_2px_0px_white] flex items-center justify-center transform active:translate-y-1 transition-transform relative overflow-hidden">
                 {/* Slight concave gradient */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"></div>
                 <span className="font-pixel text-4xl md:text-5xl text-black z-10">i</span>
              </div>
           </div>
        </div>

        {/* -- TECLA 2: 'feel' (Orange Resin/Translucent) -- */}
        <div className="group relative w-32 h-32 md:w-40 md:h-40 transition-transform active:scale-95 duration-100">
           {/* Glow behind */}
           <div className="absolute inset-0 bg-orange-500/50 blur-xl rounded-full scale-110"></div>
           
           <div className="absolute inset-0 bg-[#FF8C00]/90 backdrop-blur-sm rounded-xl shadow-[0px_10px_0px_#CC7000,0px_0px_30px_#FFA500] flex items-center justify-center border-2 border-white/20 border-b-4 border-[#B86500]">
              {/* Top Face - Semi transparent */}
              <div className="w-[80%] h-[80%] bg-[#FFA500]/80 rounded-lg shadow-[inset_0px_0px_15px_rgba(255,255,255,0.4)] flex items-center justify-center relative overflow-hidden ring-1 ring-white/30">
                 {/* Internal texture/noise for resin look */}
                 <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                 
                 <span className="font-pixel text-2xl md:text-3xl text-white drop-shadow-md z-10 tracking-widest uppercase">feel</span>
                 
                 {/* Shine */}
                 <div className="absolute top-2 left-2 w-full h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-lg"></div>
              </div>
           </div>
        </div>

        {/* -- TECLA 3: 'so' (Light Orange/Cream) -- */}
        <div className="group relative w-32 h-32 md:w-40 md:h-40 transition-transform active:scale-95 duration-100">
          <div className="absolute inset-0 bg-[#FFDAB9] rounded-xl shadow-[0px_10px_0px_#E3C0A0,0px_15px_20px_rgba(0,0,0,0.4)] flex items-center justify-center border-b-4 border-[#DDB696]">
              <div className="w-[80%] h-[80%] bg-[#FFF0DB] rounded-lg shadow-[inset_0px_2px_5px_rgba(0,0,0,0.05),0px_2px_0px_white] flex items-center justify-center relative">
                 <span className="font-pixel text-3xl md:text-4xl text-black z-10">so</span>
              </div>
           </div>
        </div>

        {/* -- TECLA 4: ':)' (Neon Green/Mint) -- */}
        <div className="group relative w-32 h-32 md:w-40 md:h-40 transition-transform active:scale-95 duration-100">
           {/* Strong Green Glow */}
           <div className="absolute inset-0 bg-[#39FF14]/40 blur-2xl rounded-full scale-125"></div>

           <div className="absolute inset-0 bg-[#4ECDC4] rounded-xl shadow-[0px_10px_0px_#3DB5AC,0px_0px_40px_rgba(78,205,196,0.6)] flex items-center justify-center border-b-4 border-[#359C94]">
              <div className="w-[80%] h-[80%] bg-[#76EBE3] rounded-lg shadow-[inset_0px_2px_5px_rgba(0,0,0,0.05),0px_2px_0px_#A0F5EF] flex items-center justify-center relative">
                 {/* Smiley Face Pixel Art */}
                 <div className="font-pixel text-5xl md:text-6xl text-black z-10 transform rotate-90">: )</div>
              </div>
           </div>
        </div>

        {/* Connecting wire/cable decoration (optional, implied by 'keyboard' theme but not requested, skipping to keep clean) */}

      </div>
    </section>
  );
};

export default KeycapStack;
