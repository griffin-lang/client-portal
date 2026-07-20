import { findAccountByCredentials } from './_lib/accounts.js';
import { createToken } from './_lib/session.js';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { username, password } = req.body || {};
  const account = findAccountByCredentials(username, password);

  if (!account) {
    res.status(401).json({ error: 'Incorrect username or password.' });
    return;
  }

  const { token, expiresAt } = createToken(account.id);
  res.status(200).json({ token, expiresAt, accountId: account.id, accountName: account.name });
}
