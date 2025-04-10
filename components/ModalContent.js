import { useEffect } from "react";
import styles from "../styles/Card.module.css";
import Plyr from "plyr";

function ModalContent({ videoUrl, onClose }) {
  useEffect(() => {
    // Initialiser Plyr avec des options personnalisées
    const player = new Plyr("#plyr-video", {
      autoplay: true,
      controls: [
      ],
      tooltips: { controls: true },
    });

    // Appliquer des styles pour cacher les contrôles par défaut
    const plyrControls = document.querySelectorAll(".plyr__control");
    plyrControls.forEach((control) => {
      control.style.opacity = "0"; // Masquer les contrôles au départ
      control.style.transition = "opacity 0.3s"; // Transition en douceur
    });

    // Appliquer un style de positionnement discret au bas de la vidéo
    const videoContainer = document.querySelector(".plyr__video-embed");
    if (videoContainer) {
      videoContainer.style.position = "relative";
      videoContainer.style.bottom = "0"; // Placer la vidéo en bas
    }

    // Montrer les contrôles au survol
    const videoElement = document.querySelector("#plyr-video");
    if (videoElement) {
      videoElement.addEventListener("mousemove", () => {
        plyrControls.forEach((control) => {
          control.style.opacity = "1"; // Rendre les contrôles visibles lors du survol
        });
      });

      videoElement.addEventListener("mouseleave", () => {
        plyrControls.forEach((control) => {
          control.style.opacity = "0"; // Cacher les contrôles après 2 secondes sans survol
        });
      });
    }

    return () => {
      player.destroy(); // Détruire le lecteur à la fermeture du modal
    };
  }, [videoUrl]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <video
          id="plyr-video"
          src={videoUrl}
          className={styles.video}
        ></video>
      </div>
    </div>
  );
}

export default ModalContent;