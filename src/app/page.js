"use client";
import React from "react";
import Navbar from "./components/NavBar/page";
import Hero from "./components/Hero/page";
import Features from "./components/Features/page";
import Testimonials from "./components/Testimonials/page";
import ContactUs from "./components/ContactUs/page";
import Footer from "./components/Footer/page";

export default function App() {
  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <Navbar />
      <main>
        <section id="home">
          <Hero />
        </section>

        <section id="featured">
          <Features />
        </section>

        <section id="reviews">
          <Testimonials />
        </section>

        <section id="contact">
          <ContactUs />
        </section>
      </main>
      <Footer />
    </>
  );
}
