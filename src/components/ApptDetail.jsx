import { STATUS_STYLE, MONTHS } from '../data';
import { DateTimeIcon, PinIcon, BackIcon } from '../Icons';
import { INK, ACCENT, ACCENT_SOFT, sectionLabel, detailCard, detailRow, detailRowLast, rowIcon, rowLabel, rowValue, badge } from '../styles';

export default function ApptDetail({ appt, onClose }) {
  const b = STATUS_STYLE[appt.status] || STATUS_STYLE.pending;
  const d = new Date(appt.date + 'T00:00:00');
  const fullDate = `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#FBF6F1', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 24, flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px 20px 24px' }}>
          <div
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: ACCENT, fontSize: 15, fontWeight: 600, marginBottom: 20, cursor: 'pointer', width: 'fit-content' }}
          >
            <BackIcon /> Back
          </div>

          <span style={{ ...badge, background: b.bg, color: b.color }}>{appt.status}</span>
          <div style={{ fontSize: 25, fontWeight: 800, color: INK, letterSpacing: '-0.01em', margin: '12px 0 4px' }}>{appt.title}</div>
          <div style={{ fontSize: 14.5, color: 'rgba(36,28,22,0.5)', marginBottom: 20 }}>{appt.type}</div>

          <div style={detailCard}>
            <div style={detailRow}>
              <div style={rowIcon}><DateTimeIcon /></div>
              <div style={{ flex: 1 }}>
                <div style={rowLabel}>Date &amp; Time</div>
                <div style={rowValue}>{fullDate} · {appt.time} ({appt.duration})</div>
              </div>
            </div>
            <div style={detailRowLast}>
              <div style={rowIcon}><PinIcon /></div>
              <div style={{ flex: 1 }}>
                <div style={rowLabel}>Location</div>
                <div style={rowValue}>{appt.location}</div>
              </div>
            </div>
          </div>

          <div style={sectionLabel}>Attendees</div>
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(36,28,22,0.07)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            {appt.attendees.map((a) => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: a.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {a.initials}
                </div>
                <span style={{ fontSize: 14.5, fontWeight: 500, color: INK }}>{a.name}</span>
              </div>
            ))}
          </div>

          <div style={sectionLabel}>Notes</div>
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(36,28,22,0.07)', padding: 16, fontSize: 14, lineHeight: 1.5, color: 'rgba(36,28,22,0.65)' }}>
            {appt.notes}
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 20px 20px', display: 'flex', gap: 10, background: 'rgba(251,246,241,0.92)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(36,28,22,0.07)' }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '13px 0', borderRadius: 100, background: ACCENT_SOFT, color: ACCENT, fontSize: 14.5, fontWeight: 700, cursor: 'pointer' }}>
          Reschedule
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '13px 0', borderRadius: 100, background: ACCENT, color: '#fff', fontSize: 14.5, fontWeight: 700, cursor: 'pointer' }}>
          Add to Calendar
        </div>
      </div>
    </div>
  );
}
