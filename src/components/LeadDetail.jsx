import { fmtMoney } from '../data';
import { PhoneIcon, EmailIcon, SourceIcon, ValueIcon, BackIcon } from '../Icons';
import {
  INK, ACCENT, sectionLabel, detailCard, detailRow, detailRowLast,
  rowIcon, rowLabel, rowValue, badge, pill, stageStyle,
} from '../styles';

export default function LeadDetail({ lead, stages, onClose }) {
  const stageIndex = Object.fromEntries(stages.map((s, i) => [s.id, i]));
  const stageName = Object.fromEntries(stages.map((s) => [s.id, s.name]));
  const s = stageStyle(stageIndex[lead.statusId] ?? 0);

  return (
    <div style={{ position: 'absolute', inset: 0, background: '#FAFAFA', zIndex: 200, display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 24, flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '8px 20px 24px' }}>
          <div
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: ACCENT, fontSize: 15, fontWeight: 600, marginBottom: 20, cursor: 'pointer', width: 'fit-content' }}
          >
            <BackIcon /> Back
          </div>

          <span style={{ ...badge, background: s.bg, color: s.color }}>{stageName[lead.statusId] || 'Unknown'}</span>
          <div style={{ fontSize: 25, fontWeight: 800, color: INK, letterSpacing: '-0.01em', margin: '12px 0 4px' }}>{lead.name}</div>
          <div style={{ fontSize: 14.5, color: 'rgb(var(--ink-rgb) / 0.5)', marginBottom: 20 }}>{lead.company}</div>

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

          <div style={sectionLabel}>Stage</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4 }}>
            {stages.map((stage, i) => {
              const active = stage.id === lead.statusId;
              const st = stageStyle(i);
              return (
                <div
                  key={stage.id}
                  style={{
                    ...pill,
                    cursor: 'default',
                    background: active ? st.color : 'rgb(var(--ink-rgb) / 0.06)',
                    color: active ? '#fff' : 'rgb(var(--ink-rgb) / 0.5)',
                  }}
                >
                  {stage.name}
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 12, color: 'rgb(var(--ink-rgb) / 0.4)', marginBottom: 16 }}>Managed in GoHighLevel</div>

          <div style={sectionLabel}>Notes</div>
          <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgb(var(--ink-rgb) / 0.07)', padding: 16, fontSize: 14, lineHeight: 1.5, color: 'rgb(var(--ink-rgb) / 0.65)' }}>
            {lead.notes || 'No notes.'}
          </div>
        </div>
      </div>
    </div>
  );
}
