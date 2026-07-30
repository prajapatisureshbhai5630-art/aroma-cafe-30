import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { gallery } from '@/data/menu';
import { Reveal, SectionHeading } from '@/components/motion';

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const next = () => setActive((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <section id="gallery" className="relative bg-[#2b1d17] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          light
          eyebrow="Gallery"
          title={
            <>
              Moments at <span className="text-gradient-gold">Aroma</span>
            </>
          }
          subtitle="A glimpse into the warmth, craft and corners of our cafe. Click any image to view it full screen."
        />

        {/* Masonry grid */}
        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {gallery.map((img, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} direction="scale">
              <button
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden rounded-2xl"
                data-cursor="hover"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110 ${
                    img.span ? 'h-80' : 'h-60'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 flex translate-y-3 items-center gap-2 text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ZoomIn size={16} className="text-[#D4AF37]" /> {img.alt}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button className="absolute right-5 top-5 text-white/80 hover:text-white" onClick={close} aria-label="Close">
              <X size={28} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D4AF37]"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={40} />
            </button>
            <motion.img
              key={active}
              src={gallery[active].src}
              alt={gallery[active].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-[#D4AF37]"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ChevronRight size={40} />
            </button>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
              {gallery[active].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
