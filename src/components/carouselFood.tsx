import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Lista de nombres de archivos de imagen de recetas en la carpeta src/assets/recetas
const imagenesRecetas = [
  "ensalada_pollo.jpg",
  "sopa_verduras.jpg",
  "pechuga_plancha.jpg",
  "batido_proteinas.jpg",
  "arroz_pollo.jpg",
  "avena_platano.jpg",
  "salmon_salsa.jpg",
  "ensalada_cesar.jpg",
  "tacos_pescado.jpg",
  "filete_carne.jpg",
  "pollo_horno.jpg",
];

export default function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-3xl">
      <CarouselContent className="-ml-2">
        {imagenesRecetas.map((imagen, index) => (
          <CarouselItem key={index} className="pl-2 md:basis-1/3 lg:basis-1/4">
            <div className="p-2">
              <Card className="w-full h-full">
                <CardContent className="flex items-center justify-center p-0">
                  <img
                    src={`src/assets/recetas/${imagen}`}
                    alt={`Receta ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
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
