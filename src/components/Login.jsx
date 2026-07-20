import { useState } from 'react';
import { INK, ACCENT } from '../styles';
import { login } from '../api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const session = await login(username, password);
      onLogin(session);
    } catch (err) {
      setError(err.message || 'Incorrect username or password.');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '13px 14px',
    borderRadius: 12,
    border: '1px solid rgb(var(--ink-rgb) / 0.12)',
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
        boxShadow: '0 30px 60px -20px rgb(var(--ink-rgb) / 0.35), 0 0 0 1px rgb(var(--ink-rgb) / 0.06)',
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
            fontSize: 22,
            fontWeight: 800,
            marginBottom: 16,
          }}
        >
          ⌂
        </div>
        <div style={{ fontSize: 17, fontWeight: 800, color: INK, letterSpacing: '0.02em' }}>BUSINESS PORTAL</div>
        <div style={{ fontSize: 13, color: 'rgb(var(--ink-rgb) / 0.45)', marginTop: 2 }}>Sign in to your account</div>
      </div>

      <div style={{ fontSize: 22, fontWeight: 800, color: INK, letterSpacing: '-0.01em', marginBottom: 20, textAlign: 'center' }}>
        Sign in
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgb(var(--ink-rgb) / 0.5)', marginBottom: 6 }}>Username</div>
          <input
            style={inputStyle}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'rgb(var(--ink-rgb) / 0.5)', marginBottom: 6 }}>Password</div>
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
          disabled={loading}
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
            cursor: loading ? 'default' : 'pointer',
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
