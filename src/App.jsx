import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CookieBanner from './components/CookieBanner'
import LandingPage        from './pages/LandingPage'
import AboutPage          from './pages/AboutPage'
import LeadershipPage     from './pages/LeadershipPage'
import ContactPage        from './pages/ContactPage'
import FAQPage            from './pages/FAQPage'
import PricingPage        from './pages/PricingPage'
import BrochurePage       from './pages/BrochurePage'
import PrivacyPolicyPage  from './pages/PrivacyPolicyPage'
import TermsOfServicePage from './pages/TermsOfServicePage'
import CookiePolicyPage   from './pages/CookiePolicyPage'
import BookDemoPage       from './pages/BookDemoPage'
import LoginPage          from './pages/LoginPage'

export default function App() {
  return (
    <BrowserRouter>
      <CookieBanner />
      <Routes>
        <Route path="/"           element={<LandingPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/contact"    element={<ContactPage />} />
        <Route path="/faq"        element={<FAQPage />} />
        <Route path="/pricing"    element={<PricingPage />} />
        <Route path="/brochure"   element={<BrochurePage />} />
        <Route path="/privacy"    element={<PrivacyPolicyPage />} />
        <Route path="/terms"      element={<TermsOfServicePage />} />
        <Route path="/cookies"    element={<CookiePolicyPage />} />
        <Route path="/book-demo"  element={<BookDemoPage />} />
        <Route path="/login"      element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
