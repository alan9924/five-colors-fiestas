import { AnimatedFolder } from "@/components/ui/3d-folder";

const rallyProjects = [
    {
        id: "rally-1",
        title: "Rally en Familia",
        image: "/images/corporate/rally/rally-1.png",
    },
    {
        id: "rally-2",
        title: "Torneos Internos",
        image: "/images/corporate/rally/rally-2.png",
    },
    {
        id: "rally-3",
        title: "Competencia Divertida",
        image: "/images/corporate/rally/rally-3.png",
    },
    {
        id: "rally-4",
        title: "Juegos de fuerza",
        image: "/images/corporate/rally/rally-4.jpg",
    },
    {
        id: "rally-5",
        title: "Dinámicas de coordinación",
        image: "/images/corporate/rally/rally-5.jpg",
    },
];

export function CorporateRallyGallery() {
    return (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[10%] right-[5%] w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-bold tracking-wider mb-4 uppercase">
                        Experiencias Reales
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        Galería
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Explora momentos llenos de energía, risas y colaboración.
                    </p>
                </div>

                <div className="transform hover:scale-105 transition-transform duration-500">
                    <AnimatedFolder
                        title="Fotos del Evento"
                        projects={rallyProjects}
                        className="w-full max-w-md mx-auto shadow-2xl shadow-blue-900/10 border-blue-100/50"
                    />
                </div>

                <p className="mt-8 text-sm text-gray-400 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Haz click en la carpeta para ver las fotos
                </p>
            </div>
        </section>
    );
}
