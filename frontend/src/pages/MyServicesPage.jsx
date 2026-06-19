// Service manager for providers.
//   - List services as cards
//   - Add via modal form
//   - Edit via modal form (same component, pre-filled)
//   - Pause/resume inline (toggles `active`)
//   - Delete with a confirmation modal
//
// Empty states for: provider not created yet, no services yet.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  Clock,
  Edit2,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  getMyProvider,
  createService,
  updateService,
  deleteService,
} from '../api/client';
import { Header } from '../components/Header';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { Spinner } from '../components/ui/Spinner';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { formatPrice, formatDuration } from '../utils/format';

const easeOut = [0.22, 1, 0.36, 1];
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
};

export default function MyServicesPage() {
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [providerExists, setProviderExists] = useState(true);
  const [services, setServices] = useState([]);

  // Modal state
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null); // null = create mode
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    getMyProvider()
      .then((data) => setServices(data.provider.services))
      .catch((err) => {
        if (err.status === 404) {
          setProviderExists(false);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(service) {
    setEditing(service);
    setFormOpen(true);
  }

  // The form calls onSubmit; if it throws, the form handles error display.
  // If it returns, we close and toast.
  async function handleSave(data) {
    const wasEditing = !!editing;
    let result;
    if (wasEditing) {
      result = await updateService(editing.id, data);
      setServices((prev) =>
        prev.map((s) => (s.id === result.service.id ? result.service : s)),
      );
    } else {
      result = await createService(data);
      setServices((prev) => [...prev, result.service]);
    }
    setFormOpen(false);
    setEditing(null);
    toast.success(wasEditing ? 'Service updated.' : 'Service created.');
  }

  async function handleToggleActive(service) {
    try {
      const result = await updateService(service.id, { active: !service.active });
      setServices((prev) =>
        prev.map((s) => (s.id === result.service.id ? result.service : s)),
      );
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleConfirmDelete() {
    if (!confirmDeleteId) return;
    setDeleting(true);
    try {
      await deleteService(confirmDeleteId);
      setServices((prev) => prev.filter((s) => s.id !== confirmDeleteId));
      toast.success('Service deleted.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
      setConfirmDeleteId(null);
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

  if (!providerExists) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <Card>
            <EmptyState
              icon={Sparkles}
              title="Create your provider profile first"
              description="Services belong to your provider profile. Set that up, then come back to add what you offer."
              action={
                <Link to="/my-provider">
                  <Button>Create profile</Button>
                </Link>
              }
            />
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
      >
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your services</h1>
            <p className="text-slate-600 mt-1">What you offer customers.</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4" />
            Add service
          </Button>
        </div>

        {services.length === 0 ? (
          <Card>
            <EmptyState
              icon={Sparkles}
              title="No services yet"
              description="Add your first service so customers can book it."
              action={
                <Button onClick={openCreate}>
                  <Plus className="w-4 h-4" />
                  Add your first service
                </Button>
              }
            />
          </Card>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-4 sm:grid-cols-2"
          >
            <AnimatePresence>
              {services.map((s) => (
                <motion.div
                  key={s.id}
                  variants={item}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <ServiceCard
                    service={s}
                    onEdit={() => openEdit(s)}
                    onToggleActive={() => handleToggleActive(s)}
                    onDelete={() => setConfirmDeleteId(s.id)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.main>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={editing ? 'Edit service' : 'Add service'}
      >
        <ServiceForm
          initial={editing}
          onSubmit={handleSave}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <Modal
        open={!!confirmDeleteId}
        onClose={() => setConfirmDeleteId(null)}
        title="Delete service?"
      >
        <p className="text-slate-600">
          This can't be undone. Past bookings (when those exist) will keep referencing
          the deleted service.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
            Cancel
          </Button>
          <Button variant="danger" loading={deleting} onClick={handleConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

/* --------------------------- SERVICE CARD --------------------------- */

function ServiceCard({ service, onEdit, onToggleActive, onDelete }) {
  return (
    <Card className={`p-5 transition-opacity ${!service.active ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-slate-900">{service.name}</h3>
        {!service.active && <Badge>Paused</Badge>}
      </div>

      {service.description && (
        <p className="text-sm text-slate-600 mb-4 line-clamp-2">
          {service.description}
        </p>
      )}

      <div className="flex items-center gap-4 text-sm text-slate-700">
        <div className="flex items-center gap-1.5">
          <Banknote className="w-4 h-4 text-slate-400" />
          <span className="font-semibold">{formatPrice(service.priceCents)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-slate-400" />
          {formatDuration(service.durationMinutes)}
        </div>
      </div>

      <div className="flex items-center gap-1 mt-5 pt-4 border-t border-slate-100">
        <Button size="sm" variant="ghost" onClick={onEdit}>
          <Edit2 className="w-3.5 h-3.5" />
          Edit
        </Button>
        <Button size="sm" variant="ghost" onClick={onToggleActive}>
          {service.active ? (
            <>
              <EyeOff className="w-3.5 h-3.5" />
              Pause
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              Resume
            </>
          )}
        </Button>
        <button
          onClick={onDelete}
          className="ml-auto p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          aria-label="Delete service"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}

/* --------------------------- SERVICE FORM --------------------------- */

// Pre-fills from `initial` (when editing) or starts blank (when creating).
// Manages its own field/top-level error state. Calls onSubmit({ name, ..., priceCents, durationMinutes });
// the parent is responsible for closing the modal on success.
function ServiceForm({ initial, onSubmit, onCancel }) {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  // Display price in rupees so the user types "500" not "50000".
  const [priceRupees, setPriceRupees] = useState(
    initial ? (initial.priceCents / 100).toString() : '',
  );
  const [durationMinutes, setDurationMinutes] = useState(
    initial?.durationMinutes?.toString() || '30',
  );

  const [fieldErrors, setFieldErrors] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setFieldErrors(null);
    setError(null);
    setSubmitting(true);

    // Convert at the boundary: rupees (string) → paisa (integer).
    const priceCents = Math.round(parseFloat(priceRupees) * 100);
    const data = {
      name,
      description: description || undefined,
      priceCents: Number.isFinite(priceCents) ? priceCents : -1,
      durationMinutes: parseInt(durationMinutes, 10),
    };

    try {
      await onSubmit(data);
    } catch (err) {
      if (err.details) setFieldErrors(err.details);
      else setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={fieldErrors?.name?.[0]}
        placeholder="e.g. Haircut"
        required
        autoFocus
      />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        error={fieldErrors?.description?.[0]}
        hint="Optional. A short pitch."
        placeholder="Wash, cut, and style"
        rows={2}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Price (₹)"
          type="number"
          step="1"
          min="0"
          value={priceRupees}
          onChange={(e) => setPriceRupees(e.target.value)}
          error={fieldErrors?.priceCents?.[0]}
          placeholder="500"
          required
        />
        <Input
          label="Duration (min)"
          type="number"
          step="5"
          min="5"
          value={durationMinutes}
          onChange={(e) => setDurationMinutes(e.target.value)}
          error={fieldErrors?.durationMinutes?.[0]}
          placeholder="30"
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-3 py-2.5">
          {error}
        </div>
      )}

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" loading={submitting}>
          {initial ? 'Save changes' : 'Create service'}
        </Button>
      </div>
    </form>
  );
}
