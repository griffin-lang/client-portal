import { useMemo, useState } from 'react';
import { fmtMoney } from '../data';
import { eyebrow, pageTitle, summaryText, card, emptyState, badge, pill, stageStyle, INK, ACCENT } from '../styles';

const sortOptions = [
  { id: 'date', label: 'Newest' },
  { id: 'value', label: 'Highest Value' },
];

export default function LeadsTab({ leads, stages, filter, onSetFilter, onSelectLead }) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const totalPipeline = leads.reduce((sum, l) => sum + l.value, 0);
  const stageIndex = Object.fromEntries(stages.map((s, i) => [s.id, i]));
  const stageName = Object.fromEntries(stages.map((s) => [s.id, s.name]));

  const filters = [{ id: 'All', name: 'All' }, ...stages];

  const visibleLeads = useMemo(() => {
    const needle = search.trim().toLowerCase();
    let result = filter === 'All' ? leads : leads.filter((l) => l.statusId === filter);
    if (needle) {
      result = result.filter(
        (l) => l.name.toLowerCase().includes(needle) || l.company.toLowerCase().includes(needle)
      );
    }
    result = [...result].sort((a, b) =>
      sortBy === 'value' ? b.value - a.value : b.dateAdded.localeCompare(a.dateAdded)
    );
    return result;
  }, [leads, filter, search, sortBy]);

  return (
    <div style={{ padding: '16px 20px 20px' }}>
      <div style={eyebrow}>Pipeline</div>
      <div style={pageTitle}>Your Leads</div>
      <div style={summaryText}>
        {leads.length} leads · {fmtMoney(totalPipeline)} total pipeline value
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or company"
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 12,
          border: '1px solid rgb(var(--ink-rgb) / 0.12)',
          background: '#fff',
          fontSize: 14,
          color: INK,
          fontFamily: 'inherit',
          outline: 'none',
          marginBottom: 12,
        }}
      />

      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        {sortOptions.map((o) => {
          const active = o.id === sortBy;
          return (
            <div
              key={o.id}
              onClick={() => setSortBy(o.id)}
              style={{
                ...pill,
                fontSize: 12,
                padding: '5px 12px',
                background: active ? 'rgb(var(--ink-rgb) / 0.9)' : 'rgb(var(--ink-rgb) / 0.06)',
                color: active ? '#fff' : 'rgb(var(--ink-rgb) / 0.5)',
              }}
            >
              {o.label}
            </div>
          );
        })}
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
        {visibleLeads.map((lead) => {
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

      {visibleLeads.length === 0 && (
        <div style={emptyState}>{search ? 'No leads match your search.' : 'No leads in this stage.'}</div>
      )}
    </div>
  );
}
