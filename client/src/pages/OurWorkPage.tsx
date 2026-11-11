import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import WorkProjectCard from '@/components/cards/WorkProjectCard';
import VideoModal from '@/components/ui/VideoModal';
import ProjectGalleryModal from '@/components/ui/ProjectGalleryModal';
import { WORK_PROJECTS, WorkProjectData } from '@/data/mockData';

const FILTER_TABS = ['All', 'Weddings', 'Birthdays', 'Corporate', 'Concerts', 'Private'];

export const WorkPage: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [videoModalOpen, setVideoModalOpen] = useState(false);
    const [activeGalleryProject, setActiveGalleryProject] = useState<WorkProjectData | null>(null);
    const [activeVideo, setActiveVideo] = useState<{
        url: string;
        title: string;
        category?: string;
        location?: string;
    } | null>(null);

    const filteredProjects =
        selectedFilter === 'All'
            ? WORK_PROJECTS
            : WORK_PROJECTS.filter(
                (proj) => proj.category.toLowerCase() === selectedFilter.toLowerCase()
            );

    const handlePlayVideo = (project: WorkProjectData) => {
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
            <Navbar />

            <main className="flex-1">
                {/* Page Header */}
                <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-brand-dark relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6">
                        <SectionHeading
                            theme="dark"
                            eyebrow="OUR WORK"
                            title="Moments We've Brought to Life"
                            subtitle="Cinematic films, photography showcases, and behind-the-scenes event case studies produced across India — explore the full portfolio."
                        />
                    </div>
                </section>

                {/* Filter + Grid */}
                <section className="pb-24 md:pb-32">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                            {FILTER_TABS.map((tab) => {
                                const isActive = selectedFilter === tab;
                                const count =
                                    tab === 'All'
                                        ? WORK_PROJECTS.length
                                        : WORK_PROJECTS.filter(
                                            (p) => p.category.toLowerCase() === tab.toLowerCase()
                                        ).length;
                                return (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedFilter(tab)}
                                        className={`text-xs uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 font-sans cursor-pointer ${isActive
                                                ? 'bg-brand-gold text-brand-dark font-semibold shadow-lg shadow-brand-gold/15'
                                                : 'bg-brand-surface text-brand-cream/80 hover:text-brand-ivory hover:bg-white/10 border border-white/5'
                                            }`}
                                    >
                                        {tab}
                                        <span className="opacity-60 ml-1.5">({count})</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Results count */}
                        <p className="text-center text-sm text-brand-muted font-sans mb-10">
                            Showing {filteredProjects.length} of {WORK_PROJECTS.length} projects
                        </p>

                        {/* Grid or Empty State */}
                        {filteredProjects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredProjects.map((project) => (
                                    <WorkProjectCard
                                        key={project.id}
                                        project={project}
                                        onPlayVideo={handlePlayVideo}
                                        onClickDetails={(proj) => setActiveGalleryProject(proj)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-brand-muted font-sans">
                                    No projects found in this category yet.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
            <VideoModal
                isOpen={videoModalOpen}
                onClose={() => setVideoModalOpen(false)}
                videoUrl={activeVideo?.url}
                title={activeVideo?.title}
                category={activeVideo?.category}
                location={activeVideo?.location}
            />

            <ProjectGalleryModal
                isOpen={Boolean(activeGalleryProject)}
                project={activeGalleryProject}
                onClose={() => setActiveGalleryProject(null)}
                onPlayVideo={handlePlayVideo}
            />
        </div>
    );
};

export default WorkPage;
