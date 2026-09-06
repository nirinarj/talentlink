import React from 'react';

function JobCard({ job }) {
    return (
        <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '5px' }}>
            <h3>{job.title}</h3>
            <p><strong>Entreprise :</strong> {job.company}</p>
            <p><strong>Lieu :</strong> {job.location}</p>
            <p><strong>Description :</strong> {job.description}</p>
            
            {/* C'est ici qu'on affiche le nombre de candidats récupéré de Django */}
            <p style={{ color: '#007bff', fontWeight: 'bold' }}>
                👥 Nombre de candidats : {job.applications_count}
            </p>
        </div>
    );
}

export default JobCard;