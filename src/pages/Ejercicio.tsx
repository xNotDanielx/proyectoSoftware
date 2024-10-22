import { useState, useEffect } from "react";
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
} from "@/components/ui/table";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Definición de tipos
type Ejercicio = {
  nombre: string;
  instrucciones: string;
  imagen: string;
};

type NivelEjercicio = {
  id: string;
  nivel: string;
  ejercicios: Ejercicio[];
};

type Rutina = {
  nombre: string;
  nivel: string;
  minutos: string;
  horaSistema: string;
};

type RutinaGuardada = {
  fecha: string;
  rutina: Rutina[];
};


const rutinaEjercicios: NivelEjercicio[] = [
  {
    id: "1",
    nivel: "Principiante",
    ejercicios: [
      {
        nombre: "Flexiones de brazos",
        instrucciones:
          "Apóyate en el suelo con las manos separadas a la anchura de los hombros. Baja el cuerpo hasta que el pecho casi toque el suelo y luego vuelve a subir.",
        imagen: "flexiones.gif",
      },
      {
        nombre: "Sentadillas",
        instrucciones:
          "Párate con los pies separados al ancho de las caderas. Baja las caderas hacia atrás y hacia abajo como si te sentaras en una silla, manteniendo los talones pegados al suelo.",
        imagen: "sentadillas.gif",
      },
      {
        nombre: "Plancha abdominal",
        instrucciones:
          "Apoya los antebrazos y los dedos de los pies en el suelo, mantén el cuerpo en línea recta desde la cabeza hasta los talones y mantén la posición durante 30 segundos o más.",
        imagen: "plancha.jpg",
      },
      {
        nombre: "Saltos de tijera",
        instrucciones:
          "Salta hacia arriba y separa las piernas a los lados mientras cruzas los brazos en frente del pecho. Luego, salta hacia abajo y cruza las piernas en el aire.",
        imagen: "saltos_tijera.jpg",
      },
    ],
  },
  {
    id: "2",
    nivel: "Intermedio",
    ejercicios: [
      {
        nombre: "Burpees",
        instrucciones:
          "Comienza de pie, luego haz una sentadilla y coloca las manos en el suelo. Lleva los pies hacia atrás en una posición de plancha, haz una flexión de brazos, lleva los pies hacia adelante y salta.",
        imagen: "burpee.gif",
      },
      {
        nombre: "Zancadas",
        instrucciones:
          "Da un paso adelante con una pierna y baja el cuerpo hasta que ambas rodillas estén dobladas en un ángulo de 90 grados. Luego, regresa a la posición inicial y repite con la otra pierna.",
        imagen: "zancadas.gif",
      },
      {
        nombre: "Mountain climbers",
        instrucciones:
          "Colócate en posición de plancha con las manos debajo de los hombros. Lleva las rodillas hacia el pecho alternativamente, como si estuvieras corriendo en el sitio.",
        imagen: "mountain_climber.gif",
      },
      {
        nombre: "Fondos de tríceps",
        instrucciones:
          "Coloca las manos en una superficie elevada, como un banco, con los dedos apuntando hacia adelante. Baja el cuerpo flexionando los codos hasta que los brazos estén en un ángulo de 90 grados, luego vuelve a subir.",
        imagen: "fondo.gif",
      },
    ],
  },
  {
    id: "3",
    nivel: "Avanzado",
    ejercicios: [
      {
        nombre: "Dominadas",
        instrucciones:
          "Agárrate a una barra con las manos separadas a la anchura de los hombros y los dedos apuntando hacia adelante. Levanta el cuerpo hasta que la barbilla esté por encima de la barra, luego baja lentamente hasta la posición inicial.",
        imagen: "Dominadas.gif",
      },
      {
        nombre: "Flexiones diamante",
        instrucciones:
          "Haz una flexión de brazos con las manos juntas en forma de diamante debajo del pecho. Baja el cuerpo hasta que el pecho casi toque las manos, luego vuelve a subir.",
        imagen: "flexiones_diamante.gif",
      },
      {
        nombre: "Burpees con flexión de brazos",
        instrucciones:
          "Realiza un burpee, pero al bajar al suelo, haz una flexión de brazos antes de volver a saltar. Es un ejercicio intenso que trabaja todo el cuerpo.",
        imagen: "burpee_flexion.gif",
      },
      {
        nombre: "Saltos al cajón",
        instrucciones:
          "Coloca un cajón resistente frente a ti. Salta con los dos pies sobre el cajón, luego baja de nuevo al suelo. Puedes aumentar la dificultad aumentando la altura del cajón.",
        imagen: "saltos_cajon.gif",
      },
    ],
  },
];

export default function Ejercicio() {
  const [selectedNivel, setSelectedNivel] = useState<string>("1");
  const [rutina, setRutina] = useState<Rutina[]>(() => {
    const savedRutina = localStorage.getItem("rutina");
    return savedRutina ? JSON.parse(savedRutina) : [];
  });
  const [minutos, setMinutos] = useState<string>("");
  const [rutinasGuardadas, setRutinasGuardadas] = useState<RutinaGuardada[]>(() => {
    const savedRutinas = localStorage.getItem("rutinasGuardadas");
    return savedRutinas ? JSON.parse(savedRutinas) : [];
  });
  const [showChart, setShowChart] = useState(() => {
    const savedRutinas = localStorage.getItem("rutinasGuardadas");
    return savedRutinas ? JSON.parse(savedRutinas).length > 0 : false;
  });

  useEffect(() => {
    localStorage.setItem("rutina", JSON.stringify(rutina));
  }, [rutina]);

  useEffect(() => {
    localStorage.setItem("rutinasGuardadas", JSON.stringify(rutinasGuardadas));
  }, [rutinasGuardadas]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNivel(event.target.value);
  };

  const handleMinutosChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinutos(event.target.value);
  };

  const addExerciseToRoutine = (
    nombreEjercicio: string,
    nivelEjercicio: string
  ) => {
    const horaSistema = new Date().toLocaleTimeString();
    setRutina([
      ...rutina,
      { nombre: nombreEjercicio, nivel: nivelEjercicio, minutos, horaSistema },
    ]);
  };

  const removeExerciseFromRoutine = (nombreEjercicio: string) => {
    const updatedRutina = rutina.filter(
      (ejercicio) => ejercicio.nombre !== nombreEjercicio
    );
    setRutina(updatedRutina);
  };

  const handleSaveRutina = () => {
    const fecha = new Date().toLocaleDateString();
    setRutinasGuardadas([...rutinasGuardadas, { fecha, rutina: [...rutina] }]);
    setRutina([]); // Limpiar la rutina actual después de guardar
    setShowChart(true);
  };

  const handleClearRutinasGuardadas = () => {
    setRutinasGuardadas([]);
    setShowChart(false);
  };

  const handleDeleteRutinaGuardada = (fecha: string) => {
    const updatedRutinasGuardadas = rutinasGuardadas.filter(
      (rutinaGuardada) => rutinaGuardada.fecha !== fecha
    );
    setRutinasGuardadas(updatedRutinasGuardadas);
    if (updatedRutinasGuardadas.length === 0) {
      setShowChart(false);
    }
  };

  const totalMinutos = rutina.reduce((total: number, ejercicio) => {
    return total + parseInt(ejercicio.minutos, 10);
  }, 0);

  const calculateTotalMinutes = (rutina: Rutina[]) => {
    return rutina.reduce((total: number, ejercicio) => {
      return total + parseInt(ejercicio.minutos, 10);
    }, 0);
  };

  const chartData = {
    labels: rutinasGuardadas.map((rutinaGuardada) => rutinaGuardada.fecha),
    datasets: [
      {
        label: "Minutos totales dedicados",
        data: rutinasGuardadas.map((rutinaGuardada) =>
          calculateTotalMinutes(rutinaGuardada.rutina)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const selectedEjercicios = rutinaEjercicios.find(
    (ejercicio) => ejercicio.id === selectedNivel
  );

  return (
    <>
      <div className="flex gap-20">
        <Navbar_Menu />
        <div className="flex flex-col items-center mt-4 w-full max-w-6xl">
          <div className="flex gap-8 w-full">
            <div className="flex flex-col w-2/3">
              <select
                value={selectedNivel}
                onChange={handleSelectChange}
                className="p-2 border rounded-md mb-4"
              >
                {rutinaEjercicios.map((ejercicio) => (
                  <option key={ejercicio.id} value={ejercicio.id}>
                    {ejercicio.nivel}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={minutos}
                onChange={handleMinutosChange}
                placeholder="Minutos dedicados"
                className="p-2 border rounded-md mb-4"
              />
              {selectedEjercicios && (
                <>
                  <h2 className="text-3xl font-semibold mt-8">
                    {selectedEjercicios.nivel}
                  </h2>
                  <MostrarEjercicios
                    ejercicios={selectedEjercicios.ejercicios}
                    onAddExercise={addExerciseToRoutine}
                    onRemoveExercise={removeExerciseFromRoutine}
                    nivel={selectedEjercicios.nivel}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col w-1/3 border p-4 rounded-md ml-8">
              <h2 className="text-xl font-semibold mb-4">Rutina</h2>
              <Table>
                <TableCaption>Tu rutina de ejercicios.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nombre</TableHead>
                    <TableHead className="w-[100px]">Nivel</TableHead>
                    <TableHead className="w-[100px]">Minutos</TableHead>
                    <TableHead className="w-[100px]">Hora del Sistema</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rutina.map((ejercicio) => (
                    <TableRow key={ejercicio.nombre}>
                      <TableCell>{ejercicio.nombre}</TableCell>
                      <TableCell>{ejercicio.nivel}</TableCell>
                      <TableCell>{ejercicio.minutos}</TableCell>
                      <TableCell>{ejercicio.horaSistema}</TableCell>
                      <TableCell>
                        <button
                          onClick={() => removeExerciseFromRoutine(ejercicio.nombre)}
                          className="p-2 bg-red-500 text-white rounded-md"
                        >
                          Eliminar
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}></TableCell>
                    <TableCell className="font-bold">Total</TableCell>
                    <TableCell className="font-bold">{totalMinutos}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <button
                onClick={handleSaveRutina}
                className="mt-4 p-2 bg-blue-500 text-white rounded-md"
              >
                Guardar Rutina
              </button>
            </div>
          </div>
          {rutinasGuardadas.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="text-2xl font-semibold mb-4">Rutinas Guardadas</h2>
              <Table>
                <TableCaption>Historial de rutinas guardadas.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Fecha</TableHead>
                    <TableHead className="w-[100px]">Nombre</TableHead>
                    <TableHead className="w-[100px]">Nivel</TableHead>
                    <TableHead className="w-[100px]">Minutos</TableHead>
                    <TableHead className="w-[100px]">Hora del Sistema</TableHead>
                    <TableHead className="w-[100px]">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rutinasGuardadas.map((rutinaGuardada, index) => (
                    <>
                      {rutinaGuardada.rutina.map((ejercicio, subIndex) => (
                        <TableRow key={`${index}-${subIndex}`}>
                          {subIndex === 0 && (
                            <TableCell rowSpan={rutinaGuardada.rutina.length}>
                              {rutinaGuardada.fecha}
                            </TableCell>
                          )}
                          <TableCell>{ejercicio.nombre}</TableCell>
                          <TableCell>{ejercicio.nivel}</TableCell>
                          <TableCell>{ejercicio.minutos}</TableCell>
                          <TableCell>{ejercicio.horaSistema}</TableCell>
                          {subIndex === 0 && (
                            <TableCell rowSpan={rutinaGuardada.rutina.length}>
                              <button
                                onClick={() => handleDeleteRutinaGuardada(rutinaGuardada.fecha)}
                                className="p-2 bg-red-500 text-white rounded-md"
                              >
                                Eliminar
                              </button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3}></TableCell>
                        <TableCell className="font-bold">Total</TableCell>
                        <TableCell className="font-bold">
                          {calculateTotalMinutes(rutinaGuardada.rutina)}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          {showChart && (
            <div className="mt-8 w-full">
              <h2 className="text-2xl font-semibold mb-4">
                Gráfica de Minutos por Fecha
              </h2>
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Minutos dedicados a cada ejercicio",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}



function MostrarEjercicios({
  ejercicios,
  onAddExercise,
  onRemoveExercise,
  nivel,
}: {
  ejercicios: { nombre: string; instrucciones: string; imagen: string }[];
  onAddExercise: (nombreEjercicio: string, nivelEjercicio: string) => void;
  onRemoveExercise: (nombreEjercicio: string) => void;
  nivel: string;
}) {
  return (
    <Carousel className="w-full max-w-4xl mt-8">
      <CarouselContent>
        {ejercicios.map((ejercicio, index) => (
          <CarouselItem key={index}>
            <div className="p-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img
                    src={`src/assets/Ejercicios/${ejercicio.imagen}`}
                    alt={ejercicio.nombre}
                    className="w-70 h-64 object-cover mb-4 rounded-md"
                  />
                  <span className="text-2xl font-semibold">
                    {ejercicio.nombre}
                  </span>
                  <p className="text-base mt-2">{ejercicio.instrucciones}</p>
                  <div className="mt-4">
                    <button
                      onClick={() => onAddExercise(ejercicio.nombre, nivel)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Agregar
                    </button>
                    <button
                      onClick={() => onRemoveExercise(ejercicio.nombre)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                      Eliminar
                    </button>
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
