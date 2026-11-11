import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Sparkles } from 'lucide-react';
import { WORK_PROJECTS, WorkProjectData } from '@/data/mockData';
import SectionHeading from '@/components/ui/SectionHeading';
import WorkProjectCard from '@/components/cards/WorkProjectCard';
import ProjectGalleryModal from '@/components/ui/ProjectGalleryModal';
import Button from '@/components/ui/Button';

// All of our work lives on our WedMeGood profile; "Show More" sends visitors there.
const WEDMEGOOD_URL = 'https://www.wedmegood.com/profile/happy-events--1607934';
// How many cards to show on the home page.
const HOME_CARD_LIMIT = 6;

interface OurWorkSectionProps {
  onPlayVideo: (project: WorkProjectData) => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({ onPlayVideo }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeGalleryProject, setActiveGalleryProject] = useState<WorkProjectData | null>(null);

  const filterTabs = ['All', 'Weddings', 'Corporate', 'Birthdays', 'Concerts', 'Private'];

  const filteredProjects = selectedFilter === 'All'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((proj) => proj.category.toLowerCase() === selectedFilter.toLowerCase());

  const visibleProjects = filteredProjects.slice(0, HOME_CARD_LIMIT);

  return (
    <section
      id="our-work"
      className="scroll-mt-24 bg-brand-dark text-brand-ivory py-24 md:py-32 relative overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          theme="dark"
          eyebrow="PORTFOLIO ARCHIVE"
          title="Moments We've Brought to Life"
          subtitle="Explore our editorial portfolio of royal reception stages, traditional floral mandapam sets, stadium concerts, and private villa soirées engineered in Hyderabad and beyond."
        />

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 font-sans cursor-pointer ${
                  isActive
                    ? 'bg-brand-gold text-brand-dark font-semibold shadow-lg shadow-brand-gold/20 scale-105'
                    : 'bg-brand-surface text-brand-cream/80 hover:text-brand-ivory hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {visibleProjects.map((project) => (
            <WorkProjectCard
              key={project.id}
              project={project}
              onPlayVideo={onPlayVideo}
              onClickDetails={(proj) => setActiveGalleryProject(proj)}
            />
          ))}
        </div>

        {/* Section Global CTA */}
        <div className="text-center pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={WEDMEGOOD_URL} target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="group">
              <span>Show More on WedMeGood</span>
              <ExternalLink className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </a>
          <Link to="/plan-your-event">
            <Button variant="primary" size="lg" className="group">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Discuss Your Event Decor</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Accessible Interactive Project Gallery Lightbox Overlay */}
      <ProjectGalleryModal
        isOpen={Boolean(activeGalleryProject)}
        project={activeGalleryProject}
        onClose={() => setActiveGalleryProject(null)}
        onPlayVideo={onPlayVideo}
      />
    </section>
  );
};

export default OurWorkSection;
