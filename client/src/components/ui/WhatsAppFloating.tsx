import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  phoneNumber = '919876543210',
  defaultMessage = "Hello MOMENTA Team, I would like to enquire about planning an event.",
}) => {
  const handleWhatsAppClick = () => {
    const encoded = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 group">
      {/* Tooltip bubble on hover */}
      <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-brand-charcoal border border-brand-border/60 text-brand-ivory text-xs font-sans tracking-wide shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>

      {/* Action Button */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat on WhatsApp"
        className="relative w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* Subtle pulsing aura */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping opacity-60 pointer-events-none"></span>
        <MessageCircle className="w-7 h-7 relative z-10" />
      </button>
    </div>
  );
};

export default WhatsAppFloating;
