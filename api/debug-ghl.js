import { requireSession } from './_lib/session.js';
import { getAccount } from './_lib/accounts.js';
import { RESOURCES, searchOpportunities } from './_lib/ghl.js';

// Returns the raw GHL response for a resource so field-name mappings in
// _lib/mappers.js can be checked/corrected against real data.
// GET /api/debug-ghl?resource=opportunities|pipelines|events|conversations|location
export default async function handler(req, res) {
  const accountId = requireSession(req);
  if (!accountId) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const account = getAccount(accountId);
  const resource = req.query.resource;

  if (!account?.ghlToken || !account?.ghlLocationId) {
    res.status(200).json({ configured: false });
    return;
  }

  try {
    if (resource === 'opportunities' && req.query.pipelineId !== undefined) {
      const pipelineId = req.query.pipelineId === 'none' ? undefined : req.query.pipelineId;
      const raw = await searchOpportunities(account.ghlToken, { locationId: account.ghlLocationId, pipelineId });
      res.status(200).json({ configured: true, raw });
      return;
    }

    const fn = RESOURCES[resource];
    if (!fn) {
      res.status(400).json({ error: `Unknown resource. Use one of: ${Object.keys(RESOURCES).join(', ')}` });
      return;
    }
    const raw = await fn(account.ghlToken, account);
    res.status(200).json({ configured: true, raw });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
