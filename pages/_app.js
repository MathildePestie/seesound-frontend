import "../styles/globals.css";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>SeeSound</title>
        </Head>
        <DarkModeWrapper>
          <Component {...pageProps} />
        </DarkModeWrapper>
      </PersistGate>
    </Provider>
  );
}

function DarkModeWrapper({ children }) {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
}

export default App;