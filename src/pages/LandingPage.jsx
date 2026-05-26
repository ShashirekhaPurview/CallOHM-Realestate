import Nav from '../components/Nav'
import Hero from '../components/Hero'
import PlatformSection from '../components/PlatformSection'
import StatsBar from '../components/StatsBar'
import HowItWorks from '../components/HowItWorks'
import AgentConfig from '../components/AgentConfig'
import Features from '../components/Features'
import AgentDemo from '../components/AgentDemo'
import Testimonials from '../components/Testimonials'
import UseCases from '../components/UseCases'
import CtaSection from '../components/CtaSection'
import Footer from '../components/Footer'

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
