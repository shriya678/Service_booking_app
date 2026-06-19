import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Calendar, Clock, Banknote } from 'lucide-react';
import { motion } from 'motion/react';
import { getProvider } from '../api/client';
import { Header } from '../components/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { formatPrice, formatDuration } from '../utils/format';

const easeOut = [0.22, 1, 0.36, 1];

export default function ProviderDetailPage() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProvider(null);
    getProvider(id)
      .then((data) => setProvider(data.provider))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <Link
          to="/providers"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-violet-600 mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          All providers
        </Link>

        {loading && <DetailSkeleton />}

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {provider && (
          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="lg:col-span-2"
            >
              <Card className="p-8">
                <h1 className="text-3xl font-bold text-slate-900">
                  {provider.businessName}
                </h1>
                <p className="text-slate-500 mt-2">by {provider.user.name}</p>

                {provider.description && (
                  <div className="mt-6">
                    <h2 className="text-sm font-semibold text-slate-900 mb-2">
                      About
                    </h2>
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed">
                      {provider.description}
                    </p>
                  </div>
                )}

                {provider.services && provider.services.length > 0 && (
                  <ServicesSection services={provider.services} />
                )}

                <div className="border-t border-slate-200 mt-6 pt-6 space-y-3">
                  <DetailRow icon={MapPin} label="Address">
                    {provider.address}, {provider.city}
                  </DetailRow>
                  <DetailRow icon={Mail} label="Contact">
                    <a
                      href={`mailto:${provider.user.email}`}
                      className="text-violet-600 hover:text-violet-700"
                    >
                      {provider.user.email}
                    </a>
                  </DetailRow>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.15 }}
              className="lg:sticky lg:top-20 h-fit"
            >
              <Card className="p-6">
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-violet-100 to-fuchsia-100 rounded-xl mb-3"
                  >
                    <Calendar className="w-5 h-5 text-violet-600" />
                  </motion.div>
                  <h3 className="font-semibold text-slate-900">Book an appointment</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Slots and booking are coming soon.
                  </p>
                  <Button disabled className="w-full mt-4">
                    Book now (coming soon)
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

function ServicesSection({ services }) {
  return (
    <div className="border-t border-slate-200 mt-6 pt-6">
      <h2 className="text-sm font-semibold text-slate-900 mb-3">
        Services &amp; pricing
      </h2>
      <div className="space-y-2">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 + i * 0.05, ease: easeOut }}
            className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-violet-200 hover:bg-violet-50/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{s.name}</h3>
              {s.description && (
                <p className="text-sm text-slate-600 mt-0.5 line-clamp-2">
                  {s.description}
                </p>
              )}
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDuration(s.durationMinutes)}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end font-bold text-slate-900">
                <Banknote className="w-4 h-4 text-slate-400" />
                {formatPrice(s.priceCents)}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
      <div className="flex-1">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </div>
        <div className="text-sm text-slate-700 mt-0.5">{children}</div>
      </div>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-8 space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <div className="pt-6 space-y-3">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
          <Skeleton className="h-3 w-4/6" />
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-3">
        <Skeleton className="w-12 h-12 rounded-xl mx-auto" />
        <Skeleton className="h-4 w-2/3 mx-auto" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    </div>
  );
}
