import React from 'react';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import { CONTACT, COMPANY, SOCIAL_MEDIA, getWhatsAppUrl, WHATSAPP_MESSAGES } from '@/lib/constants';

export const CorporateFooter = () => {
    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                            {COMPANY.NAME}
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Corporativo
                        </p>
                    </div>

                    {/* Contact Links */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
                        <a
                            href={getWhatsAppUrl(WHATSAPP_MESSAGES.CORPORATE)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition-colors group"
                        >
                            <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                                <Phone size={20} />
                            </div>
                            <span className="font-medium">{CONTACT.PHONE}</span>
                        </a>

                        <a
                            href={`mailto:${CONTACT.EMAIL}`}
                            className="flex items-center gap-3 text-slate-300 hover:text-blue-400 transition-colors group"
                        >
                            <div className="p-2 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                                <Mail size={20} />
                            </div>
                            <span className="font-medium">{CONTACT.EMAIL}</span>
                        </a>
                    </div>

                    {/* Socials (Optional but good for footer) */}
                    <div className="flex items-center gap-4">
                        <a href={SOCIAL_MEDIA.INSTAGRAM} className="text-slate-500 hover:text-pink-500 transition-colors">
                            <Instagram size={24} />
                        </a>
                        <a href={SOCIAL_MEDIA.FACEBOOK} className="text-slate-500 hover:text-blue-500 transition-colors">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-600 text-sm">
                    <p>&copy; {COMPANY.COPYRIGHT_YEAR} {COMPANY.NAME}. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};
