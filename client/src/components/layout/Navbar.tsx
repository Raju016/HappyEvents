import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Services', path: '/services' },
    { name: 'Our Work', path: '/work' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border/40 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex flex-col group cursor-pointer">
            <span className="text-2xl md:text-3xl font-serif tracking-[0.25em] font-medium text-brand-ivory group-hover:text-brand-gold transition-colors">
              MOMENTA
            </span>
            <span className="text-[9px] tracking-widest uppercase text-brand-gold font-sans font-light">
              EVENTS & EXPERIENCES
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs uppercase tracking-widest font-sans transition-all duration-300 relative py-1 hover:text-brand-gold ${
                    isActive ? 'text-brand-gold font-semibold' : 'text-brand-ivory/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/plan-your-event">
              <Button variant="primary" size="sm" className="group">
                <span>Plan Your Event</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile Right Controls: CTA & Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Link to="/plan-your-event" className="sm:inline-block">
              <Button variant="primary" size="sm" className="text-[10px] px-3 py-2">
                Plan Event
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-brand-ivory hover:text-brand-gold hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden flex flex-col bg-brand-dark/98 backdrop-blur-xl pt-24 pb-8 px-6 justify-between animate-fadeIn">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-brand-gold text-xs tracking-eyebrow uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Navigation Menu</span>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-2xl font-serif text-brand-ivory hover:text-brand-gold transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4 pt-6">
            <Link to="/plan-your-event" className="w-full block">
              <Button variant="primary" size="lg" fullWidth>
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="text-center text-xs text-brand-muted font-sans">
              Emergency & VIP Enquiries: +91 98765 43210
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
