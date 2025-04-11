import React, { useEffect, useState } from 'react';

const DeviceCheck = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Vérifie la largeur de l'écran à l'ouverture de la page
    const checkDevice = () => {
      if (window.innerWidth <= 768) { // On définit ici une largeur pour les mobiles (ex : 768px)
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice(); // Vérifie au chargement
    window.addEventListener('resize', checkDevice); // Réajuste lors du redimensionnement de la fenêtre

    return () => {
      window.removeEventListener('resize', checkDevice); // Nettoyage du listener
    };
  }, []);

  if (isMobile) {
    // Affiche un message ou fais une redirection si l'utilisateur est sur mobile
    return (
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffcccb' }}>
        <h2>Le site n'est pas accessible sur mobile</h2>
        <p>Veuillez accéder au site sur un ordinateur pour une meilleure expérience.</p>
      </div>
    );
  }

  return null; // Si ce n'est pas un mobile, ne rien afficher
};

export default DeviceCheck;