import { INK, ACCENT, eyebrow, pageTitle } from '../styles';

export default function NotificationsTab({ notifications }) {
  return (
    <div style={{ padding: '8px 20px 20px' }}>
      <div style={eyebrow}>Updates</div>
      <div style={{ ...pageTitle, marginBottom: 18 }}>Notifications</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications.map((n) => (
          <div key={n.id} style={{ background: '#fff', borderRadius: 16, border: '1px solid rgba(36,28,22,0.07)', padding: '14px 16px', display: 'flex', gap: 12, alignItems: 'flex-start', position: 'relative' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: n.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 }}>
              {n.glyph}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600, color: INK }}>{n.title}</span>
                {n.unread && <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />}
              </div>
              <div style={{ fontSize: 13.5, color: 'rgba(36,28,22,0.6)', lineHeight: 1.4, marginTop: 2 }}>{n.body}</div>
              <div style={{ fontSize: 12, color: 'rgba(36,28,22,0.35)', marginTop: 6 }}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
