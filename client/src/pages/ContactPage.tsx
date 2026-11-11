
import React from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import InvitationForm from '@/components/forms/InvitationForm';
import { SITE_CONTACT } from '@/data/siteConfig';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-brand-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="GET IN TOUCH"
              title="Contact Our Concierge"
              subtitle="Direct numbers, our Hyderabad studio, and a priority concierge line for every enquiry."
            />
          </div>
        </section>

        {/* Contact Info + Form */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl bg-brand-surface border border-brand-border/40 p-6 md:p-8 space-y-6">

                {/* Studio Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-brand-ivory mb-1">
                      Studio Address
                    </h4>
                    <p className="text-sm text-brand-cream/70 font-sans font-light">
                      Floor 4, Road No. 36, Jubilee Hills, Hyderabad, India
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-brand-ivory mb-1">
                      Phone
                    </h4>
                    <a
                      href={`tel:${SITE_CONTACT.phoneTel}`}
                      className="text-sm text-brand-cream/70 hover:text-brand-gold font-sans font-light transition-colors"
                    >
                      {SITE_CONTACT.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Updated Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-brand-ivory mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${SITE_CONTACT.email}`}
                      className="text-sm text-brand-cream/70 hover:text-brand-gold font-sans font-light transition-colors"
                    >
                      {SITE_CONTACT.email}
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-sans font-semibold text-brand-ivory mb-1">
                      WhatsApp
                    </h4>
                    <a
                      href={`https://wa.me/${SITE_CONTACT.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-cream/70 hover:text-emerald-400 font-sans font-light transition-colors"
                    >
                      Chat with our concierge
                    </a>
                  </div>
                </div>

              </div>

              {/* Embedded Map */}
              <div className="rounded-2xl overflow-hidden border border-brand-border/40 h-64">
                <iframe
                  title="Happy Events Studio Location"
                  src="https://www.google.com/maps?q=Jubilee+Hills,Hyderabad,India&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Invitation Enquiry Form */}
            <div className="lg:col-span-3">
              <InvitationForm />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
