import { useState } from 'react';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      onLoginSuccess(foundUser.role, foundUser.email);
    } else {
      alert("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
        />
        <button type="submit" style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        Pas de compte ? <span onClick={onSwitchToRegister} style={{ color: '#f43f5e', cursor: 'pointer', fontWeight: 'bold' }}>S'inscrire</span>
      </p>
    </div>
  );
}