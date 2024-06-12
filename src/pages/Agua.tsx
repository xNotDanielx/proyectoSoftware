import Navbar_Menu from "@/components/navbarMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Agua() {
  return (
    <>
      <div className="flex">
        <Navbar_Menu />
        <div className="flex flex-col w-full p-4">
          <div className="flex w-full">
            <div className="w-2/3 pr-4 border-r border-gray-300">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-blue-700">La importancia de una buena hidratación</h2>
                <h3 className="text-lg font-semibold mb-2">Elemento esencial para el cuerpo humano en cualquier etapa de la vida.</h3>
                <div className="bg-blue-100 p-4 rounded-md shadow-md flex justify-center items-center">
                  <div className="flex flex-col items-center space-y-2">
                    <img
                      src="src/assets/Agua/estudio.jpg"
                      alt="tomen agua"
                      className="w-150 h-36 object-cover rounded-md"
                    />
                    <p className="text-lg text-justified">
                      De acuerdo a la Organización Mundial de la Salud (OMS), el agua es esencial para el cuerpo humano en cualquier etapa de la vida porque ayuda a regular la temperatura corporal, manteniendo la piel hidratada y elástica, lubricando articulaciones y órganos y manteniendo una buena digestión.
                    </p>
                    <a href="https://www.gob.mx/salud/articulos/la-importancia-de-una-buena-hidratacion" target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                      Leer estudio completo
                    </a>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 text-blue-700">Cuanta agua tomas al dia?</h1>                
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Mucha (más de 8 vasos)</AccordionTrigger>
                  <AccordionContent>
                  ¡Excelente! Mantenerse bien hidratado es fundamental para la salud. Recuerda continuar bebiendo agua a lo largo del día para mantener tu cuerpo funcionando de manera óptima. Intenta variar tu ingesta con infusiones de hierbas o frutas frescas para agregar sabor y nutrientes adicionales.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Regular (4-8 vasos)</AccordionTrigger>
                  <AccordionContent>
                  ¡Estás en el camino correcto! Mantener una ingesta regular de agua es clave para mantenerse hidratado. Recuerda beber agua antes, durante y después del ejercicio, así como a lo largo del día para mantener tu cuerpo en equilibrio. Considera llevar una botella de agua contigo para recordarte beber regularmente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Poca (menos de 4 vasos)</AccordionTrigger>
                  <AccordionContent>
                  Es importante aumentar tu ingesta de agua para mantener tu cuerpo hidratado. La deshidratación puede afectar tu energía, concentración y salud en general. Intenta establecer recordatorios para beber agua regularmente a lo largo del día y lleva una botella de agua contigo para asegurarte de estar siempre hidratado.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="w-1/3 pl-4 flex flex-col items-center space-y-4">
              <div className="w-full">
                <div className="relative w-full h-64">
                  <img
                    src="src/assets/Agua/primera_imagen_agua.png"
                    alt="70% agua"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative w-full h-64">
                  <img
                    src="src/assets/Agua/segunda_imagen_agua.jpg"
                    alt="importancia del agua en el cuerpo humano"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="relative w-full h-64">
                  <img
                    src="src/assets/Agua/tercera_imagen_agua.jpg"
                    alt="tomen agua"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
