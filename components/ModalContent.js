import { useState } from 'react';
import styles from "../styles/Card.module.css"; // Assure-toi d'ajuster les styles en conséquence

function ModalContent({ videoUrl, onClose }) {
  const [isHovered, setIsHovered] = useState(false); // Gérer l'état du survol du curseur

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        
        <div
          className={styles.videoWrapper}
          onMouseEnter={() => setIsHovered(true)} // Quand la souris entre dans la vidéo
          onMouseLeave={() => setIsHovered(false)} // Quand la souris sort de la vidéo
        >
          <video
            key={videoUrl}
            src={videoUrl}
            controls={isHovered} // Les contrôles sont visibles seulement au survol
            autoPlay
            preload="auto"
            className={styles.video}
          />
        </div>
      </div>
    </div>
  );
}

export default ModalContent;
