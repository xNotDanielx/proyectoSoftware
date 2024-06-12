import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/Group 3 (1).png";
export default function Navbar_Home() {
  return (
    <header className="flex items-center justify-between px-12">
      <div className="flex items-center">
        <div>
            <NavLink to={"/"}><img className="w-16" src={logo} alt="logo" /></NavLink>
        </div>
        <div className="flex relative">
          <h1 className="text-[#3A8EF6] font-bold">Healify</h1>
          <img
            className="w-7 h-7 absolute left-12 bottom-1"
            src={logo2}
            alt="group"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <NavLink className={"bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg py-1 px-3 text-white"} to={"/Login"}>Iniciar sesion</NavLink>
        <NavLink className={"bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg py-1 px-3 text-white"} to={"/Register"}>Registrar</NavLink>
      </div>
    </header>
  );
}
