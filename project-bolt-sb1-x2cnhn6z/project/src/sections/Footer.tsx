import { Coffee, Phone, MapPin, Instagram, Facebook, Twitter, ArrowUpRight } from 'lucide-react';
import { site } from '@/data/site';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Us', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Reserve', href: '#reservation' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const go = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden bg-[#160e0a] pt-20 text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/8 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#D4AF37] to-[#5a3e2b] text-white">
                <Coffee size={20} />
              </span>
              <span className="font-heading text-2xl">
                Aroma <span className="text-gradient-gold">Cafe</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Handcrafted coffee, fresh food and cozy ambience in the heart of Valsad.
              Where every cup tells a story and every visit becomes a memory.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-all hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-btn text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => go(l.href)}
                    className="group flex items-center gap-1 text-sm text-white/65 transition-colors hover:text-white"
                  >
                    {l.label}
                    <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-btn text-xs uppercase tracking-[0.2em] text-[#D4AF37]">Reach Us</p>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li className="flex gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-[#D4AF37]" />
                <span>{site.address.full}</span>
              </li>
              <li>
                <a href={site.phoneHref} className="flex gap-3 hover:text-[#D4AF37]">
                  <Phone size={18} className="flex-shrink-0 text-[#D4AF37]" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <a
              href="#reservation"
              onClick={(e) => { e.preventDefault(); go('#reservation'); }}
              className="btn-gold mt-6 inline-block rounded-full px-6 py-3 text-xs"
            >
              Reserve a Table
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 sm:flex-row">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Aroma Cafe. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Crafted with care in Valsad, Gujarat · 5-Star Rated
          </p>
        </div>
      </div>
    </footer>
  );
}
