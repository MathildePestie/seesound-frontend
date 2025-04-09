import Footer from "../components/Footer";
import Header from "../components/Header";
import styles from "../styles/Contacts.module.css";
import { useSelector } from "react-redux";
import DarkModeToggle from "../components/DarkModeToggle";
import TrollFace from "../components/TrollFace";
import PhoneIcon from "../components/PhoneIcon";
import MailIcon from "../components/MailIcon";

function Contacts() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? styles.contactDark : styles.contactLight}>
      <Header isDarkMode={darkMode} />
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <div className={styles.toggleWrapper}>
            <DarkModeToggle />
          </div>
        </div>
        <div>
          <p className={styles.main}>A well-versed team</p>
        </div>
        <div className={styles.contacts}>
          <TrollFace className={styles.profile} />
          <p className={styles.description}>
            Hello ! I'm Tony and it will be a pleasure to not discuss with you !
          </p>
          <div className={styles.icons}>
            <PhoneIcon className={styles.icon} />
            <MailIcon className={styles.icon} />
          </div>
        </div>
        <div className={styles.contacts}>
          <TrollFace className={styles.profile} />
          <p className={styles.description}>
            Hi ! I'm Sabrina I don't really know why I'm here but I'm paid so
            that's okey...
          </p>
          <div className={styles.icons}>
            <PhoneIcon className={styles.icon} />
            <MailIcon className={styles.icon} />
          </div>
        </div>
        <div className={styles.contacts}>
          <TrollFace className={styles.profile} />
          <p className={styles.description}>
            Hello, I'm Peter I love music but I hate people so... Don't ask me
            anything... Please...
          </p>
          <div className={styles.icons}>
            <PhoneIcon className={styles.icon} />
            <MailIcon className={styles.icon} />
          </div>
        </div>
      </div>
      <Footer isDarkMode={darkMode} />
    </div>
  );
}

export default Contacts;
