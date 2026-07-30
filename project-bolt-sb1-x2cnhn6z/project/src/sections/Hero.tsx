import { motion } from 'framer-motion';
import { Star, Coffee, Cake, ArrowRight, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { HeroScene } from '@/three/HeroScene';

const badges = [
  { icon: Star, label: '1M+ Happy Customers', filled: true },
  { icon: Star, label: '5-Star Rating' },
  { icon: Coffee, label: 'Premium Coffee' },
  { icon: Cake, label: 'Fresh Desserts' },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#1a110d]">
      {/* 3D scene background */}
      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* Cinematic gradients over the 3D scene for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#1a110d]/70 via-transparent to-[#1a110d]/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(26,17,13,0.7)_100%)]" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-28 pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="eyebrow text-[#D4AF37]">Valsad · Gujarat · Since 2013</p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading mt-5 text-[2.6rem] leading-[1.05] text-white sm:text-6xl lg:text-7xl"
          >
            Experience Coffee
            <br />
            <span className="text-gradient-gold">Beyond Imagination</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-white/75"
          >
            Handcrafted Coffee · Fresh Food · Cozy Ambience · Memorable Moments
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.65, duration: 0.8 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <button onClick={() => scrollTo('#menu')} className="btn-gold rounded-full px-7 py-3.5 text-sm">
              Explore Menu
            </button>
            <button onClick={() => scrollTo('#reservation')} className="btn-ghost rounded-full px-7 py-3.5 text-sm">
              Reserve Table
            </button>
            <a
              href={site.phoneHref}
              className="btn-ghost flex items-center gap-2 rounded-full px-7 py-3.5 text-sm"
            >
              <Phone size={16} /> Call Now
            </a>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.85, duration: 0.8 }}
            className="mt-12 flex flex-wrap gap-3"
          >
            {badges.map((b) => (
              <span
                key={b.label}
                className="flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-white/85"
              >
                <b.icon size={14} className={b.filled ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#D4AF37]'} />
                {b.label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollTo('#story')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
        aria-label="Scroll down"
      >
        <span className="font-btn text-[0.6rem] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ArrowRight size={18} className="rotate-90" />
        </motion.div>
      </motion.button>
    </section>
  );
}
