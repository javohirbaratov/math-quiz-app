import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./components/Start.js";
import Login from "./components/Login.js";
import Regitr from "./components/Registr.js";
import Main from "./components/Main.js";
import Settings from "./components/Settings.js";
import Theory from "./components/Theory.js";
import Wiew from "./components/Wiew.js";
import Tests from "./components/Tests.js";
import Card from "./components/Card.js";
import Media from "./components/Media.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/registr" element={<Regitr/>}></Route>
          <Route path="/main" element={<Main/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/theory" element={<Theory/>}/>
          <Route path="/card" element={<Card/>}/>
          <Route path="/tests/:degree" element={<Tests/>}/>
          <Route path="/view/:file" element={<Wiew/>} />
          <Route path="/media" element={<Media/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
