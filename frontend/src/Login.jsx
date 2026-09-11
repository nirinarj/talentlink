import { useState } from 'react';
import API_URL from './config';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: "Connexion réussie !" });
        if (onLoginSuccess) {
          onLoginSuccess(data.role, data.email);
        }
      } else {
        setMessage({ type: 'error', text: data.error || "Email ou mot de passe incorrect." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: "Impossible de joindre le serveur. Vérifiez votre connexion." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1e293b' }}>Connexion</h2>

      {message && (
        <div style={{ 
          padding: '12px', 
          marginTop: '15px', 
          borderRadius: '8px', 
          fontSize: '14px', 
          textAlign: 'center',
          background: message.type === 'error' ? '#fee2e2' : '#d1fae5',
          color: message.type === 'error' ? '#991b1b' : '#065f46'
        }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ background: loading ? '#9ca3af' : '#f43f5e', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', touchAction: 'manipulation' }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        Pas de compte ? <span onClick={onSwitchToRegister} style={{ color: '#f43f5e', cursor: 'pointer', fontWeight: 'bold' }}>S'inscrire</span>
      </p>
    </div>
  );
}