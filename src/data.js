export const ACCENT = '#C1571F';
export const ACCENT_SOFT = '#F3E6DA';
export const BLUE = 'oklch(0.55 0.13 200)';
export const BLUE_SOFT = 'oklch(0.55 0.13 200 / 0.15)';
export const INK = '#241C16';

export const ACCENTS = {
  'Strategy Call': ACCENT,
  'Creative Review': BLUE,
  QBR: ACCENT,
  Kickoff: BLUE,
  'Check-In': ACCENT,
};

export const STATUS_STYLE = {
  confirmed: { bg: ACCENT_SOFT, color: ACCENT },
  pending: { bg: 'rgba(36,28,22,0.07)', color: 'rgba(36,28,22,0.55)' },
  completed: { bg: 'rgba(36,28,22,0.06)', color: 'rgba(36,28,22,0.4)' },
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const LEAD_STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
export const LEAD_STATUS_STYLE = {
  New: { bg: ACCENT_SOFT, color: ACCENT },
  Contacted: { bg: BLUE_SOFT, color: BLUE },
  Qualified: { bg: ACCENT_SOFT, color: ACCENT },
  'Proposal Sent': { bg: BLUE_SOFT, color: BLUE },
  Won: { bg: INK, color: '#fff' },
  Lost: { bg: 'rgba(36,28,22,0.06)', color: 'rgba(36,28,22,0.35)' },
};

export function fmtMoney(n) {
  return '$' + n.toLocaleString('en-US');
}

export function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export const TODAY = new Date(2026, 6, 20);

export const INITIAL_LEADS = [
  { id: 1, name: 'Alex Rivera', company: 'Northbridge Realty', phone: '(628) 555-0110', email: 'alex@northbridgerealty.com', source: 'Website Form', status: 'New', value: 4200, dateAdded: 'Jul 16', notes: 'Requested info on the Q3 listing campaign package.' },
  { id: 2, name: 'Jamie Chen', company: 'Chen & Co. Law', phone: '(415) 555-0193', email: 'jamie@chenlaw.com', source: 'Referral', status: 'Contacted', value: 8500, dateAdded: 'Jul 12', notes: 'Follow up scheduled after the initial discovery call.' },
  { id: 3, name: 'Morgan Ellis', company: 'Ellis Home Goods', phone: '(510) 555-0166', email: 'morgan@ellishomegoods.com', source: 'Paid Ads', status: 'Qualified', value: 12000, dateAdded: 'Jul 9', notes: 'Budget confirmed; drafting proposal for a full-funnel campaign.' },
  { id: 4, name: 'Taylor Brooks', company: 'Brooks Fitness Studio', phone: '(925) 555-0142', email: 'taylor@brooksfitness.com', source: 'Referral', status: 'Proposal Sent', value: 6750, dateAdded: 'Jul 5', notes: 'Proposal sent Jul 5; awaiting sign-off from ownership.' },
  { id: 5, name: 'Sam Okafor', company: 'Okafor Dental Group', phone: '(650) 555-0177', email: 'sam@okafordental.com', source: 'Cold Outreach', status: 'Won', value: 15300, dateAdded: 'Jun 28', notes: 'Signed for the annual retainer starting August.' },
  { id: 6, name: 'Riley Foster', company: 'Foster Landscaping', phone: '(408) 555-0129', email: 'riley@fosterlandscaping.com', source: 'Website Form', status: 'Lost', value: 3100, dateAdded: 'Jun 20', notes: 'Went with an in-house solution.' },
];

export const CONTACT = {
  initials: 'DW',
  name: 'Dana Whitfield',
  role: 'Brand Strategy Client',
  since: 'Client since March 2023',
  phone: '(415) 555-0148',
  email: 'dana@solsticeretail.com',
  address: '220 Market St, Suite 400, San Francisco, CA',
  company: 'Solstice Retail Co.',
  plan: 'Growth Retainer',
  notes: 'Prefers async updates over calls; monthly check-in scheduled for the 3rd of each month.',
};

export const APPOINTMENTS = [
  { id: 1, title: 'Q3 Brand Strategy Call', date: '2026-07-14', time: '10:00 AM', duration: '45 min', location: 'Zoom', type: 'Strategy Call', status: 'completed', notes: 'Reviewed Q3 campaign direction and budget allocation across channels.', attendees: [{ name: 'Priya Shah', initials: 'PS', color: BLUE }, { name: 'Dana Whitfield', initials: 'DW', color: ACCENT }] },
  { id: 2, title: 'Creative Concept Review', date: '2026-07-22', time: '2:00 PM', duration: '60 min', location: 'Agency HQ — Conf Room B', type: 'Creative Review', status: 'confirmed', notes: 'Bring feedback on the three logo directions before the session.', attendees: [{ name: 'Priya Shah', initials: 'PS', color: BLUE }, { name: 'Marcus Lee', initials: 'ML', color: ACCENT }] },
  { id: 3, title: 'Quarterly Business Review', date: '2026-07-24', time: '11:00 AM', duration: '90 min', location: 'Zoom', type: 'QBR', status: 'confirmed', notes: 'Full performance recap and Q4 planning discussion.', attendees: [{ name: 'Priya Shah', initials: 'PS', color: BLUE }] },
  { id: 4, title: 'Paid Media Kickoff', date: '2026-07-29', time: '9:30 AM', duration: '30 min', location: 'Phone', type: 'Kickoff', status: 'pending', notes: 'Confirm ad spend and channel mix for August before kicking off.', attendees: [{ name: 'Marcus Lee', initials: 'ML', color: ACCENT }] },
  { id: 5, title: 'Monthly Check-In', date: '2026-08-03', time: '10:00 AM', duration: '30 min', location: 'Zoom', type: 'Check-In', status: 'confirmed', notes: 'Standing monthly sync on retainer progress.', attendees: [{ name: 'Priya Shah', initials: 'PS', color: BLUE }] },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'Upcoming appointment', body: 'Creative Concept Review starts in 2 days', time: 'Today, 9:00 AM', unread: true, glyph: '🕑', iconBg: ACCENT_SOFT },
  { id: 2, title: 'Appointment confirmed', body: 'Quarterly Business Review confirmed for Jul 24', time: 'Yesterday', unread: true, glyph: '✓', iconBg: 'rgba(36,28,22,0.06)' },
  { id: 3, title: 'Message from Priya Shah', body: 'Sent over the updated brand deck ahead of Friday', time: 'Jul 18', unread: false, glyph: '✉', iconBg: ACCENT_SOFT },
  { id: 4, title: 'Invoice ready', body: 'Your monthly invoice is ready to view', time: 'Jul 15', unread: false, glyph: '$', iconBg: 'rgba(36,28,22,0.06)' },
  { id: 5, title: 'Appointment rescheduled', body: 'Paid Media Kickoff was moved to Jul 29', time: 'Jul 12', unread: false, glyph: '↻', iconBg: ACCENT_SOFT },
];
