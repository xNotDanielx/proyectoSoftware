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
      { nombre: 'Ensalada de pollo', descripcion: 'Ensalada ligera de pollo con vegetales frescos', imagen: 'ensalada_pollo.jpg', ingredientes: ['Pollo', 'Lechuga', 'Tomate', 'Pepino'] },
      { nombre: 'Sopa de verduras', descripcion: 'Sopa nutritiva de verduras variadas', imagen: 'sopa_verduras.jpg', ingredientes: ['Zanahoria', 'Apio', 'Papas', 'Calabacín'] },
      { nombre: 'Pechuga a la plancha', descripcion: 'Pechuga de pollo a la plancha con especias', imagen: 'pechuga_plancha.jpg', ingredientes: ['Pechuga de pollo', 'Aceite de oliva', 'Ajo', 'Pimienta'] }
    ]
  },
  { 
    id: '2',
    nombre: 'Subir Peso', 
    platillos: [
      { nombre: 'Batido de proteínas', descripcion: 'Batido de proteínas con frutas', imagen: 'batido_proteinas.jpg', ingredientes: ['Proteína en polvo', 'Plátano', 'Leche', 'Miel'] },
      { nombre: 'Arroz con pollo', descripcion: 'Arroz con pollo y vegetales', imagen: 'arroz_pollo.jpg', ingredientes: ['Arroz', 'Pollo', 'Pimientos', 'Guisantes'] },
      { nombre: 'Avena con plátano', descripcion: 'Avena cocida con plátano y miel', imagen: 'avena_platano.jpg', ingredientes: ['Avena', 'Plátano', 'Miel', 'Leche'] }
    ]
  },
  { 
    id: '3',
    nombre: 'Mantenerse', 
    platillos: [
      { nombre: 'Salmón a la parrilla', descripcion: 'Salmón fresco a la parrilla', imagen: 'salmon_parrilla.jpg', ingredientes: ['Salmón', 'Limón', 'Eneldo', 'Aceite de oliva'] },
      { nombre: 'Ensalada César', descripcion: 'Ensalada César clásica', imagen: 'ensalada_cesar.jpg', ingredientes: ['Lechuga romana', 'Pollo', 'Aderezo César', 'Croutones'] },
      { nombre: 'Tacos de pescado', descripcion: 'Tacos de pescado con salsa de mango', imagen: 'tacos_pescado.jpg', ingredientes: ['Pescado', 'Tortillas', 'Mango', 'Cilantro'] }
    ]
  },
  { 
    id: '4',
    nombre: 'Ganar Músculo', 
    platillos: [
      { nombre: 'Filete de carne', descripcion: 'Filete de carne a la parrilla', imagen: 'filete_carne.jpg', ingredientes: ['Filete de carne', 'Sal', 'Pimienta', 'Ajo'] },
      { nombre: 'Batido de proteínas', descripcion: 'Batido de proteínas con avena', imagen: 'batido_proteinas.jpg', ingredientes: ['Proteína en polvo', 'Avena', 'Leche', 'Miel'] },
      { nombre: 'Pollo al horno', descripcion: 'Pollo al horno con hierbas', imagen: 'pollo_horno.jpg', ingredientes: ['Pollo', 'Romero', 'Tomillo', 'Aceite de oliva'] }
    ]
  }
];

// Componente para mostrar los platillos en un carrusel
function MostrarPlatillos({ platillos }: { platillos: { nombre: string, descripcion: string, imagen: string, ingredientes: string[] }[] }) {
  return (
    <Carousel className="w-full max-w-lg mt-8">
      <CarouselContent>
        {platillos.map((platillo, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center text-center p-6">
                  <span className="text-xl font-semibold">{platillo.nombre}</span>
                  <img src={`/images/${platillo.imagen}`} alt={platillo.nombre} className="w-full h-80 object-cover mb-4 rounded-md" />                  
                  <p className="text-sm mt-2">{platillo.descripcion}</p>
                  <h3 className="text-md font-semibold mt-4">Ingredientes:</h3>
                  <ul className="list-disc list-inside">
                    {platillo.ingredientes.map((ingrediente, idx) => (
                      <li key={idx} className="text-sm">{ingrediente}</li>
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
      <div className="flex gap-96">
        <Navbar_Menu />
        <div className="flex flex-col items-center mt-4">
          <h1 className="text-blue-700 text-3xl font-bold mb-4">Recetas</h1>
          {/* Select */}
          <select value={selectedDietaId} onChange={handleSelectChange} className="p-2 border rounded-md">
            {dietas.map((dieta) => (
              <option key={dieta.id} value={dieta.id}>{dieta.nombre}</option>
            ))}
          </select>
          {/* Mostrar platillos */}
          {selectedDieta && (
            <>
              <h2 className="text-2xl font-semibold mt-8">{selectedDieta.nombre}</h2>
              <MostrarPlatillos platillos={selectedDieta.platillos} />
            </>
          )}
        </div>
      </div>
    </>
  );
}