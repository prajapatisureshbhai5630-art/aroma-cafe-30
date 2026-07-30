import * as Icons from 'lucide-react';
import { whyChooseUs } from '@/data/menu';
import { Reveal, SectionHeading } from '@/components/motion';

export function WhyChooseUs() {
  return (
    <section id="why" className="relative bg-[#f9f6f1] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why Choose Us"
          title={
            <>
              The Aroma <span className="text-gradient-gold">difference</span>
            </>
          }
          subtitle="Six reasons our guests keep coming back — from bean to ambience to the smile that greets you at the door."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseUs.map((item, i) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[item.icon] ?? Icons.Sparkles;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.1} direction="up">
                <div className="group h-full rounded-3xl border border-[#2b1d17]/8 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_50px_rgba(43,29,23,0.12)]">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#2b1d17] to-[#5a3e2b] text-[#D4AF37] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-heading mt-5 text-xl text-[#2b1d17]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b5446]">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
