import "./App.css";
import FetchData from "./components/TMDBFetcher/TMDBFetcher.jsx";
import Header from "./components/Atoms/Header/Header.jsx";
// import Fetch from "./components/FetchData/Fetch.jsx";

function App() {
  return (
    <>
      <Header />
      <FetchData />
    </>
  );
}

export default App;
