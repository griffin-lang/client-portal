import { ACCENTS, STATUS_STYLE, WEEKDAYS, MONTHS, ymd } from '../data';
import { INK, ACCENT, eyebrow, pageTitle, sectionLabel, card, emptyState, badge } from '../styles';

const weekdayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function badgeFor(status) {
  return STATUS_STYLE[status] || STATUS_STYLE.pending;
}

function ApptRow({ appt, onSelect }) {
  const b = badgeFor(appt.status);
  const accentColor = ACCENTS[appt.type] || ACCENT;
  return (
    <div onClick={() => onSelect(appt.id)} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 4, background: accentColor }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: INK }}>{appt.title}</div>
        <div style={{ fontSize: 13, color: 'rgba(15,23,42,0.5)', marginTop: 2 }}>{appt.time} · {appt.location}</div>
      </div>
      <span style={{ ...badge, background: b.bg, color: b.color }}>{appt.status}</span>
    </div>
  );
}

export default function CalendarTab({ appointments, today, calView, weekSelectedIso, onSetCalView, onSetWeekSelected, onSelectAppt }) {
  const todayIso = ymd(today);

  const apptsByDate = {};
  appointments.forEach((a) => {
    (apptsByDate[a.date] = apptsByDate[a.date] || []).push(a);
  });

  const pillActive = { background: ACCENT, color: '#fff' };
  const pillInactive = { background: 'transparent', color: 'rgba(15,23,42,0.5)' };

  // Month grid
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay());
  const monthCells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    const iso = ymd(d);
    const inMonth = d.getMonth() === today.getMonth();
    const isToday = iso === todayIso;
    const dayAppts = apptsByDate[iso];
    const accent = dayAppts ? (ACCENTS[dayAppts[0].type] || ACCENT) : null;
    monthCells.push({
      key: iso, day: d.getDate(), hasAppt: !!dayAppts, dotColor: accent,
      isToday,
      numColor: isToday ? '#fff' : (inMonth ? INK : 'rgba(15,23,42,0.25)'),
      numWeight: isToday ? 700 : 500,
      onClick: dayAppts ? () => onSelectAppt(dayAppts[0].id) : undefined,
    });
  }

  // Week grid (week containing today)
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const selectedIso = weekSelectedIso || todayIso;
  const weekCells = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(weekStart);
    d.setDate(weekStart.getDate() + i);
    const iso = ymd(d);
    const isSelected = iso === selectedIso;
    const dayAppts = apptsByDate[iso];
    weekCells.push({
      key: iso, iso, wd: WEEKDAYS[i][0], day: d.getDate(), isSelected,
      hasAppt: !!dayAppts,
    });
  }
  const weekDate = new Date(selectedIso + 'T00:00:00');
  const weekDayAppts = apptsByDate[selectedIso] || [];
  const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);

  // List view grouped by date
  const upcoming = appointments.filter((a) => a.date >= todayIso).sort((a, b) => a.date.localeCompare(b.date));
  const groupMap = {};
  upcoming.forEach((a) => {
    const d = new Date(a.date + 'T00:00:00');
    const label = (a.date === todayIso ? 'Today · ' : '') + MONTHS[d.getMonth()] + ' ' + d.getDate();
    (groupMap[label] = groupMap[label] || []).push(a);
  });
  const apptGroups = Object.keys(groupMap).map((label) => ({ label, items: groupMap[label] }));

  return (
    <div style={{ padding: '8px 20px 20px' }}>
      <div style={eyebrow}>Appointments</div>
      <div style={{ ...pageTitle, marginBottom: 18 }}>Calendar</div>

      <div style={{ display: 'flex', background: 'rgba(57,95,217,0.08)', borderRadius: 100, padding: 4, marginBottom: 20 }}>
        {['month', 'week', 'list'].map((v) => (
          <div
            key={v}
            onClick={() => onSetCalView(v)}
            style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 100, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', ...(calView === v ? pillActive : pillInactive) }}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </div>
        ))}
      </div>

      {calView === 'month' && (
        <>
          <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>
            {MONTHS[today.getMonth()]} {today.getFullYear()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px 2px', marginBottom: 6 }}>
            {weekdayLabels.map((wd, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: 'rgba(15,23,42,0.35)', paddingBottom: 4 }}>{wd}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: '4px 2px', background: '#fff', borderRadius: 18, border: '1px solid rgba(15,23,42,0.07)', padding: '10px 6px' }}>
            {monthCells.map((cell) => (
              <div
                key={cell.key}
                onClick={cell.onClick}
                style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: 12, cursor: cell.onClick ? 'pointer' : 'default', background: cell.isToday ? ACCENT : 'transparent' }}
              >
                <span style={{ fontSize: 14, fontWeight: cell.numWeight, color: cell.numColor }}>{cell.day}</span>
                {cell.hasAppt && <span style={{ width: 4, height: 4, borderRadius: '50%', background: cell.dotColor, marginTop: 2 }} />}
              </div>
            ))}
          </div>
        </>
      )}

      {calView === 'week' && (
        <>
          <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: INK, marginBottom: 12 }}>
            {MONTHS[weekStart.getMonth()]} {weekStart.getDate()} – {MONTHS[weekEnd.getMonth()]} {weekEnd.getDate()}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5, marginBottom: 18 }}>
            {weekCells.map((cell) => (
              <div
                key={cell.key}
                onClick={() => onSetWeekSelected(cell.iso)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '8px 0', borderRadius: 14, cursor: 'pointer', background: cell.isSelected ? ACCENT : 'transparent' }}
              >
                <span style={{ fontSize: 10.5, fontWeight: 600, color: cell.isSelected ? 'rgba(255,255,255,0.75)' : 'rgba(15,23,42,0.4)' }}>{cell.wd}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: cell.isSelected ? '#fff' : INK }}>{cell.day}</span>
                <span style={{ width: 4, height: 4, borderRadius: '50%', background: cell.hasAppt ? (cell.isSelected ? '#fff' : ACCENT) : 'transparent' }} />
              </div>
            ))}
          </div>
          <div style={sectionLabel}>{selectedIso === todayIso ? 'Today' : `${MONTHS[weekDate.getMonth()]} ${weekDate.getDate()}`}</div>
          {weekDayAppts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {weekDayAppts.map((a) => <ApptRow key={a.id} appt={a} onSelect={onSelectAppt} />)}
            </div>
          ) : (
            <div style={emptyState}>No appointments this day.</div>
          )}
        </>
      )}

      {calView === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {apptGroups.map((group) => (
            <div key={group.label}>
              <div style={sectionLabel}>{group.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {group.items.map((a) => <ApptRow key={a.id} appt={a} onSelect={onSelectAppt} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
