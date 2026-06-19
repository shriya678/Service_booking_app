// Formatting helpers for values stored in their smallest/integer unit.
// Keep all rupees↔paisa and minutes↔hours conversion here so it's consistent
// everywhere in the app.

export function formatPrice(cents) {
  const rupees = cents / 100;
  return `₹${rupees.toLocaleString('en-IN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return hours === 1 ? '1 hour' : `${hours} hours`;
  return `${hours} hr ${mins} min`;
}
