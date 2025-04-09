import styles from "../styles/Home.module.css";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";

function Home({ isDarkMode = false }) {
  const [selectedVisualizer, setSelectedVisualizer] = useState(null);

  return (
    <div className={`homeContainer ${styles.wrapper}`}>
      <div className={styles.headline}>
        <h1 className={styles.title}>How does your sound look like ?</h1>
        <div className={styles.toggleWrapper}>
        <DarkModeToggle />
        </div>
      </div>
      <div className={styles.justify}>
        <div className={styles.align}>
          <img src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Flinear.gif?alt=media&token=da90451f-c68f-440f-83a1-6bba1c511021" alt="linear-visualisation" className={styles.image} />
          <p className={styles.style}>linear</p>
        </div>
        <div className={styles.align}>
          <img src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fcircle.gif?alt=media&token=8fb34aa5-76d8-434c-81e7-c5e887f494c0" alt="circle-visualisation" className={styles.image} />
          <p className={styles.style}>circle</p>
        </div>
        <div className={styles.align}>
          <img src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fhypnotic.gif?alt=media&token=3903a042-7832-48a2-9627-b063d70a55f4" alt="hypnotic-visualisation" className={styles.image} />
          <p className={styles.style}>hypnotic</p>
        </div>
        <div className={styles.align}>
          <img src="https://firebasestorage.googleapis.com/v0/b/seesound-d884f.firebasestorage.app/o/videos%2Fwave.gif?alt=media&token=05e14925-865a-40d5-a965-bb77a053ed4a" alt="wave-visualisation" className={styles.image} />
          <p className={styles.style}>wave</p>
        </div>
      </div>
      <div>
        <p className={styles.text}>
          Whether for work or leisure, express your creativity <br />
          and let your favorite music come to life before your eyes <br />
          by selecting the viewer that suits you best.
        </p>
      </div>

      <div className={styles.visualizerChoice}>
        {["linear", "circle", "hypnotic", "wave"].map((type) => (
          <button
            key={type}
            className={`${styles.visualizerButton} visualizer-button`}
            onClick={() => setSelectedVisualizer(type)}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <ModalWrapper
        isOpen={selectedVisualizer !== null}
        onClose={() => setSelectedVisualizer(null)}
        type={selectedVisualizer}
      />
    </div>
  );
}

export default Home;
