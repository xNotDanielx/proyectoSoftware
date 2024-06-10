import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dasboard from "./pages/Dasboard";
import Agua from "./pages/Agua";
import Recetas from "./pages/Recetas";
import Perfil from "./pages/Perfil";
import Seguimiento from "./pages/Ejercicio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Dasboard" element={<Dasboard />}></Route>
          <Route path="/Agua" element={<Agua />}></Route>
          <Route path="/Recetas" element={<Recetas />}></Route>
          <Route path="/Perfil" element={<Perfil />}></Route>
          <Route path="/Seguimiento" element={<Seguimiento/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
