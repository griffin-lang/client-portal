import { requireSession } from './_lib/session.js';
import { getAccount } from './_lib/accounts.js';
import { RESOURCES } from './_lib/ghl.js';
import { mapLocationToContact } from './_lib/mappers.js';

export default async function handler(req, res) {
  const accountId = requireSession(req);
  if (!accountId) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const account = getAccount(accountId);
  if (!account?.ghlToken || !account?.ghlLocationId) {
    res.status(200).json({ configured: false, contact: null });
    return;
  }

  try {
    const locRes = await RESOURCES.location(account.ghlToken, account);
    const location = locRes.location || locRes;
    const contact = mapLocationToContact(location);
    res.status(200).json({ configured: true, contact });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
