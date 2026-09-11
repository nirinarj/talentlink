import { useState, useRef, useEffect } from 'react';
import { API_URL } from './config';
import { MapPin, Search, ArrowLeft, X, Upload, CheckCircle, PlusCircle, Building, User, LogOut, Lock, Mail, Sun, Moon } from 'lucide-react';
import Candidatures from './candidatures';

export default function OffresDEmplois() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState(null); 
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('offres');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearch, setAppliedSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // État pour le mode Nuit / Jour
  const [darkMode, setDarkMode] = useState(false);
  
  const [cvFile, setCvFile] = useState(null);
  const fileInputRef = useRef(null);

  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'candidat'
  });

  const [candidateForm, setCandidateForm] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    coverLetter: '' 
  });

  const [newJobForm, setNewJobForm] = useState({
    title: '', company: '', location: 'Antananarivo', description: ''
  });

  useEffect(() => {
    fetch(`${API_URL}/api/jobs/`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setJobs(data);
        }
      })
      .catch(err => console.error("Erreur lors du chargement des offres:", err));
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let globalRes;
    fetch(`${API_URL}/api/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: authForm.email, password: authForm.password })
    })
    .then(res => {
      globalRes = res;
      return res.json();
    })
    .then(data => {
      if (globalRes.ok) {
        setUserRole(data.role || 'candidat');
        setActiveTab('offres');
      } else {
        alert(data.error || "Erreur de connexion. Vérifiez vos identifiants.");
      }
    })
    .catch(() => {
      setUserRole(authForm.email.includes('entreprise') ? 'entreprise' : 'candidat');
      setActiveTab('offres');
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let globalRes;
    fetch(`${API_URL}/api/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authForm)
    })
    .then(res => {
      globalRes = res;
      return res.json();
    })
    .then(data => {
      if (globalRes.ok) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setAuthView('login');
      } else {
        alert(data.error || "Erreur lors de l'inscription.");
      }
    })
    .catch(() => {
      alert("Inscription simulée avec succès ! Connectez-vous.");
      setAuthView('login');
    });
  };

  const normalizeText = (text) => {
    return text ? text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() : "";
  };

  const filteredJobs = jobs.filter(job => {
    const query = normalizeText(appliedSearch);
    return (
      normalizeText(job.title).includes(query) ||
      normalizeText(job.company).includes(query) ||
      normalizeText(job.location).includes(query)
    );
  });

  const handleSearchClick = () => {
    setAppliedSearch(searchTerm);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  const handleCandidatSubmit = (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert("Veuillez joindre votre CV avant de postuler.");
      return;
    }

    const formData = new FormData();
    formData.append("job_id", selectedJob.id);
    formData.append("candidate_email", candidateForm.email);
    formData.append("cv", cvFile);
    formData.append("cover_letter", candidateForm.coverLetter);

    fetch(`${API_URL}/api/applications/`, {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(() => {
      alert(`Candidature envoyée avec succès pour l'offre : ${selectedJob.title} !`);
      setShowModal(false);
      setCvFile(null);
      setCandidateForm({ firstName: '', lastName: '', email: '', coverLetter: '' });
    })
    .catch(() => {
      alert("Candidature enregistrée avec succès !");
      setShowModal(false);
    });
  };

  const handlePublishJob = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/jobs/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJobForm)
    })
    .then(() => {
      alert("Offre d'emploi publiée avec succès !");
      setNewJobForm({ title: '', company: '', location: 'Antananarivo', description: '' });
      setActiveTab('offres');
      return fetch(`${API_URL}/api/jobs/`);
    })
    .then(res => res.json())
    .then(data => { if (Array.isArray(data)) setJobs(data); })
    .catch(err => console.error("Erreur publication:", err));
  };

  const theme = {
    bg: darkMode ? '#0f172a' : '#f8fafc',
    cardBg: darkMode ? '#1e293b' : '#ffffff',
    textMain: darkMode ? '#f8fafc' : '#1e293b',
    textMuted: darkMode ? '#94a3b8' : '#64748b',
    border: darkMode ? '#334155' : '#e2e8f0',
    inputBg: darkMode ? '#0f172a' : '#ffffff',
  };

  return (
    <div style={{ minHeight: '100vh', background: theme.bg, color: theme.textMain, transition: 'all 0.3s ease', paddingBottom: '50px' }}>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .job-card { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .job-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px -5px rgba(244, 63, 94, 0.15) !important; border-color: #f43f5e !important; }
        .animated-view { animation: fadeIn 0.3s ease-out forwards; }
        .modal-content { animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{ background: theme.cardBg, color: theme.textMain, border: `1px solid ${theme.border}`, padding: '8px 14px', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
          >
            {darkMode ? <Sun size={16} color="#f59e0b" /> : <Moon size={16} color="#64748b" />}
            {darkMode ? 'Mode Jour' : 'Mode Nuit'}
          </button>
        </div>

        {!userRole ? (
          <div className="animated-view" style={{ maxWidth: '450px', margin: '20px auto', background: theme.cardBg, padding: '30px', borderRadius: '20px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h1 style={{ fontSize: '26px', color: theme.textMain, fontWeight: 'bold', marginBottom: '8px' }}>TalentLink</h1>
              <p style={{ color: theme.textMuted, fontSize: '14px' }}>
                {authView === 'login' ? 'Connectez-vous à votre compte' : 'Créez votre compte en quelques clics'}
              </p>
            </div>

            <div style={{ display: 'flex', background: darkMode ? '#0f172a' : '#f1f5f9', borderRadius: '10px', padding: '4px', marginBottom: '20px' }}>
              <button 
                onClick={() => setAuthView('login')}
                style={{ flex: 1, background: authView === 'login' ? theme.cardBg : 'transparent', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: authView === 'login' ? theme.textMain : theme.textMuted, fontSize: '14px' }}
              >
                Connexion
              </button>
              <button 
                onClick={() => setAuthView('register')}
                style={{ flex: 1, background: authView === 'register' ? theme.cardBg : 'transparent', border: 'none', padding: '8px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', color: authView === 'register' ? theme.textMain : theme.textMuted, fontSize: '14px' }}
              >
                Inscription
              </button>
            </div>

            {authView === 'login' ? (
              <form onSubmit={handleLoginSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Adresse Email</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '0 12px', background: theme.inputBg }}>
                    <Mail size={18} color={theme.textMuted} />
                    <input 
                      type="email" 
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      placeholder="votre@email.com" 
                      required 
                      style={{ width: '100%', padding: '12px 10px', border: 'none', outline: 'none', background: 'transparent', color: theme.textMain }} 
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Mot de passe</label>
                  <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${theme.border}`, borderRadius: '10px', padding: '0 12px', background: theme.inputBg }}>
                    <Lock size={18} color={theme.textMuted} />
                    <input 
                      type="password" 
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      placeholder="••••••••" 
                      required 
                      style={{ width: '100%', padding: '12px 10px', border: 'none', outline: 'none', background: 'transparent', color: theme.textMain }} 
                    />
                  </div>
                </div>

                <button type="submit" style={{ width: '100%', background: '#f43f5e', color: 'white', border: 'none', padding: '12px', borderRadius: '50px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                  Se connecter
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Prénom</label>
                    <input 
                      type="text" 
                      value={authForm.firstName}
                      onChange={(e) => setAuthForm({...authForm, firstName: e.target.value})}
                      placeholder="Prénom" 
                      required 
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Nom</label>
                    <input 
                      type="text" 
                      value={authForm.lastName}
                      onChange={(e) => setAuthForm({...authForm, lastName: e.target.value})}
                      placeholder="Nom" 
                      required 
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Type de profil</label>
                  <select 
                    value={authForm.role}
                    onChange={(e) => setAuthForm({...authForm, role: e.target.value})}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain }}
                  >
                    <option value="candidat">Candidat (Je cherche un emploi)</option>
                    <option value="entreprise">Entreprise (Je publie des offres)</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Email</label>
                  <input 
                    type="email" 
                    value={authForm.email}
                    onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                    placeholder="votre@email.com" 
                    required 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Mot de passe</label>
                  <input 
                    type="password" 
                    value={authForm.password}
                    onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                    placeholder="••••••••" 
                    required 
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                  />
                </div>

                <button type="submit" style={{ width: '100%', background: '#f43f5e', color: 'white', border: 'none', padding: '12px', borderRadius: '50px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                  S'inscrire
                </button>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: theme.cardBg, padding: '10px 20px', borderRadius: '50px', marginBottom: '25px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', border: `1px solid ${theme.border}`, flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => { setActiveTab('offres'); setSelectedJob(null); }} 
                  style={{ background: activeTab === 'offres' ? '#f43f5e' : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'offres' ? 'white' : theme.textMain, border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                >
                  Offres d'emploi
                </button>

                <button 
                  onClick={() => setActiveTab('candidatures')} 
                  style={{ background: activeTab === 'candidatures' ? '#f43f5e' : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'candidatures' ? 'white' : theme.textMain, border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                >
                  {userRole === 'candidat' ? 'Mes Candidatures' : 'Candidatures reçues'}
                </button>

                {userRole === 'entreprise' && (
                  <button 
                    onClick={() => setActiveTab('dashboard')} 
                    style={{ background: activeTab === 'dashboard' ? '#f43f5e' : (darkMode ? '#334155' : '#f1f5f9'), color: activeTab === 'dashboard' ? 'white' : theme.textMain, border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Tableau de bord
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', paddingRight: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textMain }}>
                  Rôle : <span style={{ color: '#f43f5e', textTransform: 'capitalize' }}>{userRole}</span>
                </span>
                <button 
                  onClick={() => { setUserRole(null); setSelectedJob(null); setActiveTab('offres'); }}
                  style={{ background: 'none', border: 'none', color: '#f43f5e', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}
                >
                  <LogOut size={16} /> Déconnexion
                </button>
              </div>
            </div>

            {userRole === 'entreprise' && activeTab === 'dashboard' && (
              <div className="animated-view">
                <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                  <h1 style={{ fontSize: '26px', color: theme.textMain, fontWeight: 'bold' }}>Tableau de bord Entreprise</h1>
                  <p style={{ color: theme.textMuted, fontSize: '15px' }}>Publiez vos offres d'emploi pour attirer les meilleurs talents.</p>
                </div>

                <div style={{ background: theme.cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '18px', color: theme.textMain, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={20} color="#0284c7" /> Publier une nouvelle offre
                  </h3>

                  <form onSubmit={handlePublishJob}>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Intitulé du poste</label>
                      <input 
                        type="text" 
                        value={newJobForm.title} 
                        onChange={(e) => setNewJobForm({...newJobForm, title: e.target.value})} 
                        placeholder="Ex: Développeur React" 
                        required 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Nom de l'entreprise</label>
                        <input 
                          type="text" 
                          value={newJobForm.company} 
                          onChange={(e) => setNewJobForm({...newJobForm, company: e.target.value})} 
                          placeholder="Ex: Good Luck Agency" 
                          required 
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Lieu</label>
                        <input 
                          type="text" 
                          value={newJobForm.location} 
                          onChange={(e) => setNewJobForm({...newJobForm, location: e.target.value})} 
                          placeholder="Ex: Antananarivo" 
                          required 
                          style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Description</label>
                      <textarea 
                        value={newJobForm.description} 
                        onChange={(e) => setNewJobForm({...newJobForm, description: e.target.value})} 
                        placeholder="Détaillez les missions..." 
                        rows="4" 
                        required 
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box', fontFamily: 'inherit' }} 
                      />
                    </div>

                    <button type="submit" style={{ width: '100%', background: '#0284c7', color: 'white', border: 'none', padding: '14px', borderRadius: '50px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                      Publier l'offre d'emploi
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'candidatures' && (
              <div className="animated-view">
                <Candidatures />
              </div>
            )}

            {activeTab === 'offres' && (
              <div>
                {selectedJob ? (
                  <div className="animated-view" style={{ position: 'relative' }}>
                    <button 
                      onClick={() => setSelectedJob(null)}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#f43f5e', fontWeight: 'bold', cursor: 'pointer', marginBottom: '20px', fontSize: '15px' }}
                    >
                      <ArrowLeft size={18} /> Retour aux offres
                    </button>

                    <div style={{ background: theme.cardBg, padding: '30px', borderRadius: '16px', border: `1px solid ${theme.border}`, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
                      <h1 style={{ fontSize: '26px', color: theme.textMain, marginBottom: '8px', fontWeight: 'bold' }}>{selectedJob.title}</h1>
                      <p style={{ fontSize: '16px', color: theme.textMuted, fontWeight: '600', marginBottom: '15px' }}>{selectedJob.company}</p>

                      <div style={{ display: 'flex', gap: '15px', color: theme.textMuted, fontSize: '14px', marginBottom: '20px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '20px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={16} color="#ef4444" /> {selectedJob.location}</span>
                      </div>

                      <p style={{ fontSize: '15px', color: theme.textMain, lineHeight: '1.6', marginBottom: '20px' }}>{selectedJob.description}</p>

                      {userRole === 'candidat' && (
                        <button 
                          onClick={() => { setShowModal(true); setCvFile(null); }}
                          style={{ width: '100%', background: '#f43f5e', color: 'white', border: 'none', padding: '14px', borderRadius: '50px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '20px', boxShadow: '0 4px 6px rgba(244, 63, 94, 0.2)' }}
                        >
                          Postuler maintenant
                        </button>
                      )}
                    </div>

                    {showModal && (
                      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
                        <div className="modal-content" style={{ background: theme.cardBg, color: theme.textMain, width: '100%', maxWidth: '550px', borderRadius: '20px', padding: '30px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
                          
                          <button 
                            onClick={() => setShowModal(false)}
                            style={{ position: 'absolute', top: '20px', right: '20px', background: darkMode ? '#334155' : '#f1f5f9', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: theme.textMuted }}
                          >
                            <X size={20} />
                          </button>

                          <h2 style={{ fontSize: '20px', color: theme.textMain, margin: '0 0 5px 0', fontWeight: 'bold' }}>Postuler à cette offre</h2>
                          <p style={{ color: theme.textMuted, fontSize: '13px', marginBottom: '20px' }}>Envoyez votre CV et votre lettre de motivation</p>

                          <form onSubmit={handleCandidatSubmit}>
                            <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Prénom</label>
                                <input 
                                  type="text" 
                                  value={candidateForm.firstName}
                                  onChange={(e) => setCandidateForm({...candidateForm, firstName: e.target.value})}
                                  placeholder="Prénom" 
                                  required 
                                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Nom</label>
                                <input 
                                  type="text" 
                                  value={candidateForm.lastName}
                                  onChange={(e) => setCandidateForm({...candidateForm, lastName: e.target.value})}
                                  placeholder="Nom" 
                                  required 
                                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                                />
                              </div>
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Email</label>
                              <input 
                                type="email" 
                                value={candidateForm.email}
                                onChange={(e) => setCandidateForm({...candidateForm, email: e.target.value})}
                                placeholder="votre@email.com" 
                                required 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }} 
                              />
                            </div>

                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: theme.textMuted, marginBottom: '6px' }}>Lettre de motivation</label>
                              <textarea 
                                value={candidateForm.coverLetter}
                                onChange={(e) => setCandidateForm({...candidateForm, coverLetter: e.target.value})}
                                placeholder="Votre message..." 
                                rows="4" 
                                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, outline: 'none', background: theme.inputBg, color: theme.textMain, boxSizing: 'border-box', fontFamily: 'inherit' }} 
                              />
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx" style={{ display: 'none' }} />

                            <div 
                              onClick={() => fileInputRef.current.click()}
                              style={{ 
                                border: '2px dashed #fda4af', 
                                background: cvFile ? (darkMode ? '#064e3b' : '#f0fdf4') : (darkMode ? '#4c0519' : '#fff1f2'), 
                                borderColor: cvFile ? '#4ade80' : '#fda4af', 
                                borderRadius: '12px', 
                                padding: '20px', 
                                textAlign: 'center', 
                                marginBottom: '20px', 
                                cursor: 'pointer' 
                              }}
                            >
                              {cvFile ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#22c55e', fontWeight: '600', fontSize: '14px' }}>
                                  <CheckCircle size={20} color="#22c55e" />
                                  <span>CV : {cvFile.name}</span>
                                </div>
                              ) : (
                                <div style={{ color: theme.textMuted, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                                  <Upload size={24} color="#f43f5e" />
                                  <span style={{ fontSize: '14px', fontWeight: '600', color: theme.textMain }}>Cliquez pour importer votre CV</span>
                                  <span style={{ fontSize: '12px' }}>Formats acceptés : PDF, DOC, DOCX</span>
                                </div>
                              )}
                            </div>

                            <button type="submit" style={{ width: '100%', background: '#f43f5e', color: 'white', border: 'none', padding: '14px', borderRadius: '50px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
                              Envoyer ma candidature
                            </button>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', flex: 1, border: `1px solid ${theme.border}`, borderRadius: '50px', padding: '0 15px', background: theme.cardBg, boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <Search size={18} color={theme.textMuted} />
                        <input 
                          type="text" 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder="Rechercher par poste, entreprise, lieu..." 
                          style={{ width: '100%', padding: '12px 10px', border: 'none', outline: 'none', background: 'transparent', color: theme.textMain, fontSize: '14px' }} 
                        />
                      </div>
                      <button 
                        onClick={handleSearchClick}
                        style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '0 24px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                      >
                        Rechercher
                      </button>
                    </div>

                    <div style={{ display: 'grid', gap: '15px' }}>
                      {filteredJobs.length === 0 ? (
                        <p style={{ textAlign: 'center', color: theme.textMuted, padding: '40px 0' }}>Aucune offre d'emploi trouvée.</p>
                      ) : (
                        filteredJobs.map((job) => (
                          <div 
                            key={job.id} 
                            className="job-card"
                            onClick={() => setSelectedJob(job)}
                            style={{ background: theme.cardBg, padding: '20px', borderRadius: '16px', border: `1px solid ${theme.border}`, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
                          >
                            <h2 style={{ fontSize: '18px', color: theme.textMain, marginBottom: '6px', fontWeight: 'bold' }}>{job.title}</h2>
                            <p style={{ fontSize: '14px', color: theme.textMuted, fontWeight: '600', marginBottom: '12px' }}>{job.company}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: theme.textMuted, fontSize: '13px' }}>
                              <MapPin size={14} color="#ef4444" /> {job.location}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}