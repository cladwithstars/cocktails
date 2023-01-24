import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyCocktails } from "./pages/MyCocktails";
import Navbar from "./components/Navbar";
import { About } from "./pages/About";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="saved-cocktails" element={<MyCocktails />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
