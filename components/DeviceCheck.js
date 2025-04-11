import React, { useEffect, useState } from "react";
import styles from "../styles/DeviceCheck.module.css";

const DeviceCheck = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (isMobile) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "black", // un fond semi-transparent
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999, // Assure-toi que le message reste au-dessus de tout le contenu
          flexDirection: "column",
          color: "white",
          fontSize: "1.5rem",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "2rem" }}>
          Le site n'est pas accessible sur mobile
        </h2>
        <p>
          Veuillez accéder au site sur un ordinateur pour une meilleure
          expérience.
        </p>
        <div className={styles.musicIcon}>
          <svg viewBox="0 0 110 135">
            <path
              fill="currentColor"
              d="M42.9,69.9c3.2,0,6.2.9,8.8,2.4V19.8c0-5.6,8.5-5.6,8.5,0v1.5c2.7,7.1,7.7,11.4,12.2,16.1,15.3,16.1,18.7,28.1-5.4,36.9,8.7-10.6,12.6-19.3-.7-33.4-2-2.1-4.1-4.3-6.1-6.8v52.9c0,15.3-18.6,23-29.4,12.2-10.8-10.9-3.1-29.5,12.2-29.5h0Z"
            />
          </svg>
        </div>
      </div>
    );
  }

  return null; // Si ce n'est pas un mobile, ne rien afficher
};

export default DeviceCheck;
