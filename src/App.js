import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Search } from "./components/Search";
import { Nav } from "./components/Nav";
import { MyCocktails } from "./components/MyCocktails";
import Navbar from "./components/Navbar";
import { About } from "./components/About";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="saved-cocktails" element={<MyCocktails />} />
          <Route path="about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
