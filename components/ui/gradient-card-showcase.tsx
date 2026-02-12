import React from 'react';

const cards = [
    {
        title: "Cumpleaños",
        desc: "Celebra el día especial de tu pequeño con un show inolvidable lleno de magia, música y diversión. Nuestros personajes harán que cada momento sea memorable.",
        gradientFrom: "#FFBC00",
        gradientTo: "#FF0058",
    },
    {
        title: "Bautizos",
        desc: "Convierte este día sagrado en una celebración llena de alegría. Entretenimiento apropiado y memorable para todas las edades en esta ocasión tan especial.",
        gradientFrom: "#03A9F4",
        gradientTo: "#8B5CF6",
    },
    {
        title: "Graduaciones",
        desc: "Celebra este importante logro con un espectáculo que los pequeños nunca olvidarán. Perfecto para graduaciones de kínder y preescolar.",
        gradientFrom: "#F59E0B",
        gradientTo: "#F97316",
    },
    {
        title: "Eventos Escolares",
        desc: "Shows educativos y divertidos para festivales escolares, día del niño, posadas y cualquier celebración en tu escuela. Adaptamos nuestro show a tus necesidades.",
        gradientFrom: "#22C55E",
        gradientTo: "#06B6D4",
    }
];

export default function SkewCards() {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
            animation: blob 7s infinite;
        }
        .animation-delay-2000 {
            animation-delay: 2s;
        }
        .animation-delay-4000 {
            animation-delay: 4s;
        }
      `}} />

            <div className="flex justify-center items-center flex-wrap gap-10 py-10">
                {cards.map((card, index) => (
                    <div key={index} className="relative w-full max-w-[360px] group">
                        {/* Skewed Panels Background */}
                        <span
                            className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out transform skew-y-6 opacity-60 rounded-3xl group-hover:skew-y-0 group-hover:rotate-0"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${card.gradientFrom}, ${card.gradientTo})`,
                                zIndex: 0
                            }}
                        ></span>
                        <span
                            className="absolute top-0 left-0 w-full h-full transition-all duration-300 ease-in-out transform -skew-y-6 opacity-60 rounded-3xl group-hover:skew-y-0 group-hover:rotate-0 blur-sm"
                            style={{
                                backgroundImage: `linear-gradient(to right, ${card.gradientFrom}, ${card.gradientTo})`,
                                zIndex: 0
                            }}
                        ></span>

                        {/* Card Container - Glass Effect */}
                        <div className="relative z-10 w-full h-full bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-xl transition-all duration-300 border border-white/40 text-slate-900 group-hover:translate-y-[-5px]">

                            {/* Decorative Blobs inside */}
                            <div className="absolute top-0 -right-4 w-24 h-24 bg-purple-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                            <div className="absolute -bottom-8 left-4 w-24 h-24 bg-yellow-300/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

                            {/* Content */}
                            <div className="relative flex flex-col h-full min-h-[250px] space-y-4">
                                <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r"
                                    style={{ backgroundImage: `linear-gradient(to right, ${card.gradientFrom}, ${card.gradientTo})` }}>
                                    {card.title}
                                </h3>

                                <p className="text-[15px] font-medium leading-relaxed opacity-80 flex-grow">
                                    {card.desc}
                                </p>

                                <div className="pt-4">
                                    <a href="#contacto"
                                        className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white uppercase tracking-wider rounded-xl shadow-lg transition-transform transform active:scale-95 hover:shadow-xl"
                                        style={{ backgroundImage: `linear-gradient(to right, ${card.gradientFrom}, ${card.gradientTo})` }}>
                                        Ver detalles
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
