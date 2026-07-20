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
