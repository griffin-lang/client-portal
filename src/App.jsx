import { useState } from 'react';
import { INITIAL_LEADS, CONTACT, APPOINTMENTS, NOTIFICATIONS, TODAY } from './data';
import { INK, ACCENT } from './styles';
import LeadsTab from './components/LeadsTab';
import LeadDetail from './components/LeadDetail';
import ContactTab from './components/ContactTab';
import CalendarTab from './components/CalendarTab';
import ApptDetail from './components/ApptDetail';
import NotificationsTab from './components/NotificationsTab';
import BottomNav from './components/BottomNav';

export default function App() {
  const [tab, setTabState] = useState('leads');
  const [calView, setCalView] = useState('month');
  const [selectedApptId, setSelectedApptId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [leadFilter, setLeadFilter] = useState('All');
  const [weekSelectedIso, setWeekSelectedIso] = useState(null);
  const [leads, setLeads] = useState(INITIAL_LEADS);

  function setTab(t) {
    setTabState(t);
    setSelectedApptId(null);
    setSelectedLeadId(null);
  }

  function setLeadStatus(id, status) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  const hasUnread = NOTIFICATIONS.some((n) => n.unread);
  const selectedLead = leads.find((l) => l.id === selectedLeadId);
  const selectedAppt = APPOINTMENTS.find((a) => a.id === selectedApptId);

  return (
    <div
      style={{
        width: 402,
        maxWidth: '100%',
        height: 874,
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#FBF6F1',
        borderRadius: 40,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 30px 60px -20px rgba(36,28,22,0.35), 0 0 0 1px rgba(36,28,22,0.06)',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          padding: '28px 20px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(36,28,22,0.07)',
        }}
      >
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: INK, letterSpacing: '0.02em' }}>KGB MARKETING</div>
          <div style={{ fontSize: 12, color: 'rgba(36,28,22,0.45)', marginTop: 1 }}>Client Portal</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, letterSpacing: '0.01em' }}>
          KGB
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'leads' && (
          <LeadsTab leads={leads} filter={leadFilter} onSetFilter={setLeadFilter} onSelectLead={setSelectedLeadId} />
        )}
        {tab === 'contact' && <ContactTab contact={CONTACT} />}
        {tab === 'calendar' && (
          <CalendarTab
            appointments={APPOINTMENTS}
            today={TODAY}
            calView={calView}
            weekSelectedIso={weekSelectedIso}
            onSetCalView={setCalView}
            onSetWeekSelected={setWeekSelectedIso}
            onSelectAppt={setSelectedApptId}
          />
        )}
        {tab === 'notifications' && <NotificationsTab notifications={NOTIFICATIONS} />}
      </div>

      <BottomNav tab={tab} onSetTab={setTab} hasUnread={hasUnread} />

      {selectedLead && (
        <LeadDetail lead={selectedLead} onClose={() => setSelectedLeadId(null)} onSetStatus={setLeadStatus} />
      )}

      {selectedAppt && <ApptDetail appt={selectedAppt} onClose={() => setSelectedApptId(null)} />}
    </div>
  );
}
