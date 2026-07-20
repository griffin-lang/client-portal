import { useState } from 'react';
import { INK, ACCENT } from '../styles';

export default function Login({ clients, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const match = clients.find(
      (c) => c.username.toLowerCase() === username.trim().toLowerCase() && c.password === password
    );
    if (match) {
      setError('');
      onLogin(match.id);
    } else {
      setError('Incorrect username or password.');
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 14px',
    borderRadius: 12,
    border: '1px solid rgba(15,23,42,0.12)',
    background: '#fff',
    fontSize: 15,
    color: INK,
    fontFamily: 'inherit',
    outline: 'none',
  };

  return (
    <div
      style={{
        width: 402,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#FAFAFA',
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 30px 60px -20px rgba(15,23,42,0.35), 0 0 0 1px rgba(15,23,42,0.06)',
        padding: '56px 32px 40px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 36 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: ACCENT,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: '0.01em',
            marginBottom: 16,
          }}
        >
          KGB
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, letterSpacing: '0.02em' }}>KGB MARKETING</div>
        <div style={{ fontSize: 13, color: 'rgba(15,23,42,0.45)', marginTop: 2 }}>Client Portal</div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 800, color: INK, letterSpacing: '-0.01em', marginBottom: 20, textAlign: 'center' }}>
        Sign in
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(15,23,42,0.5)', marginBottom: 6 }}>Username</div>
          <input
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgba(15,23,42,0.5)', marginBottom: 6 }}>Password</div>
          <input
            style={inputStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </div>

        {error && <div style={{ fontSize: 13, color: '#B3261E', marginTop: -2 }}>{error}</div>}

        <button
          type="submit"
          style={{
            marginTop: 8,
            width: '100%',
            padding: '13px 0',
            borderRadius: 100,
            border: 'none',
            background: ACCENT,
            color: '#fff',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          Sign In
        </button>
      </form>

      <div
        style={{
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid rgba(15,23,42,0.07)',
          fontSize: 12.5,
          color: 'rgba(15,23,42,0.45)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 600, color: 'rgba(15,23,42,0.55)', marginBottom: 4 }}>Demo accounts (password: portal123)</div>
        {clients.map((c) => (
          <div key={c.id}>{c.username} — {c.contact.company}</div>
        ))}
      </div>
    </div>
  );
}
