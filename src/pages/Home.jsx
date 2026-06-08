import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../sections/Hero.jsx'
import TrustStrip from '../sections/TrustStrip.jsx'
import Services from '../sections/Services.jsx'
import WhyUs from '../sections/WhyUs.jsx'
import Reviews from '../sections/Reviews.jsx'
import CofeprisBand from '../sections/CofeprisBand.jsx'
import BlogPreview from '../sections/BlogPreview.jsx'
import Contact from '../sections/Contact.jsx'

export default function Home() {
  const { hash } = useLocation()

  // Desplazamiento suave a anclas (#servicios, #resenas, etc.)
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 60)
    } else {
      window.scrollTo({ top: 0 })
    }
  }, [hash])

  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <WhyUs />
      <Reviews />
      <CofeprisBand />
      <BlogPreview />
      <Contact />
    </>
  )
}
