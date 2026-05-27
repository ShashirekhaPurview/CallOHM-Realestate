import LegalPageLayout from '../components/LegalPageLayout'

const sections = [
  {
    title: '1. What Are Cookies',
    paragraphs: [
      'Cookies are small text files placed on your device by a website when you visit it. They are widely used to make websites work properly, improve user experience, and provide information to website owners.',
      'Similar technologies such as web beacons, pixels, local storage, and session storage may also be used alongside cookies for comparable purposes.',
    ],
  },
  {
    title: '2. Cookies We Use',
    paragraphs: [
      'We use a combination of first-party cookies (set by CallOHM) and third-party cookies (set by our partners and analytics providers) to operate and improve our website.',
    ],
    items: [
      'Strictly necessary cookies, required for the website to function, such as session management and security tokens',
      'Functional cookies, remember your preferences and settings across visits',
      'Analytics cookies, help us understand how visitors interact with the website (e.g. pages visited, time spent, referral sources)',
      'Marketing cookies, used by advertising partners to deliver relevant ads and measure campaign effectiveness',
    ],
  },
  {
    title: '3. Strictly Necessary Cookies',
    paragraphs: [
      'These cookies are essential for the website to operate correctly. They enable core features such as page navigation, form submission, and security. You cannot opt out of strictly necessary cookies as they are required for the site to function.',
      'Examples include session identifiers, CSRF protection tokens, and load-balancing cookies.',
    ],
  },
  {
    title: '4. Analytics and Performance Cookies',
    paragraphs: [
      'We use analytics tools to collect information about how visitors use our website. This helps us understand which pages are popular, where users come from, and how we can improve content and navigation.',
      'Analytics data is aggregated and does not identify individuals. Common providers may include Google Analytics or similar services.',
    ],
  },
  {
    title: '5. Marketing and Targeting Cookies',
    paragraphs: [
      'These cookies may be set through our website by advertising partners. They may be used to build a profile of your interests and show relevant advertisements on other sites.',
      'They do not store directly personal information but are based on uniquely identifying your browser and device.',
    ],
  },
  {
    title: '6. Third-Party Cookies',
    paragraphs: [
      'Some pages on our website may embed or link to content from third-party services such as video platforms, social media widgets, and customer chat tools. These third parties may set their own cookies when you interact with that content.',
      'CallOHM does not control third-party cookies. Please review the privacy and cookie policies of those providers for more information.',
    ],
  },
  {
    title: '7. Managing Your Cookie Preferences',
    paragraphs: [
      'You can control and manage cookies through your browser settings. Most browsers allow you to view, block, or delete cookies. Please note that blocking certain cookies may affect website functionality.',
    ],
    items: [
      'Google Chrome, Settings > Privacy and security > Cookies and other site data',
      'Mozilla Firefox, Settings > Privacy & Security > Cookies and Site Data',
      'Safari, Preferences > Privacy > Manage Website Data',
      'Microsoft Edge, Settings > Cookies and site permissions',
    ],
  },
  {
    title: '8. Cookie Retention',
    paragraphs: [
      'Session cookies expire when you close your browser. Persistent cookies remain on your device for a defined period, which varies by cookie type and provider.',
      'We periodically review the cookies used on our website and update this policy when we make changes.',
    ],
  },
  {
    title: '9. Updates to This Policy',
    paragraphs: [
      'We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our cookie practices. The effective date at the top of this page will be updated accordingly.',
      'If you have any questions about how we use cookies, please contact us through our website.',
    ],
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="Cookies"
      title="Cookie Policy"
      intro="This page explains what cookies are, how CallOHM uses them on this website, and what choices you have to manage them."
      lastUpdated="March 28, 2026"
      sections={sections}
    />
  )
}
