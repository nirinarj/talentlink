import { useState } from 'react';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('candidat');
  const [entrepriseNom, setEntrepriseNom] = useState('');
  const [telephone, setTelephone] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('app_users') || '[]');
    
    if (users.some(u => u.email === email)) {
      alert("Cet email est déjà utilisé.");
      return;
    }

    const newUser = { 
      email, 
      password, 
      role, 
      entrepriseNom: role === 'entreprise' ? entrepriseNom : '',
      telephone 
    };

    users.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(users));

    alert("Inscription réussie !");
    onRegisterSuccess(role, email);
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', background: 'white', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontFamily: 'Segoe UI, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>Inscription</h2>
      
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px', textAlign: 'center' }}>Vous êtes :</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none' }}
          >
            <option value="candidat">Candidat</option>
            <option value="entreprise">Entreprise</option>
          </select>
        </div>

        {role === 'entreprise' && (
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Nom de l'entreprise</label>
            <input 
              type="text" 
              placeholder="Ex: Tech Corp" 
              value={entrepriseNom} 
              onChange={(e) => setEntrepriseNom(e.target.value)} 
              required 
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Adresse email</label>
          <input 
            type="email5'}" 
            placeholder="nom@exemple.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Coordonnées (Téléphone)</label>
          <input 
            type="text" 
            placeholder="032 00 000 00" 
            value={telephone} 
            onChange={(e) => setTelephone(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Confirmation du mot de passe</label>
          <input 
            type="password" 
            placeholder="••••••" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ width: '100%', background: '#10b981', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginTop: '10px' }}
        >
          Créer un compte
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        Déjà un compte ? <span onClick={onSwitchToLogin} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}>Se connecter</span>
      </p>
    </div>
  );
}