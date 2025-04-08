import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/themeSlice";
import styles from "../styles/DarkModeToggle.module.css";

function DarkModeToggle() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; 

  return (
    <label className={styles.toggleSwitch}>
      <input
        type="checkbox"
        checked={darkMode}
        onChange={() => dispatch(toggleDarkMode())}
      />
      <span className={styles.slider}></span>
    </label>
  );
}

export default DarkModeToggle;