import { motion } from 'framer-motion';
import { useScrollProgress } from '@/lib/hooks';

/** A slim gold scroll-progress bar pinned to the very top of the viewport. */
export function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[#5a3e2b] via-[#D4AF37] to-[#f4e09a]"
      style={{ scaleX: progress }}
    />
  );
}
