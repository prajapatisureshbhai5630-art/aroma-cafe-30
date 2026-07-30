import { motion } from 'framer-motion';
import { Coffee, Award, Users, Clock } from 'lucide-react';
import { site } from '@/data/site';
import { useCountUp, useMounted } from '@/lib/hooks';
import { Reveal, SectionHeading } from '@/components/motion';

function StatCard({
  value,
  display,
  label,
  icon: Icon,
  delay,
}: {
  value: number;
  display: string;
  label: string;
  icon: typeof Coffee;
  delay: number;
}) {
  const { ref, value: counted } = useCountUp(value, 2200);
  return (
    <Reveal delay={delay} direction="up">
      <div ref={ref as React.RefObject<HTMLDivElement>} className="glass-light rounded-2xl p-6 text-center">
        <Icon className="mx-auto text-[#5a3e2b]" size={26} />
        <p className="font-heading mt-3 text-3xl text-[#2b1d17]">
          {value > 9999 ? display : counted}
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#6b5446]">{label}</p>
      </div>
    </Reveal>
  );
}

export function About() {
  const mounted = useMounted();
  const stats = [
    { ...site.stats[0], icon: Users, delay: 0 },
    { ...site.stats[1], icon: Award, delay: 0.1 },
    { ...site.stats[2], icon: Coffee, delay: 0.2 },
    { ...site.stats[3], icon: Clock, delay: 0.3 },
  ];

  return (
    <section id="about" className="relative bg-[#f9f6f1] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image collage */}
          <Reveal direction="left">
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/302898/pexels-photo-302898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Barista crafting espresso at Aroma Cafe"
                  className="h-[460px] w-full object-cover"
                  loading="lazy"
                />
              </div>
              <motion.div
                className="absolute -bottom-8 -right-4 hidden w-48 overflow-hidden rounded-2xl border-4 border-[#f9f6f1] shadow-xl sm:block"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <img
                  src="https://images.pexels.com/photos/15800979/pexels-photo-15800979.jpeg?auto=compress&cs=tinysrgb&h=400&w=400"
                  alt="Cold coffee"
                  className="h-40 w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              {/* gold accent blob */}
              <div className="absolute -left-6 -top-6 -z-10 h-40 w-40 rounded-full bg-[#D4AF37]/20 blur-2xl" />
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <SectionHeading
              eyebrow="About Aroma Cafe"
              center={false}
              title={
                <>
                  Where every cup tells a <span className="text-gradient-gold">story</span>
                </>
              }
              subtitle="Born in the heart of Valsad, Aroma Cafe is a celebration of slow mornings, deep conversations, and coffee crafted with obsessive care. From bean to cup, we obsess over every detail — so you can lose yourself in the moment."
            />

            <Reveal delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {mounted &&
                  stats.map((s) => (
                    <StatCard
                      key={s.label}
                      value={s.value}
                      display={s.display}
                      label={s.label}
                      icon={s.icon}
                      delay={s.delay}
                    />
                  ))}
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#menu" className="btn-gold rounded-full px-6 py-3 text-xs" onClick={(e) => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Explore the Menu
                </a>
                <a href="#reservation" className="btn-ghost rounded-full px-6 py-3 text-xs text-[#2b1d17] border-[#2b1d17]/30" onClick={(e) => { e.preventDefault(); document.querySelector('#reservation')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Reserve a Table
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
