import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee } from 'lucide-react';
import { site } from '@/data/site';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Us', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 lg:px-8 ${
            scrolled
              ? 'my-3 rounded-2xl glass-dark py-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)]'
              : 'py-5'
          }`}
        >
          {/* Brand */}
          <button
            onClick={() => go('#hero')}
            className="flex items-center gap-2"
            aria-label="Aroma Cafe home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5a3e2b] text-white">
              <Coffee size={18} />
            </span>
            <span className="font-heading text-xl tracking-wide text-white">
              Aroma <span className="text-gradient-gold">Cafe</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="font-btn text-[0.78rem] uppercase tracking-[0.12em] text-white/75 transition-colors hover:text-[#D4AF37]"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={site.phoneHref}
              className="btn-gold rounded-full px-5 py-2.5 text-xs"
            >
              Call Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#1a110d]/95 backdrop-blur-xl" onClick={() => setOpen(false)} />
            <motion.nav
              className="relative flex h-full flex-col items-center justify-center gap-6"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 0.1 }}
            >
              {links.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="font-heading text-3xl text-white/90 hover:text-[#D4AF37]"
                >
                  {l.label}
                </button>
              ))}
              <a
                href={site.phoneHref}
                className="btn-gold mt-4 rounded-full px-8 py-3 text-sm"
              >
                Call Now
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
