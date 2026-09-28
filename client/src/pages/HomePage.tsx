import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/sections/home/HeroSection';
import AllEventsSection from '@/sections/home/AllEventsSection';
import ServicesSection from '@/sections/home/ServicesSection';
import OurWorkSection from '@/sections/home/OurWorkSection';
import ReviewsSection from '@/sections/home/ReviewsSection';
import FinalCTASection from '@/sections/home/FinalCTASection';
import VideoModal from '@/components/ui/VideoModal';
import WhatsAppFloating from '@/components/ui/WhatsAppFloating';
import { WorkProjectData } from '@/data/mockData';

export const HomePage: React.FC = () => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    title: string;
    category?: string;
    location?: string;
  } | null>(null);

  // Trigger from Hero: "Watch Our Story"
  const handleWatchStory = () => {
    setActiveVideo({
      url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      title: 'MOMENTA Brand Story — We Create Moments You’ll Remember',
      category: 'Brand Film',
      location: 'Hyderabad & Mumbai',
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
    <div className="min-h-screen bg-brand-dark text-brand-ivory flex flex-col font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* 1. Premium Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Cinematic Hero */}
        <HeroSection onWatchStory={handleWatchStory} />

        {/* 3. All Events Section */}
        <AllEventsSection />

        {/* 4. Services Section */}
        <ServicesSection />

        {/* 5. Our Work Section */}
        <OurWorkSection onPlayVideo={handlePlayWorkVideo} />

        {/* 6. Customer Reviews */}
        <ReviewsSection />

        {/* 7. Final CTA */}
        <FinalCTASection />
      </main>

      {/* 8. Footer */}
      <Footer />

      {/* Floating Elements */}
      <WhatsAppFloating />

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
