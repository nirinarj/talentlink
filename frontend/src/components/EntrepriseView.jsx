import { useState, useEffect } from 'react';
import API_URL from './config';
import { Briefcase, PlusCircle, FileText, User, Calendar, CheckCircle, XCircle, Lock, MapPin, DollarSign } from 'lucide-react';

export default function EntrepriseView({ themeStyles, activeTab, currentUser, companyName, fetchJobs, applications, setApplications }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Antananarivo');
  const [salary, setSalary] = useState('');
  const [allJobs, setAllJobs] = useState([]);

  const loadAllJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/api/jobs/`);
      if (response.ok) {
        const data = await response.json();
        setAllJobs(data);
      }
    } catch (error) {
      console.error("Erreur chargement des offres :", error);
    }
  };

  useEffect(() => {
    loadAllJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Veuillez remplir le titre et la description.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/jobs/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          location,
          salary,
          company: companyName || currentUser?.company_name || 'Mon Entreprise'
        })
      });

      if (response.ok) {
        alert("Offre publiée avec succès !");
        setTitle('');
        setDescription('');
        setSalary('');
        fetchJobs();
        loadAllJobs(); 
      } else {
        alert("Erreur lors de la publication de l'offre.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  };

  const handleUpdateStatus = (index, status, message) => {
    const updatedApps = [...applications];
    updatedApps[index] = {
      ...updatedApps[index],
      status: status, 
      feedbackMessage: message
    };
    setApplications(updatedApps);
  };

  return (
    <div>
      <style>
        {`
          .action-btn {
            transition: all 0.2s ease-in-out;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
            filter: brightness(1.1);
          }
          .action-btn:active {
            transform: scale(0.95) translateY(0);
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          }
        `}
      </style>

      {/* 1. SECTION TABLEAU DE BORD : Protégé par un cadenas si un candidat essaie d'y accéder */}
      {activeTab === 'dashboard' && (
        <div>
          {currentUser?.role === 'candidat' ? (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '40px', borderRadius: '12px', border: `1px solid ${themeStyles.border}`, textAlign: 'center' }}>
              <div style={{ background: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <Lock size={30} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Accès refusé</h2>
              <p style={{ color: themeStyles.subText, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Vous n'avez pas d'accès pour le tableau de bord. Cette section est réservée aux entreprises.
              </p>
            </div>
          ) : (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Tableau de bord Entreprise</h2>
              <p style={{ color: themeStyles.subText, marginBottom: '20px' }}>Bienvenue, <b>{companyName || currentUser?.company_name || currentUser?.email}</b>. Publiez vos offres et suivez les talents.</p>

              <div style={{ background: themeStyles.bg, padding: '20px', borderRadius: '10px', border: `1px solid ${themeStyles.border}` }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PlusCircle size={18} color="#0284c7" /> Publier une nouvelle offre
                </h3>
                <form onSubmit={handlePostJob}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Titre du poste</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ex: Développeur React / Community Manager" required style={{ width: '100%', padding: '10px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Lieu</label>
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '10px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Salaire (Ar)</label>
                      <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="ex: 1 500 000 Ar" style={{ width: '100%', padding: '10px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Description du poste</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Missions, profil recherché..." rows="4" required style={{ width: '100%', padding: '10px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                  </div>
                  <button className="action-btn" type="submit" style={{ background: '#0284c7', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Publier l'offre</button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. SECTION OFFRES */}
      {activeTab === 'offres' && (
        <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} color="#0284c7" /> Toutes les offres publiées sur TalentLink
          </h3>
          {allJobs.length === 0 ? (
            <p style={{ color: themeStyles.subText, fontSize: '14px' }}>Aucune offre disponible sur la plateforme.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {allJobs.map((job, idx) => (
                <div key={idx} style={{ padding: '15px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.bg }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: themeStyles.text, marginBottom: '4px' }}>{job.title}</h4>
                      <p style={{ fontSize: '13px', color: '#0284c7', fontWeight: '600', marginBottom: '8px' }}>{job.company || 'Entreprise'}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: themeStyles.subText }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.location}</span>
                      {job.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={14} /> {job.salary}</span>}
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: themeStyles.subText, marginTop: '8px', lineHeight: '1.4' }}>{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. SECTION CANDIDATURES */}
      {activeTab === 'candidatures' && (
        <div>
          {currentUser?.role === 'candidat' ? (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '40px', borderRadius: '12px', border: `1px solid ${themeStyles.border}`, textAlign: 'center' }}>
              <div style={{ background: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <Lock size={30} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Accès refusé</h2>
              <p style={{ color: themeStyles.subText, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Vous n'avez pas l'accès pour entrer. Cette section est réservée aux entreprises.
              </p>
            </div>
          ) : (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Candidatures reçues</h2>
              {applications.length === 0 ? (
                <p style={{ color: themeStyles.subText, fontSize: '14px' }}>Aucune candidature reçue pour le moment.</p>
              ) : (
                applications.map((app, index) => (
                  <div key={index} style={{ padding: '15px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', marginBottom: '15px', background: themeStyles.bg }}>
                    <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Briefcase size={16} color="#0284c7" /> Poste : {app.jobTitle}
                    </p>
                    <p style={{ fontSize: '13px', color: themeStyles.subText, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={14} /> Candidat : {app.candidateEmail}
                    </p>
                    
                    <div style={{ fontSize: '13px', background: themeStyles.cardBg, padding: '10px 12px', borderRadius: '6px', border: `1px solid ${themeStyles.border}`, display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: themeStyles.text }}>
                          <FileText size={14} color="#0284c7" /> CV : <b>{app.cvName || 'Non fourni'}</b>
                        </span>
                        {app.cvUrl && (
                          <a className="action-btn" href={app.cvUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#0284c7', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
                            Télécharger
                          </a>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '5px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: themeStyles.text }}>
                          <FileText size={14} color="#0284c7" /> LM : <b>{app.lmName || 'Non fournie'}</b>
                        </span>
                        {app.lmUrl && (
                          <a className="action-btn" href={app.lmUrl} target="_blank" rel="noopener noreferrer" style={{ background: '#0284c7', color: 'white', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
                            Télécharger
                          </a>
                        )}
                      </div>
                    </div>

                    {(!app.status || app.status === 'En attente') ? (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button 
                          className="action-btn"
                          onClick={() => handleUpdateStatus(index, 'Accepté', 'Vous pouvez aller à l\'entretien.')}
                          style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <CheckCircle size={15} /> Convoquer à l'entretien
                        </button>
                        <button 
                          className="action-btn"
                          onClick={() => handleUpdateStatus(index, 'Refusé', 'Désolé, votre profil n\'a pas été retenu pour ce poste.')}
                          style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <XCircle size={15} /> Refuser / Non satisfaisant
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'inline-block', background: app.status === 'Accepté' ? '#dcfce7' : '#fee2e2', color: app.status === 'Accepté' ? '#15803d' : '#b91c1c', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', border: `1px solid ${app.status === 'Accepté' ? '#86efac' : '#fca5a5'}` }}>
                        Décision envoyée au candidat : {app.status}
                      </div>
                    )}

                    <p style={{ fontSize: '11px', color: themeStyles.subText, marginTop: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> Date d'envoi : {app.date}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}