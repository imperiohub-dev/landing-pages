import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { initCookieConsent } from "./conf/cookieConsent";
import LandingPage from "./components/LandigPage";
import ChristmasMenu from "./components/ChristmasMenu";

function App() {
  useEffect(() => {
    initCookieConsent();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/menu" element={<ChristmasMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
