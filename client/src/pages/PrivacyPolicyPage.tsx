import React from 'react';
import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalPageLayout
      eyebrow="LEGAL"
      title="Privacy Policy"
      lastUpdated="September 30, 2026"
      intro="Happy Events (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This policy explains what information we collect when you use this website or enquire about our event services, how we use it, and the choices you have."
      sections={[
        {
          heading: '1. Information We Collect',
          body: [
            'When you submit an enquiry, contact form, or event planning request, we collect the details you provide — such as your name, phone number, email address, event type, preferred date, location, guest count, budget range, and any notes you share with us.',
            'We may also collect basic technical information automatically, such as browser type and general usage data, to help us understand how visitors use this site.',
          ],
        },
        {
          heading: '2. How We Use Your Information',
          body: [
            'We use the information you provide to respond to enquiries, prepare event proposals, coordinate services you request, and communicate with you about your event.',
            'We do not sell your personal information to third parties. We may share necessary details with trusted vendors and partners (such as venues, caterers, or decor teams) only where required to plan and execute your event.',
          ],
        },
        {
          heading: '3. Data Retention',
          body: [
            'We retain enquiry and client information for as long as reasonably necessary to fulfil the purpose it was collected for, or as required by applicable law.',
          ],
        },
        {
          heading: '4. Your Choices',
          body: [
            'You may request access to, correction of, or deletion of the personal information you have shared with us at any time by contacting us using the details below.',
          ],
        },
        {
          heading: '5. Contact Us',
          body: [
            'If you have questions about this Privacy Policy, please reach out to us at concierge@happyevents.co or through the contact details on our Contact page.',
          ],
        },
      ]}
    />
  );
};

export default PrivacyPolicyPage;
