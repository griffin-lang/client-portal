export async function login(username, password) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Sign in failed.');
  return data; // { token, expiresAt, accountId, accountName }
}

async function authedGet(path, token) {
  const res = await fetch(path, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (res.status === 401) {
    const err = new Error(data.error || 'Session expired.');
    err.unauthorized = true;
    throw err;
  }
  if (!res.ok) throw new Error(data.error || `Request to ${path} failed.`);
  return data;
}

export function getLeads(token) {
  return authedGet('/api/leads', token);
}

export function getAppointments(token) {
  return authedGet('/api/appointments', token);
}

export function getNotifications(token) {
  return authedGet('/api/notifications', token);
}

export function getContact(token) {
  return authedGet('/api/contact', token);
}
