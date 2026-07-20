import { requireSession } from './_lib/session.js';
import { getAccount } from './_lib/accounts.js';
import { RESOURCES } from './_lib/ghl.js';
import { mapConversationToNotification } from './_lib/mappers.js';

export default async function handler(req, res) {
  const accountId = requireSession(req);
  if (!accountId) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const account = getAccount(accountId);
  if (!account?.ghlToken || !account?.ghlLocationId) {
    res.status(200).json({ configured: false, notifications: [] });
    return;
  }

  try {
    const convosRes = await RESOURCES.conversations(account.ghlToken, account);
    const conversations = convosRes.conversations || convosRes.data || [];
    const notifications = conversations.map(mapConversationToNotification);
    res.status(200).json({ configured: true, notifications });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
