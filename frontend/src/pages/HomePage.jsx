// Dashboard at /dashboard. Animated greeting + staggered action cards.

import { Link } from 'react-router-dom';
import { Calendar, Building2, ArrowRight, User as UserIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const easeOut = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function HomePage() {
  const { user } = useAuth();
  const isProvider = user.role === 'PROVIDER';
  const firstName = user.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <motion.main
        initial="hidden"
        animate="visible"
        variants={container}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
      >
        <motion.div
          variants={item}
          className="flex flex-wrap items-start justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Hi, {firstName}{' '}
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 4 }}
                style={{ transformOrigin: '70% 70%' }}
              >
                👋
              </motion.span>
            </h1>
            <p className="text-slate-600 mt-1">Here's what's on your plate.</p>
          </div>
          <Badge variant={isProvider ? 'primary' : 'default'}>
            {user.role.toLowerCase()}
          </Badge>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div variants={item}>
            <ActionCard
              icon={Calendar}
              iconBg="bg-violet-100"
              iconColor="text-violet-600"
              title="Upcoming bookings"
              description="You haven't booked anything yet."
              linkTo="/providers"
              linkLabel="Browse providers"
            />
          </motion.div>

          <motion.div variants={item}>
            {isProvider ? (
              <ActionCard
                icon={Building2}
                iconBg="bg-fuchsia-100"
                iconColor="text-fuchsia-600"
                title="Your provider profile"
                description="Keep your business details up to date."
                linkTo="/my-provider"
                linkLabel="Manage profile"
              />
            ) : (
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-100 rounded-xl">
                    <UserIcon className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">Become a provider</h3>
                    <p className="text-sm text-slate-500 mt-1">
                      Offer your services to customers in your area.
                    </p>
                    <p className="text-xs text-slate-400 mt-3">
                      (For now, change your role to PROVIDER in Prisma Studio, then log back in.)
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}

function ActionCard({ icon: Icon, iconBg, iconColor, title, description, linkTo, linkLabel }) {
  return (
    <Card className="p-6" hover>
      <div className="flex items-start gap-4">
        <div className={`p-3 ${iconBg} rounded-xl`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
          <Link
            to={linkTo}
            className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 mt-3 group"
          >
            {linkLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
