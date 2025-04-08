import styles from "../styles/Account.module.css";
import UserCard from "../components/UserCard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DarkModeToggle from "../components/DarkModeToggle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Account({ isDarkMode = false }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [visuals, setVisuals] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch("https://seesound-backend.onrender.com/upload/my-visuals", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.visuals) {
          setVisuals([...data.visuals].reverse());
        }
      });
  }, []);

  return (
    <>
      <Header isDarkMode={darkMode} />
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <DarkModeToggle />
        </div>

        {visuals.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.emptyText}>You don’t have any music yet.</p>
            <p className={styles.emptyText}>
              Start by uploading your first track!
            </p>
          </div>
        ) : (
          <div className={styles.cardContainer}>
            {visuals.map((visual, index) => (
              <UserCard
                key={index}
                id={visual._id}
                title={visual.title}
                artist={visual.artist}
                videoUrl={visual.mp4Url}
              />
            ))}
          </div>
        )}
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default Account;
