import { Component } from "@/components/ui/morphing-card-stack"
import { Flag, Users, Sparkles, Handshake } from "lucide-react"

const cardData = [
    {
        id: "rallys",
        title: "Rallys Corporativos",
        description: "Dinámicas y competencias para impulsar colaboración y energía.",
        image: "/images/corporate/rally_3d.png",
        icon: <Flag className="h-5 w-5 text-red-500" />,
        color: "#ffffff"
    },
    {
        id: "integracion",
        title: "Integración de Equipo",
        description: "Experiencias para fortalecer vínculos y confianza entre áreas.",
        image: "/images/corporate/integration_3d.png",
        icon: <Users className="h-5 w-5 text-blue-500" />,
        color: "#ffffff"
    },
    {
        id: "activaciones",
        title: "Activaciones y Dinámicas",
        description: "Momentos de alto impacto para eventos y fechas especiales.",
        image: "/images/corporate/activations_3d.png",
        icon: <Sparkles className="h-5 w-5 text-yellow-500" />,
        color: "#ffffff"
    },
    {
        id: "conexiones",
        title: "Conexiones Estratégicas",
        description: "Networking de alto nivel para crear alianzas y oportunidades de crecimiento.",
        image: "/images/corporate/connections_3d.png",
        icon: <Handshake className="h-5 w-5 text-indigo-500" />,
        color: "#ffffff"
    }
]

export default function EventosCorporativosStack() {
    return (
        <div className="py-16 px-4 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 leading-tight">Eventos Corporativos</h2>
            <p className="text-center text-muted-foreground mb-8 text-base md:text-lg px-2">
                Experiencias para empresas: integración, energía y resultados reales.
            </p>
            <Component cards={cardData} defaultLayout="stack" />
        </div>
    )
}
