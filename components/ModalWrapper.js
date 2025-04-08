import React from "react";
import styles from "../styles/ModalWrapper.module.css";
import VisualizerWave from "./VisualizerWave";
import VisualizerCircle from "./VisualizerCircle";
import VisualizerHypnotic from "./VisualizerHypnotic";
import VisualizerLinear from "./VisualizerLinear";

const visualizerMap = {
  linear: <VisualizerLinear />,
  circle: <VisualizerCircle />,
  hypnotic: <VisualizerHypnotic />,
  wave: <VisualizerWave />,
};

const ModalWrapper = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>×</button>
        {visualizerMap[type]}
      </div>
    </div>
  );
};

export default ModalWrapper;