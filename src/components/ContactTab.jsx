import { PhoneIcon, EmailIcon, PinIcon, CompanyIcon } from '../Icons';
import {
  INK, ACCENT, eyebrow, pageTitle, sectionLabel,
  detailCard, detailRow, detailRowLast, rowIcon, rowLabel, rowValue,
} from '../styles';

export default function ContactTab({ contact }) {
  if (!contact) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'rgb(var(--ink-rgb) / 0.4)', fontSize: 14 }}>
        No business profile available.
      </div>
    );
  }

  return (
    <div style={{ padding: '8px 20px 28px' }}>
      <div style={eyebrow}>Business Profile</div>
      <div style={pageTitle}>Your Business</div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: '1px solid rgb(var(--ink-rgb) / 0.07)', marginBottom: 16, marginTop: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, letterSpacing: '0.02em' }}>
          {contact.initials}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>{contact.name}</div>
        {contact.role && <div style={{ fontSize: 14, color: 'rgb(var(--ink-rgb) / 0.55)', textAlign: 'center' }}>{contact.role}</div>}
        {contact.since && <div style={{ fontSize: 12.5, color: 'rgb(var(--ink-rgb) / 0.4)', marginTop: 2 }}>{contact.since}</div>}
      </div>

      <div style={sectionLabel}>Contact Details</div>
      <div style={detailCard}>
        <div style={detailRow}>
          <div style={rowIcon}><PhoneIcon /></div>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Phone</div>
            <div style={rowValue}>{contact.phone || '—'}</div>
          </div>
        </div>
        <div style={detailRow}>
          <div style={rowIcon}><EmailIcon /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={rowLabel}>Email</div>
            <div style={{ ...rowValue, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.email || '—'}</div>
          </div>
        </div>
        <div style={detailRow}>
          <div style={rowIcon}><PinIcon /></div>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Address</div>
            <div style={rowValue}>{contact.address || '—'}</div>
          </div>
        </div>
        <div style={detailRowLast}>
          <div style={rowIcon}><CompanyIcon /></div>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Company</div>
            <div style={rowValue}>{contact.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
