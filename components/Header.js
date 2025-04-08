import React, { useState, useEffect } from "react";
import styles from "../styles/Header.module.css";
import AuthModal from "./AuthModal";
import { useRouter } from "next/router";
import Link from "next/link";

function Header({ isDarkMode }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setUserToken(savedToken);
    }
  }, []);

  const handleAuthSuccess = (token) => {
    setUserToken(token);
    localStorage.setItem("token", token);
  };

  const handleUserClick = () => {
    if (!userToken) {
      setShowModal(true);
    } else {
      router.push("/account");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserToken(null);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.centered}>
            <img
              src={
                isDarkMode
                  ? "/images/logo_Seesound_blanc.png"
                  : "/images/logo_Seesound_noir.png"
              }
              alt="seeSound"
              className={styles.logo}
            />
            <div className={styles.iconContainer}>
              <div className={styles.subtitle}>
              <Link href="./">
                <img
                  src={
                    isDarkMode ? "/images/sound_blanc.svg" : "/images/sound.svg"
                  }
                  alt="Sound Icon"
                  className={styles.icon}
                />
              </Link>
              <p className={styles.legend}>Home</p>
              </div>
              <div className={styles.subtitle}>
              <Link href="./gallery">
                <img
                  src={
                    isDarkMode
                      ? "/images/headphone_blanc.svg"
                      : "/images/headphone.svg"
                  }
                  alt="Playlist Icon"
                  className={styles.icon}
                />
              </Link>
              <p className={styles.legend}>Gallery</p>
              </div>
              <div className={styles.subtitle}>
              <img
                src={isDarkMode ? "/images/user_blanc.svg" : "/images/user.svg"}
                alt="User Icon"
                className={styles.icon}
                onClick={handleUserClick}
              />
              <p className={styles.legend}>Account</p>
              </div>

              {userToken && (
                <div className={styles.subtitle}>
                <img
                  src={
                    isDarkMode
                      ? "/images/logout_blanc.svg"
                      : "/images/logout.svg"
                  }
                  alt="Logout Icon"
                  className={styles.iconReduce}
                  onClick={handleLogout}
                />
                 <p className={styles.legend}>Logout</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      {showModal && (
        <AuthModal
          onClose={() => setShowModal(false)}
          onAuthSuccess={handleAuthSuccess}
          isDarkMode={isDarkMode}
        />
      )}
    </>
  );
}

export default Header;
