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
      { nombre: 'Ensalada de pollo', descripcion: 'Ensalada ligera de pollo con vegetales frescos', imagen: "ensalada_pollo.jpg", ingredientes: ['pechuga de pollo', '1½ litros de agua', 'sal al gusto', '2 zanahorias', '½ pieza de pepino', '1 taza de lechuga rallada', '2 jitomates chicos'], enlace: 'https://www.recetasgratis.net/receta-de-ensalada-de-pollo-deshebrado-76059.html'},
      { nombre: 'Sopa de verduras', descripcion: 'Sopa nutritiva de verduras variadas', imagen: 'sopa_verduras.jpg', ingredientes: ['Zanahoria', 'Apio', 'Papas', 'Calabacín'], enlace: 'https://www.recetasgratis.net/receta-de-sopa-de-verduras-para-adelgazar-73985.html'},
      { nombre: 'Pechuga a la plancha', descripcion: 'Pechuga de pollo a la plancha con especias', imagen: 'pechuga_plancha.jpg', ingredientes: ['Pechuga de pollo', 'Aceite de oliva', 'Ajo', 'Pimienta'], enlace: 'https://www.recetasgratis.net/receta-de-pechuga-de-pollo-a-la-plancha-para-adelgazar-73986.html'}
    ]
  },
  { 
    id: '2',
    nombre: 'Subir Peso', 
    platillos: [
      { nombre: 'Batido de proteínas', descripcion: 'Batido de proteínas con frutas', imagen: 'batido_proteinas.jpg', ingredientes: ['Proteína en polvo', 'Plátano', 'Leche', 'Miel'], enlace: 'https://www.recetasgratis.net/receta-de-batido-de-proteinas-para-aumentar-masa-muscular-73987.html'},
      { nombre: 'Arroz con pollo', descripcion: 'Arroz con pollo y vegetales', imagen: 'arroz_pollo.jpg', ingredientes: ['Arroz', 'Pollo', 'Pimientos', 'Guisantes'], enlace: 'https://www.recetasgratis.net/receta-de-arroz-con-pollo-para-aumentar-masa-muscular-73988.html'},
      { nombre: 'Avena con plátano', descripcion: 'Avena cocida con plátano y miel', imagen: 'avena_platano.jpg', ingredientes: ['Avena', 'Plátano', 'Miel', 'Leche'], enlace: 'https://www.recetasgratis.net/receta-de-avena-con-platano-para-aumentar-masa-muscular-73989.html'}
    ]
  },
  { 
    id: '3',
    nombre: 'Mantenerse', 
    platillos: [
      { nombre: 'Salmón a la parrilla', descripcion: 'Salmón fresco a la parrilla', imagen: 'salmon_parrilla.jpg', ingredientes: ['Salmón', 'Limón', 'Eneldo', 'Aceite de oliva'], enlace: 'https://www.recetasgratis.net/receta-de-salmon-a-la-parrilla-para-mantener-el-peso-73990.html'},
      { nombre: 'Ensalada César', descripcion: 'Ensalada César clásica', imagen: 'ensalada_cesar.jpg', ingredientes: ['Lechuga romana', 'Pollo', 'Aderezo César', 'Croutones'], enlace: 'https://www.recetasgratis.net/receta-de-ensalada-cesar-para-mantener-el-peso-73991.html'},
      { nombre: 'Tacos de pescado', descripcion: 'Tacos de pescado con salsa de mango', imagen: 'tacos_pescado.jpg', ingredientes: ['Pescado', 'Tortillas', 'Mango', 'Cilantro'], enlace: 'https://www.recetasgratis.net/receta-de-tacos-de-pescado-para-mantener-el-peso-73992.html'}
    ]
  },
  { 
    id: '4',
    nombre: 'Ganar Músculo', 
    platillos: [
      { nombre: 'Filete de carne', descripcion: 'Filete de carne a la parrilla', imagen: 'filete_carne.jpg', ingredientes: ['Filete de carne', 'Sal', 'Pimienta', 'Ajo'], enlace: 'https://www.recetasgratis.net/receta-de-filete-de-carne-para-aumentar-masa-muscular-73993.html'},
      { nombre: 'Batido de proteínas', descripcion: 'Batido de proteínas con avena', imagen: 'batido_proteinas.jpg', ingredientes: ['Proteína en polvo', 'Avena', 'Leche', 'Miel'], enlace: 'https://www.recetasgratis.net/receta-de-batido-de-proteinas-para-aumentar-masa-muscular-73987.html'},
      { nombre: 'Pollo al horno', descripcion: 'Pollo al horno con hierbas', imagen: 'pollo_horno.jpg', ingredientes: ['Pollo', 'Romero', 'Tomillo', 'Aceite de oliva'], enlace: 'https://www.recetasgratis.net/receta-de-pollo-al-horno-para-aumentar-masa-muscular-73994.html'}
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
                  <a href={platillo.enlace} className="text-base mt-2">{platillo.descripcion}</a>
                  <h3 className="text-lg font-semibold mt-4">Ingredientes:</h3>
                  <ul className="list-disc list-inside flex flex-wrap justify-start">
                    {platillo.ingredientes.map((ingrediente, idx) => (
                      <li key={idx} className="text-base w-full md:w-1/2 lg:w-1/3">{ingrediente}</li>
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