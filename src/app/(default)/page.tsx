import Features from '@/components/Features'
import FeaturesBlocks from '@/components/FeaturesSection'
import Hero from '@/components/HeroSection'
import Newsletter from '@/components/Newsletter'
import Testimonials from '@/components/Testimonial'

export const metadata = {
  title: 'Home - Simple',
  description: 'Page description',
}



export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />
    </>
  )
}