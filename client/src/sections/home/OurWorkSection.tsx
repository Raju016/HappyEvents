import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { WORK_PROJECTS, WorkProjectData } from '@/data/mockData';
import SectionHeading from '@/components/ui/SectionHeading';
import WorkProjectCard from '@/components/cards/WorkProjectCard';
import Button from '@/components/ui/Button';

interface OurWorkSectionProps {
  onPlayVideo: (project: WorkProjectData) => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({ onPlayVideo }) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const navigate = useNavigate();

  const filterTabs = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Concerts', 'Private'];

  const filteredProjects = selectedFilter === 'All'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((proj) => proj.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section className="bg-brand-dark text-brand-ivory py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <SectionHeading
          theme="dark"
          eyebrow="OUR WORK"
          title="Moments We've Brought to Life"
          subtitle="Explore our curated portfolio of weddings, corporate galas, and stadium spectacles engineered across India."
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
                    ? 'bg-brand-gold text-brand-dark font-semibold shadow-lg shadow-brand-gold/15'
                    : 'bg-brand-surface text-brand-cream/80 hover:text-brand-ivory hover:bg-white/10 border border-white/5'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.slice(0, 6).map((project) => (
            <WorkProjectCard
              key={project.id}
              project={project}
              onPlayVideo={onPlayVideo}
              onClickDetails={(proj) => navigate(`/work/${proj.slug}`)}
            />
          ))}
        </div>

        {/* Section Global CTA */}
        <div className="text-center pt-2">
          <Link to="/work">
            <Button variant="secondary" size="lg" className="group">
              <span>View All Portfolio Work</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
