import { LeadsIcon, ContactIcon, CalendarIcon, NotificationsIcon } from '../Icons';
import { ACCENT } from '../styles';

const ON = ACCENT;
const OFF = 'rgb(var(--ink-rgb) / 0.35)';

const items = [
  { key: 'leads', label: 'Leads', Icon: LeadsIcon },
  { key: 'contact', label: 'Contact', Icon: ContactIcon },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon },
  { key: 'notifications', label: 'Alerts', Icon: NotificationsIcon },
];

export default function BottomNav({ tab, onSetTab, hasUnread }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '10px 12px 16px', background: 'rgba(250,250,250,0.92)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgb(var(--ink-rgb) / 0.07)', flexShrink: 0 }}>
      {items.map(({ key, label, Icon }) => {
        const active = tab === key;
        const color = active ? ON : OFF;
        return (
          <div key={key} onClick={() => onSetTab(key)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer', width: 64, position: 'relative' }}>
            <Icon color={color} />
            {key === 'notifications' && hasUnread && (
              <span style={{ position: 'absolute', top: -1, right: 14, width: 8, height: 8, borderRadius: '50%', background: ACCENT, border: '1.5px solid #FAFAFA' }} />
            )}
            <span style={{ fontSize: 10.5, fontWeight: 600, color }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
