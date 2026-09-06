import React from 'react';
import { Users, Briefcase, FileText, Shield } from 'lucide-react';

export default function AdminView({ themeStyles, activeTab, jobs, usersList }) {
  
  // Compteurs globaux
  const totalUsers = usersList.length;
  const totalJobs = jobs.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Carte de résumé (Nombre d'offres et nombre d'utilisateurs inscrits) */}
      <div style={{ background: themeStyles.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${themeStyles.border}`, color: themeStyles.text }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Gestion et Statistiques Globales</h3>
        <p style={{ margin: 0, fontSize: '14px', color: themeStyles.subText }}>
          Nombre d'offres en ligne : <strong style={{ color: themeStyles.text }}>{totalJobs}</strong> | 
          Nombre d'utilisateurs inscrits : <strong style={{ color: themeStyles.text }}>{totalUsers}</strong>
        </p>
      </div>

      {/* Si l'admin clique sur l'onglet "Utilisateurs", on affiche la liste détaillée des noms et des comptes inscrits */}
      {activeTab === 'users' && (
        <div style={{ background: themeStyles.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${themeStyles.border}` }}>
          <h3 style={{ margin: '0 0 15px 0', color: themeStyles.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={20} color="#8b5cf6" /> Liste des utilisateurs inscrits sur TalentLink ({totalUsers})
          </h3>

          {usersList.length === 0 ? (
            <p style={{ color: themeStyles.subText, fontSize: '14px' }}>Aucun utilisateur inscrit pour le moment.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {usersList.map((user, index) => (
                <div 
                  key={index} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '12px 15px', 
                    borderRadius: '8px', 
                    background: themeStyles.inputBg, 
                    border: `1px solid ${themeStyles.border}` 
                  }}
                >
                  <div>
                    <div style={{ fontWeight: '600', color: themeStyles.text, fontSize: '14px' }}>
                      {user.first_name || user.last_name ? `${user.first_name || ''} ${user.last_name || ''}` : (user.company_name || 'Nom non renseigné')}
                    </div>
                    <div style={{ fontSize: '12px', color: themeStyles.subText }}>{user.email}</div>
                  </div>
                  <div>
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: 'bold', 
                      padding: '4px 8px', 
                      borderRadius: '6px', 
                      background: user.role === 'entreprise' ? '#e0f2fe' : '#ffe4e6',
                      color: user.role === 'entreprise' ? '#0369a1' : '#be123c',
                      textTransform: 'uppercase'
                    }}>
                      {user.role || 'candidat'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Affichage par défaut de l'administration (Tableau de bord) */}
      {activeTab === 'dashboard' && (
        <div style={{ background: themeStyles.cardBg, padding: '20px', borderRadius: '12px', border: `1px solid ${themeStyles.border}`, color: themeStyles.text }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Bienvenue dans l'Espace Administrateur</h4>
          <p style={{ fontSize: '14px', color: themeStyles.subText, margin: 0 }}>
            Utilisez la barre de navigation supérieure pour consulter les offres d'emploi, les candidatures ou la liste complète des utilisateurs inscrits.
          </p>
        </div>
      )}

    </div>
  );
}