import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Contact from './components/Contact';

function App() {
  return (
    <div className="relative" style={{ background: 'linear-gradient(to bottom, #ece9f1, #d4d4f7)' }}>
      <Navbar />
      <main className="container mx-auto px-4">
        <Hero />
        <Skills />
        <Experience />
        {/* <Projects /> */}
        <Publications />
        <Contact />
      </main>
    </div>
  );
}

export default App;
