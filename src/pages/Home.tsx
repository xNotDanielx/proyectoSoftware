import Navbar_Home from "../components/navbarMain";
import group20 from "../assets/Group 20.png";
import imgprincipal from "../assets/img-principal.png";
import Heart from "../assets/Heart Rate.png";
import Food from "../assets/diet 1.png";
import Water from "../assets/water-bottle.png";
import Sleep from "../assets/sleeping.png";
import Carousel from "../components/carouselFood";
import logo from "../assets/logo.png";
export default function Home() {
  return (
    <>
      <Navbar_Home />
      <div className="flex justify-center items-center">
        <div className="w-1/3">
          <div className="flex gap-2 items-center justify-center border rounded-xl px-1 py-1 w-32 mb-8">
            <span className="text-xs font-semibold text-neutral-700 text-opacity-80">
              Health Matters
            </span>
            <img className="w-6 h-4" src={group20} alt="" />
          </div>
          <h1 className="text-4xl font-semibold mb-6">
            <span className="text-blue-600">Solución de un solo paso </span>
            <span>para todas sus necesidades dietéticas.</span>
          </h1>
          <p className="text-gray-500 text-xl">
            Que cuides de ti mismo no debería ser una tarea difícil. Nosotros te
            ayudamos a que sea más fácil.
          </p>
        </div>
        <div className="w-2/5">
          <img src={imgprincipal} alt="doctor" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <span className="text-blue-500 font-semibold text-2xl mb-9">
          CARACTERÍSTICAS QUE OFRECEMOS
        </span>
        <div className="flex w-4/5 gap-9 justify-center items-center">
          <div>
            <div className="flex">
              <h2 className="font-bold text-xl w-3/4">
                Llevar el control de los siguientes aspectos de tu vida
              </h2>
              <img className="w-7 h-7" src={Heart} alt="" />
            </div>
            <p className="text-gray-500">
              Aqui queremos de que lleves un control de tu vida en tu
              sueño,comidas y el agua.
            </p>
          </div>
          <div className="flex flex-col xl:flex-row">
            <div className="border-r">
              <img className="w-10" src={Food} alt="" />
              <h3>Recomendacion de comida</h3>
              <p>
                Brindamos recomendaciones de alimentos de acuerdo con sus
                requerimientos calóricos.
              </p>
            </div>
            <div className="border-r pl-2">
              <img className="w-10" src={Water} alt="" />
              <h3>Recomendacion del Agua</h3>
              <p>
                Llevar un control de cuantas veces bebiste agua en el dia y que
                quede registrado.
              </p>
            </div>
            <div className="pl-2">
              <img className="w-10" src={Sleep} alt="" />
              <h3>Control de tu sueño</h3>
              <p>
                Llevar un control del sueño que has tenido y recomendar como
                mejorarlo.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-36">
        <h3 className="text-blue-600 font-semibold">TEMAS DE AYUDA</h3>
        <h2 className="text-xl font-semibold">MEJORA TU ESTILO DE VIDA</h2>
        <div className="flex justify-center items-center">
          <Carousel />
        </div>
      </div>
      <div className="px-32">
        <div>
          <img className="w-32" src={logo} alt="" />
        </div>
        <div className="flex justify-between text-blue-600">
          <p>Copyright © 2022 </p>
          <p>All Rights Reserved | Terms and Conditions | Privacy Policy</p>
        </div>
      </div>
    </>
  );
}
