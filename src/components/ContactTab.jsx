import { PhoneIcon, EmailIcon, PinIcon, CompanyIcon } from '../Icons';
import {
  INK, ACCENT, ACCENT_SOFT, eyebrow, pageTitle, sectionLabel,
  detailCard, detailRow, detailRowLast, rowIcon, rowLabel, rowValue,
} from '../styles';

const BLUE = 'oklch(0.55 0.13 200)';

export default function ContactTab({ contact }) {
  return (
    <div style={{ padding: '8px 20px 28px' }}>
      <div style={eyebrow}>Client Profile</div>
      <div style={pageTitle}>Your Contact</div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, border: '1px solid rgba(36,28,22,0.07)', marginBottom: 16, marginTop: 16 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, letterSpacing: '0.02em' }}>
          {contact.initials}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: INK }}>{contact.name}</div>
        <div style={{ fontSize: 14, color: 'rgba(36,28,22,0.55)', textAlign: 'center' }}>{contact.role}</div>
        <div style={{ fontSize: 12.5, color: 'rgba(36,28,22,0.4)', marginTop: 2 }}>{contact.since}</div>
      </div>

      <div style={sectionLabel}>Contact Details</div>
      <div style={detailCard}>
        <div style={detailRow}>
          <div style={rowIcon}><PhoneIcon /></div>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Phone</div>
            <div style={rowValue}>{contact.phone}</div>
          </div>
        </div>
        <div style={detailRow}>
          <div style={rowIcon}><EmailIcon /></div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={rowLabel}>Email</div>
            <div style={{ ...rowValue, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.email}</div>
          </div>
        </div>
        <div style={detailRow}>
          <div style={rowIcon}><PinIcon /></div>
          <div style={{ flex: 1 }}>
            <div style={rowLabel}>Address</div>
            <div style={rowValue}>{contact.address}</div>
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

      <div style={sectionLabel}>Account Team</div>
      <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(36,28,22,0.07)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: BLUE, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
          PS
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>Priya Shah</div>
          <div style={{ fontSize: 12.5, color: 'rgba(36,28,22,0.5)' }}>Account Director</div>
        </div>
      </div>

      <div style={sectionLabel}>Plan &amp; Notes</div>
      <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(36,28,22,0.07)', padding: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{contact.plan}</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '0.03em', color: ACCENT, background: ACCENT_SOFT, padding: '4px 10px', borderRadius: 100 }}>
            ACTIVE
          </span>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(36,28,22,0.65)' }}>{contact.notes}</div>
      </div>
    </div>
  );
}
