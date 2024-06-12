import React, { useState, useEffect } from "react";
import Navbar_Menu from "@/components/navbarMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import caritaFeliz from "@/assets/cara-guinando.png";
import caritaTriste from "@/assets/triste.png";
import caritaEnojado from "@/assets/enojado.png";
import { Toaster, toast } from "sonner";

interface EmotionData {
  id: number;
  emotion: string;
  timestamp: string;
}

const EstadoEmocional: React.FC = () => {
    const [emotion, setEmotion] = useState<string>("");
    const [emotionData, setEmotionData] = useState<EmotionData[]>([]);
    const [filterDate, setFilterDate] = useState<string>("");
  
    useEffect(() => {
      const storedData: EmotionData[] = JSON.parse(
        localStorage.getItem("emotionData") || "[]"
      );
      setEmotionData(storedData);
    }, []);

  const handleAddEmotion = () => {
    if (!isNaN(Number(emotion))) { // Verifica si el valor es un número
      toast.error('Por favor, ingresa una emoción válida.'); // Muestra un toast de error
      return; 
    }

    if (emotion) {
      const timestamp = new Date().toLocaleString();
      const newEmotionData: EmotionData[] = [
        ...emotionData,
        { id: Date.now(), emotion, timestamp },
      ];
      setEmotionData(newEmotionData);
      localStorage.setItem("emotionData", JSON.stringify(newEmotionData));
      setEmotion("");
    }
  };

  const handleDeleteEmotion = (id: number) => {
    const newEmotionData = emotionData.filter((item) => item.id !== id);
    setEmotionData(newEmotionData);
    localStorage.setItem("emotionData", JSON.stringify(newEmotionData));
  };

  const filterByDate = (data: EmotionData[]) => {
    if (!filterDate) return data;
    return data.filter(
      (item) =>
        new Date(item.timestamp).toLocaleDateString() ===
        new Date(filterDate).toLocaleDateString()
    );
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case "feliz":
        return <img src={caritaFeliz} alt="Feliz" className="w-6 h-6" />;
      case "triste":
        return <img src={caritaTriste} alt="Triste" className="w-6 h-6" />;
      case "enojado":
        return <img src={caritaEnojado} alt="Enojado" className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div>
        <Navbar_Menu />
      </div>
      <div className="flex flex-col container mx-auto p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Estado Emocional</h1>
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              placeholder="Estado emocional"
              className="w-full"
            />
            <Button
              onClick={handleAddEmotion}
              className="bg-blue-500 text-white"
            >
              Registrar estado emocional
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
                <th className="border px-4 py-2">Estado Emocional</th>
                <th className="border px-4 py-2">Fecha</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filterByDate(emotionData).map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{item.id}</td>
                  <td className="border px-4 py-2">
                    {getEmotionIcon(item.emotion)} {item.emotion}
                  </td>
                  <td className="border px-4 py-2">{item.timestamp}</td>
                  <td className="border px-4 py-2">
                    <Button
                      onClick={() => handleDeleteEmotion(item.id)}
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
        <div className="bg-white p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-2">
            Recomendaciones para mantener un buen estado emocional
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Practica técnicas de respiración profunda para reducir el estrés.
            </li>
            <li>
              Dedica tiempo a actividades que disfrutes, como leer, pintar o
              salir a caminar.
            </li>
            <li>Habla con alguien de confianza sobre cómo te sientes.</li>
            <li>
              Mantén una rutina de sueño regular para mejorar tu estado de
              ánimo.
            </li>
            <li>
              Realiza ejercicio físico regularmente para liberar endorfinas y
              sentirte mejor.
            </li>
          </ul>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default EstadoEmocional;