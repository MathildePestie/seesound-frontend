import { useState, useEffect } from "react";
import styles from "../styles/Card.module.css";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Image from "next/image";
const ModalContent = dynamic(() => import("./ModalContent"), { ssr: false });

function Card({ title, artist, username, videoUrl, likes = [] }) {
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // L’utilisateur a-t-il déjà liké ?
    if (token && likes.includes(token)) {
      setLiked(true);
    }
  }, [likes, token]);

  const handleLike = () => {
    fetch("https://seesound-backend.onrender.com/upload/like-visual", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ videoUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLiked((prev) => !prev);
        setLikesCount(data.totalLikes);
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
            <Image
              src={
                darkMode ? "/images/play_blanc.svg" : "/images/play_noir.svg"
              }
              alt="Play"
              width={30}
              height={30}
              className={styles.icon}
              loading="lazy"
            />
          </div>
          <p
            className={`${styles.hoverText} ${
              darkMode ? styles.darkText : styles.lightText
            }`}
          >
            Play this track
          </p>
        </div>

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.artist}>{artist}</p>
        <p className={styles.username}>By {username}</p>

        <div className={styles.likes} onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 110 135"
            className={`${styles.thumbIcon} ${liked ? styles.liked : ""} ${
              darkMode ? styles.dark : styles.light
            }`}
            fill="currentColor"
          >
            <path d="M97.9,61.9c1.3,1.7,2.1,3.8,2.1,6.1,0,3.5-1.8,6.6-4.4,8.5.4,1.2.7,2.4.7,3.8,0,3.5-1.8,6.6-4.4,8.4.7,1.8.9,3.9.5,6-1,4.8-5.6,8-10.5,8h-29.7c-4.6,0-9.2-.8-13.5-2.4v-54.5c7.2-5.4,13.8-11.6,19.7-18.5l8.9-10.4c.6-.6,1.4-1.1,2.4-1.1,6.6,0,7.2,12.3,2.4,19.7l-6.6,10.1h24.4c5.6,0,10.2,4.6,10.2,10.3s-.8,4.4-2.1,6.1h0ZM13.3,104.2h18.4c1.8,0,3.3-1.5,3.3-3.3v-58.5c0-1.8-1.5-3.3-3.3-3.3H13.3c-1.8,0-3.3,1.5-3.3,3.3v58.5c0,1.8,1.5,3.3,3.3,3.3h0Z" />
          </svg>
          <span>{likesCount}</span>
        </div>
      </div>

      {showModal && (
        <ModalContent videoUrl={videoUrl} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default Card;
