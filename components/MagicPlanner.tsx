
import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, CheckCircle2, Sparkles } from 'lucide-react';
import SectionWrapper from './SectionWrapper';

const MagicPlanner: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construir mensaje de WhatsApp con los datos del formulario
    const eventType = (e.target as any).eventType?.value || 'No especificado';
    const eventDate = (e.target as any).date?.value || 'No especificada';

    const text = `¡Hola! Me gustaría cotizar un evento.%0A%0A*Nombre:* ${formState.name}%0A*Email:* ${formState.email}%0A*Teléfono:* ${formState.phone}%0A*Tipo de Evento:* ${eventType}%0A*Fecha del Evento:* ${eventDate}%0A*Detalles:* ${formState.message}`;

    // Abrir WhatsApp con el mensaje
    window.open(`https://api.whatsapp.com/send?phone=5214421434797&text=${text}`, '_blank');

    // Mostrar mensaje de éxito después de un breve delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <SectionWrapper
      id="contacto"
      bgColor="bg-[#FFF6E6]"
      pillText="CONTACTO"
      pillColor="bg-brand-blue"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-4 border-gray-900 relative z-10">

        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Cotiza tu Evento ✨</h2>
          <p className="text-gray-600 font-bold text-lg">Cuéntanos los detalles y crearemos el paquete perfecto para ti.</p>
        </div>

        {isSuccess ? (
          <div className="bg-brand-green/20 border-4 border-brand-green rounded-3xl p-10 text-center animate-fade-in-scale">
            <div className="bg-brand-green text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle2 size={48} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-2">¡Solicitud Enviada!</h3>
            <p className="text-gray-700 font-bold mb-6">Hemos recibido tus datos. Te enviaremos tu cotización personalizada muy pronto.</p>
            <button
              onClick={() => setIsSuccess(false)}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-black hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_#4ECDC4]"
            >
              Cotizar otro evento
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <User size={14} /> Nombre Completo
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-blue/20 outline-none transition-all placeholder:text-gray-300"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>

              {/* Correo */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Mail size={14} /> Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="hola@ejemplo.com"
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-pink/20 outline-none transition-all placeholder:text-gray-300"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Phone size={14} /> Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ej: 442 123 4567"
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-yellow/20 outline-none transition-all placeholder:text-gray-300"
                  value={formState.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Fecha del Evento */}
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Sparkles size={14} /> Fecha del Evento
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-purple/20 outline-none transition-all placeholder:text-gray-300"
                  onChange={handleChange}
                />
              </div>

              {/* Tipo de Evento */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <Sparkles size={14} /> Tipo de Evento
                </label>
                <select
                  name="eventType"
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-orange/20 outline-none transition-all placeholder:text-gray-300 appearance-none"
                  onChange={handleChange as any}
                >
                  <option value="">Selecciona una opción...</option>
                  <option value="fiesta-infantil">Fiesta Infantil</option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="empresarial">Evento Empresarial</option>
                  <option value="escuela">Escuela / Kermis</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              {/* Mensaje */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 ml-1">
                  <MessageSquare size={14} /> Cuéntanos más detalles
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Ej: Personajes deseados, dirección del evento, horario aprox..."
                  className="w-full bg-gray-50 border-4 border-gray-900 rounded-2xl p-4 font-bold text-gray-800 focus:bg-white focus:ring-4 ring-brand-green/20 outline-none transition-all placeholder:text-gray-300"
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white font-black text-2xl py-5 rounded-[1.5rem] shadow-[6px_6px_0px_0px_#FFD700] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3 hover:bg-black group"
            >
              {isSubmitting ? (
                <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Solicitar Cotización</span>
                  <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Info adicional */}
        <div className="mt-12 pt-8 border-t-4 border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp</span>
            <span className="text-xl font-black text-gray-900">+52 442 143 4797</span>
          </div>
          <div className="p-4">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ubicación</span>
            <span className="text-xl font-black text-gray-900">Querétaro, Qro.</span>
          </div>
          <div className="p-4">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Horario</span>
            <span className="text-xl font-black text-gray-900">Lun - Sáb: 9am - 7pm</span>
          </div>
        </div>

      </div>

      {/* Elementos decorativos de fondo */}
      <div className="absolute top-10 right-10 opacity-20 animate-spin-slow -z-10">
        <Sparkles size={160} className="text-brand-yellow fill-current" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 animate-bounce -z-10">
        <Sparkles size={100} className="text-brand-purple fill-current" />
      </div>
    </SectionWrapper>
  );
};

export default MagicPlanner;
