// Service (the noun, not the layer) business logic.
// Owns the rules around who can create/update/delete a service offering.

import { prisma } from '../lib/prisma.js';

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Look up the caller's provider profile. If they don't have one yet, they
// can't add services. We refuse with a clear message instead of a vague 500.
async function getProviderForUser(userId) {
  const provider = await prisma.provider.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!provider) {
    throw httpError(
      'Create your provider profile before adding services.',
      400,
    );
  }
  return provider;
}

// Ownership gate. Loads the service joined with its provider's userId so we
// can confirm the caller owns it. 404 if missing, 403 if it belongs to someone else.
async function assertOwnership(serviceId, userId) {
  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { provider: { select: { userId: true } } },
  });
  if (!service) throw httpError('Service not found', 404);
  if (service.provider.userId !== userId) throw httpError('Forbidden', 403);
  return service;
}

export async function createServiceForUser(userId, data) {
  const provider = await getProviderForUser(userId);
  return prisma.service.create({
    data: { ...data, providerId: provider.id },
  });
}

export async function updateServiceForUser(userId, serviceId, data) {
  await assertOwnership(serviceId, userId);
  return prisma.service.update({
    where: { id: serviceId },
    data,
  });
}

export async function deleteServiceForUser(userId, serviceId) {
  await assertOwnership(serviceId, userId);
  await prisma.service.delete({ where: { id: serviceId } });
}
