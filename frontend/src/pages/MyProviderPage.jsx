import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import {
  getMyProvider,
  createProvider,
  updateMyProvider,
} from '../api/client';
import { Header } from '../components/Header';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Spinner } from '../components/ui/Spinner';
import { useToast } from '../context/ToastContext';

const easeOut = [0.22, 1, 0.36, 1];

export default function MyProviderPage() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [existing, setExisting] = useState(null);

  const [businessName, setBusinessName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const [fieldErrors, setFieldErrors] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getMyProvider()
      .then((data) => {
        setExisting(data.provider);
        setBusinessName(data.provider.businessName);
        setDescription(data.provider.description || '');
        setAddress(data.provider.address);
        setCity(data.provider.city);
      })
      .catch((err) => {
        if (err.status === 404) {
          setExisting(null);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setLoading(false));
    // toast is referentially stable from context — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFieldErrors(null);
    setSubmitting(true);

    const payload = { businessName, description, address, city };

    try {
      const result = existing
        ? await updateMyProvider(payload)
        : await createProvider(payload);
      setExisting(result.provider);
      toast.success(existing ? 'Profile updated.' : 'Profile created.');
    } catch (err) {
      setFieldErrors(err.details || null);
      if (!err.details) toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {existing ? 'Edit your profile' : 'Create your provider profile'}
            </h1>
            <p className="text-slate-600 mt-1">
              {existing
                ? 'Changes save when you click Update.'
                : 'Tell customers about your business.'}
            </p>
          </div>
          {existing && (
            <Link
              to={`/providers/${existing.id}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700 group"
            >
              View public page
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </div>

        <Card>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            <Input
              label="Business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              error={fieldErrors?.businessName?.[0]}
              placeholder="e.g. Alice's Salon"
              required
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              error={fieldErrors?.description?.[0]}
              hint="Optional. Tell customers what you offer."
              placeholder="We offer haircuts, manicures, and..."
              rows={4}
            />
            <Input
              label="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              error={fieldErrors?.address?.[0]}
              placeholder="Street, building, suite"
              required
            />
            <Input
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={fieldErrors?.city?.[0]}
              placeholder="e.g. Bangalore"
              required
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" loading={submitting}>
                {submitting
                  ? 'Saving…'
                  : existing
                    ? 'Update profile'
                    : 'Create profile'}
              </Button>
            </div>
          </form>
        </Card>
      </motion.main>
    </div>
  );
}
