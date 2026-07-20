import { useState } from 'react';
import Login from './components/Login';
import Portal from './components/Portal';

const SESSION_KEY = 'business-portal-session';

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session.expiresAt || session.expiresAt < Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export default function App() {
  const [session, setSession] = useState(loadSession);

  function handleLogin(newSession) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
    setSession(newSession);
  }

  function handleLogout() {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }

  if (!session) {
    return <Login onLogin={handleLogin} />;
  }

  return <Portal key={session.accountId} session={session} onLogout={handleLogout} />;
}
