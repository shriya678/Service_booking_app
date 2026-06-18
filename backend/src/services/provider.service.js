// Provider business logic. No req/res in here — services are HTTP-agnostic.

import { prisma } from '../lib/prisma.js';

function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// Base join — just the user info we expose alongside a provider.
// `select` is critical: without it, we'd leak passwordHash.
const PROVIDER_USER = {
  user: { select: { id: true, name: true, email: true } },
};

// Public detail view — provider + user + ONLY active services.
const PROVIDER_DETAIL_INCLUDE = {
  ...PROVIDER_USER,
  services: {
    where: { active: true },
    orderBy: { createdAt: 'asc' },
  },
};

// Owner-facing view — includes ALL services (active + inactive) so the
// provider can manage paused ones.
const PROVIDER_ME_INCLUDE = {
  ...PROVIDER_USER,
  services: {
    orderBy: { createdAt: 'asc' },
  },
};

// List view — keep response small, no services nested.
export function listProviders() {
  return prisma.provider.findMany({
    include: PROVIDER_USER,
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProviderById(id) {
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: PROVIDER_DETAIL_INCLUDE,
  });
  if (!provider) throw httpError('Provider not found', 404);
  return provider;
}

export async function getProviderByUserId(userId) {
  const provider = await prisma.provider.findUnique({
    where: { userId },
    include: PROVIDER_ME_INCLUDE,
  });
  if (!provider) throw httpError('Provider profile not found', 404);
  return provider;
}

export async function createProviderForUser(userId, data) {
  const existing = await prisma.provider.findUnique({ where: { userId } });
  if (existing) throw httpError('Provider profile already exists', 409);

  return prisma.provider.create({
    data: { ...data, userId },
    include: PROVIDER_ME_INCLUDE,
  });
}

export async function updateProviderForUser(userId, data) {
  const existing = await prisma.provider.findUnique({ where: { userId } });
  if (!existing) throw httpError('Provider profile not found', 404);

  return prisma.provider.update({
    where: { userId },
    data,
    include: PROVIDER_ME_INCLUDE,
  });
}
