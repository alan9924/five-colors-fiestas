import { CircularRevealHeading } from "@/components/ui/circular-reveal-heading";

export function SpecialExperiencesCircular() {
    const items = [
        {
            text: "MEDITACIÓN",
            image: "/corporate/meditacion.png"
        },
        {
            text: "EMOCIONES",
            image: "/corporate/emociones.png"
        },
        {
            text: "BIENESTAR",
            image: "/corporate/bienestar.png"
        },
        {
            text: "FAMILIA",
            image: "/corporate/familia.png"
        }
    ];

    return (
        <section className="py-24 px-6 bg-[#f5f5f5] overflow-hidden flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-black mb-16 text-center text-slate-900">
                Experiencias Especiales
            </h3>

            <div className="relative flex justify-center items-center w-full">
                <CircularRevealHeading
                    items={items}
                    centerText={
                        <div className="bg-white/80 backdrop-blur-sm px-8 py-6 rounded-[2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.5),0_8px_16px_rgba(0,0,0,0.1)] border border-white/50 flex flex-col items-center justify-center gap-1 min-w-[200px]">
                            <div className="text-lg md:text-xl font-black text-[#0B1B3A] tracking-tighter">
                                FIVECOLORS
                            </div>
                            <div className="text-[10px] md:text-xs font-bold text-[#536b78] tracking-[0.2em] uppercase">
                                EXPERIENCE
                            </div>
                        </div>
                    }
                    size="lg"
                    className="shadow-2xl"
                />
            </div>

            <p className="mt-12 text-center text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                Descubre un nuevo nivel de conexión. Diseñamos espacios de meditación, talleres de inteligencia emocional y días de integración familiar para fortalecer el corazón de tu empresa.
            </p>
        </section>
    );
}
