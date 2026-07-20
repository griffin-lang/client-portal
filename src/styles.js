export const INK = 'var(--ink)';
export const ACCENT = 'var(--accent)';
export const ACCENT_SOFT = 'rgb(var(--accent-rgb) / 0.08)';
export const CARD_BG = '#fff';
export const CARD_BORDER = '1px solid rgb(var(--ink-rgb) / 0.07)';

export const eyebrow = {
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: '0.06em',
  color: 'rgb(var(--ink-rgb) / 0.45)',
  textTransform: 'uppercase',
  marginBottom: 6,
};

export const pageTitle = {
  fontSize: 28,
  fontWeight: 800,
  color: INK,
  letterSpacing: '-0.02em',
  marginBottom: 4,
};

export const summaryText = {
  fontSize: 13.5,
  color: 'rgb(var(--ink-rgb) / 0.5)',
  marginBottom: 18,
};

export const sectionLabel = {
  fontSize: 12.5,
  fontWeight: 600,
  letterSpacing: '0.05em',
  color: 'rgb(var(--ink-rgb) / 0.4)',
  textTransform: 'uppercase',
  margin: '18px 4px 8px',
};

export const card = {
  background: CARD_BG,
  borderRadius: 16,
  border: CARD_BORDER,
  padding: '14px 16px',
  cursor: 'pointer',
};

export const detailCard = {
  background: CARD_BG,
  borderRadius: 18,
  border: CARD_BORDER,
  overflow: 'hidden',
  marginBottom: 16,
};

export const detailRow = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
  borderBottom: CARD_BORDER,
};

export const detailRowLast = {
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  padding: '14px 16px',
};

export const rowIcon = {
  width: 34,
  height: 34,
  borderRadius: 10,
  background: ACCENT_SOFT,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const rowLabel = {
  fontSize: 12,
  color: 'rgb(var(--ink-rgb) / 0.45)',
  marginBottom: 1,
};

export const rowValue = {
  fontSize: 15,
  color: INK,
  fontWeight: 500,
};

export const emptyState = {
  textAlign: 'center',
  padding: '32px 20px',
  color: 'rgb(var(--ink-rgb) / 0.4)',
  fontSize: 14,
};

export const badge = {
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: '0.03em',
  padding: '4px 9px',
  borderRadius: 100,
  textTransform: 'uppercase',
  flexShrink: 0,
};

const STAGE_PALETTE = [
  { bg: 'rgb(var(--accent-rgb) / 0.1)', color: 'var(--accent)' },
  { bg: 'rgb(var(--blue-rgb) / 0.12)', color: 'var(--blue)' },
  { bg: 'rgb(var(--ink-rgb) / 0.08)', color: 'rgb(var(--ink-rgb) / 0.6)' },
];

export function stageStyle(index) {
  return STAGE_PALETTE[index % STAGE_PALETTE.length];
}

export const pill = {
  padding: '7px 14px',
  borderRadius: 100,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};
