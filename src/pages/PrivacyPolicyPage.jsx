import LegalPageLayout from '../components/LegalPageLayout'

const sections = [
  {
    title: '1. Scope',
    paragraphs: [
      'This Privacy Policy explains how CallOHM collects, uses, stores, and protects personal information when you visit our website, request a demo, communicate with us, or use our products and services.',
      'It applies to information processed through our public website, demo request forms, customer onboarding workflows, and service interactions unless a separate agreement or customer-specific policy says otherwise.',
    ],
  },
  {
    title: '2. Information We Collect',
    paragraphs: [
      'We may collect information you provide directly, such as your name, company name, work email address, phone number, and any details you submit through forms or support requests.',
      'We may also collect technical and usage information such as device type, browser details, approximate location, IP address, pages viewed, referral source, and other analytics data needed to operate and improve the site.',
    ],
    items: [
      'Contact details and business profile information',
      'Demo request and communication history',
      'Billing, contract, and account administration records where applicable',
      'Website usage, diagnostics, and security logs',
    ],
  },
  {
    title: '3. How We Use Information',
    paragraphs: [
      'We use personal information to respond to inquiries, schedule demos, provide services, manage customer relationships, secure our platform, and improve the reliability and performance of our offerings.',
      'We may also use information for operational communications, product updates, compliance obligations, fraud prevention, and internal reporting.',
    ],
    items: [
      'Provide and support our products and services',
      'Respond to demo, sales, and partnership requests',
      'Monitor platform health, abuse, and security incidents',
      'Analyze product usage and improve customer experience',
    ],
  },
  {
    title: '4. Sharing and Disclosure',
    paragraphs: [
      'We do not sell personal information. We may share information with trusted service providers, infrastructure partners, analytics vendors, payment processors, and professional advisers where needed to operate our business.',
      'We may also disclose information when required by law, to enforce our agreements, to protect our rights, or in connection with a merger, acquisition, financing, or sale of assets.',
    ],
  },
  {
    title: '5. Data Retention',
    paragraphs: [
      'We retain information for as long as reasonably necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, enforce agreements, and maintain business records.',
      'Retention periods may vary depending on the type of data, customer commitments, regulatory requirements, and operational needs.',
    ],
  },
  {
    title: '6. Security',
    paragraphs: [
      'We use administrative, technical, and organizational safeguards designed to protect information against unauthorized access, disclosure, alteration, and destruction.',
      'No system is completely secure, so we cannot guarantee absolute security. Customers remain responsible for protecting their credentials and access to their own environments.',
    ],
  },
  {
    title: '7. Cookies and Analytics',
    paragraphs: [
      'We may use cookies, similar technologies, and analytics tools to remember preferences, understand website traffic, measure campaign performance, and improve site functionality.',
      'You can control cookies through your browser settings, but disabling certain technologies may affect website functionality. See our Cookie Policy for full details.',
    ],
  },
  {
    title: '8. Your Rights and Choices',
    paragraphs: [
      'Depending on your location and applicable law, you may have rights to request access to, correction of, deletion of, or restriction of personal information we hold about you.',
      'You may also choose not to provide certain information, although that may limit our ability to provide demos, support, or services.',
    ],
  },
  {
    title: '9. Contact Us',
    paragraphs: [
      'If you have questions about this Privacy Policy or would like to submit a privacy request, please contact CallOHM through our website or your existing business contact with us.',
      'We may update this Privacy Policy from time to time. When we do, we will update the effective date shown on this page.',
    ],
  },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page describes how CallOHM handles personal information across our website, customer interactions, and service operations."
      lastUpdated="March 28, 2026"
      sections={sections}
    />
  )
}
