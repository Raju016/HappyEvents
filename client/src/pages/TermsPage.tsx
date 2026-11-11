import React from 'react';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const TermsPage: React.FC = () => {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="Terms & Conditions"
      lastUpdated="September 30, 2026"
      intro="These Terms & Conditions govern your use of this website and any event planning services booked through Happy Events. By submitting an enquiry or engaging our services, you agree to the terms outlined below."
      sections={[
        {
          heading: '1. Our Services',
          body: [
            'Happy Events provides end-to-end event planning and production services, including but not limited to weddings, corporate events, concerts, and private celebrations, as described on this website.',
            'Specific service inclusions, pricing, and timelines for your event will be confirmed separately in a written proposal or service agreement before any booking is finalized.',
          ],
        },
        {
          heading: '2. Enquiries & Bookings',
          body: [
            'Submitting an enquiry through this website (including the "Plan Your Event" or "Contact" forms) does not constitute a confirmed booking. A booking is only confirmed once both parties have agreed to a proposal and any required advance payment has been received.',
          ],
        },
        {
          heading: '3. Payments',
          body: [
            'Payment schedules, advance booking amounts, and final settlement terms will be specified in your individual service agreement.',
          ],
        },
        {
          heading: '4. Cancellations & Rescheduling',
          body: [
            'Cancellation and rescheduling terms, including any applicable fees, will be outlined in your service agreement at the time of booking. Please refer to that agreement or contact your event director for specifics related to your event.',
          ],
        },
        {
          heading: '5. Third-Party Vendors',
          body: [
            'Some services may be fulfilled through third-party vendors and partners (venues, caterers, entertainers, etc.). While we vet our partners carefully, Happy Events is not liable for circumstances outside our reasonable control.',
          ],
        },
        {
          heading: '6. Website Use',
          body: [
            'Content on this website, including photography, videos, and copy, is the property of Happy Events unless otherwise credited, and may not be reproduced without permission.',
          ],
        },
        {
          heading: '7. Contact',
          body: [
            'For questions about these Terms & Conditions, please contact us at concierge@happyevents.co.',
          ],
        },
      ]}
    />
  );
};

export default TermsPage;
