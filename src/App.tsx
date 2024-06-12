import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EstadoEmocional from "./pages/EstadoEmocional";
import Agua from "./pages/Agua";
import Recetas from "./pages/Recetas";
import Perfil from "./pages/Perfil";
import Ejercicio from "./pages/Ejercicio";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sueño from "./pages/Sueño";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/EstadoEmocional" element={<EstadoEmocional />}></Route>
          <Route path="/Agua" element={<Agua />}></Route>
          <Route path="/Recetas" element={<Recetas />}></Route>
          <Route path="/Perfil" element={<Perfil />}></Route>
          <Route path="/Ejercicio" element={<Ejercicio/>}></Route>
          <Route path="/Sueño" element={<Sueño/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
