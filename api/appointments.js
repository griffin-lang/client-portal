import { requireSession } from './_lib/session.js';
import { getAccount } from './_lib/accounts.js';
import { RESOURCES } from './_lib/ghl.js';
import { mapEventToAppointment } from './_lib/mappers.js';

export default async function handler(req, res) {
  const accountId = requireSession(req);
  if (!accountId) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const account = getAccount(accountId);
  if (!account?.ghlToken || !account?.ghlLocationId) {
    res.status(200).json({ configured: false, appointments: [] });
    return;
  }

  try {
    const eventsRes = await RESOURCES.events(account.ghlToken, account);
    const events = eventsRes.events || eventsRes.data || [];
    const appointments = events.map(mapEventToAppointment);
    res.status(200).json({ configured: true, appointments });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
