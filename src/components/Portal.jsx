import { useEffect, useState } from 'react';
import { INK, ACCENT } from '../styles';
import { themeFor } from '../theme';
import { getLeads, getAppointments, getNotifications, getContact } from '../api';
import LeadsTab from './LeadsTab';
import LeadDetail from './LeadDetail';
import ContactTab from './ContactTab';
import CalendarTab from './CalendarTab';
import ApptDetail from './ApptDetail';
import NotificationsTab from './NotificationsTab';
import BottomNav from './BottomNav';

export default function Portal({ session, onLogout }) {
  const [tab, setTabState] = useState('leads');
  const [calView, setCalView] = useState('month');
  const [selectedApptId, setSelectedApptId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [leadFilter, setLeadFilter] = useState('All');
  const [weekSelectedIso, setWeekSelectedIso] = useState(null);

  const [status, setStatus] = useState('loading'); // loading | ready | not-configured | error
  const [errorMessage, setErrorMessage] = useState('');
  const [leadsData, setLeadsData] = useState({ stages: [], leads: [] });
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [contact, setContact] = useState(null);

  const theme = themeFor(session.accountId);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus('loading');
      try {
        const [leadsRes, apptsRes, notifsRes, contactRes] = await Promise.all([
          getLeads(session.token),
          getAppointments(session.token),
          getNotifications(session.token),
          getContact(session.token),
        ]);
        if (cancelled) return;

        if (!leadsRes.configured) {
          setStatus('not-configured');
          return;
        }

        setLeadsData({ stages: leadsRes.stages, leads: leadsRes.leads });
        setAppointments(apptsRes.appointments || []);
        setNotifications(notifsRes.notifications || []);
        setContact(contactRes.contact || null);
        setStatus('ready');
      } catch (err) {
        if (cancelled) return;
        if (err.unauthorized) {
          onLogout();
          return;
        }
        setErrorMessage(err.message || 'Something went wrong.');
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.token]);

  function setTab(t) {
    setTabState(t);
    setSelectedApptId(null);
    setSelectedLeadId(null);
  }

  const hasUnread = notifications.some((n) => n.unread);
  const selectedLead = leadsData.leads.find((l) => l.id === selectedLeadId);
  const selectedAppt = appointments.find((a) => a.id === selectedApptId);

  return (
    <div
      data-theme={theme.dataTheme}
      style={{
        width: 402,
        maxWidth: '100%',
        height: 874,
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAFAFA',
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 30px 60px -20px rgb(var(--ink-rgb) / 0.35), 0 0 0 1px rgb(var(--ink-rgb) / 0.06)',
        fontFamily: 'var(--font)',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: '28px 20px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: INK,
        }}
      >
        <div style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>
            {session.accountName.toUpperCase()}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>CRM Dashboard</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div
            onClick={onLogout}
            style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Sign out
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, letterSpacing: '0.01em', flexShrink: 0 }}>
            {theme.badgeText}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {status === 'loading' && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: 14 }}>
            Loading your data…
          </div>
        )}

        {status === 'not-configured' && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: 14, lineHeight: 1.6 }}>
            This account isn't connected to GoHighLevel yet.
            <br />
            Add its Location ID and API token to finish setup.
          </div>
        )}

        {status === 'error' && (
          <div style={{ padding: 40, textAlign: 'center', color: 'rgb(var(--ink-rgb) / 0.5)', fontSize: 14, lineHeight: 1.6 }}>
            Couldn't load your data.
            <br />
            {errorMessage}
          </div>
        )}

        {status === 'ready' && (
          <>
            {tab === 'leads' && (
              <LeadsTab
                leads={leadsData.leads}
                stages={leadsData.stages}
                filter={leadFilter}
                onSetFilter={setLeadFilter}
                onSelectLead={setSelectedLeadId}
              />
            )}
            {tab === 'contact' && <ContactTab contact={contact} />}
            {tab === 'calendar' && (
              <CalendarTab
                appointments={appointments}
                today={new Date()}
                calView={calView}
                weekSelectedIso={weekSelectedIso}
                onSetCalView={setCalView}
                onSetWeekSelected={setWeekSelectedIso}
                onSelectAppt={setSelectedApptId}
              />
            )}
            {tab === 'notifications' && <NotificationsTab notifications={notifications} />}
          </>
        )}
      </div>

      <BottomNav tab={tab} onSetTab={setTab} hasUnread={hasUnread} />

      {selectedLead && (
        <LeadDetail lead={selectedLead} stages={leadsData.stages} onClose={() => setSelectedLeadId(null)} />
      )}

      {selectedAppt && <ApptDetail appt={selectedAppt} onClose={() => setSelectedApptId(null)} />}
    </div>
  );
}
