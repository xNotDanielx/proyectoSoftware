import { useState } from 'react';
import Navbar_Menu from "@/components/navbarMenu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Datos de las dietas y sus platillos
const dietas = [
  { 
    id: '1',
    nombre: 'Perder Peso', 
    platillos: [
      { nombre: 'Ensalada de pollo', descripcion: 'Ensalada ligera de pollo con vegetales frescos', imagen: "ensalada_pollo.jpg", ingredientes: ['pechuga de pollo', '1½ litros de agua', 'sal al gusto', '2 zanahorias', '½ pieza de pepino', '1 taza de lechuga rallada', '2 jitomates chicos', '½ taza de chícharo cocido', '1 chile serrano', '1 cucharada sopera de mayonesa', 'sal y pimienta al gusto'], enlace: 'https://www.recetasgratis.net/receta-de-ensalada-de-pollo-deshebrado-76059.html'},
      { nombre: 'Sopa de verduras', descripcion: 'Sopa nutritiva de verduras variadas', imagen: 'sopa_verduras.jpg', ingredientes: ['1 col', '1 rama de apio', '1 cebolla', '2 puerros', '2 zanahorias', '1 bolsa de acelgas o espinacas', '1 chorro de aceite de oliva', '1 pizca de pimienta', '1 pastilla de caldo (opcional)', '1 pizca de sal'], enlace: 'https://www.recetasgratis.net/receta-de-sopa-de-verduras-para-adelgazar-73985.html'},
      { nombre: 'Pechuga a la plancha', descripcion: 'Pechuga de pollo a la plancha con especias', imagen: 'pechuga_plancha.jpg', ingredientes: ['2 filetes de Pechuga de pollo', '1 Limón', '1 pizca de Pimienta', '1 diente de Ajo', '1 pizca de Orégano', '1 pizca de Hierbas provenzales'], enlace: 'https://www.recetasgratis.net/receta-de-filete-de-pechuga-a-la-plancha-59314.html'}
    ]
  },
  { 
    id: '2',
    nombre: 'Ganar Peso', 
    platillos: [
      { nombre: 'Batido de proteínas', descripcion: '20 recetas de batidos de proteinas', imagen: 'batido_proteinas.jpg', ingredientes: [], enlace: 'https://www.recetasgratis.net/articulo-batidos-para-subir-de-peso-76031.html'},
      { nombre: 'Arroz con pollo', descripcion: 'Arroz con pollo y vegetales', imagen: 'arroz_pollo.jpg', ingredientes: ['1 pechuga de pollo', '225 gramos de arroz', '1 cucharada postre de achiote en polvo', '1 chorro de aceite vegetal', '1 zanahoria mediana', '150 gramos de vainita', '1 taza de arvejas', '1 pimiento rojo mediano', '3 cucharadas soperas de pasta de tomate', '1 cucharada postre de ajo molido', '1 cebolla blanca grande', '100 gramos de habas'], enlace: 'https://www.recetasgratis.net/receta-de-arroz-con-pollo-colombiano-75536.html'},
      { nombre: 'Avena con plátano y fresa', descripcion: 'Avena cocida con plátano, fresa y miel', imagen: 'avena_platano.jpg', ingredientes: ['125 gramos de Avena en hojuelas', '1 taza de Leche (240 mililitros)', '4 unidades de Fresas', '1 unidad de Plátano', '2 cucharadas soperas de Azúcar', '1 pizca de Canela en polvo', '1 cucharada postre de Mantequilla', '1 chorro de Esencia de vainilla'], enlace: 'https://www.recetasgratis.net/receta-de-avena-cocida-con-platano-y-fresa-58110.html'}
    ]
  },
  { 
    id: '3',
    nombre: 'Mantenerse', 
    platillos: [
      { nombre: 'Salmón en salsa de naranja', descripcion: 'Salmón fresco en salsa de naranja', imagen: 'salmon_salsa.jpg', ingredientes: ['200 gramos de Salmón', '1 unidad de Naranja', '2 unidades de Limón', '2 cucharadas de postre de Azúcar', '20 mililitros de Aceite', '1 pizca de Sal', '1 pizca de Pimienta'], enlace: 'https://www.recetasgratis.net/receta-de-salmon-en-salsa-de-naranja-56831.html'},
      { nombre: 'Ensalada César', descripcion: 'Ensalada César clásica venezolana', imagen: 'ensalada_cesar.jpg', ingredientes: ['1 lechuga criolla grande', '3 dientes de ajo', '2 tazas de picatostes', '4 huevos cocidos cortados pequeños (opcional)', '½ taza de queso parmesano rallado', '2 latas de anchoas pequeñas', '1 chorro de aceite (para dorar los picatostes)'], enlace: 'https://www.recetasgratis.net/receta-de-ensalada-cesar-venezolana-70714.html'},
      { nombre: 'Tacos de pescado', descripcion: 'Tacos clasicos de pescado', imagen: 'tacos_pescado.jpg', ingredientes: ['500 gramos de filete de pescado', '2 tazas de agua mineral o cerveza', '2 tazas de harina de trigo (280 gramos)', '½ taza de fécula de maíz (62½ gramos)', '1 pizca de pimienta negra molida', '1 pizca de sal', '1 pizca de ajo en polvo', '500 mililitros de aceite vegetal', 'Tortillas de maíz'], enlace: 'https://www.recetasgratis.net/receta-de-tacos-de-pescado-33372.html'}
    ]
  },
  { 
    id: '4',
    nombre: 'Ganar Músculo', 
    platillos: [
      { nombre: 'Filete de carne', descripcion: 'Filete de carne a la parrilla', imagen: 'filete_carne.jpg', ingredientes: ['8 filetes de nalga de ternera con 1cm de grosor', '1 bolsa de pan rallado cantidad necesaria', '6 huevos', '1 pizca de sal', '1 pizca de pimienta', '1 pizca de orégano', '1 chorro de aceite para freír '], enlace: 'https://www.recetasgratis.net/receta-de-milanesa-de-carne-11894.html'},
      { nombre: 'Batido de proteínas', descripcion: '20 recetas de batidos de proteinas', imagen: 'batido_proteinas.jpg', ingredientes: [], enlace: 'https://www.recetasgratis.net/articulo-batidos-para-subir-de-peso-76031.html'},
      { nombre: 'Pollo al horno', descripcion: 'Pollo al horno peruano', imagen: 'pollo_horno.jpg', ingredientes: ['Pollo', '1 cucharada sopera de aji panca o picante', '1 naranja', '1 limón', '1 pizca de sal', '1 pizca de pimienta', '25 centímetros cúbicos de salsa de soja', '2 cucharadas soperas de aceite de oliva', '1 kilogramo de papa andina o papines', '1 cucharada sopera de vinagre', '1 cucharadita de jengibre en polvo', '1 cucharadita de azúcar'], enlace: 'https://www.recetasgratis.net/receta-de-pollo-al-horno-peruano-73603.html'}
    ]
  }
];

// Componente para mostrar los platillos en un carrusel
function MostrarPlatillos({ platillos }: { platillos: { nombre: string, descripcion: string, imagen: string, ingredientes: string[], enlace: string }[] }) {
  return (
    <Carousel className="w-full max-w-4xl mt-8">
      <CarouselContent>
        {platillos.map((platillo, index) => (
          <CarouselItem key={index}>
            <div className="p-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={`src/assets/Recetas/${platillo.imagen}`} alt={platillo.nombre} className="w-70 h-64 object-cover mb-4 rounded-md" />
                  <span className="text-2xl font-semibold">{platillo.nombre}</span>
                  <a href={platillo.enlace} target="_blank" rel="noopener noreferrer" className="text-base mt-2 italic underline">{platillo.descripcion}</a>
                  <h3 className="text-lg font-semibold mt-4">Ingredientes:</h3>
                  <ul className="list-disc list-inside grid grid-cols-2 gap-2">
                    {platillo.ingredientes.map((ingrediente, idx) => (
                      <li key={idx} className="text-base">{ingrediente}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

// Página de recetas
export default function Recetas() {
  const [selectedDietaId, setSelectedDietaId] = useState<string>('1');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDietaId(event.target.value);
  };

  const selectedDieta = dietas.find(dieta => dieta.id === selectedDietaId);

  return (
    <>
      <div className="flex gap-20">
        <Navbar_Menu/>
        <div className="flex flex-col items-center mt-4 w-full max-w-6xl">
          <h1 className="text-blue-700 text-4xl font-bold mb-4">Recetas</h1>
          {/* Select */}
          <select value={selectedDietaId} onChange={handleSelectChange} className="p-2 border rounded-md mb-4">
            {dietas.map((dieta) => (
              <option key={dieta.id} value={dieta.id}>{dieta.nombre}</option>
            ))}
          </select>
          {/* Mostrar platillos */}
          {selectedDieta && (
            <>
              <h2 className="text-3xl font-semibold mt-8">{selectedDieta.nombre}</h2>
              <MostrarPlatillos platillos={selectedDieta.platillos} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
