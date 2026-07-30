import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { menu, menuCategories, type MenuItem, type MenuCategory } from '@/data/menu';
import { Reveal, SectionHeading } from '@/components/motion';

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl bg-white shadow-[0_10px_40px_rgba(43,29,23,0.08)]"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2b1d17]">
          <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
          {item.rating.toFixed(1)}
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-[#D4AF37] px-3 py-1 text-xs font-bold text-[#2b1d17]">
          ₹{item.price}
        </span>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-heading text-xl text-[#2b1d17]">{item.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#6b5446]">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-btn text-lg font-semibold text-[#2b1d17]">₹{item.price}</span>
          <button
            className="flex items-center gap-1 rounded-full bg-[#2b1d17] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#5a3e2b]"
            aria-label={`Add ${item.name}`}
          >
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      {/* hover gold edge */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#D4AF37] to-[#f4e09a] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.article>
  );
}

export function Menu() {
  const [active, setActive] = useState<MenuCategory>('all');
  const filtered = active === 'all' ? menu : menu.filter((m) => m.tag === active);

  return (
    <section id="menu" className="relative bg-[#f9f6f1] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Our Menu"
          title={
            <>
              Crafted to <span className="text-gradient-gold">perfection</span>
            </>
          }
          subtitle="From single-origin espresso to wood-fired pizza and decadent desserts — every item is made to order with the freshest ingredients."
        />

        {/* Filters */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {menuCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`font-btn rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.1em] transition-all ${
                  active === c.id
                    ? 'bg-[#2b1d17] text-white shadow-lg'
                    : 'bg-white text-[#6b5446] hover:bg-[#2b1d17] hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
