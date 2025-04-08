import styles from "../styles/Footer.module.css";

import Link from "next/link";

function Footer({ isDarkMode }) {
  return (
    <footer className={isDarkMode ? styles.footerDark : styles.footerLight}>
      <div className={styles.wrapper}>
        <div className={styles.align}>
          <p
            className={`${isDarkMode ? styles.textDark : styles.textLight} ${
              styles.copyright
            }`}
          >
            © 2025 SeeSound.com
          </p>
          <div className={styles.linkContainer}>
            <Link href="./about">
              <p className={isDarkMode ? styles.textDark : styles.textLight}>
                About
              </p>
            </Link>
            <Link href="./contacts">
              <p className={isDarkMode ? styles.textDark : styles.textLight}>
                Contacts
              </p>
            </Link>
            <Link href="./conditions">
            <p className={isDarkMode ? styles.textDark : styles.textLightLast}>
              Conditions
            </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
