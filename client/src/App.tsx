import "./App.css";
import Home from "./pages/Home";
import AsideMenu from "./components/AsideMenu";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import History from "./pages/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <div id="App">
        <AsideMenu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
