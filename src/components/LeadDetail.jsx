import { LEAD_STATUSES, LEAD_STATUS_STYLE, fmtMoney } from '../data';
import { PhoneIcon, EmailIcon, SourceIcon, ValueIcon, BackIcon } from '../Icons';
import {
  INK, ACCENT, sectionLabel, detailCard, detailRow, detailRowLast,
  rowIcon, rowLabel, rowValue, badge, pill,
} from '../styles';

export default function LeadDetail({ lead, onClose, onSetStatus }) {
  const s = LEAD_STATUS_STYLE[lead.status] || LEAD_STATUS_STYLE.New;

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

          <span style={{ ...badge, background: s.bg, color: s.color }}>{lead.status}</span>
          <div style={{ fontSize: 25, fontWeight: 800, color: INK, letterSpacing: '-0.01em', margin: '12px 0 4px' }}>{lead.name}</div>
          <div style={{ fontSize: 14.5, color: 'rgba(36,28,22,0.5)', marginBottom: 20 }}>{lead.company}</div>

          <div style={detailCard}>
            <div style={detailRow}>
              <div style={rowIcon}><PhoneIcon /></div>
              <div style={{ flex: 1 }}>
                <div style={rowLabel}>Phone</div>
                <div style={rowValue}>{lead.phone}</div>
              </div>
            </div>
            <div style={detailRow}>
              <div style={rowIcon}><EmailIcon /></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={rowLabel}>Email</div>
                <div style={{ ...rowValue, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.email}</div>
              </div>
            </div>
            <div style={detailRow}>
              <div style={rowIcon}><SourceIcon /></div>
              <div style={{ flex: 1 }}>
                <div style={rowLabel}>Source</div>
                <div style={rowValue}>{lead.source} · Added {lead.dateAdded}</div>
              </div>
            </div>
            <div style={detailRowLast}>
              <div style={rowIcon}><ValueIcon /></div>
              <div style={{ flex: 1 }}>
                <div style={rowLabel}>Estimated Value</div>
                <div style={rowValue}>{fmtMoney(lead.value)}</div>
              </div>
            </div>
          </div>

          <div style={sectionLabel}>Update Stage</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {LEAD_STATUSES.map((status) => {
              const active = status === lead.status;
              const st = LEAD_STATUS_STYLE[status];
              return (
                <div
                  key={status}
                  onClick={() => onSetStatus(lead.id, status)}
                  style={{
                    ...pill,
                    background: active ? st.color : 'rgba(36,28,22,0.06)',
                    color: active ? '#fff' : 'rgba(36,28,22,0.5)',
                  }}
                >
                  {status}
                </div>
              );
            })}
          </div>

          <div style={sectionLabel}>Notes</div>
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(36,28,22,0.07)', padding: 16, fontSize: 14, lineHeight: 1.5, color: 'rgba(36,28,22,0.65)' }}>
            {lead.notes}
          </div>
        </div>
      </div>
    </div>
  );
}
