import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import logo2 from "../assets/Group 3 (1).png";
import estadoEmocional from "../assets/pensamiento-positivo.png"
import ejericio from "../assets/ejercicio.png";
import agua from "../assets/agua.png";
import recipes from "../assets/recipes.png";
import sueño from "../assets/sueño.png";
import perfil from "../assets/perfil.png";
import salir from "../assets/salir.png";



export default function Sidebar() {
  return (
    <aside className="w-64 border h-screen shadow-2xl" aria-label="Sidebar">
      <div className="flex items-center">
        <div>
            <img className="w-24" src={logo} alt="logo" />
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
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <li>
            <NavLink to="/estadoemocional" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={estadoEmocional} alt="" className="w-6 h-6"/>
              <span className="ml-3">Estado Emocional</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/ejercicio" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={ejericio} alt="" className="w-6 h-6"/>
              <span className="ml-3">Ejercicio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/agua" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={agua} alt="" className="w-6 h-6"/>
              <span className="ml-3">Agua</span>
            </NavLink>
          </li>          
          <li>
            <NavLink to="/recetas" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={recipes} alt="" className="w-6 h-6"/>
              <span className="ml-3">Recetas</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/sueño" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={sueño} alt="" className="w-6 h-6"/>
              <span className="ml-3">Sueño</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/perfil" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700 mt-[790px]">
              <img src={perfil} alt="" className="w-6 h-6"/>
              <span className="ml-3">Perfil</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-500 dark:hover:bg-gray-700">
              <img src={salir} alt="" className="w-6 h-6"/>
              <span className="ml-3">Salir</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
