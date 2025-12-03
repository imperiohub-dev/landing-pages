import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandigPage";
import ChristmasMenu from "./components/ChristmasMenu";

function App() {
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
