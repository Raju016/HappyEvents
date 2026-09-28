import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ArrowUpRight 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal text-brand-ivory border-t border-brand-border/30 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Info & Core Message */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-3xl font-serif tracking-[0.25em] font-medium text-brand-ivory block">
                MOMENTA
              </span>
              <span className="text-[10px] tracking-widest uppercase text-brand-gold font-sans font-light">
                EVENTS & EXPERIENCES
              </span>
            </div>

            <p className="text-sm font-sans font-light text-brand-cream/70 max-w-sm leading-relaxed">
              We create moments you&apos;ll remember. Full-service bespoke event planning, 
              architectural floral decoration, sound and lighting production for weddings, 
              corporate summits, and grand private galas across India and destination venues.
            </p>

            <div className="space-y-2 text-xs font-mono text-brand-gold/90">
              <p>&ldquo;WE CREATE MOMENTS YOU&apos;LL REMEMBER.&rdquo;</p>
              <p className="text-brand-muted text-[11px]">Your Event. Our Expertise.</p>
            </div>

            {/* Social Icons with Clean SVG Paths */}
            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.556 5 15.627 5H18V0h-3.809C10.51 0 9 1.782 9 4.889V8z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-brand-surface border border-white/10 flex items-center justify-center text-brand-ivory hover:text-brand-gold hover:border-brand-gold/50 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-gold font-sans">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-cream/70 font-sans">
              {['Home', 'Events', 'Services', 'Our Work', 'Reviews', 'About', 'Contact', 'Plan Your Event'].map(
                (item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/ /g, '-')}`}
                      className="hover:text-brand-gold transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{item}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brand-gold" />
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-gold font-sans">
              Key Services
            </h4>
            <ul className="space-y-2.5 text-xs text-brand-cream/70 font-sans">
              {[
                'Complete Event Management',
                'Stage & Floral Decoration',
                'Intelligent Lighting & Sound',
                'Cinematography & Drone',
                'Gourmet Catering Curation',
                'DJ & Celebrity Artists',
                'Luxury Venue Arrangement',
                'Guest Hospitality & RSVP',
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    to="/services"
                    className="hover:text-brand-gold transition-colors block truncate"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Direct Support */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-brand-gold font-sans">
              Direct Contact
            </h4>
            <div className="space-y-3 text-xs text-brand-cream/80 font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span>Floor 4, Road No. 36, Jubilee Hills, Hyderabad, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <span>concierge@momentaevents.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 98765 43210</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/plan-your-event"
                className="inline-block text-xs uppercase tracking-wider font-semibold text-brand-gold hover:underline"
              >
                Request a Custom Proposal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-brand-muted font-sans gap-4">
          <div>
            © {new Date().getFullYear()} MOMENTA Events & Experiences. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-brand-ivory transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/terms" className="hover:text-brand-ivory transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/admin/login" className="hover:text-brand-gold transition-colors font-mono">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
