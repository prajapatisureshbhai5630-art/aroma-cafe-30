import { Phone, MapPin, Clock, Mail, Navigation } from 'lucide-react';
import { site } from '@/data/site';
import { Reveal, SectionHeading } from '@/components/motion';

export function Contact() {
  return (
    <section id="contact" className="relative bg-[#f9f6f1] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Visit Us"
          title={
            <>
              Find your way to <span className="text-gradient-gold">Aroma</span>
            </>
          }
          subtitle="Drop by for a cup, give us a call, or message us on WhatsApp — we'd love to host you."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Info card */}
          <Reveal direction="left">
            <div className="flex h-full flex-col gap-5 rounded-3xl bg-[#2b1d17] p-8 text-white sm:p-10">
              <InfoRow icon={MapPin} title="Address">
                <p className="leading-relaxed text-white/75">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.line3}
                  <br />
                  {site.address.line4}
                </p>
              </InfoRow>

              <div className="gold-rule" />

              <InfoRow icon={Phone} title="Phone">
                <a href={site.phoneHref} className="text-white/75 transition-colors hover:text-[#D4AF37]">
                  {site.phone}
                </a>
              </InfoRow>

              <div className="gold-rule" />

              <InfoRow icon={Mail} title="Email">
                <a href={`mailto:${site.email}`} className="text-white/75 transition-colors hover:text-[#D4AF37]">
                  {site.email}
                </a>
              </InfoRow>

              <div className="gold-rule" />

              <InfoRow icon={Clock} title="Business Hours">
                <ul className="space-y-1.5">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4 text-sm text-white/75">
                      <span>{h.day}</span>
                      <span className="text-white/90">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </InfoRow>

              <div className="mt-auto flex flex-wrap gap-3 pt-4">
                <a href={site.phoneHref} className="btn-gold rounded-full px-6 py-3 text-xs">
                  Call Now
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost rounded-full px-6 py-3 text-xs"
                >
                  WhatsApp
                </a>
                <a
                  href={site.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost flex items-center gap-2 rounded-full px-6 py-3 text-xs"
                >
                  <Navigation size={14} /> Directions
                </a>
              </div>
            </div>
          </Reveal>

          {/* Map */}
          <Reveal direction="right">
            <div className="h-full min-h-[420px] overflow-hidden rounded-3xl border border-[#2b1d17]/10 shadow-xl">
              <iframe
                title="Aroma Cafe location map"
                src={site.mapEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-xl bg-[#D4AF37]/15 text-[#D4AF37]">
        <Icon size={20} />
      </span>
      <div>
        <p className="font-btn text-xs uppercase tracking-[0.15em] text-[#D4AF37]">{title}</p>
        <div className="mt-1.5">{children}</div>
      </div>
    </div>
  );
}
