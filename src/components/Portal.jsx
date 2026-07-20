import { useState } from 'react';
import { TODAY } from '../data';
import { INK, ACCENT } from '../styles';
import LeadsTab from './LeadsTab';
import LeadDetail from './LeadDetail';
import ContactTab from './ContactTab';
import CalendarTab from './CalendarTab';
import ApptDetail from './ApptDetail';
import NotificationsTab from './NotificationsTab';
import BottomNav from './BottomNav';

export default function Portal({ client, onLogout }) {
  const [tab, setTabState] = useState('leads');
  const [calView, setCalView] = useState('month');
  const [selectedApptId, setSelectedApptId] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [leadFilter, setLeadFilter] = useState('All');
  const [weekSelectedIso, setWeekSelectedIso] = useState(null);
  const [leads, setLeads] = useState(client.leads);

  function setTab(t) {
    setTabState(t);
    setSelectedApptId(null);
    setSelectedLeadId(null);
  }

  function setLeadStatus(id, status) {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
  }

  const hasUnread = client.notifications.some((n) => n.unread);
  const selectedLead = leads.find((l) => l.id === selectedLeadId);
  const selectedAppt = client.appointments.find((a) => a.id === selectedApptId);

  return (
    <div
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
        boxShadow: '0 30px 60px -20px rgba(15,23,42,0.35), 0 0 0 1px rgba(15,23,42,0.06)',
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
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>KGB MARKETING</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>Client Portal</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div
            onClick={onLogout}
            style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Sign out
          </div>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: ACCENT, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, letterSpacing: '0.01em', flexShrink: 0 }}>
            KGB
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {tab === 'leads' && (
          <LeadsTab leads={leads} filter={leadFilter} onSetFilter={setLeadFilter} onSelectLead={setSelectedLeadId} />
        )}
        {tab === 'contact' && <ContactTab contact={client.contact} />}
        {tab === 'calendar' && (
          <CalendarTab
            appointments={client.appointments}
            today={TODAY}
            calView={calView}
            weekSelectedIso={weekSelectedIso}
            onSetCalView={setCalView}
            onSetWeekSelected={setWeekSelectedIso}
            onSelectAppt={setSelectedApptId}
          />
        )}
        {tab === 'notifications' && <NotificationsTab notifications={client.notifications} />}
      </div>

      <BottomNav tab={tab} onSetTab={setTab} hasUnread={hasUnread} />

      {selectedLead && (
        <LeadDetail lead={selectedLead} onClose={() => setSelectedLeadId(null)} onSetStatus={setLeadStatus} />
      )}

      {selectedAppt && <ApptDetail appt={selectedAppt} onClose={() => setSelectedApptId(null)} />}
    </div>
  );
}
