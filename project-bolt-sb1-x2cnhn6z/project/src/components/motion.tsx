import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Reveals children on scroll into view with a configurable direction.
 * Used across sections for consistent reveal-on-scroll motion.
 */
type Direction = 'up' | 'down' | 'left' | 'right' | 'scale';

export function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    scale: { scale: 0.9 },
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax wrapper — moves its children on the Y axis based on scroll.
 */
export function Parallax({
  children,
  speed = 0.3,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, -speed * 120]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Small reusable section eyebrow + heading block. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <Reveal>
        <p className={`eyebrow ${light ? 'text-[#D4AF37]' : 'text-[#5a3e2b]'}`}>{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          className={`font-heading mt-4 text-4xl leading-[1.15] sm:text-5xl lg:text-[3.4rem] ${
            light ? 'text-white' : 'text-[#2b1d17]'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={`mt-5 text-base leading-relaxed ${
              light ? 'text-white/70' : 'text-[#6b5446]'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
