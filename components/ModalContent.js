import styles from "../styles/Card.module.css";

function ModalContent({ videoUrl, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <video
          key={videoUrl}
          src={videoUrl}
          controls
          autoPlay
          preload="auto"  // Pré-charger la vidéo pour un démarrage plus rapide
          className={styles.video}
          onError={() => alert("Erreur de lecture de la vidéo")}
        >
          <p>Votre navigateur ne prend pas en charge la lecture de vidéos MP4.</p>
        </video>
      </div>
    </div>
  );
}

export default ModalContent;