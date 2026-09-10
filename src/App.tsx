/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundStars from './components/BackgroundStars';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import BackToTop from './components/BackToTop';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleOpenContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050814] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive desktop custom cursor */}
      <CustomCursor />

      {/* Futuristic animated cosmic background */}
      <BackgroundStars />

      {/* Sticky glass navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenContact={handleOpenContact}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenContact={handleOpenContact}
        />

        {/* Identity & Background / About Section */}
        <About />

        {/* Experience Timeline Section */}
        <Experience />

        {/* Selected Builds / Projects Section */}
        <Projects />

        {/* Technical Skills Section */}
        <Skills />

        {/* Milestones & Achievements Section */}
        <Achievements />

        {/* Industry Certifications */}
        <Certifications />

        {/* Let's Connect / Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Digital Resume Viewer Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Floating Back to Top with Circular Scroll Gauge */}
      <BackToTop />
    </div>
  );
}
