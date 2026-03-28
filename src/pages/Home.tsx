// src/pages/Home.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Footer from '../components/Footer';

// Import all sections
import SprintFlow from '../components/SprintFlow';
import Velocity from '../components/Velocity';
import Coverage from '../components/Coverage';
import Intelligence from '../components/Intelligence';
import Experience from '../components/Experience';
import ForBusiness from '../components/ForBusiness';
import TrustLayer from '../components/TrustLayer';

const Home: React.FC = () => {
  return (
    <>
      <Header />
      
      <main className="page-content">
        <Hero />
        <SprintFlow />
        <Velocity />
        <Coverage />
        <Intelligence />
        <Experience />
        <ForBusiness />
        <TrustLayer />
      </main>

      <Footer />
    </>
  );
};

export default Home;