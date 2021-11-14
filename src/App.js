import "./App.css";
import { Search } from "./components/Search";
import { Nav } from "./components/Nav";
import { TextSearch } from "./components/TextSearch";

function App() {
  return (
    <div className="App">
      <Nav />
      <Search />
      <TextSearch />
    </div>
  );
}

export default App;
