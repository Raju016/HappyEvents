import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Check, 
  LucideIcon 
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { SERVICES, ServiceData } from '@/data/mockData';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export const ServicesSection: React.FC = () => {
  const [activeService, setActiveService] = useState<ServiceData>(SERVICES[0]);

  return (
    <section className="bg-brand-charcoal text-brand-ivory py-24 md:py-32 border-y border-brand-border/20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          theme="dark"
          eyebrow="OUR SERVICES"
          title="Complete Event Solutions"
          subtitle="From concept to execution, we provide end-to-end event management services tailored to your exact desires."
        />

        {/* Master Showcase Layout: Interactive list on Left, Large Visual & Feature Breakdown on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Interactive Service Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            {SERVICES.map((service) => {
              const isSelected = activeService.id === service.id;
              const IconComponent = (Icons[service.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`p-4 md:p-5 rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-brand-surface border-brand-gold/60 shadow-xl pl-6'
                      : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        isSelected
                          ? 'bg-brand-gold text-brand-dark'
                          : 'bg-brand-surface text-brand-gold border border-white/5'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4
                        className={`text-base font-serif font-medium transition-colors ${
                          isSelected ? 'text-brand-gold' : 'text-brand-ivory'
                        }`}
                      >
                        {service.name}
                      </h4>
                      <p className="text-xs text-brand-muted font-sans line-clamp-1 mt-0.5">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected
                        ? 'text-brand-gold translate-x-1 opacity-100'
                        : 'text-brand-muted opacity-0'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Dynamic Supporting Event Image & Deep Feature Breakdown (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/40 shadow-2xl p-6 md:p-8 space-y-6">
              {/* Supporting High-Res Visual */}
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-inner group">
                <img
                  src={activeService.image}
                  alt={activeService.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-brand-ivory">
                  <span className="font-mono text-brand-gold text-[10px] tracking-widest uppercase bg-black/60 px-3 py-1 rounded backdrop-blur-md">
                    Premium Standard
                  </span>
                  <span className="text-xs text-brand-cream/80">
                    Bespoke Production
                  </span>
                </div>
              </div>

              {/* Service Description Body */}
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-serif text-brand-ivory font-medium">
                  {activeService.name}
                </h3>
                <p className="text-sm font-sans text-brand-cream/85 leading-relaxed font-light">
                  {activeService.fullDescription}
                </p>

                {/* Features Matrix Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  {activeService.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs font-sans text-brand-cream/90 bg-brand-dark/50 p-3 rounded-lg border border-white/5"
                    >
                      <div className="w-5 h-5 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/5">
                  <Link
                    to={`/services/${activeService.slug}`}
                    className="text-xs uppercase tracking-widest font-semibold text-brand-gold hover:text-brand-gold-light inline-flex items-center gap-1.5 group"
                  >
                    <span>Learn More About {activeService.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link to="/plan-your-event">
                    <Button variant="secondary" size="sm">
                      Include In Event
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="text-center pt-4">
          <Link to="/services">
            <Button variant="primary" size="lg" className="group">
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
