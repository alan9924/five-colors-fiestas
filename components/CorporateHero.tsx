import { Gravity, MatterBody } from "@/components/ui/gravity";
import { ChevronDown } from "lucide-react";

export function CorporateHero() {
    const scrollToContent = () => {
        const nextSection = document.querySelector('#corporate-intro');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col relative font-body overflow-hidden bg-white">
            {/* Subtle gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/20 pointer-events-none" />

            <div className="pt-32 pb-8 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-gray-900 w-full text-center font-black tracking-tighter z-10 pointer-events-none select-none">
                FiveColors Partners
            </div>
            <p className="pt-4 pb-8 text-xl sm:text-2xl md:text-3xl text-gray-600 w-full text-center font-bold z-10 pointer-events-none select-none">
                Experiencias Estratégicas para Organizaciones que Buscan Crecer
            </p>

            {/* Scroll indicator */}
            <button
                onClick={scrollToContent}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer group"
                aria-label="Scroll para ver más"
            >
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Arrastra los elementos
                </span>
                <div className="animate-bounce">
                    <ChevronDown className="w-8 h-8" />
                </div>
            </button>

            <Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full absolute top-0 left-0 z-0">
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="30%"
                    y="10%"
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#0015ff] text-white rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Team Building
                    </div>
                </MatterBody>
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="30%"
                    y="30%"
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#E794DA] text-white rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Integración
                    </div>
                </MatterBody>
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="40%"
                    y="20%"
                    angle={10}
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#1f464d] text-white rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Diversión
                    </div>
                </MatterBody>
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="75%"
                    y="10%"
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#ff5941] text-white rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Experiencias
                    </div>
                </MatterBody>
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="80%"
                    y="20%"
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-orange-500 text-white rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Creatividad
                    </div>
                </MatterBody>
                <MatterBody
                    matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
                    x="50%"
                    y="10%"
                >
                    <div className="text-xl sm:text-2xl md:text-3xl bg-[#ffd726] text-black rounded-full hover:cursor-grab active:cursor-grabbing px-8 py-4 font-bold shadow-lg">
                        Innovación
                    </div>
                </MatterBody>
            </Gravity>
        </div>
    );
}
