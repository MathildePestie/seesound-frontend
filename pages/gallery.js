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
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <>
      <Header isDarkMode={darkMode} />
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.toggleWrapper}>
            <DarkModeToggle />
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
            justifyItems: "center",
            padding: "20px",
          }}
        >
          {isLoading ? (
            <p className={styles.empty}>
              Our masterpieces will appear soon, be patient!
            </p>
          ) : (
            visuals.map((v, index) => (
              <Card
                key={v._id || index} // Préférence pour v._id
                title={v.title}
                artist={v.artist}
                username={v.username || "Anonyme"}
                videoUrl={v.mp4Url}
                likes={v.likes}
              />
            ))
          )}
        </div>
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default Gallery;
