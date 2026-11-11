import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';

interface LegalSection {
  heading: string;
  body: string[];
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}) => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        <section className="pt-40 pb-16 md:pt-48 md:pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading theme="dark" eyebrow={eyebrow} title={title} subtitle="" />
            <p className="text-xs text-brand-muted font-sans text-center -mt-6 mb-10">
              Last updated: {lastUpdated}
            </p>
            <p className="text-sm md:text-base text-brand-cream/80 font-sans font-light leading-relaxed">
              {intro}
            </p>
          </div>
        </section>

        <section className="pb-24 md:pb-32">
          <div className="max-w-4xl mx-auto px-6 space-y-10">
            {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-lg font-serif text-brand-gold font-medium">
                  {section.heading}
                </h2>
                {section.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm text-brand-cream/75 font-sans font-light leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
