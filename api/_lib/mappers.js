function initialsFor(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] || '') .concat(parts[1]?.[0] || '').toUpperCase() || '?';
}

function toYmd(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmtShortDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const now = new Date();
  const label = `${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}`;
  return d.getFullYear() === now.getFullYear() ? label : `${label}, ${d.getFullYear()}`;
}

function fmtRelativeDate(value) {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const startOfDay = (dt) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
  const diffDays = Math.round((startOfDay(new Date()) - startOfDay(d)) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return fmtShortDate(value);
}

function cleanMessageBody(text) {
  if (!text) return '';
  return text
    .replace(/Location Logo\s*\[[^\]]*\]/gi, '')
    .replace(/\s*\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

export function mapPipelineStages(pipelinesResponse, pipelineId) {
  const pipelines = pipelinesResponse.pipelines || pipelinesResponse.data || [];
  const pipeline = pipelines.find((p) => p.id === pipelineId) || pipelines[0];
  const stages = (pipeline?.stages || []).map((s) => ({ id: s.id, name: s.name }));
  return stages;
}

export function mapOpportunityToLead(opp) {
  const contact = opp.contact || {};
  return {
    id: opp.id,
    name: contact.name || [contact.firstName, contact.lastName].filter(Boolean).join(' ') || opp.name || 'Unknown',
    company: contact.companyName || opp.companyName || '',
    phone: contact.phone || '',
    email: contact.email || '',
    source: opp.source || '—',
    statusId: opp.pipelineStageId,
    value: opp.monetaryValue || 0,
    dateAdded: fmtShortDate(opp.createdAt),
    notes: opp.notes || '',
  };
}

const APPT_STATUS_MAP = {
  confirmed: 'confirmed',
  new: 'pending',
  showed: 'completed',
  noshow: 'cancelled',
  cancelled: 'cancelled',
  invalid: 'cancelled',
};

export function mapEventToAppointment(event) {
  const start = event.startTime ? new Date(event.startTime) : null;
  const end = event.endTime ? new Date(event.endTime) : null;
  const durationMin = start && end ? Math.round((end - start) / 60000) : null;
  const contactName = event.contactName || event.title || 'Appointment';

  return {
    id: event.id,
    title: event.title || contactName,
    date: toYmd(event.startTime),
    time: start ? start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : '',
    duration: durationMin ? `${durationMin} min` : '',
    location: event.address || event.location || '—',
    type: event.calendarName || 'Appointment',
    status: APPT_STATUS_MAP[event.appointmentStatus] || 'pending',
    notes: event.notes || '',
    attendees: event.contactId
      ? [{ name: contactName, initials: initialsFor(contactName), color: 'var(--accent)' }]
      : [],
  };
}

export function mapConversationToNotification(convo) {
  const name = convo.contactName || convo.fullName || 'Contact';
  return {
    id: convo.id,
    title: `Message from ${name}`,
    body: cleanMessageBody(convo.lastMessageBody).slice(0, 140),
    time: fmtRelativeDate(convo.dateUpdated || convo.lastMessageDate),
    unread: (convo.unreadCount || 0) > 0,
    glyph: '✉',
    iconBg: 'rgb(var(--accent-rgb) / 0.08)',
  };
}

export function mapLocationToContact(loc) {
  const name = loc.name || loc.businessName || 'Business';
  return {
    initials: initialsFor(name),
    name,
    role: 'GHL Sub-Account',
    since: '',
    phone: loc.phone || '',
    email: loc.email || '',
    address: [loc.address, loc.city, loc.state, loc.postalCode].filter(Boolean).join(', '),
    company: name,
    plan: '',
    notes: '',
  };
}
