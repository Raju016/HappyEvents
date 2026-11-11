import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SITE_STATS, TEAM_MEMBERS } from '@/data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        {/* Page Header / Story */}
        <section className="pt-40 pb-20 md:pt-48 md:pb-24 bg-brand-dark relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <SectionHeading
              theme="dark"
              eyebrow="ABOUT US"
              title="The Happy Events Story & Philosophy"
              subtitle=""
              className="mb-8"
            />
            <div className="space-y-6 text-brand-cream/85 font-sans font-light leading-relaxed text-base md:text-lg max-w-3xl mx-auto">
              <p>
                We create moments you&apos;ll remember. Happy Events is a full-service
                event planning studio designing weddings, corporate summits, concerts,
                and private celebrations across India — from architectural floral
                mandaps to concert-grade sound and lighting.
              </p>
              <p>
                Every event we take on is treated as its own creative brief: no two
                celebrations look alike, and no detail is left to chance. Our team
                handles the full arc — concept, vendor coordination, on-site
                production, and the final send-off — so you can actually be present
                for your own celebration.
              </p>
            </div>
            <p className="text-xs font-mono text-brand-gold/90 pt-8 tracking-widest uppercase">
              &ldquo;We create moments you&apos;ll remember.&rdquo;
            </p>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="py-16 md:py-20 bg-brand-charcoal border-y border-brand-border/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {SITE_STATS.map((stat) => (
                <div key={stat.id} className="text-center">
                  <p className="text-3xl md:text-4xl font-serif text-brand-gold mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm font-sans font-medium text-brand-ivory mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs font-sans text-brand-muted leading-relaxed">
                    {stat.sublabel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="THE TEAM"
              title="The Crew Behind Every Celebration"
              subtitle="A small, senior team that stays hands-on from the first planning call to the last guest leaving the venue."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="text-center group">
                  <div className="relative w-32 h-32 mx-auto mb-5 rounded-full overflow-hidden border border-brand-gold/30 shadow-lg">
                    <img
                      src={member.photo}
                      alt={member.role}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base font-serif text-brand-ivory font-medium mb-1">
                    {member.role}
                  </h3>
                  <p className="text-xs text-brand-cream/70 font-sans font-light leading-relaxed max-w-[220px] mx-auto">
                    {member.bio}
                  </p>
                  {member.isDemo && (
                    <span className="inline-block mt-2 text-[9px] font-mono uppercase bg-brand-gold/10 text-brand-gold px-1.5 py-0.5 rounded border border-brand-gold/20">
                      Demo
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="pb-24 md:pb-32 text-center px-6">
          <Link to="/plan-your-event">
            <Button variant="primary" size="lg" className="group">
              <span>Start Planning With Us</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
