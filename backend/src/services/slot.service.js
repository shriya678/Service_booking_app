// Slot business logic. A slot lives under a service; ownership traverses
// slot → service → provider → user.

import { prisma } from '../lib/prisma.js';

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Confirm the service exists AND belongs to a provider owned by this user.
// Same pattern as in service.service.js, repeated because the path is different.
async function assertServiceOwnership(serviceId, userId) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { provider: { select: { userId: true } } },
  });
  if (!service) throw httpError('Service not found', 404);
  if (service.provider.userId !== userId) throw httpError('Forbidden', 403);
  return service;
}

// Two-hop ownership: slot → service → provider.userId.
async function assertSlotOwnership(slotId, userId) {
  const slot = await prisma.slot.findUnique({
    where: { id: slotId },
    include: {
      service: { include: { provider: { select: { userId: true } } } },
    },
  });
  if (!slot) throw httpError('Slot not found', 404);
  if (slot.service.provider.userId !== userId) {
    throw httpError('Forbidden', 403);
  }
  return slot;
}

// Public list: future slots for a service. Includes booked + available;
// the frontend decides how to display.
export function listSlotsForService(serviceId) {
  return prisma.slot.findMany({
    where: {
      serviceId,
      startsAt: { gte: new Date() },
    },
    orderBy: { startsAt: 'asc' },
  });
}

export async function createSlotForService(userId, serviceId, data) {
  await assertServiceOwnership(serviceId, userId);

  if (data.endsAt <= data.startsAt) {
    throw httpError('endsAt must be after startsAt', 400);
  }
  if (data.startsAt < new Date()) {
    throw httpError('startsAt must be in the future', 400);
  }

  return prisma.slot.create({
    data: {
      serviceId,
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    },
  });
}

export async function deleteSlot(userId, slotId) {
  const slot = await assertSlotOwnership(slotId, userId);
  // Refuse to delete a booked slot — would orphan the customer's booking.
  // The right path is to cancel the booking first (Feature 13).
  if (slot.isBooked) {
    throw httpError('Cannot delete a booked slot. Cancel the booking first.', 400);
  }
  await prisma.slot.delete({ where: { id: slotId } });
}
