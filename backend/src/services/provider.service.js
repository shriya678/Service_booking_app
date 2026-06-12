// Provider business logic. No req/res in here — services are HTTP-agnostic.

import { prisma } from '../lib/prisma.js';

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// What we expose about the owner alongside a provider.
// `select` is critical — without it, we'd leak passwordHash.
const PROVIDER_INCLUDE = {
  user: {
    select: { id: true, name: true, email: true },
  },
};

export function listProviders() {
  return prisma.provider.findMany({
    include: PROVIDER_INCLUDE,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProviderById(id) {
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: PROVIDER_INCLUDE,
  });
  if (!provider) throw httpError('Provider not found', 404);
  return provider;
}

export async function getProviderByUserId(userId) {
  const provider = await prisma.provider.findUnique({
    where: { userId },
    include: PROVIDER_INCLUDE,
  });
  if (!provider) throw httpError('Provider profile not found', 404);
  return provider;
}

export async function createProviderForUser(userId, data) {
  const existing = await prisma.provider.findUnique({ where: { userId } });
  if (existing) throw httpError('Provider profile already exists', 409);

  return prisma.provider.create({
    data: { ...data, userId },
    include: PROVIDER_INCLUDE,
  });
}

export async function updateProviderForUser(userId, data) {
  const existing = await prisma.provider.findUnique({ where: { userId } });
  if (!existing) throw httpError('Provider profile not found', 404);

  return prisma.provider.update({
    where: { userId },
    data,
    include: PROVIDER_INCLUDE,
  });
}
