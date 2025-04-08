import styles from "../styles/Gallery.module.css";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Header from "../components/Header";
import DarkModeToggle from "../components/DarkModeToggle";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Gallery({ isDarkMode = false }) {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [visuals, setVisuals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    fetch("https://seesound-backend.onrender.com/upload/all-visuals", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.visuals) {
          // On les affiche en reverse pour voir la dernière création en premier
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
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {visuals.map((visual, index) => (
            <Card
              key={index}
              id={visual._id}
              title={visual.title}
              artist={visual.artist}
              username={visual.username || "Anonyme"}
              videoUrl={visual.mp4Url}
              likes={visual.likes}
            />
          ))}
        </div>
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default Gallery;
