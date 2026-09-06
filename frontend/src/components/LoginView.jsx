import { Mail, Lock, Sun, Moon } from 'lucide-react';

export default function LoginView({
  darkMode, setDarkMode, themeStyles, userRole, setUserRole, authMode, setAuthMode,
  email, setEmail, password, setPassword, confirmPassword, setConfirmPassword,
  firstName, setFirstName, lastName, setLastName, companyName, setCompanyName,
  handleAuthSubmit, activeColor
}) {
  return (
    <div style={{ minHeight: '100vh', background: themeStyles.bg, padding: '20px', transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '450px', margin: '0 auto 15px auto', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', background: themeStyles.cardBg, color: themeStyles.text, border: `1px solid ${themeStyles.border}`, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
        >
          {darkMode ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#3b82f6" />}
          {darkMode ? 'Mode Jour' : 'Mode Nuit'}
        </button>
      </div>

      <div style={{ maxWidth: '450px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif', padding: '30px', background: themeStyles.cardBg, color: themeStyles.text, borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', border: `1px solid ${themeStyles.border}` }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '5px' }}>
            <span style={{ color: activeColor }}>Talent</span>Link
          </h1>
          <p style={{ color: themeStyles.subText, fontSize: '14px' }}>
            {authMode === 'login' ? 'Connectez-vous pour continuer' : 'Créez votre compte'}
          </p>
        </div>

        <div style={{ display: 'flex', background: darkMode ? '#0f172a' : '#f1f5f9', padding: '4px', borderRadius: '10px', marginBottom: '20px', gap: '4px' }}>
          <button onClick={() => setUserRole('candidat')} style={{ flex: 1, padding: '8px', border: 'none', background: userRole === 'candidat' ? themeStyles.cardBg : 'transparent', color: userRole === 'candidat' ? '#f43f5e' : themeStyles.subText, fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Candidat</button>
          <button onClick={() => setUserRole('entreprise')} style={{ flex: 1, padding: '8px', border: 'none', background: userRole === 'entreprise' ? themeStyles.cardBg : 'transparent', color: userRole === 'entreprise' ? '#0284c7' : themeStyles.subText, fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Entreprise</button>
          <button onClick={() => setUserRole('admin')} style={{ flex: 1, padding: '8px', border: 'none', background: userRole === 'admin' ? themeStyles.cardBg : 'transparent', color: userRole === 'admin' ? '#8b5cf6' : themeStyles.subText, fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Admin</button>
        </div>

        <form onSubmit={handleAuthSubmit}>
          {authMode === 'register' && userRole === 'candidat' && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" style={{ flex: 1, padding: '10px', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text }} />
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" style={{ flex: 1, padding: '10px', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text }} />
            </div>
          )}

          {authMode === 'register' && userRole === 'entreprise' && (
            <div style={{ marginBottom: '15px' }}>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Nom de l'entreprise" style={{ width: '100%', padding: '10px', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
            </div>
          )}

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: themeStyles.text, marginBottom: '5px' }}>Email</label>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', padding: '0 10px', background: themeStyles.inputBg }}>
              <Mail size={16} color="#94a3b8" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@domain.com" required style={{ width: '100%', padding: '10px', border: 'none', background: 'transparent', color: themeStyles.text, outline: 'none' }} />
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: themeStyles.text, marginBottom: '5px' }}>Mot de passe</label>
            <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', padding: '0 10px', background: themeStyles.inputBg }}>
              <Lock size={16} color="#94a3b8" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px', border: 'none', background: 'transparent', color: themeStyles.text, outline: 'none' }} />
            </div>
          </div>

          {authMode === 'register' && userRole !== 'admin' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: themeStyles.text, marginBottom: '5px' }}>Confirmer le mot de passe</label>
              <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${themeStyles.inputBorder}`, borderRadius: '8px', padding: '0 10px', background: themeStyles.inputBg }}>
                <Lock size={16} color="#94a3b8" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required style={{ width: '100%', padding: '10px', border: 'none', background: 'transparent', color: themeStyles.text, outline: 'none' }} />
              </div>
            </div>
          )}

          <button type="submit" style={{ width: '100%', background: activeColor, color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', marginBottom: '15px' }}>
            {authMode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>

        {userRole !== 'admin' && (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setEmail(''); setPassword(''); }} style={{ background: 'none', border: 'none', color: themeStyles.subText, fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
              {authMode === 'login' ? "Pas de compte ? S'inscrire" : "Déjà un compte ? Se connecter"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}