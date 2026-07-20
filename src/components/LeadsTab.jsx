import { fmtMoney } from '../data';
import { eyebrow, pageTitle, summaryText, card, emptyState, badge, pill, stageStyle, INK, ACCENT } from '../styles';

export default function LeadsTab({ leads, stages, filter, onSetFilter, onSelectLead }) {
  const filteredLeads = filter === 'All' ? leads : leads.filter((l) => l.statusId === filter);
  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0);
  const stageIndex = Object.fromEntries(stages.map((s, i) => [s.id, i]));
  const stageName = Object.fromEntries(stages.map((s) => [s.id, s.name]));

  const filters = [{ id: 'All', name: 'All' }, ...stages];

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={eyebrow}>Pipeline</div>
      <div style={pageTitle}>Your Leads</div>
      <div style={summaryText}>
        {leads.length} leads · {fmtMoney(totalPipeline)} total pipeline value
      </div>

      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, paddingBottom: 2 }}>
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <div
              key={f.id}
              onClick={() => onSetFilter(f.id)}
              style={{
                ...pill,
                background: active ? ACCENT : 'rgb(var(--accent-rgb) / 0.08)',
                color: active ? '#fff' : 'rgb(var(--ink-rgb) / 0.55)',
              }}
            >
              {f.name}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredLeads.map((lead) => {
          const s = stageStyle(stageIndex[lead.statusId] ?? 0);
          return (
            <div key={lead.id} onClick={() => onSelectLead(lead.id)} style={card}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6, gap: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: INK }}>{lead.name}</span>
                <span style={{ ...badge, background: s.bg, color: s.color }}>{stageName[lead.statusId] || 'Unknown'}</span>
              </div>
              <div style={{ fontSize: 13.5, color: 'rgb(var(--ink-rgb) / 0.55)', marginBottom: 8 }}>{lead.company}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12.5, color: 'rgb(var(--ink-rgb) / 0.4)' }}>
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
