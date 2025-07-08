import React from 'react'
import Navbar from './components/NavBar/page'
import Hero from './components/Hero/page'
import Features from './components/Features/page'
import Testimonials from './components/Testimonials/page'
import AboutUs from './components/AboutUs/page'
import ContactUs from './components/ContactUs/page'
import Footer from './components/Footer/page'

export default function Home() {
  return (
    <div id='Home'>
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  )
}
