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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const rutinaEjercicios = [
  {
    id: '1',
    nivel: 'Principiante',
    ejercicios: [
      { nombre: 'Flexiones de brazos', instrucciones: 'Apóyate en el suelo con las manos separadas a la anchura de los hombros. Baja el cuerpo hasta que el pecho casi toque el suelo y luego vuelve a subir.', imagen: 'flexiones.gif' },
      { nombre: 'Sentadillas', instrucciones: 'Párate con los pies separados al ancho de las caderas. Baja las caderas hacia atrás y hacia abajo como si te sentaras en una silla, manteniendo los talones pegados al suelo.', imagen: 'sentadillas.gif' },
      { nombre: 'Plancha abdominal', instrucciones: 'Apoya los antebrazos y los dedos de los pies en el suelo, mantén el cuerpo en línea recta desde la cabeza hasta los talones y mantén la posición durante 30 segundos o más.', imagen: 'plancha.jpg' },
      { nombre: 'Saltos de tijera', instrucciones: 'Salta hacia arriba y separa las piernas a los lados mientras cruzas los brazos en frente del pecho. Luego, salta hacia abajo y cruza las piernas en el aire.', imagen: 'saltos_tijera.jpg' }
    ]
  },
  {
    id: '2',
    nivel: 'Intermedio',
    ejercicios: [
      { nombre: 'Burpees', instrucciones: 'Comienza de pie, luego haz una sentadilla y coloca las manos en el suelo. Lleva los pies hacia atrás en una posición de plancha, haz una flexión de brazos, lleva los pies hacia adelante y salta.', imagen: 'burpee.gif' },
      { nombre: 'Zancadas', instrucciones: 'Da un paso adelante con una pierna y baja el cuerpo hasta que ambas rodillas estén dobladas en un ángulo de 90 grados. Luego, regresa a la posición inicial y repite con la otra pierna.', imagen: 'zancadas.gif' },
      { nombre: 'Mountain climbers', instrucciones: 'Colócate en posición de plancha con las manos debajo de los hombros. Lleva las rodillas hacia el pecho alternativamente, como si estuvieras corriendo en el sitio.', imagen: 'mountain_climber.gif' },
      { nombre: 'Fondos de tríceps', instrucciones: 'Coloca las manos en una superficie elevada, como un banco, con los dedos apuntando hacia adelante. Baja el cuerpo flexionando los codos hasta que los brazos estén en un ángulo de 90 grados, luego vuelve a subir.', imagen: 'fondo.gif' }
    ]
  },
  {
    id: '3',
    nivel: 'Avanzado',
    ejercicios: [
      { nombre: 'Dominadas', instrucciones: 'Agárrate a una barra con las manos separadas a la anchura de los hombros y los dedos apuntando hacia adelante. Levanta el cuerpo hasta que la barbilla esté por encima de la barra, luego baja lentamente hasta la posición inicial.', imagen: 'Dominadas.gif' },
      { nombre: 'Flexiones diamante', instrucciones: 'Haz una flexión de brazos con las manos juntas en forma de diamante debajo del pecho. Baja el cuerpo hasta que el pecho casi toque las manos, luego vuelve a subir.', imagen: 'flexiones_diamante.gif' },
      { nombre: 'Burpees con flexión de brazos', instrucciones: 'Realiza un burpee, pero al bajar al suelo, haz una flexión de brazos antes de volver a saltar. Es un ejercicio intenso que trabaja todo el cuerpo.', imagen: 'burpee_flexion.gif' },
      { nombre: 'Saltos al cajón', instrucciones: 'Coloca un cajón resistente frente a ti. Salta con los dos pies sobre el cajón, luego baja de nuevo al suelo. Puedes aumentar la dificultad aumentando la altura del cajón.', imagen: 'saltos_cajon.gif' }
    ]
  }
];

export default function Ejercicio() {
  const [selectedNivel, setSelectedNivel] = useState<string>('1');
  const [rutina, setRutina] = useState<{ nombre: string, nivel: string }[]>([]);

  // Función para manejar el cambio de nivel
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNivel(event.target.value);
  };

  // Función para agregar un ejercicio a la rutina
  const addExerciseToRoutine = (nombreEjercicio: string, nivelEjercicio: string) => {
    setRutina([...rutina, { nombre: nombreEjercicio, nivel: nivelEjercicio }]);
  };

  // Función para eliminar un ejercicio de la rutina
  const removeExerciseFromRoutine = (nombreEjercicio: string) => {
    const updatedRutina = rutina.filter(ejercicio => ejercicio.nombre !== nombreEjercicio);
    setRutina(updatedRutina);
  };

  const selectedEjercicios = rutinaEjercicios.find(ejercicio => ejercicio.id === selectedNivel);

  return (
    <>
      <div className="flex gap-20">
        <Navbar_Menu />
        <div className="flex flex-col items-center mt-4 w-full max-w-6xl">
          <div className="flex gap-8 w-full">
            <div className="flex flex-col w-2/3">
              <select value={selectedNivel} onChange={handleSelectChange} className="p-2 border rounded-md mb-4">
              {rutinaEjercicios.map((ejercicio) => (
                <option key={ejercicio.id} value={ejercicio.id}>{ejercicio.nivel}</option>
              ))}
            </select>
            {/* Mostrar ejercicios */}
            {selectedEjercicios && (
              <>
                <h2 className="text-3xl font-semibold mt-8">{selectedEjercicios.nivel}</h2>
                <MostrarEjercicios ejercicios={selectedEjercicios.ejercicios} onAddExercise={addExerciseToRoutine} onRemoveExercise={removeExerciseFromRoutine} nivel={selectedEjercicios.nivel} />
              </>
            )}
          </div>
          <div className="flex flex-col w-1/3 border p-4 rounded-md ml-8"> {/* Ajuste del margen izquierdo */}
            <h2 className="text-xl font-semibold mb-4">Rutina</h2>
            <Table>
              <TableCaption>Tu rutina de ejercicios.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Nombre</TableHead>
                  <TableHead className="w-[100px]">Nivel</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rutina.map((ejercicio, index) => (
                  <TableRow key={index}>
                    <TableCell>{ejercicio.nombre}</TableCell>
                    <TableCell>{ejercicio.nivel}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </>
);
}

// Componente para mostrar los ejercicios en un carrusel
function MostrarEjercicios({ ejercicios, onAddExercise, onRemoveExercise, nivel }: { ejercicios: { nombre: string, instrucciones: string, imagen: string }[], onAddExercise: (nombreEjercicio: string, nivelEjercicio: string) => void, onRemoveExercise: (nombreEjercicio: string) => void, nivel: string }) {
return (
  <Carousel className="w-full max-w-4xl mt-8">
    <CarouselContent>
      {ejercicios.map((ejercicio, index) => (
        <CarouselItem key={index}>
          <div className="p-4">
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <img src={`src/assets/Ejercicios/${ejercicio.imagen}`} alt={ejercicio.nombre} className="w-70 h-64 object-cover mb-4 rounded-md" />
                <span className="text-2xl font-semibold">{ejercicio.nombre}</span>
                <p className="text-base mt-2">{ejercicio.instrucciones}</p>
                <div className="mt-4">
                  <button onClick={() => onAddExercise(ejercicio.nombre, nivel)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Agregar</button>
                  <button onClick={() => onRemoveExercise(ejercicio.nombre)} className="bg-red-500 text-white px-4 py-2 rounded-md">Eliminar</button>
                </div>
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
