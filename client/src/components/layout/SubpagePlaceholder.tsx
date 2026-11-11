import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from '@/components/ui/Button';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface SubpagePlaceholderProps {
  title: string;
  category?: string;
  description: string;
}

export const SubpagePlaceholder: React.FC<SubpagePlaceholderProps> = ({
  title,
  category = 'MOMENTA Experience',
  description,
}) => {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center items-center text-center px-6 py-32 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-semibold tracking-eyebrow uppercase font-sans mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          {category}
        </div>

        <h1 className="text-4xl md:text-6xl font-serif text-brand-ivory mb-6 font-medium">
          {title}
        </h1>

        <p className="text-brand-cream/80 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10 font-light">
          {description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/">
            <Button variant="secondary" size="md">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Button>
          </Link>
          <Link to="/plan-your-event">
            <Button variant="primary" size="md">
              <span>Plan Your Event</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubpagePlaceholder;
