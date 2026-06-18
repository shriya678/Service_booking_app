import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Building2 } from 'lucide-react';
import { motion } from 'motion/react';
import { listProviders } from '../api/client';
import { Header } from '../components/Header';
import { Card } from '../components/ui/Card';
import { EmptyState } from '../components/ui/EmptyState';
import { ProviderCardSkeleton } from '../components/ui/Skeleton';

const easeOut = [0.22, 1, 0.36, 1];
const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

export default function ProvidersPage() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    listProviders()
      .then((data) => setProviders(data.providers))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-slate-900">Providers</h1>
          <p className="text-slate-600 mt-1">Find a local salon, tutor, or clinic.</p>
        </motion.div>

        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProviderCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {!loading && !error && providers.length === 0 && (
          <Card>
            <EmptyState
              icon={Building2}
              title="No providers yet"
              description="Be the first to list your business. Sign up and switch your role to PROVIDER."
            />
          </Card>
        )}

        {!loading && !error && providers.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={grid}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {providers.map((p) => (
              <motion.div key={p.id} variants={item}>
                <Link to={`/providers/${p.id}`} className="block h-full">
                  <Card hover className="p-5 h-full">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar name={p.businessName} />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                          {p.businessName}
                        </h3>
                        <p className="text-sm text-slate-500 truncate">
                          by {p.user.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{p.city}</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}

function Avatar({ name }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  const palettes = [
    'bg-violet-100 text-violet-700',
    'bg-fuchsia-100 text-fuchsia-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-amber-100 text-amber-700',
    'bg-rose-100 text-rose-700',
  ];
  const colorIndex = name.charCodeAt(0) % palettes.length;
  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${palettes[colorIndex]}`}
    >
      {initials}
    </div>
  );
}
