import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from '@/pages/HomePage';
import SubpagePlaceholder from '@/components/layout/SubpagePlaceholder';

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
        <Routes>
          {/* Main Homepage Route */}
          <Route path="/" element={<HomePage />} />

          {/* Subroutes configured for upcoming Phases */}
          <Route
            path="/events"
            element={
              <SubpagePlaceholder
                title="Event Occasions & Formats"
                category="All Event Categories"
                description="Explore all 20 event categories we manage from royal weddings and stadium concerts to executive corporate galas."
              />
            }
          />
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
          <Route
            path="/services"
            element={
              <SubpagePlaceholder
                title="Comprehensive Event Services"
                category="End-to-End Solutions"
                description="From architectural floral design to line-array sound and celebrity curation, explore our full spectrum of event services."
              />
            }
          />
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
          <Route
            path="/work"
            element={
              <SubpagePlaceholder
                title="Moments We've Brought to Life"
                category="Creative Portfolio"
                description="Cinematic films, photography showcases, and behind-the-scenes event case studies produced across India."
              />
            }
          />
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
          <Route
            path="/reviews"
            element={
              <SubpagePlaceholder
                title="Client Testimonials & Feedback"
                category="Verified Experiences"
                description="Read candid reviews and watch video testimonials from families and corporate brands who trusted MOMENTA."
              />
            }
          />
          <Route
            path="/about"
            element={
              <SubpagePlaceholder
                title="The MOMENTA Story & Philosophy"
                category="About Our Agency"
                description="Our mission, artistic directors, production crew, and commitment to unforgettable celebrations."
              />
            }
          />
          <Route
            path="/contact"
            element={
              <SubpagePlaceholder
                title="Contact Our Concierge"
                category="Get in Touch"
                description="Direct numbers, office addresses in Hyderabad and Mumbai, and priority concierge lines."
              />
            }
          />
          <Route
            path="/plan-your-event"
            element={
              <SubpagePlaceholder
                title="Plan Your Event"
                category="Bespoke Enquiry Portal"
                description="Interactive multi-step quotation form to design your customized event blueprint."
              />
            }
          />
          <Route
            path="/privacy"
            element={
              <SubpagePlaceholder
                title="Privacy Policy"
                category="Legal & Security"
                description="Our commitment to safeguarding client privacy, event security, and confidential data."
              />
            }
          />
          <Route
            path="/terms"
            element={
              <SubpagePlaceholder
                title="Terms & Conditions"
                category="Agreement"
                description="Standard service contracts, cancellation policies, and operational terms."
              />
            }
          />
          <Route
            path="/admin/login"
            element={
              <SubpagePlaceholder
                title="Admin Authentication Portal"
                category="Secure Access"
                description="Restricted management access for MOMENTA event directors, production staff, and editors."
              />
            }
          />

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
      </Router>
    </QueryClientProvider>
  );
}

export default App;
