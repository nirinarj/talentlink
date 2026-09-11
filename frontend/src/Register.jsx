import { useState } from 'react';
import { API_URL } from './config';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('candidat');
  const [entrepriseNom, setEntrepriseNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: "Les mots de passe ne correspondent pas." });
      return;
    }

    setLoading(true);
    setMessage({ type: 'info', text: "Connexion au serveur en cours (veuillez patienter si le serveur se réveille)..." });

    try {
      const response = await fetch(`${API_URL}/api/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role,
          entreprise_nom: role === 'entreprise' ? entrepriseNom : '',
          telephone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: "Inscription réussie !" });
        if (onRegisterSuccess) {
          onRegisterSuccess(role, email);
        }
      } else {
        setMessage({ type: 'error', text: data.error || "Erreur lors de l'inscription." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: 'error', text: "Impossible de joindre le serveur. Vérifiez votre connexion." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '450px', margin: '20px auto', background: 'white', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontFamily: 'Segoe UI, sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1e293b' }}>Inscription</h2>
      
      {message && (
        <div style={{ 
          padding: '12px', 
          marginBottom: '15px', 
          borderRadius: '8px', 
          fontSize: '14px', 
          textAlign: 'center',
          background: message.type === 'error' ? '#fee2e2' : message.type === 'success' ? '#d1fae5' : '#e0f2fe',
          color: message.type === 'error' ? '#991b1b' : message.type === 'success' ? '#065f46' : '#0369a1'
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Vous êtes :</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
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
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '5px' }}>Adresse email</label>
          <input 
            type="email" 
            placeholder="nom@exemple.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
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
            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#f8fafc', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>

        <button 
          type="button" 
          disabled={loading}
          onClick={handleRegister}
          style={{ 
            width: '100%', 
            background: loading ? '#9ca3af' : '#10b981', 
            color: 'white', 
            border: 'none', 
            padding: '16px', 
            borderRadius: '8px', 
            fontWeight: 'bold', 
            fontSize: '16px', 
            cursor: 'pointer', 
            marginTop: '15px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {loading ? "Patientez..." : "Créer un compte"}
        </button>
      </div>

      <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
        Déjà un compte ? <span onClick={onSwitchToLogin} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 'bold' }}>Se connecter</span>
      </p>
    </div>
  );
}