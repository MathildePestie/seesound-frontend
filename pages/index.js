import { useEffect } from "react";
import { useSelector } from "react-redux";
import Home from "../components/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Index() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  // 👉 applique dark-mode directement sur <body>
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <>
      <Header isDarkMode={darkMode} />
      <div>
        <Home />
      </div>
      <Footer isDarkMode={darkMode} />
    </>
  );
}

export default Index;
