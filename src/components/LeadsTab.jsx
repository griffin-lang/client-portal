import { LEAD_STATUSES, LEAD_STATUS_STYLE, fmtMoney } from '../data';
import { eyebrow, pageTitle, summaryText, card, emptyState, badge, pill, INK, ACCENT } from '../styles';

const filters = ['All', ...LEAD_STATUSES];

export default function LeadsTab({ leads, filter, onSetFilter, onSelectLead }) {
  const filteredLeads = filter === 'All' ? leads : leads.filter((l) => l.status === filter);
  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0);

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={eyebrow}>Pipeline</div>
      <div style={pageTitle}>Your Leads</div>
      <div style={summaryText}>
        {leads.length} leads · {fmtMoney(totalPipeline)} total pipeline value
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, paddingBottom: 2 }}>
        {filters.map((f) => {
          const active = f === filter;
          return (
            <div
              key={f}
              onClick={() => onSetFilter(f)}
              style={{
                ...pill,
                background: active ? ACCENT : '#F3E6DA',
                color: active ? '#fff' : 'rgba(36,28,22,0.55)',
              }}
            >
              {f}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredLeads.map((lead) => {
          const s = LEAD_STATUS_STYLE[lead.status] || LEAD_STATUS_STYLE.New;
          return (
            <div key={lead.id} onClick={() => onSelectLead(lead.id)} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{lead.name}</span>
                <span style={{ ...badge, background: s.bg, color: s.color }}>{lead.status}</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(36,28,22,0.55)', marginBottom: 8 }}>{lead.company}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'rgba(36,28,22,0.4)' }}>
                  {lead.source} · {lead.dateAdded}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: ACCENT }}>{fmtMoney(lead.value)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLeads.length === 0 && <div style={emptyState}>No leads in this stage.</div>}
    </div>
  );
}
