import { useState } from 'react';
import { CLIENTS } from './clients';
import Login from './components/Login';
import Portal from './components/Portal';

const SESSION_KEY = 'client-portal-session';

export default function App() {
  const [sessionId, setSessionId] = useState(() => localStorage.getItem(SESSION_KEY));

  function handleLogin(clientId) {
    localStorage.setItem(SESSION_KEY, clientId);
    setSessionId(clientId);
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setSessionId(null);
  }

  const client = CLIENTS.find((c) => c.id === sessionId);

  if (!client) {
    return <Login clients={CLIENTS} onLogin={handleLogin} />;
  }

  return <Portal key={client.id} client={client} onLogout={handleLogout} />;
}
