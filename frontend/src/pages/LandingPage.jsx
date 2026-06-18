// Premium SaaS landing page.
// Sections: Hero, Logo cloud, Features, Stats, Testimonials, FAQ, CTA, Footer.
// Color palette: violet-600 (#7C3AED) → purple-500 (#A855F7) → pink-500 (#EC4899).

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Check,
  ChevronDown,
  CreditCard,
  Github,
  Linkedin,
  Palette,
  Quote,
  Shield,
  Sparkles,
  Star,
  Twitter,
  Zap,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Button } from '../components/ui/Button';

const easeOut = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function LandingPage() {
  return (
    <div className="bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <LogoCloud />
      <Features />
      <Stats />
      <Testimonials />
      <Faq />
      <FinalCta />
      <LandingFooter />
    </div>
  );
}

/* ---------------------------- HERO ---------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-12 sm:pt-20 pb-24 sm:pb-32">
      {/* Dot grid with radial mask — fades toward edges */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgb(124 58 237 / 0.18) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 60% at 50% 40%, black, transparent 80%)',
        }}
      />

      {/* Floating gradient blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-40 left-1/4 w-[640px] h-[640px] bg-gradient-to-br from-violet-400/40 to-fuchsia-400/30 rounded-full blur-3xl -z-10"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute top-20 right-1/4 w-[520px] h-[520px] bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full blur-3xl -z-10"
        animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative"
      >
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-violet-200/60 text-violet-700 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm shadow-violet-200/40">
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </motion.span>
            New: Stripe payments now live
            <span className="text-violet-400">·</span>
            <Link to="/signup" className="text-violet-700 hover:text-violet-900 font-semibold inline-flex items-center gap-0.5">
              Try it <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-8 text-5xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900 tracking-tighter leading-[1.02]"
        >
          Bookings,
          <br />
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ backgroundSize: '200% 200%' }}
            className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent"
          >
            beautifully simple.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-7 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          The fastest way for local businesses to take bookings and get paid online.
          No phone tag, no double-bookings, no headaches.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/signup">
            <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-violet-500/30">
              Get started free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/providers">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              See it in action
            </Button>
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-xs text-slate-500 flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
        >
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Free forever plan
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> No credit card
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> 5-minute setup
          </span>
        </motion.p>
      </motion.div>

      <HeroMockup />
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6, ease: easeOut }}
      className="relative mt-16 sm:mt-20 max-w-4xl mx-auto px-4 sm:px-6"
    >
      {/* Glow behind */}
      <div
        aria-hidden
        className="absolute inset-x-12 inset-y-0 bg-gradient-to-r from-violet-300/40 via-fuchsia-300/40 to-pink-300/40 rounded-[3rem] blur-3xl -z-10"
      />

      {/* Browser-style window */}
      <div className="relative bg-white rounded-2xl shadow-2xl shadow-violet-300/40 border border-slate-200/80 overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-amber-400/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
          </div>
          <div className="ml-3 flex-1 text-center text-xs text-slate-400">
            bookly.app/dashboard
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                Today, Mar 14
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                7 bookings
              </div>
            </div>
            <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live
            </div>
          </div>

          <div className="space-y-2">
            <BookingRow
              time="10:00"
              service="Haircut"
              customer="Priya M."
              amount="₹500"
              tone="bg-violet-100 text-violet-700"
            />
            <BookingRow
              time="11:30"
              service="Manicure"
              customer="Aditi K."
              amount="₹800"
              tone="bg-fuchsia-100 text-fuchsia-700"
            />
            <BookingRow
              time="14:00"
              service="Color treatment"
              customer="Rohan S."
              amount="₹2,500"
              tone="bg-pink-100 text-pink-700"
            />
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-500">Today's revenue</div>
            <div className="text-xl font-bold text-slate-900">₹12,300</div>
          </div>
        </div>
      </div>

      {/* Floating confirmation toast */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.4, ease: easeOut }}
        className="hidden sm:flex absolute -right-4 -bottom-6 lg:-right-12 lg:-bottom-8 bg-white rounded-2xl shadow-2xl shadow-emerald-200/40 border border-slate-100 p-4 items-center gap-3 max-w-xs"
      >
        <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
          <Check className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <div className="text-xs text-slate-500">New booking · just now</div>
          <div className="font-semibold text-slate-900 text-sm">
            Sunshine Salon · ₹1,200
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function BookingRow({ time, service, customer, amount, tone }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
      <div
        className={`px-2.5 py-1 rounded-md text-xs font-bold ${tone} shrink-0 font-mono`}
      >
        {time}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-slate-900 truncate">
          {service}
        </div>
        <div className="text-xs text-slate-500 truncate">{customer}</div>
      </div>
      <div className="text-sm font-semibold text-slate-700 font-mono">{amount}</div>
    </div>
  );
}

/* ----------------------- LOGO CLOUD --------------------- */

function LogoCloud() {
  return (
    <section className="py-16 sm:py-20 border-y border-slate-100 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs uppercase tracking-[0.2em] text-slate-500 font-semibold mb-10"
        >
          Trusted by 2,500+ local businesses
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center justify-items-center opacity-60"
        >
          {['BLISS', 'GLOW', 'TutorNet', 'HealHub', 'Forma', 'CleanCo'].map(
            (name) => (
              <motion.div
                key={name}
                variants={fadeUp}
                className="text-2xl font-bold text-slate-700 tracking-tight"
                style={{
                  fontFamily:
                    name === 'TutorNet'
                      ? 'serif'
                      : name === 'Forma'
                        ? 'monospace'
                        : 'inherit',
                  fontStyle: name === 'GLOW' ? 'italic' : 'normal',
                }}
              >
                {name}
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------- FEATURES ------------------------- */

const features = [
  {
    icon: Zap,
    title: 'Instant bookings',
    description:
      'A booking flow so smooth customers do it on their phone in 30 seconds. No account needed.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: CreditCard,
    title: 'Online payments',
    description:
      'Stripe and Razorpay built in. Get paid before they walk in. No-shows down 60%.',
    gradient: 'from-purple-500 to-fuchsia-500',
  },
  {
    icon: Bell,
    title: 'Smart reminders',
    description:
      'Automatic email and SMS reminders the day before. Customers actually show up.',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: Calendar,
    title: 'Calendar sync',
    description:
      'Two-way sync with Google, Apple, and Outlook. Your slots stay in sync, everywhere.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Palette,
    title: 'Your brand, your way',
    description:
      'Custom colors, logo, and domain. Customers see your brand, not ours.',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: BarChart3,
    title: 'Real analytics',
    description:
      'See your best services, busiest days, top customers. Double down on what works.',
    gradient: 'from-purple-500 to-pink-500',
  },
];

function Features() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead
          eyebrow="Everything you need"
          title="Built for the way you actually work"
          sub="Bookly handles the boring stuff so you can focus on your customers."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={fadeUp}>
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, description, gradient }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative h-full bg-white/70 backdrop-blur-xl border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-violet-200/40 hover:border-violet-200 transition-all"
    >
      {/* Subtle gradient halo on hover */}
      <div
        aria-hidden
        className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity -z-10`}
      />

      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} shadow-md shadow-violet-300/30 mb-5`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

/* --------------------------- STATS --------------------------- */

function Stats() {
  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl p-10 sm:p-16 text-white shadow-2xl shadow-violet-400/40 overflow-hidden"
        >
          {/* Decorative shapes inside the gradient panel */}
          <motion.div
            aria-hidden
            className="absolute -top-20 -left-20 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-20 -right-20 w-80 h-80 bg-violet-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative text-center mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-200 font-semibold mb-3">
              By the numbers
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Built for scale, loved by users
            </h2>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-4">
            <StatItem value={10000} suffix="+" label="Bookings processed" />
            <StatItem value={500} suffix="+" label="Active providers" />
            <StatItem value={4.9} suffix="★" label="Average rating" isDecimal />
            <StatItem value={99.9} suffix="%" label="Uptime" isDecimal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatItem({ value, suffix, label, isDecimal = false }) {
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        <Counter to={value} suffix={suffix} isDecimal={isDecimal} />
      </div>
      <div className="text-sm text-violet-100 mt-2">{label}</div>
    </div>
  );
}

function Counter({ to, suffix = '', isDecimal = false, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(isDecimal ? '0.0' : '0');

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = to * eased;
      setDisplay(
        isDecimal
          ? current.toFixed(1)
          : Math.round(current).toLocaleString(),
      );
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, to, isDecimal, duration]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------ TESTIMONIALS ------------------------ */

const testimonials = [
  {
    quote:
      "Bookly cut our no-show rate by 60%. Customers actually love getting reminders without us lifting a finger.",
    name: 'Priya Sharma',
    role: 'Owner, Bliss Salon',
    color: 'bg-violet-100 text-violet-700',
  },
  {
    quote:
      "Setup took 15 minutes. We were taking online bookings before lunch the same day.",
    name: 'Raj Kumar',
    role: 'Founder, TutorNet',
    color: 'bg-fuchsia-100 text-fuchsia-700',
  },
  {
    quote:
      "Finally, I don't have to answer the phone at midnight. Sleep is back. My team is back.",
    name: 'Anita Desai',
    role: 'Lead Stylist, Glow Studio',
    color: 'bg-pink-100 text-pink-700',
  },
];

function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHead
          eyebrow="Loved by users"
          title="Stories from the front lines"
          sub="Real businesses, real results."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 grid md:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <motion.div key={t.name} variants={fadeUp}>
              <TestimonialCard {...t} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ quote, name, role, color }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="h-full bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-violet-200/40 transition-all relative"
    >
      <Quote className="w-8 h-8 text-violet-200 mb-3" />

      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <p className="text-slate-700 leading-relaxed mb-6">"{quote}"</p>

      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${color}`}
        >
          {initials}
        </div>
        <div>
          <div className="font-semibold text-slate-900 text-sm">{name}</div>
          <div className="text-xs text-slate-500">{role}</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------------------- FAQ ---------------------------- */

const faqs = [
  {
    q: 'Is there a free plan?',
    a: "Yes. Bookly is free for your first 100 bookings every month — forever. After that, simple pricing scales with you. No surprise fees, no annual contracts.",
  },
  {
    q: 'How long does setup take?',
    a: 'Most businesses are live within 30 minutes. Add your services, set your hours, choose a payment provider, and you can accept your first booking the same day.',
  },
  {
    q: 'Do customers need to create an account?',
    a: 'No. Customers can book without signing up. They get an email and SMS confirmation, and that\'s it. The lower the friction, the more bookings you take.',
  },
  {
    q: 'Which payment processors do you support?',
    a: 'Stripe and Razorpay are built in. Stripe is the global default; Razorpay is optimized for businesses in India with native UPI support. Both work in test mode out of the box.',
  },
  {
    q: 'Can I export my data?',
    a: 'Yes. You own your data. Export all bookings, customers, and payment records to CSV at any time, no questions asked.',
  },
  {
    q: 'Is there a mobile app?',
    a: 'Bookly is mobile-first on the web — both your dashboard and the customer booking flow work great on phones. Native iOS and Android apps are on our roadmap for late 2026.',
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHead
          eyebrow="Frequently asked"
          title="Quick answers"
          sub="The most common questions, answered honestly."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="mt-16 bg-white border border-slate-200 rounded-2xl px-6 sm:px-8 shadow-sm"
        >
          {faqs.map((item, i) => (
            <motion.div key={i} variants={fadeUp}>
              <FaqItem
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                isLast={i === faqs.length - 1}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Still have questions?{' '}
          <a href="mailto:hello@bookly.app" className="text-violet-600 font-semibold hover:text-violet-700">
            Email us
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function FaqItem({ q, a, isOpen, onToggle, isLast }) {
  return (
    <div className={isLast ? '' : 'border-b border-slate-100'}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left group"
      >
        <span className="font-semibold text-slate-900 text-base sm:text-lg group-hover:text-violet-700 transition-colors">
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 p-1 rounded-full transition-colors ${
            isOpen ? 'bg-violet-100 text-violet-700' : 'text-slate-400'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed pr-8 sm:pr-12">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------- FINAL CTA ------------------------- */

function FinalCta() {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="relative bg-slate-950 rounded-3xl p-10 sm:p-16 text-center overflow-hidden"
        >
          {/* Background gradient + dots */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-violet-700 via-purple-700 to-fuchsia-700"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <motion.div
            aria-hidden
            className="absolute -top-20 -left-20 w-80 h-80 bg-pink-500/40 rounded-full blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <Shield className="w-3.5 h-3.5" />
              No risk, no commitment
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Ready to stop
              <br />
              answering the phone?
            </h2>
            <p className="mt-6 text-lg text-violet-100 max-w-xl mx-auto">
              Start free, no credit card required. Set up in 5 minutes, take your
              first booking today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-violet-700 hover:bg-violet-50 shadow-xl"
                >
                  Get started free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="mailto:hello@bookly.app">
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto text-white hover:bg-white/10"
                >
                  Talk to us
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- FOOTER --------------------------- */

const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Roadmap', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Blog', 'Careers', 'Press kit'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'API', 'Status', 'Support'],
  },
  {
    title: 'Legal',
    links: ['Terms', 'Privacy', 'Cookies', 'Security'],
  },
];

function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
      {/* Top gradient line */}
      <div
        aria-hidden
        className="h-px bg-gradient-to-r from-transparent via-violet-500/60 to-transparent"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg text-white">Bookly</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The fastest way for local businesses to take bookings and get paid
              online.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <SocialIcon Icon={Twitter} />
              <SocialIcon Icon={Github} />
              <SocialIcon Icon={Linkedin} />
            </div>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                  {col.title}
                </div>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Bookly. A learning project built with React, Express &amp; Postgres.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ Icon }) {
  return (
    <motion.a
      href="#"
      whileHover={{ y: -2, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
    >
      <Icon className="w-4 h-4" />
    </motion.a>
  );
}

/* ---------------------- SHARED SECTION HEAD ---------------------- */

function SectionHead({ eyebrow, title, sub }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs uppercase tracking-[0.2em] text-violet-600 font-semibold mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          className="mt-4 text-slate-600 leading-relaxed"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
