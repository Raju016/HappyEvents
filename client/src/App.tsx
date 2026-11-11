import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from '@/components/layout/ScrollToTop';
import HomePage from '@/pages/HomePage';
import SubpagePlaceholder from '@/components/layout/SubpagePlaceholder';
import OurWorkPage from './pages/OurWorkPage';
import EventsPage from './pages/EventsPage';
import ServicesPage from './pages/ServicesPage';
import ReviewsPage from './pages/ReviewsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PlanYourEventPage from './pages/PlanYourEventPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AuraConcierge from '@/components/aura/AuraConcierge';
import AdminRoutes from '@/pages/admin/AdminRoutes';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Main Homepage Route */}
          <Route path="/" element={<HomePage />} />

          {/* Subroutes configured for upcoming Phases */}
          <Route path="/events" element={<EventsPage />} />

          <Route
            path="/events/:slug"
            element={
              <SubpagePlaceholder
                title="Curated Event Category"
                category="Event Specialization"
                description="Detailed overview of our specific planning, stage decoration, and technical execution services for this event category."
              />
            }
          />


          <Route path="/services" element={<ServicesPage />} />

          <Route
            path="/services/:slug"
            element={
              <SubpagePlaceholder
                title="Service Overview"
                category="Event Production"
                description="In-depth specifications, equipment capabilities, and custom packaging options for this bespoke service."
              />
            }
          />
          <Route path="/work" element={<OurWorkPage />} />
          <Route
            path="/work/videos"
            element={
              <SubpagePlaceholder
                title="Cinematic Event Films"
                category="Video Highlights"
                description="Full-resolution 4K recaps, venue transformation reels, and aerial cinematography."
              />
            }
          />
          <Route
            path="/work/:slug"
            element={
              <SubpagePlaceholder
                title="Event Case Study"
                category="Portfolio Spotlight"
                description="The vision, technical challenges, vendor choreography, and final celebration story."
              />
            }
          />

          <Route path="/reviews" element={<ReviewsPage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/plan-your-event" element={<PlanYourEventPage />} />

          <Route path="/privacy" element={<PrivacyPolicyPage />} />

          <Route path="/terms" element={<TermsPage />} />

          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <SubpagePlaceholder
                title="404 — Page Not Found"
                category="Navigation"
                description="The celebration you are looking for does not exist or has been relocated."
              />
            }
          />


        </Routes>
        <AuraConcierge />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
