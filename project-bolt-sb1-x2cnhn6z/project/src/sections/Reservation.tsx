import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, Users, Loader2, Check, AlertCircle } from 'lucide-react';
import { supabase, type Reservation } from '@/lib/supabase';
import { Reveal, SectionHeading } from '@/components/motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

const times = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
];

export function Reservation() {
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState<Reservation>({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '19:00',
    guests: 2,
    message: '',
  });

  const update = (key: keyof Reservation, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('reservations').insert({
        name: form.name,
        phone: form.phone,
        email: form.email || null,
        date: form.date,
        time: form.time,
        guests: form.guests,
        message: form.message || null,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', phone: '', email: '', date: '', time: '19:00', guests: 2, message: '' });
    } catch {
      setStatus('error');
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section id="reservation" className="relative overflow-hidden bg-[#f9f6f1] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Reservation"
          title={
            <>
              Reserve your <span className="text-gradient-gold">table</span>
            </>
          }
          subtitle="Planning a visit? Book your table in advance and we'll have your spot — and your coffee — ready."
        />

        <Reveal delay={0.15}>
          <form
            onSubmit={submit}
            className="mt-12 grid gap-5 rounded-[2rem] border border-[#2b1d17]/8 bg-white p-7 shadow-[0_20px_60px_rgba(43,29,23,0.1)] sm:p-10 lg:grid-cols-2"
          >
            <Field label="Full Name" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your name"
                className="ac-input"
              />
            </Field>

            <Field label="Phone" required>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+91 ..."
                className="ac-input"
              />
            </Field>

            <Field label="Email (optional)">
              <input
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@email.com"
                className="ac-input"
              />
            </Field>

            <Field label="Guests" icon={Users}>
              <select
                value={form.guests}
                onChange={(e) => update('guests', Number(e.target.value))}
                className="ac-input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
                <option value={9}>8+ guests</option>
              </select>
            </Field>

            <Field label="Date" required icon={CalendarDays}>
              <input
                type="date"
                required
                min={today}
                value={form.date}
                onChange={(e) => update('date', e.target.value)}
                className="ac-input"
              />
            </Field>

            <Field label="Time" icon={Clock}>
              <select
                value={form.time}
                onChange={(e) => update('time', e.target.value)}
                className="ac-input"
              >
                {times.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>

            <div className="lg:col-span-2">
              <Field label="Special requests (optional)">
                <textarea
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Birthday, window seat, anything we should know..."
                  rows={3}
                  className="ac-input resize-none"
                />
              </Field>
            </div>

            <div className="lg:col-span-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-gold flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm disabled:opacity-70"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Booking...
                  </>
                ) : (
                  'Confirm Reservation'
                )}
              </button>
            </div>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="lg:col-span-2 flex items-center gap-2 rounded-2xl bg-green-50 px-5 py-4 text-sm text-green-700"
                >
                  <Check size={18} /> Reservation received! We'll call to confirm shortly.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="lg:col-span-2 flex items-center gap-2 rounded-2xl bg-red-50 px-5 py-4 text-sm text-red-700"
                >
                  <AlertCircle size={18} /> Something went wrong. Please try again or call us directly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>

      <style>{`
        .ac-input {
          width: 100%;
          border: 1px solid rgba(43,29,23,0.15);
          border-radius: 0.9rem;
          background: #faf7f2;
          padding: 0.75rem 1rem;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: #2b1d17;
          transition: border-color .25s, box-shadow .25s, background .25s;
          outline: none;
        }
        .ac-input:focus {
          border-color: #D4AF37;
          background: #fff;
          box-shadow: 0 0 0 4px rgba(212,175,55,0.15);
        }
        .ac-input::placeholder { color: #9b8a7a; }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon?: typeof Users;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 font-btn text-xs uppercase tracking-[0.12em] text-[#5a3e2b]">
        {Icon && <Icon size={13} />} {label} {required && <span className="text-[#D4AF37]">*</span>}
      </span>
      {children}
    </label>
  );
}
