import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({
  phoneNumber = '919908683101',
  defaultMessage = 'Hello Happy Events Team, I would like to enquire about planning an event.',
}) => {
  const [bottomOffset, setBottomOffset] = useState<number>(24); // default 24px (bottom-6)

  // Dynamically avoid overlapping the footer or bottom-right admin controls
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If the footer top is above the bottom of the viewport
      if (footerRect.top < windowHeight) {
        // Calculate how much the footer is overlapping into the viewport
        const overlap = windowHeight - footerRect.top;
        // Raise the button with a 24px safety margin above the footer
        setBottomOffset(Math.max(24, overlap + 24));
      } else {
        setBottomOffset(24);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleWhatsAppClick = () => {
    const encoded = encodeURIComponent(defaultMessage);
    const url = `https://wa.me/${phoneNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    
    <div
      className="fixed right-5 md:right-8 z-40 flex items-center gap-3 group transition-[bottom] duration-200 ease-out pointer-events-auto"
      style={{ bottom: `${bottomOffset}px` }}
    >
      {/* Tooltip bubble on hover */}
      <span
        id="whatsapp-tooltip"
        role="tooltip"
        className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-brand-charcoal/95 border border-brand-border/60 text-brand-ivory text-xs font-sans tracking-wide shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        Chat with us
      </span>

      {/* Action Button without distracting ping animation */}
      <button
        onClick={handleWhatsAppClick}
        aria-label="Chat with Happy Events concierge on WhatsApp"
        aria-describedby="whatsapp-tooltip"
        className="relative w-13 h-13 md:w-14 md:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-950/40 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
      </button>
    </div>
  );
};

export default WhatsAppFloating;
