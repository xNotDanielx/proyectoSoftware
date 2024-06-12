import React, { useState, useEffect } from "react";
import Navbar_Menu from "@/components/navbarMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SleepData {
  id: number;
  hours: string;
  timestamp: string;
  recommended: number;
  assessment: string;
}

const Sueno: React.FC = () => {
  const [hours, setHours] = useState<string>("");
  const [sleepData, setSleepData] = useState<SleepData[]>([]);
  const [filterDate, setFilterDate] = useState<string>("");

  useEffect(() => {
    const storedData: SleepData[] = JSON.parse(
      localStorage.getItem("sleepData") || "[]"
    );
    setSleepData(storedData);
  }, []);

  const getAssessment = (hours: number): string => {
    if (hours >= 8) {
      return "Excelente";
    } else if (hours >= 5) {
      return "Regular";
    } else if (hours >= 1) {
      return "Mal, hay que mejorar";
    } else {
      return "No duermas tanto";
    }
  };

  const handleAddSleep = () => {
    if (hours) {
      const hoursNumber = parseInt(hours, 10);
      const timestamp = new Date().toLocaleString();
      const assessment = getAssessment(hoursNumber);
      const newSleepData: SleepData[] = [
        ...sleepData,
        { id: Date.now(), hours, timestamp, recommended: 8, assessment },
      ];
      setSleepData(newSleepData);
      localStorage.setItem("sleepData", JSON.stringify(newSleepData));
      setHours("");
    }
  };

  const handleDeleteSleep = (id: number) => {
    const newSleepData = sleepData.filter((item) => item.id !== id);
    setSleepData(newSleepData);
    localStorage.setItem("sleepData", JSON.stringify(newSleepData));
  };

  const filterByDate = (data: SleepData[]) => {
    if (!filterDate) return data;
    return data.filter(
      (item) =>
        new Date(item.timestamp).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
    );
  };

  // Preparar datos para el gráfico
  const graphData = {
    labels: sleepData.map((item) => item.timestamp),
    datasets: [
      {
        label: "Horas de sueño",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.4)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: sleepData.map((item) => parseInt(item.hours, 10)),
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Navbar_Menu />
      </div>
      <div className="flex flex-col container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Sueño</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex gap-4 mb-4">
            <Input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Horas de sueño"
              className="w-full"
            />
            <Button onClick={handleAddSleep} className="bg-blue-500 text-white">
              Registrar hora del sueño
            </Button>
          </div>
          <div className="flex gap-4 mb-4">
            <Input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="Filtrar por fecha"
              className="w-full"
            />
          </div>
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Horas de Sueño</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Horas Recomendadas</th>
                <th className="border px-4 py-2">Evaluación</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filterByDate(sleepData).map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">{item.hours}</td>
                  <td className="border px-4 py-2">{item.timestamp}</td>
                  <td className="border px-4 py-2">{item.recommended}</td>
                  <td className="border px-4 py-2">{item.assessment}</td>
                  <td className="border px-4 py-2">
                    <Button
                      onClick={() => handleDeleteSleep(item.id)}
                      className="bg-red-500 text-white"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex flex-col items-center justify-center h-96 bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Gráfico de Sueño</h2>
          <Line data={graphData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">Consejos para dormir mejor</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Mantén un horario de sueño regular, incluso los fines de semana.</li>
            <li>Crea un entorno relajante para dormir. Mantén la habitación oscura, tranquila y fresca.</li>
            <li>Evita las pantallas electrónicas al menos una hora antes de acostarte.</li>
            <li>Practica una rutina relajante antes de acostarte, como leer o tomar un baño caliente.</li>
            <li>Evita las comidas pesadas y la cafeína cerca de la hora de dormir.</li>
            <li>Haz ejercicio regularmente, pero no demasiado cerca de la hora de acostarte.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sueno;
