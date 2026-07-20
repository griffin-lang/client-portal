export const ACCENT = 'var(--accent)';
export const ACCENT_SOFT = 'rgb(var(--accent-rgb) / 0.08)';
export const BLUE = 'var(--blue)';
export const INK = 'var(--ink)';

export const ACCENTS = {
  'Strategy Call': ACCENT,
  'Creative Review': BLUE,
  QBR: ACCENT,
  Kickoff: BLUE,
  'Check-In': ACCENT,
};

export const STATUS_STYLE = {
  confirmed: { bg: ACCENT_SOFT, color: ACCENT },
  pending: { bg: 'rgb(var(--ink-rgb) / 0.07)', color: 'rgb(var(--ink-rgb) / 0.55)' },
  completed: { bg: 'rgb(var(--ink-rgb) / 0.06)', color: 'rgb(var(--ink-rgb) / 0.4)' },
  cancelled: { bg: 'rgb(var(--ink-rgb) / 0.06)', color: 'rgb(var(--ink-rgb) / 0.35)' },
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function fmtMoney(n) {
  return '$' + n.toLocaleString('en-US');
}

export function ymd(d) {
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
