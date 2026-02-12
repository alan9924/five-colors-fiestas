/**
 * Constantes centralizadas para la aplicación FiveColors
 */

// Información de contacto
export const CONTACT = {
    PHONE: '+52 442 143 4797',
    PHONE_DIGITS: '5214421434797',
    EMAIL: 'fivecolorshows@gmail.com',
    WHATSAPP_BASE_URL: 'https://api.whatsapp.com/send',
} as const;

// URLs de redes sociales
export const SOCIAL_MEDIA = {
    INSTAGRAM: '#',
    FACEBOOK: '#',
    TIKTOK: '#',
} as const;

// Mensajes predefinidos de WhatsApp
export const WHATSAPP_MESSAGES = {
    CORPORATE: 'Hola FiveColors, te contacto desde tu sitio web Corporativo',
    GENERAL: 'Hola FiveColors, me gustaría obtener más información',
    QUOTE: 'Hola, me interesa cotizar un evento',
} as const;

// Helper para generar URL de WhatsApp
export const getWhatsAppUrl = (message: string = WHATSAPP_MESSAGES.GENERAL): string => {
    const encodedMessage = encodeURIComponent(message);
    return `${CONTACT.WHATSAPP_BASE_URL}?phone=${CONTACT.PHONE_DIGITS}&text=${encodedMessage}`;
};

// Helper para generar URL de WhatsApp con datos de formulario
export const getWhatsAppUrlWithFormData = (data: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    date?: string;
    message?: string;
}): string => {
    const parts = [
        'Hola, me interesa cotizar un evento corporativo.',
        '',
    ];

    if (data.name) parts.push(`*Nombre:* ${data.name}`);
    if (data.company) parts.push(`*Empresa:* ${data.company}`);
    if (data.email) parts.push(`*Email:* ${data.email}`);
    if (data.phone) parts.push(`*Tel:* ${data.phone}`);
    if (data.date) parts.push(`*Fecha:* ${data.date}`);
    if (data.message) parts.push(`*Mensaje:* ${data.message}`);

    const message = parts.join('%0A');
    return `${CONTACT.WHATSAPP_BASE_URL}?phone=${CONTACT.PHONE_DIGITS}&text=${message}`;
};

// Información de la empresa
export const COMPANY = {
    NAME: 'FiveColors',
    TAGLINE: 'Experiencias que transforman',
    COPYRIGHT_YEAR: new Date().getFullYear(),
} as const;
