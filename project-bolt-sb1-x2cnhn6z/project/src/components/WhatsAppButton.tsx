import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { site } from '@/data/site';

/** Floating WhatsApp chat button — opens a chat with the cafe number. */
export function WhatsAppButton() {
  return (
    <motion.a
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_8px_30px_rgba(37,211,102,0.4)]"
      initial={{ opacity: 0, scale: 0.6, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} />
      <span className="font-btn hidden text-sm font-semibold sm:inline">WhatsApp</span>
      <span className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 0 0 rgba(37,211,102,0.5)' }} />
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#25D366]"
        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />
    </motion.a>
  );
}
