import { useState, useEffect } from 'react';
import LoginView from './components/LoginView';
import CandidatView from './components/CandidatView';
import EntrepriseView from './components/EntrepriseView';
import AdminView from './components/AdminView';
import { API_URL } from './config';
import { LayoutDashboard, Briefcase, Send, Users, LogOut, Sun, Moon } from 'lucide-react';

export default function App() {
  useEffect(() => {
    document.title = "TalentLink - Recrutement à Madagascar";
    fetchJobs();
    fetchUsers();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [userRole, setUserRole] = useState('candidat');
  const [darkMode, setDarkMode] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('Telma'); 

  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('offres');

  const fetchJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/`);
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Erreur de récupération des offres :", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users/`);
      if (response.ok) {
        const data = await response.json();
        setUsersList(data);
      }
    } catch (error) {
      console.error("Erreur utilisateurs :", error);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Veuillez remplir l'email et le mot de passe.");
      return;
    }

    if (authMode === 'register') {
      if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/register/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(), password, role: userRole,
            first_name: firstName.trim(), last_name: lastName.trim(), company_name: companyName.trim()
          })
        });
        if (response.ok) {
          alert("Compte créé avec succès ! Connectez-vous.");
          setAuthMode('login');
          setPassword('');
          fetchUsers();
        } else {
          const data = await response.json();
          alert("Erreur : " + JSON.stringify(data));
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
      return;
    } 

    if (authMode === 'login') {
      if (email.trim() === 'admin@talentlink.mg') {
        setCurrentUser({ email: 'admin@talentlink.mg', role: 'admin', firstName: 'Super', lastName: 'Admin' });
        setUserRole('admin');
        setIsLoggedIn(true);
        setActiveTab('dashboard');
        fetchUsers();
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password })
        });
        if (response.ok) {
          const userData = await response.json();
          const actualRole = userData.role || userRole;
          setCurrentUser({ ...userData, role: actualRole });
          setUserRole(actualRole);
          setIsLoggedIn(true);
          setActiveTab('offres');
          fetchUsers();
        } else {
          alert("Email ou mot de passe incorrect !");
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
      }
    }
  };

  const themeStyles = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    cardBg: darkMode ? '#1e293b' : 'white',
    text: darkMode ? '#f8fafc' : '#1e293b',
    subText: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#e2e8f0',
    inputBg: darkMode ? '#0f172a' : '#f8fafc',
    inputBorder: darkMode ? '#475569' : '#cbd5e1',
  };

  const activeColor = userRole === 'candidat' ? '#f43f5e' : (userRole === 'entreprise' ? '#0284c7' : '#8b5cf6');

  if (!isLoggedIn) {
    return (
      <LoginView 
        darkMode={darkMode} setDarkMode={setDarkMode} themeStyles={themeStyles}
        userRole={userRole} setUserRole={setUserRole} authMode={authMode} setAuthMode={setAuthMode}
        email={email} setEmail={setEmail} password={password} setPassword={setPassword}
        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
        firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName}
        companyName={companyName} setCompanyName={setCompanyName} handleAuthSubmit={handleAuthSubmit}
        activeColor={activeColor}
      />
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: themeStyles.bg, padding: '20px', transition: 'background 0.3s' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto', fontFamily: 'Segoe UI, sans-serif' }}>
        
        {/* Bouton Mode Nuit uniquement */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '10px' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: themeStyles.cardBg, color: themeStyles.text, border: `1px solid ${themeStyles.border}`, padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
          >
            {darkMode ? <Sun size={15} color="#f59e0b" /> : <Moon size={15} color="#3b82f6" />}
            {darkMode ? 'Mode Jour' : 'Mode Nuit'}
          </button>
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: themeStyles.cardBg, padding: '12px 20px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${themeStyles.border}`, flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ fontWeight: 'bold', fontSize: '18px', color: themeStyles.text }}>
            <span style={{ color: activeColor }}>Talent</span>Link <span style={{ fontSize: '12px', background: darkMode ? '#334155' : '#f1f5f9', padding: '3px 8px', borderRadius: '6px', color: themeStyles.subText }}>{userRole}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            
            <button onClick={() => setActiveTab('dashboard')} style={{ background: activeTab === 'dashboard' ? activeColor : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'dashboard' ? 'white' : themeStyles.text, border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
              <LayoutDashboard size={15} /> {userRole === 'admin' ? 'Administration' : 'Tableau de bord'}
            </button>

            {userRole === 'admin' && (
              <button onClick={() => setActiveTab('users')} style={{ background: activeTab === 'users' ? activeColor : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'users' ? 'white' : themeStyles.text, border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                <Users size={15} /> Utilisateurs
              </button>
            )}

            {userRole !== 'admin' && (
              <>
                <button onClick={() => setActiveTab('offres')} style={{ background: activeTab === 'offres' ? activeColor : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'offres' ? 'white' : themeStyles.text, border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                  <Briefcase size={15} /> Offres
                </button>
                <button onClick={() => setActiveTab('candidatures')} style={{ background: activeTab === 'candidatures' ? activeColor : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'candidatures' ? 'white' : themeStyles.text, border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '13px' }}>
                  <Send size={15} /> {userRole === 'entreprise' ? 'Candidatures' : 'Mes candidatures'}
                </button>
              </>
            )}

            <button onClick={() => { setIsLoggedIn(false); setCurrentUser(null); setUserRole('candidat'); }} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '10px', fontSize: '13px' }}>
              <LogOut size={16} /> Quitter
            </button>
          </div>
        </div>

        {/* Affichage des composants selon l'onglet et le rôle */}
        {userRole === 'admin' && (
          <AdminView themeStyles={themeStyles} activeTab={activeTab} jobs={jobs} setJobs={setJobs} usersList={usersList} setUsersList={setUsersList} />
        )}

        {userRole === 'entreprise' && (
          <EntrepriseView 
            themeStyles={themeStyles} 
            activeTab={activeTab} 
            currentUser={currentUser} 
            companyName={companyName} 
            fetchJobs={fetchJobs} 
            applications={applications} 
            setApplications={setApplications} 
          />
        )}

        {userRole === 'candidat' && activeTab === 'dashboard' && (
          <EntrepriseView 
            themeStyles={themeStyles} 
            activeTab={activeTab} 
            currentUser={currentUser} 
            companyName={companyName} 
            fetchJobs={fetchJobs} 
            applications={applications} 
            setApplications={setApplications} 
          />
        )}

        {userRole === 'candidat' && activeTab !== 'dashboard' && (
          <CandidatView 
            themeStyles={themeStyles} 
            activeTab={activeTab} 
            jobs={jobs} 
            currentUser={currentUser} 
            applications={applications} 
            setApplications={setApplications} 
          />
        )}

      </div>
    </div>
  );
}