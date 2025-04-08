import React, { useState } from "react";
import styles from "../styles/AuthModal.module.css";

const AuthModal = ({ onClose, onAuthSuccess, isDarkMode }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignup ? "/signup" : "/signin";

    try {
      const response = await fetch(`https://seesound-backend.onrender.com/users${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      console.log("🛰️ Status réponse :", response.status);

      const data = await response.json();
      console.log("🔁 Données renvoyées :", data);

      if (data.token) {
        setFeedback(
          isSignup ? "Account created successfully!" : "Successfully signed in!"
        );
        onAuthSuccess(data.token);
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      console.error("❌ Erreur côté frontend :", err);
      setError("Erreur de connexion au serveur");
    }
  };

  const themeClass = isDarkMode ? styles.dark : styles.light;

  const [isHoveredSubmit, setIsHoveredSubmit] = useState(false);
  const [isHoveredClose, setIsHoveredClose] = useState(false);

  const submitButtonStyle = {
    backgroundColor: isHoveredSubmit
      ? isDarkMode
        ? "black"
        : "white"
      : isDarkMode
      ? "white"
      : "black",
    color: isHoveredSubmit
      ? isDarkMode
        ? "white"
        : "black"
      : isDarkMode
      ? "black"
      : "white",
    border: `1px solid ${
      isHoveredSubmit
        ? isDarkMode
          ? "white"
          : "black"
        : isDarkMode
        ? "black"
        : "white"
    }`,
    transition: "all 0.3s ease-in-out",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "550",
    marginTop: "30px",
    fontFamily: "helvetica",
  };

  const closeButtonStyle = {
    ...submitButtonStyle,
    backgroundColor: isHoveredClose
      ? isDarkMode
        ? "black"
        : "white"
      : isDarkMode
      ? "white"
      : "black",
    color: isHoveredClose
      ? isDarkMode
        ? "white"
        : "black"
      : isDarkMode
      ? "black"
      : "white",
    border: `1px solid ${
      isHoveredClose
        ? isDarkMode
          ? "white"
          : "black"
        : isDarkMode
        ? "black"
        : "white"
    }`,
  };

  return (
    <div className={`${styles.modalOverlay} ${themeClass}`}>
      <div className={styles.modalBox}>
        <h2 className={styles.h2}>
          {isSignup ? "Create an account" : "Connection"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          {isSignup && (
            <>
              <input
                className={styles.input}
                type="text"
                name="firstname"
                placeholder="Firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <input
                className={styles.input}
                type="text"
                name="lastname"
                placeholder="Name"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            className={styles.input}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            type="submit"
            className={styles.submitButton}
            style={submitButtonStyle}
            onMouseEnter={() => setIsHoveredSubmit(true)}
            onMouseLeave={() => setIsHoveredSubmit(false)}
          >
            {isSignup ? " Sign Up" : " Sign In"}
          </button>
        </form>
        {feedback && (
          <div
            className={`${styles.feedbackModal} ${
              isDarkMode ? styles.feedbackModalDark : styles.feedbackModalLight
            }`}
          >
            <p>{feedback}</p>
          </div>
        )}
        <p className={styles.switchText}>
          {isSignup ? "Already an account ?" : "Not an account yet ?"}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? " Sign In" : " Sign Up"}
          </span>
        </p>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          style={closeButtonStyle}
          onMouseEnter={() => setIsHoveredClose(true)}
          onMouseLeave={() => setIsHoveredClose(false)}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
