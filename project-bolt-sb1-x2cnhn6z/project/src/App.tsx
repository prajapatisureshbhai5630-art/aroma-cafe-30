import { useEffect, useState } from 'react';
import { Loader } from '@/components/Loader';
import { LuxuryCursor } from '@/components/LuxuryCursor';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackToTop } from '@/components/BackToTop';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Hero } from '@/sections/Hero';
import { ScrollStory } from '@/sections/ScrollStory';
import { About } from '@/sections/About';
import { Menu } from '@/sections/Menu';
import { Gallery } from '@/sections/Gallery';
import { WhyChooseUs } from '@/sections/WhyChooseUs';
import { Reviews } from '@/sections/Reviews';
import { Reservation } from '@/sections/Reservation';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Give the 3D scene + fonts a beat to settle, then lift the loader.
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader done={ready} />
      <LuxuryCursor />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <ScrollStory />
        <About />
        <Menu />
        <Gallery />
        <WhyChooseUs />
        <Reviews />
        <Reservation />
        <Contact />
        <Footer />
      </main>

      <BackToTop />
      <WhatsAppButton />
    </>
  );
}

export default App;
