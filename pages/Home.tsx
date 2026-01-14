import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Study from '../components/Study';
import Process from '../components/Process';
import Contact from '../components/Contact';

interface HomeProps {
    onOpenModal: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenModal }) => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Study />
      <Process />
      <Contact onOpenModal={onOpenModal} />
    </main>
  );
};

export default Home;