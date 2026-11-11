import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Award, Users, Compass, Clock } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { SITE_STATS } from '@/data/mockData';

export const AboutSection: React.FC = () => {
  const highlights = [
    {
      icon: Compass,
      title: 'Architectural Floral & Stage Art',
      desc: 'Handcrafted mandaps, imported florals, and thematic stage backdrops engineered to custom architectural scale.',
    },
    {
      icon: Users,
      title: 'Turnkey Event Direction',
      desc: 'From initial 3D spatial visualization to on-site stage supervision, our dedicated team coordinates every vendor.',
    },
    {
      icon: Award,
      title: 'Concert-Grade Sound & Intelligent Lighting',
      desc: 'Pristine line-array acoustic clarity and computerized moving head illumination that shape the celebratory mood.',
    },
    {
      icon: Clock,
      title: 'Punctual & Stress-Free Execution',
      desc: 'Rigid timeline discipline ensures your venue is handed over on schedule so you can be fully present.',
    },
  ];

  return (
    <section
      id="about"
      className="scroll-mt-24 bg-brand-charcoal text-brand-ivory py-24 md:py-32 relative overflow-hidden border-t border-white/5"
    >
      {/* Subtle ambient golden radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-brand-gold/5 rounded-full blur-[140px] pointer-events-none translate-x-1/2" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            theme="dark"
            eyebrow="ABOUT HAPPY EVENTS"
            title="We Create Moments You'll Remember"
            subtitle="A premier full-service event planning and luxury production studio headquartered in Hyderabad, delivering bespoke weddings, stadium shows, and private galas across India."
            className="mb-14"
          />
        </motion.div>

        {/* Rebalanced Editorial Narrative (Two-Column Balanced Layout) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mb-16 text-brand-cream/85 font-sans font-light text-base md:text-lg leading-relaxed"
        >
          <div className="space-y-5 p-8 rounded-2xl bg-brand-surface/40 border border-brand-border/30 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-widest font-sans">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Creative Brief & Individuality</span>
            </div>
            <p>
              Every event we take on is treated as its own creative brief: no two celebrations look
              alike, and no detail is left to chance. Led by passionate event director George, our team
              handles the full arc of celebration production — from concept design, floral sourcing,
              and vendor procurement to concert-grade sound, intelligent lighting, and seamless on-site
              orchestration.
            </p>
          </div>

          <div className="space-y-5 p-8 rounded-2xl bg-brand-surface/40 border border-brand-border/30 backdrop-blur-sm">
            <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-widest font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Execution & Discretion</span>
            </div>
            <p>
              Whether it is a royal mandap set in Hyderabad, a high-voltage sangeet, a milestone jubilee
              birthday, or an executive summit, our commitment is absolute: delivering breathtaking
              aesthetics with airtight punctuality so you and your loved ones can truly be present in
              the moment without logistical stress.
            </p>
          </div>
        </motion.div>

        {/* Editorial Quote Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative my-12 py-8 px-6 text-center border-y border-brand-gold/20 bg-brand-gold/[0.02]"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-serif italic text-brand-ivory font-normal max-w-3xl mx-auto leading-relaxed">
            &ldquo;We make your celebration grand, memorable, and effortlessly executed.&rdquo;
          </p>
          <span className="block mt-3 text-xs uppercase tracking-widest font-sans text-brand-gold font-medium">
            Happy Events Hyderabad • George & Production Team
          </span>
        </motion.div>

        {/* 4 Core Pillars Grid (Natural Full-Width) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.65, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-xl bg-brand-surface/70 border border-brand-border/30 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between space-y-3 group hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-brand-gold flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h4 className="text-sm font-semibold font-sans text-brand-ivory group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-brand-muted font-sans font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          <Link to="/about">
            <Button variant="secondary" size="md" className="group">
              <span>Explore Full Studio Story</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/plan-your-event">
            <Button variant="primary" size="md">
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>Plan Your Event</span>
            </Button>
          </Link>
        </motion.div>

        {/* Live Statistics Counter Grid */}
        <div className="pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {SITE_STATS.map((stat) => (
            <div key={stat.id} className="text-center space-y-1">
              <span className="text-3xl md:text-5xl font-serif font-medium text-brand-gold block">
                {stat.value}
              </span>
              <span className="text-sm font-sans font-medium text-brand-ivory block">
                {stat.label}
              </span>
              <span className="text-[11px] font-sans text-brand-muted block font-light">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
