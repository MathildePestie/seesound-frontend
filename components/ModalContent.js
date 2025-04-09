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
          preload="none"
          className={styles.video}
        ></video>
      </div>
    </div>
  );
}

export default ModalContent;
