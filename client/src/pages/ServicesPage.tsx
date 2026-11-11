import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SERVICES, ServiceData } from '@/data/mockData';

const ServiceCard: React.FC<{ service: ServiceData }> = ({ service }) => {
  const IconComponent =
    (Icons[service.icon as keyof typeof Icons] as LucideIcon) || Icons.Sparkles;

  return (
    <div className="group rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/40 hover:border-brand-gold/50 shadow-xl transition-all duration-500 flex flex-col">
      {/* Visual */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-black/30" />
        <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-brand-dark/80 backdrop-blur-md border border-brand-gold/30 flex items-center justify-center text-brand-gold">
          <IconComponent className="w-5 h-5" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-7 flex-1 flex flex-col space-y-4">
        <div>
          <h3 className="text-xl font-serif text-brand-ivory font-medium mb-2">
            {service.name}
          </h3>
          <p className="text-sm text-brand-cream/80 font-sans font-light leading-relaxed">
            {service.shortDescription}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
          {service.features.map((feat, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs font-sans text-brand-cream/90"
            >
              <div className="w-4 h-4 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 mt-auto flex items-center justify-between border-t border-white/5">
          <Link
            to={`/services/${service.slug}`}
            className="text-xs uppercase tracking-widest font-semibold text-brand-gold hover:text-brand-gold-light inline-flex items-center gap-1.5 group/link"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-brand-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="OUR SERVICES"
              title="Comprehensive Event Services"
              subtitle="From architectural floral design to line-array sound and celebrity curation — explore our full spectrum of end-to-end event services."
            />
          </div>
        </section>

        {/* Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm text-brand-muted font-sans mb-10">
              {SERVICES.length} bespoke services, available individually or bundled
              into a complete package
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Global CTA */}
            <div className="text-center pt-16">
              <Link to="/plan-your-event">
                <Button variant="primary" size="lg" className="group">
                  <span>Build My Custom Package</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
