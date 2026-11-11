import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import ReviewCard from '@/components/cards/ReviewCard';
import Button from '@/components/ui/Button';
import { REVIEWS } from '@/data/mockData';

export const ReviewsPage: React.FC = () => {
  const averageRating =
    REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      <Navbar />

      <main className="flex-1">
        {/* Page Header */}
        <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-brand-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              theme="dark"
              eyebrow="CLIENT TESTIMONIALS"
              title="Client Testimonials & Feedback"
              subtitle="Candid reviews from families and corporate brands who trusted us to bring their celebrations to life."
            />

            {/* Rating Summary Strip */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 pb-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-brand-gold mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(averageRating)
                          ? 'fill-current text-brand-gold'
                          : 'text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-serif text-brand-ivory">
                  {averageRating.toFixed(1)} / 5
                </p>
                <p className="text-xs text-brand-muted font-sans mt-1">Average Rating</p>
              </div>

              <div className="w-px h-12 bg-white/10 hidden md:block" />

              <div className="text-center">
                <p className="text-2xl font-serif text-brand-ivory">{REVIEWS.length}+</p>
                <p className="text-xs text-brand-muted font-sans mt-1">Verified Reviews</p>
              </div>

              <div className="w-px h-12 bg-white/10 hidden md:block" />

              <div className="text-center">
                <p className="text-2xl font-serif text-brand-ivory">100%</p>
                <p className="text-xs text-brand-muted font-sans mt-1">Would Recommend</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <a
                href="https://www.wedmegood.com/profile/happy-events--1607934/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brand-gold hover:text-amber-300 font-sans font-medium"
              >
                <span>Read All 90+ Reviews on WedMeGood ↗</span>
              </a>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Global CTA */}
            <div className="text-center pt-16">
              <p className="text-brand-cream/80 font-sans mb-6 max-w-xl mx-auto">
                Ready to create your own unforgettable celebration?
              </p>
              <Link to="/plan-your-event">
                <Button variant="primary" size="lg" className="group">
                  <span>Plan Your Event</span>
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

export default ReviewsPage;
