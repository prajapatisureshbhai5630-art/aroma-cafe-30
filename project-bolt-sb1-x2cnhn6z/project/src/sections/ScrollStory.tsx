import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollStoryScenes } from '@/data/menu';

gsap.registerPlugin(ScrollTrigger);

/**
 * A cinematic scroll-pinned story. The container pins while the visitor
 * scrolls through each scene; the scene number, headline, copy and image
 * crossfade with GSAP ScrollTrigger. Background tint deepens as the story
 * progresses for a "darkening roast" feel.
 */
export function ScrollStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.story-panel');
      const images = gsap.utils.toArray<HTMLElement>('.story-image');
      const bg = root.current?.querySelector('.story-bg') as HTMLElement | null;

      panels.forEach((panel, i) => {
        // text crossfade
        gsap.fromTo(
          panel,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root.current,
              start: `top+=${i * 100}% top`,
              end: `top+=${(i + 1) * 100}% top`,
              scrub: false,
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      images.forEach((img, i) => {
        gsap.fromTo(
          img,
          { opacity: 0, scale: 1.08 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: root.current,
              start: `top+=${i * 100}% top`,
              end: `top+=${(i + 1) * 100}% top`,
              scrub: false,
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      // darken the background as the story progresses
      if (bg) {
        gsap.fromTo(
          bg,
          { backgroundColor: '#2b1d17' },
          {
            backgroundColor: '#160e0a',
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={root} className="story-bg relative bg-[#2b1d17]">
      {/* sticky stage */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-5 lg:px-8">
          {/* left: text */}
          <div className="relative z-10 w-full lg:w-1/2">
            {scrollStoryScenes.map((s, i) => (
              <div
                key={s.n}
                className="story-panel absolute left-5 right-5 lg:static lg:left-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <p className="font-heading text-7xl text-[#D4AF37]/30 lg:text-8xl">{s.n}</p>
                <h3 className="font-heading mt-2 text-3xl text-white sm:text-4xl lg:text-5xl">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-md text-white/70">{s.text}</p>
              </div>
            ))}
          </div>

          {/* right: image crossfade */}
          <div className="absolute right-5 top-1/2 hidden h-[60vh] w-[42%] -translate-y-1/2 overflow-hidden rounded-3xl lg:block">
            {scrollStoryScenes.map((s, i) => (
              <img
                key={s.n}
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="story-image absolute inset-0 h-full w-full object-cover"
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
            ))}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-[#D4AF37]/20" />
          </div>
        </div>

        {/* progress dots */}
        <div className="pointer-events-none absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {scrollStoryScenes.map((s, i) => (
            <span
              key={s.n}
              className="story-dot h-1.5 rounded-full bg-white/25 transition-all"
              data-index={i}
              style={{ width: i === 0 ? 24 : 8 }}
            />
          ))}
        </div>
      </div>

      {/* spacer so the pin has scroll length to play through */}
      <div style={{ height: `${scrollStoryScenes.length * 100}%` }} />
    </section>
  );
}
