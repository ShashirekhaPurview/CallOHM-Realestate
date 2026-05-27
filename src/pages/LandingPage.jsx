import Nav from '../components/LandingPage/Nav'
import Hero from '../components/LandingPage/Hero'
import PlatformSection from '../components/LandingPage/PlatformSection'
import StatsBar from '../components/LandingPage/StatsBar'
import HowItWorks from '../components/LandingPage/HowItWorks'
import AgentConfig from '../components/LandingPage/AgentConfig'
import Features from '../components/LandingPage/Features'
import AgentDemo from '../components/LandingPage/AgentDemo'
import Testimonials from '../components/LandingPage/Testimonials'
import UseCases from '../components/LandingPage/UseCases'
import CtaSection from '../components/LandingPage/CtaSection'
import Footer from '../components/LandingPage/Footer'

export default function LandingPage() {
  return (
    <div className="min-w-[320px] overflow-x-hidden">
      <Nav />
      <Hero />
      <PlatformSection />
      <StatsBar />
      <HowItWorks />
      <AgentConfig />
      <Features />
      <AgentDemo />
      <Testimonials />
      <UseCases />
      <CtaSection />
      <Footer />
    </div>
  )
}
