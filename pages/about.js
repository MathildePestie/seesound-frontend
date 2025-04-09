import React from "react";
import styles from "../styles/About.module.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DarkModeToggle from "../components/DarkModeToggle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HomeIcon from "../components/HomeIcon";
import AccountIcon from "../components/AccountIcon";
import GalleryIcon from "../components/GalleryIcon";

function About({ isDarkMode = false }) {
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
              <h1 className={styles.title}>Welcome to SeeSound</h1>
              <p className={styles.intro}>
                SeeSound is an application that brings your favorite songs to
                life by illustrating their sounds through various visualizers.
                Easy to use, SeeSound will delight music lovers as well as fans
                of hypnotic and psychedelic visual effects.
              </p>
            </div>
            <div className={styles.visual}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fanimation-hypnotic.gif?alt=media&token=cdf93ed2-4989-4677-ad6f-78375e787da8"
                alt="Music visual example"
                className={styles.gif}
              />
            </div>
          </section>
          <section className={styles.steps}>
            <div className={styles.step}>
            <AccountIcon
                className={styles.stepIcon}
                style={{ color: darkMode ? "white" : "black" }}
              />
              <div className={styles.stepText}>
                <h2>1. Log in</h2>
                <p>
                  Click on the account icon in the header to open the login
                  modal. You can sign in or create a new account in just a few
                  clicks.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <HomeIcon
                className={styles.stepIcon}
                style={{ color: darkMode ? "white" : "black" }}
              />
              <div className={styles.stepText}>
                <h2>2. Create a visualization</h2>
                <p>
                  At the bottom of the Home page, choose one of our 4 effects:
                  Linear, Circle, Hypnotic or Wave. Click on one, fill in your
                  song's title, artist and upload your mp3. Your audio will play
                  while the visualization is processing. When the vinyl and
                  loading bar disappear, your MP4 file is ready!
                </p>
              </div>
            </div>

            <div className={styles.step}>
            <AccountIcon
                className={styles.stepIcon}
                style={{ color: darkMode ? "white" : "black" }}
              />
              <div className={styles.stepText}>
                <h2>3. Access your creations</h2>
                <p>
                  Go back to the account icon to view your personal creations.
                  You can play or delete them as you like.
                </p>
              </div>
            </div>

            <div className={styles.step}>
            <GalleryIcon
                className={styles.stepIcon}
                style={{ color: darkMode ? "white" : "black" }}
              />
              <div className={styles.stepText}>
                <h2>4. Explore the community</h2>
                <p>
                  Click on the gallery icon to discover all the visualizations
                  created by users since day one. Get inspired and enjoy the
                  music!
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default About;
