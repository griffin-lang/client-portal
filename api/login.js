import { findAccountByCredentials } from './_lib/accounts.js';
import { createToken } from './_lib/session.js';
import { getClientIp, checkRateLimit, recordFailedAttempt, clearAttempts } from './_lib/rateLimit.js';

const FAILURE_DELAY_MS = 700;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Best-effort: helps when the same warm instance handles repeated
  // requests, but serverless functions can't guarantee that, so the fixed
  // delay below is the real backstop against brute-forcing.
  const ip = getClientIp(req);
  const { allowed, retryAfterSeconds } = checkRateLimit(ip);
  if (!allowed) {
    res.setHeader('Retry-After', String(retryAfterSeconds));
    res.status(429).json({
      error: `Too many attempts. Try again in ${Math.ceil(retryAfterSeconds / 60)} minute(s).`,
    });
    return;
  }

  const { username, password } = req.body || {};
  const account = findAccountByCredentials(username, password);

  if (!account) {
    recordFailedAttempt(ip);
    await sleep(FAILURE_DELAY_MS);
    res.status(401).json({ error: 'Incorrect username or password.' });
    return;
  }

  clearAttempts(ip);
  const { token, expiresAt } = createToken(account.id);
  res.status(200).json({ token, expiresAt, accountId: account.id, accountName: account.name });
}
