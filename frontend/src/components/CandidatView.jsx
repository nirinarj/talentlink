import { useState } from 'react';
import { Briefcase, Send, FileText, CheckCircle, XCircle, Clock, Lock, MapPin, DollarSign, Calendar } from 'lucide-react';

export default function CandidatView({ themeStyles, activeTab, jobs, currentUser, applications, setApplications }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [cvFile, setCvFile] = useState(null);
  const [lmFile, setLmFile] = useState(null);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    const newApplication = {
      jobTitle: selectedJob.title,
      company: selectedJob.company || 'Entreprise',
      candidateEmail: currentUser?.email || 'candidat@talentlink.mg',
      cvName: cvFile ? cvFile.name : 'CV_par_defaut.pdf',
      cvUrl: cvFile ? URL.createObjectURL(cvFile) : '#',
      lmName: lmFile ? lmFile.name : 'LM_par_defaut.pdf',
      lmUrl: lmFile ? URL.createObjectURL(lmFile) : '#',
      status: 'En attente',
      feedbackMessage: '',
      date: new Date().toLocaleDateString()
    };

    setApplications([...applications, newApplication]);
    alert("Candidature envoyée avec succès !");
    setSelectedJob(null);
    setCvFile(null);
    setLmFile(null);
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

      {/* 1. SECTION TABLEAU DE BORD (OU ACCUEIL CANDIDAT) */}
      {activeTab === 'dashboard' && (
        <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>Espace Candidat</h2>
          <p style={{ color: themeStyles.subText, marginBottom: '20px' }}>Bienvenue, <b>{currentUser?.firstName || currentUser?.email}</b>. Consultez les offres disponibles et suivez l'état de vos candidatures en temps réel.</p>
        </div>
      )}

      {/* 2. SECTION OFFRES */}
      {activeTab === 'offres' && (
        <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Briefcase size={20} color="#f43f5e" /> Offres d'emploi disponibles
          </h2>

          {selectedJob ? (
            /* Formulaire de candidature pour une offre sélectionnée */
            <div style={{ background: themeStyles.bg, padding: '20px', borderRadius: '10px', border: `1px solid ${themeStyles.border}` }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Postuler à : {selectedJob.title}</h3>
              <p style={{ fontSize: '13px', color: themeStyles.subText, marginBottom: '20px' }}>{selectedJob.company} • {selectedJob.location}</p>

              <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Votre CV (PDF / Word)</label>
                  <input type="file" onChange={(e) => setCvFile(e.target.files[0])} required style={{ width: '100%', padding: '8px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Votre Lettre de motivation (PDF / Word)</label>
                  <input type="file" onChange={(e) => setLmFile(e.target.files[0])} required style={{ width: '100%', padding: '8px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.inputBg, color: themeStyles.text, boxSizing: 'border-box' }} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button className="action-btn" type="submit" style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Envoyer ma candidature</button>
                  <button type="button" onClick={() => setSelectedJob(null)} style={{ background: 'transparent', color: themeStyles.text, border: `1px solid ${themeStyles.border}`, padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Annuler</button>
                </div>
              </form>
            </div>
          ) : (
            /* Liste des offres */
            jobs.length === 0 ? (
              <p style={{ color: themeStyles.subText, fontSize: '14px' }}>Aucune offre d'emploi pour le moment.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {jobs.map((job, index) => (
                  <div key={index} style={{ padding: '15px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', background: themeStyles.bg, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px' }}>{job.title}</h4>
                      <p style={{ fontSize: '13px', color: '#f43f5e', fontWeight: '600', marginBottom: '6px' }}>{job.company || 'Entreprise'}</p>
                      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: themeStyles.subText }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {job.location}</span>
                        {job.salary && <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><DollarSign size={13} /> {job.salary}</span>}
                      </div>
                      <p style={{ fontSize: '13px', color: themeStyles.subText, marginTop: '8px' }}>{job.description}</p>
                    </div>
                    <button className="action-btn" onClick={() => setSelectedJob(job)} style={{ background: '#f43f5e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                      Postuler
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      )}

      {/* 3. SECTION MES CANDIDATURES (AVEC PROTECTION ET CADENAS SI CE N'EST PAS UN CANDIDAT) */}
      {activeTab === 'candidatures' && (
        <div>
          {currentUser?.role !== 'candidat' ? (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '40px', borderRadius: '12px', border: `1px solid ${themeStyles.border}`, textAlign: 'center' }}>
              <div style={{ background: '#fee2e2', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                <Lock size={30} color="#ef4444" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Accès refusé</h2>
              <p style={{ color: themeStyles.subText, fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                Vous n'avez pas l'accès pour entrer. Cette section est réservée aux candidats.
              </p>
            </div>
          ) : (
            <div style={{ background: themeStyles.cardBg, color: themeStyles.text, padding: '25px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={20} color="#f43f5e" /> Mes candidatures envoyées
              </h2>

              {applications.filter(app => app.candidateEmail === currentUser?.email).length === 0 ? (
                <p style={{ color: themeStyles.subText, fontSize: '14px' }}>Vous n'avez encore envoyé aucune candidature.</p>
              ) : (
                applications
                  .filter(app => app.candidateEmail === currentUser?.email)
                  .map((app, index) => (
                    <div key={index} style={{ padding: '15px', border: `1px solid ${themeStyles.border}`, borderRadius: '8px', marginBottom: '15px', background: themeStyles.bg }}>
                      <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '15px' }}>
                        <Briefcase size={16} color="#f43f5e" /> {app.jobTitle}
                      </p>
                      <p style={{ fontSize: '13px', color: themeStyles.subText, marginBottom: '10px' }}>Entreprise : <b>{app.company}</b></p>

                      {/* Statut de la candidature */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600' }}>Statut :</span>
                        {app.status === 'Accepté' ? (
                          <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #86efac' }}>
                            <CheckCircle size={14} /> Convoqué à l'entretien
                          </span>
                        ) : app.status === 'Refusé' ? (
                          <span style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #fca5a5' }}>
                            <XCircle size={14} /> Non retenu / Refusé
                          </span>
                        ) : (
                          <span style={{ background: '#fef9c3', color: '#a16207', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid #fde047' }}>
                            <Clock size={14} /> En attente de traitement
                          </span>
                        )}
                      </div>

                      {/* Message de retour de l'entreprise si disponible */}
                      {app.feedbackMessage && (
                        <div style={{ fontSize: '13px', background: themeStyles.cardBg, padding: '10px', borderRadius: '6px', border: `1px solid ${themeStyles.border}`, color: themeStyles.text, marginTop: '8px' }}>
                          <b>Message de l'entreprise :</b> {app.feedbackMessage}
                        </div>
                      )}

                      <p style={{ fontSize: '11px', color: themeStyles.subText, marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} /> Postulé le : {app.date}
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