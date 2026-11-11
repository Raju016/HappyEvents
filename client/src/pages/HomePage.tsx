import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/home/HeroSection';
import ServicesSection from '@/sections/home/ServicesSection';
import AllEventsSection from '@/sections/home/AllEventsSection';
import OurWorkSection from '@/sections/home/OurWorkSection';
import ReviewsSection from '@/sections/home/ReviewsSection';
import AboutSection from '@/sections/home/AboutSection';
import FinalCTASection from '@/sections/home/FinalCTASection';
import VideoModal from '@/components/ui/VideoModal';
import { WorkProjectData } from '@/data/mockData';

export const HomePage: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    category?: string;
    location?: string;
  } | null>(null);

  // Scroll to hash target on initial load if present in URL
  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const navbarOffset = 80;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navbarOffset,
            behavior: 'smooth',
          });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Trigger from Hero: "Watch Our Story"
  const handleWatchStory = () => {
    setActiveVideo({
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'Happy Events Brand Story — We Create Moments You’ll Remember',
      category: 'Brand Film',
      location: 'Hyderabad, India',
    });
    setVideoModalOpen(true);
  };

  // Trigger from Work Section: Play individual event films
  const handlePlayWorkVideo = (project: WorkProjectData) => {
    if (project.videoUrl) {
      setActiveVideo({
        url: project.videoUrl,
        title: project.title,
        category: project.category,
        location: project.location,
      });
      setVideoModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark relative">
      {/* 1. Premium Navbar with reliable scroll-spy */}
      <Navbar />

      <main className="flex-1">
        {/* 1. Cinematic Hero with 5-Step Staggered Sequence & Ambient Gold Particles */}
        <HeroSection onWatchStory={handleWatchStory} />

        {/* 2. Services Section (All 16 Services preserved in exact sequence) */}
        <ServicesSection />

        {/* 3. All Events Section with 3D Depth Viewport Carousel */}
        <AllEventsSection />

        {/* 4. Our Work Section with authentic HappyEvents photographs & Project Gallery */}
        <OurWorkSection onPlayVideo={handlePlayWorkVideo} />

        {/* 5. Customer Reviews with Verified WedMeGood Testimonial Cards */}
        <ReviewsSection />

        {/* 6. About Section highlighting HappyEvents philosophy & statistics */}
        <AboutSection />

        {/* 7. Contact Section with studio numbers, address, and quotation inquiry */}
        <FinalCTASection />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Video Modal Player */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoUrl={activeVideo?.url}
        title={activeVideo?.title}
        category={activeVideo?.category}
        location={activeVideo?.location}
      />
    </div>
  );
};

export default HomePage;
