import LegalPageLayout from '../components/LegalPageLayout'

const sections = [
  {
    title: '1. Acceptance of Terms',
    paragraphs: [
      'These Terms of Service govern your access to and use of the CallOHM website, products, demos, and related services. By accessing or using our services, you agree to these terms.',
      'If you are using the services on behalf of a company or organization, you represent that you have authority to bind that entity to these terms.',
    ],
  },
  {
    title: '2. Services',
    paragraphs: [
      'CallOHM provides voice AI software, demos, communications workflows, and related tools for business use. Specific features, pricing, service levels, and implementation details may be governed by separate commercial agreements.',
      'We may update, improve, suspend, or discontinue parts of the services at any time, subject to any contractual obligations we have with customers.',
    ],
  },
  {
    title: '3. Accounts and Access',
    paragraphs: [
      'You are responsible for maintaining the confidentiality of account credentials and for all activities that occur under your account.',
      'You must provide accurate information, keep it up to date, and promptly notify us of any unauthorized access or security incident involving your account.',
    ],
  },
  {
    title: '4. Acceptable Use',
    paragraphs: [
      'You may use the services only for lawful business purposes and in compliance with applicable laws, regulations, and third-party rights.',
    ],
    items: [
      'Do not use the services for unlawful, fraudulent, deceptive, or abusive activities',
      'Do not interfere with service availability, security, or integrity',
      'Do not attempt to reverse engineer, scrape, or bypass technical protections except where allowed by law',
      'Do not process content you do not have the legal right to use',
    ],
  },
  {
    title: '5. Customer Content',
    paragraphs: [
      'You retain ownership of the content, data, prompts, recordings, and materials you submit to or process through the services, subject to the rights needed for us to provide the services.',
      'You are responsible for the legality, accuracy, quality, and integrity of your content and for obtaining any permissions, notices, or consents required for your use case.',
    ],
  },
  {
    title: '6. Intellectual Property',
    paragraphs: [
      'CallOHM and its licensors retain all rights, title, and interest in the services, software, documentation, branding, and related intellectual property, except for customer content and any rights expressly granted to you.',
      'No rights are granted except as expressly stated in these terms or in a separate written agreement.',
    ],
  },
  {
    title: '7. Third-Party Services',
    paragraphs: [
      'The services may integrate with or depend on third-party providers such as telephony, cloud infrastructure, analytics, and model providers. Your use of third-party services may also be subject to those providers\' terms.',
      'CallOHM is not responsible for third-party services outside our control.',
    ],
  },
  {
    title: '8. Disclaimers',
    paragraphs: [
      'Except as expressly agreed in writing, the services are provided on an as-is and as-available basis. We disclaim implied warranties to the maximum extent permitted by law, including warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not guarantee uninterrupted service, error-free operation, or that outputs will always be accurate, complete, or suitable for every use case.',
    ],
  },
  {
    title: '9. Limitation of Liability',
    paragraphs: [
      'To the maximum extent permitted by law, CallOHM will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, revenue, data, goodwill, or business interruption arising out of or related to the services.',
      'Any direct liability will be limited as provided in the applicable customer agreement or, if no such agreement exists, to the amount paid by you to CallOHM for the relevant services during the twelve months before the claim arose.',
    ],
  },
  {
    title: '10. Termination',
    paragraphs: [
      'We may suspend or terminate access to the services if you violate these terms, create risk for the platform or other users, fail to pay amounts due, or if required by law.',
      'Upon termination, your right to use the services ends, but any provisions that by their nature should survive termination will remain in effect.',
    ],
  },
  {
    title: '11. Governing Terms',
    paragraphs: [
      'These terms, together with any applicable order forms, statements of work, or customer agreements, constitute the agreement between you and CallOHM regarding the services.',
      'If you have questions about these Terms of Service, please contact CallOHM through our website or your existing commercial contact.',
    ],
  },
]

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout
      eyebrow="Legal"
      title="Terms of Service"
      intro="These terms describe the rules, responsibilities, and boundaries that apply when you use CallOHM services, demos, and website experiences."
      lastUpdated="March 28, 2026"
      sections={sections}
    />
  )
}
