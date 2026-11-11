import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SITE_CONTACT } from '@/data/siteConfig';

interface NavItem {
  name: string;
  sectionId: string;
  pagePath: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', sectionId: 'home', pagePath: '/' },
  { name: 'Services', sectionId: 'services', pagePath: '/services' },
  { name: 'Events', sectionId: 'all-events', pagePath: '/events' },
  { name: 'Our Work', sectionId: 'our-work', pagePath: '/work' },
  { name: 'Reviews', sectionId: 'reviews', pagePath: '/reviews' },
  { name: 'About', sectionId: 'about', pagePath: '/about' },
  { name: 'Contact', sectionId: 'contact', pagePath: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const isSmoothScrollingRef = useRef(false);
  const smoothScrollTimerRef = useRef<number | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle fixed header styling on scroll
  useEffect(() => {
    const handleScrollHeader = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScrollHeader, { passive: true });
    handleScrollHeader();
    return () => window.removeEventListener('scroll', handleScrollHeader);
  }, []);

  // Close mobile drawer on route change or Escape
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Reliable Scroll-Spy using scroll positions + offsets for the Homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleScrollSpy = () => {
      if (isSmoothScrollingRef.current) return;

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const navbarOffset = 90; // Height of sticky navbar + safety margin

      // 1. Top of page: Always highlight 'home'
      if (scrollPosition < 120) {
        setActiveSection('home');
        return;
      }

      // 2. Bottom of page: Always highlight 'contact'
      if (windowHeight + scrollPosition >= documentHeight - 60) {
        setActiveSection('contact');
        return;
      }

      // 3. Inspect sections in order
      const sections = NAV_ITEMS.map((item) => ({
        id: item.sectionId,
        el: document.getElementById(item.sectionId),
      })).filter((s): s is { id: string; el: HTMLElement } => s.el !== null);

      let currentActive = 'home';
      for (const section of sections) {
        const top = section.el.offsetTop - navbarOffset;
        if (scrollPosition >= top - 40) {
          currentActive = section.id;
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy(); // Check initial position on mount

    return () => {
      window.removeEventListener('scroll', handleScrollSpy);
      if (smoothScrollTimerRef.current) clearTimeout(smoothScrollTimerRef.current);
    };
  }, [isHomePage]);

  // Support browser hash changes & back/forward navigation on homepage
  useEffect(() => {
    if (!isHomePage) return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          setActiveSection(hash);
          const top = targetEl.offsetTop - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, [isHomePage]);

  // Click navigation handler: Handles both section anchor scrolling & page navigation
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      setMobileMenuOpen(false);

      if (isHomePage) {
        if (item.sectionId === 'home') {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          window.history.pushState(null, '', '/');
          setActiveSection('home');
          return;
        }

        const targetElement = document.getElementById(item.sectionId);
        if (targetElement) {
          e.preventDefault();

          // Lock scroll-spy briefly to prevent jitter while smooth scrolling
          isSmoothScrollingRef.current = true;
          setActiveSection(item.sectionId);

          if (smoothScrollTimerRef.current) clearTimeout(smoothScrollTimerRef.current);
          smoothScrollTimerRef.current = window.setTimeout(() => {
            isSmoothScrollingRef.current = false;
          }, 900);

          const navbarHeight = 80;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarHeight,
            behavior: 'smooth',
          });

          // Update URL hash without causing page jump
          window.history.pushState(null, '', `#${item.sectionId}`);
        } else {
          e.preventDefault();
          navigate(item.pagePath);
        }
      } else {
        // When on a subpage, navigate directly to that page route
        e.preventDefault();
        navigate(item.pagePath);
      }
    },
    [isHomePage, navigate]
  );

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 anim-navbar ${
          isScrolled
            ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border/40 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo with Official Icon */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, NAV_ITEMS[0])}
            className="flex items-center gap-3 group cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold/60 rounded-full"
          >
            <img
              src="/happy_events_logo_crop.png"
              alt="Happy Events Logo"
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover border border-brand-gold/40 shadow-md group-hover:border-brand-gold group-hover:scale-105 transition-all duration-300"
            />
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-serif tracking-[0.15em] font-medium text-brand-ivory group-hover:text-brand-gold transition-colors leading-tight">
                HAPPY EVENTS
              </span>
              <span className="text-[8px] md:text-[9px] tracking-widest uppercase text-brand-gold font-sans font-light">
                EVENTS & EXPERIENCES
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Scroll-Spy & Route Awareness */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
            {NAV_ITEMS.map((link) => {
              // On homepage: active matches scroll-spy section ID
              // On separate pages: active matches route path
              const isActive = isHomePage
                ? activeSection === link.sectionId
                : location.pathname === link.pagePath;

              return (
                <a
                  key={link.name}
                  href={isHomePage ? `#${link.sectionId}` : link.pagePath}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs uppercase tracking-widest font-sans transition-all duration-200 relative py-1 hover:text-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold/50 rounded cursor-pointer ${
                    isActive ? 'text-brand-gold font-semibold' : 'text-brand-ivory/80'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-gold rounded-full transition-all duration-300" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/plan-your-event">
              <Button variant="primary" size="sm">
                <span>Plan Your Event</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <Link to="/plan-your-event">
              <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs">
                <span>Plan</span>
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-brand-ivory hover:text-brand-gold hover:bg-white/5 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-gold/60"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Reliable Auto-Close */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-40 lg:hidden flex flex-col bg-brand-dark/98 backdrop-blur-2xl pt-24 pb-8 px-6 justify-between animate-fadeIn"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-brand-gold text-xs tracking-eyebrow uppercase font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Navigation Menu</span>
            </div>

            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((link) => {
                const isActive = isHomePage
                  ? activeSection === link.sectionId
                  : location.pathname === link.pagePath;

                return (
                  <a
                    key={link.name}
                    href={isHomePage ? `#${link.sectionId}` : link.pagePath}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`text-2xl font-serif py-2 border-b border-white/5 transition-colors flex items-center justify-between cursor-pointer ${
                      isActive ? 'text-brand-gold font-medium' : 'text-brand-ivory hover:text-brand-gold'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-brand-gold inline-block" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <Link
              to="/plan-your-event"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block"
            >
              <Button variant="primary" size="lg" fullWidth>
                <span>Plan Your Event</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <div className="text-center text-xs text-brand-muted font-sans">
              Emergency & VIP Enquiries: {SITE_CONTACT.phoneDisplay}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
