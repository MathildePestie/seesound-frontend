import React from "react";
import styles from "../styles/About.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DarkModeToggle from "../components/DarkModeToggle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Conditions({ isDarkMode = false }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  console.log("Dark mode actif ? ", darkMode);

  return (
    <>
      <Header isDarkMode={darkMode} />
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.toggleWrapper}>
            <DarkModeToggle />
          </div>
        </div>
        <div className={styles.container}>
          <section className={styles.hero}>
            <div className={styles.textBlock}>
              <h1 className={styles.title}>Terms of Use</h1>
              <p className={styles.start}>
                By accessing and using SeeSound, you agree to comply with the
                following terms:
              </p>
              <div className={styles.paragraphe}>
                <span className={styles.number}>1. </span>
                <p className={styles.terms}>
                  **Community Guidelines** SeeSound is a community-driven
                  platform intended for creative expression. Users are strictly
                  prohibited from uploading or sharing any content that is
                  violent, hateful, offensive, defamatory, discriminatory, or
                  otherwise harmful. Inappropriate content will be removed
                  without notice and may result in account suspension or
                  termination.
                </p>
              </div>
              <div className={styles.paragraphe}>
                <span className={styles.number}>2. </span>
                <p className={styles.terms}>
                  **Copyright and Intellectual Property** SeeSound does not
                  remunerate artists featured in user-created visualizations.
                  You are solely responsible for obtaining all necessary rights
                  and permissions from the original authors before uploading any
                  audio content. Unauthorized use of copyrighted material is
                  strictly forbidden and may result in legal consequences.
                </p>
              </div>
              <div className={styles.paragraphe}>
                <span className={styles.number}>3. </span>
                <p className={styles.terms}>
                  **Liability** SeeSound shall not be held liable for content
                  uploaded by its users. The platform reserves the right to
                  delete, restrict, or moderate any content at its sole
                  discretion.
                </p>
              </div>
              <div className={styles.paragraphe}>
                <span className={styles.number}>4. </span>
                <p className={styles.terms}>
                  **User Responsibility** By using SeeSound, you commit to using
                  the service respectfully and lawfully. Any abuse or violation
                  of these terms may lead to permanent removal of your content
                  and/or your account. Let your creativity shine — but always
                  respect the rights of others.
                </p>
              </div>
            </div>
            <div className={styles.visualContainer}>
              <div className={styles.visuali}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fanimation-wave.gif?alt=media&token=c458fc33-aa30-45be-a3e2-6ecf4247f5ad"
                  alt="Music visual example"
                  className={styles.gif}
                />
              </div>
              <div className={styles.visuali}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fanimation-hypnotic2.gif?alt=media&token=1a38c0da-59b6-4880-8a68-3fe98b838487"
                  alt="Music visual example"
                  className={styles.gif}
                />
              </div>
              <div className={styles.visuali}>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fanimation-linear.gif?alt=media&token=ab7b9150-961b-415a-98a1-b99d3f464cd0"
                  alt="Music visual example"
                  className={styles.gif}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default Conditions;
