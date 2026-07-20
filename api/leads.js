import { requireSession } from './_lib/session.js';
import { getAccount } from './_lib/accounts.js';
import { RESOURCES } from './_lib/ghl.js';
import { mapOpportunityToLead, mapPipelineStages } from './_lib/mappers.js';

export default async function handler(req, res) {
  const accountId = requireSession(req);
  if (!accountId) {
    res.status(401).json({ error: 'Not signed in.' });
    return;
  }

  const account = getAccount(accountId);
  if (!account?.ghlToken || !account?.ghlLocationId) {
    res.status(200).json({ configured: false, stages: [], leads: [] });
    return;
  }

  try {
    const [oppsRes, pipelinesRes] = await Promise.all([
      RESOURCES.opportunities(account.ghlToken, account),
      RESOURCES.pipelines(account.ghlToken, account),
    ]);
    const stages = mapPipelineStages(pipelinesRes, account.ghlPipelineId);
    const opportunities = oppsRes.opportunities || oppsRes.data || [];
    const leads = opportunities.map(mapOpportunityToLead);
    res.status(200).json({ configured: true, stages, leads });
  } catch (err) {
    res.status(502).json({ error: String(err.message || err) });
  }
}
