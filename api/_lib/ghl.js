const GHL_BASE = 'https://services.leadconnectorhq.com';
const GHL_VERSION = '2021-07-28';

// NOTE: field/param names below are best-effort from GHL's public v2 docs and
// may need small adjustments once tested against real responses — use
// /api/debug-ghl?account=...&resource=... to inspect raw payloads and correct
// any mismatches in the mapping functions in leads.js / appointments.js / etc.

async function ghlGet(token, path, params = {}) {
  const url = new URL(GHL_BASE + path);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, v);
  }
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Version: GHL_VERSION,
      Accept: 'application/json',
    },
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`GHL ${path} returned non-JSON (${res.status}): ${text.slice(0, 300)}`);
  }
  if (!res.ok) {
    throw new Error(`GHL ${path} failed (${res.status}): ${JSON.stringify(json).slice(0, 300)}`);
  }
  return json;
}

export function searchOpportunities(token, { locationId, pipelineId, limit = 100 }) {
  return ghlGet(token, '/opportunities/search', { location_id: locationId, pipeline_id: pipelineId, limit });
}

export function getPipelines(token, { locationId }) {
  return ghlGet(token, '/opportunities/pipelines', { locationId });
}

export function getCalendarEvents(token, { locationId, calendarId, startTime, endTime }) {
  return ghlGet(token, '/calendars/events', { locationId, calendarId, startTime, endTime });
}

export function getCalendars(token, { locationId }) {
  return ghlGet(token, '/calendars/', { locationId });
}

export function searchConversations(token, { locationId, limit = 20 }) {
  return ghlGet(token, '/conversations/search', { locationId, limit });
}

export function getLocation(token, { locationId }) {
  return ghlGet(token, `/locations/${locationId}`);
}

export function getContact(token, { contactId }) {
  return ghlGet(token, `/contacts/${contactId}`);
}

export const RESOURCES = {
  opportunities: (token, account) => searchOpportunities(token, { locationId: account.ghlLocationId, pipelineId: account.ghlPipelineId }),
  pipelines: (token, account) => getPipelines(token, { locationId: account.ghlLocationId }),
  events: (token, account) => getCalendarEvents(token, {
    locationId: account.ghlLocationId,
    calendarId: account.ghlCalendarId,
    startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 90 * 24 * 60 * 60 * 1000,
  }),
  conversations: (token, account) => searchConversations(token, { locationId: account.ghlLocationId }),
  location: (token, account) => getLocation(token, { locationId: account.ghlLocationId }),
  calendars: (token, account) => getCalendars(token, { locationId: account.ghlLocationId }),
};
