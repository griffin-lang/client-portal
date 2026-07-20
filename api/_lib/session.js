import { createHmac, timingSafeEqual } from 'node:crypto';

const TTL_MS = 12 * 60 * 60 * 1000; // 12 hours

function sign(payload) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET is not configured');
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function createToken(accountId) {
  const expiresAt = Date.now() + TTL_MS;
  const payload = `${accountId}.${expiresAt}`;
  const sig = sign(payload);
  return { token: `${payload}.${sig}`, expiresAt };
}

export function verifyToken(token) {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [accountId, expiresAtStr, sig] = parts;
  const payload = `${accountId}.${expiresAtStr}`;
  const expected = sign(payload);
  const a = Buffer.from(sig, 'hex');
  const b = Buffer.from(expected, 'hex');
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  if (Date.now() > Number(expiresAtStr)) return null;
  return accountId;
}

export function requireSession(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  return verifyToken(token);
}
