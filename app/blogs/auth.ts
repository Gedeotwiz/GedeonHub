import 'server-only';
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'gedeonhub-admin-session';
export const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function sign(value: string, secret: string) {
  return createHmac('sha256', secret).update(value).digest('hex');
}

export function isAuthConfigured() {
  return Boolean(
    process.env.BLOGS_ADMIN_USERNAME &&
      process.env.BLOGS_ADMIN_PASSWORD &&
      process.env.BLOGS_SESSION_SECRET &&
      process.env.BLOGS_SESSION_SECRET.length >= 32,
  );
}

function safeEqual(left: string, right: string) {
  const leftHash = createHash('sha256').update(left).digest();
  const rightHash = createHash('sha256').update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function credentialsAreValid(username: string, password: string) {
  if (!isAuthConfigured()) return false;
  return (
    safeEqual(username, process.env.BLOGS_ADMIN_USERNAME!) &&
    safeEqual(password, process.env.BLOGS_ADMIN_PASSWORD!)
  );
}

export function createSessionToken(now = Date.now()) {
  const expiresAt = Math.floor(now / 1000) + SESSION_DURATION_SECONDS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload, process.env.BLOGS_SESSION_SECRET!)}`;
}

export function isSessionTokenValid(token: string | undefined, now = Date.now()) {
  if (!token || !isAuthConfigured()) return false;

  const [expiresAt, signature, extra] = token.split('.');
  if (!expiresAt || !signature || extra || !/^\d+$/.test(expiresAt)) return false;
  if (Number(expiresAt) <= Math.floor(now / 1000)) return false;

  const expected = sign(expiresAt, process.env.BLOGS_SESSION_SECRET!);
  const receivedBytes = Buffer.from(signature, 'hex');
  const expectedBytes = Buffer.from(expected, 'hex');

  return (
    receivedBytes.length === expectedBytes.length &&
    timingSafeEqual(receivedBytes, expectedBytes)
  );
}
