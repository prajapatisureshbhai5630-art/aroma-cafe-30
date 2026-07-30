import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { reviews } from '@/data/menu';
import { Reveal, SectionHeading } from '@/components/motion';

export function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const r = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#1a110d] py-24 lg:py-32">
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[#D4AF37]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          light
          eyebrow="Customer Reviews"
          title={
            <>
              Loved by <span className="text-gradient-gold">a million</span> guests
            </>
          }
        />

        <div
          className="relative mt-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-dark rounded-3xl p-8 text-center sm:p-12"
            >
              <Quote className="mx-auto text-[#D4AF37]" size={36} />
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <p className="font-heading mx-auto mt-6 max-w-2xl text-xl leading-relaxed text-white/90 sm:text-2xl">
                "{r.text}"
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-[#D4AF37]"
                  loading="lazy"
                />
                <div className="text-left">
                  <p className="font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-white/60">{r.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* dots */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/25 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
            <div>
              <p className="font-heading text-4xl text-gradient-gold">1M+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Happy Customers</p>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div>
              <p className="font-heading text-4xl text-gradient-gold">5.0</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Star Rating</p>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div>
              <p className="font-heading text-4xl text-gradient-gold">12+</p>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Years of Brew</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
