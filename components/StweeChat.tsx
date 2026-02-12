
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Send, Sparkles, X, Volume2, Info, BookOpen, Wand2, Lightbulb, Search, GraduationCap, Star, Coffee, Zap, Heart } from 'lucide-react';

interface Message {
  role: 'user' | 'stwee';
  text: string;
  isEducational?: boolean;
  audioData?: string;
  sources?: { title: string; uri: string }[];
}

const SUGGESTIONS = [
  "¿Por qué el cielo es azul? ☁️",
  "¡Cuéntame sobre dinosaurios! 🦖",
  "¿Cómo se hace el arcoíris? 🌈",
  "¿De dónde son las llamas? 🦙",
  "¡Dime un chiste de llamas! 🦙"
];

const StweeChat: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'stwee', 
      text: '¡Hoola, amiguito explorador! ¡Soy Stwee! 🦙✨ ¡Mi máquina de curiosidad está encendida! ¿Sabías que las llamas tenemos tres estómagos? ¡Baaaa-rreíble! ¿Qué gran misterio vamos a resolver hoy? ¡Pregúntame lo que quieras!' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const decodeAudioData = async (base64: string) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') await ctx.resume();
    
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    
    const dataInt16 = new Int16Array(bytes.buffer);
    const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < dataInt16.length; i++) {
      channelData[i] = dataInt16[i] / 32768.0;
    }
    return buffer;
  };

  const playAudio = async (base64: string) => {
    try {
      const buffer = await decodeAudioData(base64);
      const source = audioContextRef.current!.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current!.destination);
      source.start();
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const handleAction = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage = text.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `Eres Stwee la Llama, la mascota mágica de Five Colors. 
      PERSONALIDAD: Eres como un personaje de Disney o Pixar: extremadamente feliz, energético, saltarín y un poquito travieso. 
      TU VOZ: Usas onomatopeyas divertidas como "¡Baaaa-rreíble!", "¡Llama-stástico!", "¡Woooow!", "¡Zas!", "¡Pum!".
      MISION: Eres un profesor mágico para niños de 4 a 10 años. Si te preguntan algo científico o histórico, utiliza Google Search para dar el dato exacto, pero explícalo como si fuera un cuento de hadas o una aventura épica.
      REGLA: Si la respuesta es un dato educativo, menciona que lo sacaste de tu "Libro Secreto de la Sabiduría de las Llamas". 
      SEGURIDAD: Sé siempre amable, protector y divertido. Termina a veces con una broma corta de llamas.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => m.text), userMessage].join('\n'),
        config: {
          systemInstruction,
          temperature: 0.9,
          tools: [{ googleSearch: {} }]
        },
      });

      const stweeText = response.text || '¡Uy! ¡Mi cerebro de lana se hizo un nudo! 🧶 ¿Lo repetimos?';
      
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || 'Fuente Sabia',
        uri: chunk.web?.uri || '#'
      })).filter((s: any) => s.uri !== '#').slice(0, 2);

      let audioBase64 = '';
      if (isAudioEnabled) {
          try {
            const ttsResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-preview-tts',
                contents: [{ parts: [{ text: `Dilo con la voz más feliz y traviesa de un personaje de dibujos animados: ${stweeText}` }] }],
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
                    }
                }
            });
            audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || '';
          } catch(e) { console.warn("TTS Failed", e); }
      }

      const isEducational = !!groundingChunks || stweeText.length > 80;

      // Realistic delayed pop-in for magical effect
      setTimeout(() => {
        setMessages(prev => [...prev, { 
            role: 'stwee', 
            text: stweeText, 
            isEducational,
            audioData: audioBase64,
            sources
        }]);
        setIsLoading(false);
        if (audioBase64) playAudio(audioBase64);
      }, 1800);

    } catch (error) {
      console.error('Stwee Error:', error);
      setMessages(prev => [...prev, { role: 'stwee', text: '¡Baaaa-mba! Hubo un cortocircuito en mis pezuñas mágicas. 🌵' }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-2xl h-[92vh] md:h-[85vh] bg-brand-cream border-[8px] border-gray-900 rounded-[3.5rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden relative animate-bubble-pop">
        
        {/* Header con Personaje Animado */}
        <div className="bg-brand-blue p-5 md:p-6 border-b-[6px] border-gray-900 flex items-center justify-between relative overflow-hidden">
            {/* Fondo de Estrellas Animadas */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="flex gap-10 animate-marquee">
                    {[...Array(20)].map((_, i) => <Sparkles key={i} className="text-white" size={24} />)}
                </div>
            </div>

            <div className="flex items-center gap-4 relative z-10">
                <div className="group relative">
                    <div className="absolute -inset-1 bg-brand-yellow rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full border-4 border-gray-900 p-1 overflow-hidden relative shadow-xl transform transition-all group-hover:scale-110">
                        <img 
                            src="https://api.dicebear.com/9.x/big-smile/svg?seed=Stwee&skinColor=ffffff&hair=mohawk" 
                            alt="Stwee" 
                            className={`w-full h-full object-contain ${isLoading ? 'animate-llama-think' : 'animate-llama-idle'}`}
                        />
                    </div>
                    {isLoading && (
                        <div className="absolute -top-2 -right-2 bg-brand-yellow rounded-full p-1 border-2 border-gray-900 animate-bounce">
                            <Zap size={12} className="text-gray-900" />
                        </div>
                    )}
                </div>
                <div>
                    <h2 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">STWEE IA</h2>
                    <div className="flex gap-2 mt-1">
                        <span className="bg-brand-pink text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-gray-900 uppercase animate-pulse">MODO MAGIA</span>
                        <span className="bg-brand-green text-white text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-gray-900 uppercase">ONLINE</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2 relative z-10">
                <button 
                    onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                    className={`p-3 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none transition-all ${isAudioEnabled ? 'bg-brand-yellow text-gray-900 animate-pulse' : 'bg-gray-400 text-white'}`}
                >
                    <Volume2 size={24} />
                </button>
                <button 
                    onClick={onClose}
                    className="bg-brand-pink text-white p-3 rounded-2xl border-4 border-gray-900 shadow-[4px_4px_0px_0px_#000] hover:bg-red-500 active:translate-y-1 active:shadow-none transition-all"
                >
                    <X size={24} />
                </button>
            </div>
        </div>

        {/* Zona de Chat con Burbujas Especiales */}
        <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 md:p-6 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"
        >
            {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-bubble-pop`}>
                    <div className={`flex flex-col max-w-[92%] md:max-w-[85%] relative`}>
                        {/* Partículas de "poof" solo cuando aparece el mensaje */}
                        <div className="absolute inset-0 pointer-events-none opacity-40">
                             <div className="absolute top-0 left-0 animate-sparkle-1"><Star size={10} fill="#FFD700" /></div>
                             <div className="absolute bottom-0 right-0 animate-sparkle-2"><Zap size={14} className="text-brand-pink" /></div>
                             <div className="absolute top-1/2 right-0 animate-sparkle-3"><Heart size={12} className="text-brand-yellow fill-current" /></div>
                        </div>

                        <div className={`p-5 md:p-6 rounded-[2.5rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative group transition-all duration-300 transform hover:rotate-1
                            ${m.role === 'user' ? 'bg-brand-blue text-white rounded-br-none' : 'bg-white text-gray-900 rounded-bl-none'}
                            ${m.isEducational ? 'ring-4 ring-brand-yellow ring-offset-4 bg-brand-cream/30' : ''}`}>
                            
                            {m.role === 'stwee' && (
                                <div className="absolute -top-4 -left-2 flex gap-2">
                                    <div className="bg-brand-yellow text-gray-900 text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900 flex items-center gap-1 shadow-[2px_2px_0_0_#000] animate-bounce-soft">
                                        <Wand2 size={12} className="animate-spin-slow" /> STWEE DICE
                                    </div>
                                    {m.isEducational && (
                                        <div className="bg-brand-green text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-gray-900 flex items-center gap-1 animate-pulse shadow-[2px_2px_0_0_#000]">
                                            <GraduationCap size={12} /> ¡MAGIA PURA!
                                        </div>
                                    )}
                                </div>
                            )}
                            
                            <p className="font-bold text-lg md:text-xl leading-[1.3] whitespace-pre-wrap selection:bg-brand-yellow selection:text-gray-900">{m.text}</p>

                            {m.sources && m.sources.length > 0 && (
                                <div className="mt-4 pt-4 border-t-2 border-gray-900/10">
                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-2 flex items-center gap-1"><Search size={10}/> Mapa del Tesoro:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {m.sources.map((s, idx) => (
                                            <a 
                                                key={idx} 
                                                href={s.uri} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-[10px] bg-gray-50 border-2 border-gray-200 px-3 py-1.5 rounded-xl font-black text-brand-blue hover:border-brand-blue hover:bg-brand-blue hover:text-white transition-all shadow-sm"
                                            >
                                                {s.title}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {m.audioData && (
                                <button 
                                    onClick={() => playAudio(m.audioData!)}
                                    className="mt-3 bg-brand-yellow/10 hover:bg-brand-yellow/30 p-2.5 rounded-2xl border-2 border-brand-yellow text-brand-blue transition-all flex items-center gap-2 text-xs font-black uppercase shadow-sm active:scale-95"
                                >
                                    <Volume2 size={16} className="animate-pulse" /> Escuchar de nuevo
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Indicador de Escritura Mágico - Disney Enhanced */}
            {isLoading && (
                <div className="flex justify-start animate-bubble-pop">
                    <div className="bg-white p-5 rounded-[2.5rem] border-4 border-gray-900 flex gap-4 items-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        {/* Background Floating Magic Icons */}
                        <div className="absolute inset-0 pointer-events-none opacity-5">
                            <div className="absolute top-2 left-4 animate-float"><Zap size={20} /></div>
                            <div className="absolute bottom-2 right-4 animate-float delay-300"><Sparkles size={20} /></div>
                            <div className="absolute top-1/2 left-1/2 animate-spin-slow"><Star size={20} /></div>
                        </div>

                        <div className="relative w-16 h-16">
                            <div className="absolute inset-0 bg-brand-yellow rounded-full animate-ping opacity-30"></div>
                            <div className="absolute -top-4 -right-2 bg-brand-pink text-white rounded-full p-1 animate-bounce z-10 border-2 border-gray-900">
                                <Wand2 size={12} />
                            </div>
                            <img 
                                src="https://api.dicebear.com/9.x/big-smile/svg?seed=Stwee&skinColor=ffffff" 
                                className="w-full h-full object-contain animate-llama-bounce"
                                alt="Thinking"
                            />
                        </div>
                        <div className="flex flex-col relative z-10">
                            <div className="flex items-center gap-1">
                                <span className="font-black text-sm text-gray-900 uppercase tracking-tighter leading-none mb-2">Stwee conjurando una respuesta...</span>
                            </div>
                            <div className="flex gap-3 mt-1">
                                <div className="w-4 h-4 bg-brand-pink rounded-full border-2 border-gray-900 animate-dot-magical shadow-sm"></div>
                                <div className="w-4 h-4 bg-brand-blue rounded-full border-2 border-gray-900 animate-dot-magical delay-150 shadow-sm"></div>
                                <div className="w-4 h-4 bg-brand-green rounded-full border-2 border-gray-900 animate-dot-magical delay-300 shadow-sm"></div>
                                <div className="w-4 h-4 bg-brand-yellow rounded-full border-2 border-gray-900 animate-dot-magical delay-500 shadow-sm"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Sugerencias Rápidas */}
        {!isLoading && (
            <div className="px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar bg-white/60 border-t-2 border-gray-900/10 backdrop-blur-sm">
                {SUGGESTIONS.map((s, idx) => (
                    <button 
                        key={idx}
                        onClick={() => handleAction(s)}
                        className="whitespace-nowrap bg-white border-4 border-gray-900 px-5 py-2.5 rounded-2xl text-xs md:text-sm font-black hover:bg-brand-yellow hover:-translate-y-1 transition-all flex items-center gap-2 shadow-[4px_4px_0px_0px_#000] active:translate-y-1 active:shadow-none animate-bubble-pop"
                        style={{ animationDelay: `${idx * 150}ms` }}
                    >
                        <Lightbulb size={16} className="text-brand-yellow fill-current" /> {s}
                    </button>
                ))}
            </div>
        )}

        {/* Entrada de Texto Neobrutalista */}
        <div className="p-4 md:p-6 bg-white border-t-[8px] border-gray-900">
            <div className="relative flex gap-3 md:gap-4 items-center">
                <div className="flex-grow relative">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAction(input)}
                        placeholder="¡Hazme una pregunta mágica!..."
                        className="w-full bg-gray-100 border-4 border-gray-900 rounded-[2rem] p-4 md:p-5 font-black text-base md:text-xl focus:outline-none focus:ring-8 ring-brand-blue/10 transition-all placeholder:text-gray-400 pr-14"
                    />
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none group">
                        <Wand2 size={28} className={`${isLoading ? 'animate-spin text-brand-yellow' : 'group-hover:rotate-45 transition-transform'}`} />
                    </div>
                </div>
                <button 
                    onClick={() => handleAction(input)}
                    disabled={isLoading || !input.trim()}
                    className="bg-brand-yellow text-gray-900 p-4 md:p-5 rounded-[2rem] border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50 disabled:bg-gray-200 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <Send size={32} className="relative z-10 group-hover:rotate-12 transition-transform" />
                </button>
            </div>
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <Info size={14} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Stwee es una IA mágica para niños. ¡Úsala con alegría!</span>
                </div>
                <div className="flex gap-4">
                     <button className="text-[10px] font-black text-brand-blue uppercase border-b-2 border-brand-blue hover:text-brand-pink hover:border-brand-pink transition-colors">Privacidad</button>
                     <button className="text-[10px] font-black text-brand-pink uppercase border-b-2 border-brand-pink hover:text-brand-blue hover:border-brand-blue transition-colors">Guía para Padres</button>
                </div>
            </div>
        </div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes bubble-pop {
          0% { transform: scale(0.6) translateY(30px) rotate(-2deg); opacity: 0; }
          60% { transform: scale(1.1) translateY(-5px) rotate(1deg); opacity: 1; }
          80% { transform: scale(0.95); }
          100% { transform: scale(1) translateY(0) rotate(0); opacity: 1; }
        }

        @keyframes dot-magical {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; filter: blur(0); }
          50% { transform: translateY(-15px) scale(1.4); opacity: 1; filter: blur(1px); }
        }

        @keyframes llama-think {
          0%, 100% { transform: rotate(-8deg) scale(1); filter: brightness(1); }
          50% { transform: rotate(8deg) scale(1.15); filter: brightness(1.1); }
        }

        @keyframes llama-bounce {
          0%, 100% { transform: translateY(0) rotate(0); }
          25% { transform: translateY(-12px) rotate(8deg); }
          75% { transform: translateY(-8px) rotate(-8deg); }
        }

        @keyframes sparkle-1 {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          40% { transform: translate(-30px, -40px) scale(1.8); opacity: 1; }
          100% { transform: translate(-60px, -80px) scale(0); opacity: 0; }
        }

        @keyframes sparkle-2 {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          40% { transform: translate(30px, 40px) scale(1.8); opacity: 1; }
          100% { transform: translate(60px, 80px) scale(0); opacity: 0; }
        }

        @keyframes sparkle-3 {
          0% { transform: translate(0, 0) scale(0); opacity: 0; }
          40% { transform: translate(40px, -20px) scale(1.5); opacity: 1; }
          100% { transform: translate(80px, -40px) scale(0); opacity: 0; }
        }

        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-bubble-pop { animation: bubble-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-dot-magical { animation: dot-magical 0.9s ease-in-out infinite; }
        .animate-llama-think { animation: llama-think 0.8s ease-in-out infinite; }
        .animate-llama-bounce { animation: llama-bounce 0.7s ease-in-out infinite; }
        .animate-sparkle-1 { animation: sparkle-1 1.2s ease-out forwards; }
        .animate-sparkle-2 { animation: sparkle-2 1.2s ease-out 0.2s forwards; }
        .animate-sparkle-3 { animation: sparkle-3 1.2s ease-out 0.4s forwards; }
        
        .animate-spin-slow { animation: spin 4s linear infinite; }
        .animate-llama-idle { animation: pulseSoft 4s infinite ease-in-out; }
        .animate-bounce-soft { animation: bounce-soft 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default StweeChat;
