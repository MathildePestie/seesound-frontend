import { useState } from "react";
import styles from "../styles/UserCard.module.css";
import { useSelector } from "react-redux";

function UserCard({ title, artist, videoUrl }) {
  const [showModal, setShowModal] = useState(false);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = localStorage.getItem("token");
  const [showConfirm, setShowConfirm] = useState(false);

  const confirmDelete = () => {
    fetch("https://seesound-backend.onrender.com/upload/delete-visual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ videoUrl }),
    })
      .then((res) => res.json())
      .then(() => {
        setShowConfirm(false);
        setShowModal(false);
        window.location.reload();
      });
  };

  return (
    <>
      <div>
        <div className={styles.card} onClick={() => setShowModal(true)}>
          <div className={styles.musicIcon}>
            <svg viewBox="0 0 110 135">
              <path
                fill="currentColor"
                d="M42.9,69.9c3.2,0,6.2.9,8.8,2.4V19.8c0-5.6,8.5-5.6,8.5,0v1.5c2.7,7.1,7.7,11.4,12.2,16.1,15.3,16.1,18.7,28.1-5.4,36.9,8.7-10.6,12.6-19.3-.7-33.4-2-2.1-4.1-4.3-6.1-6.8v52.9c0,15.3-18.6,23-29.4,12.2-10.8-10.9-3.1-29.5,12.2-29.5h0Z"
              />
            </svg>
          </div>

          <div className={styles.iconContainer}>
            <img
              src={
                darkMode ? "/images/play_blanc.svg" : "/images/play_noir.svg"
              }
              alt="Play"
              className={styles.icon}
            />
          </div>
          <p
            className={`${styles.hoverText} ${
              darkMode ? styles.darkText : styles.lightText
            }`}
          >
            Play your track
          </p>
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
        <p className={styles.username}>By you</p>
        <button
          className={styles.deleteButton}
          onClick={() => setShowConfirm(true)}
        >
          DELETE
        </button>
      </div>

      {showModal && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <video
              key={videoUrl}
              src={videoUrl}
              controls
              autoPlay
              className={styles.video}
            ></video>
          </div>
        </div>
      )}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p>Are you sure you want to delete this creation?</p>
            <div className={styles.confirmButtons}>
              <button onClick={confirmDelete}>Yes, delete</button>
              <button onClick={() => setShowConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserCard;
