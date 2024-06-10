import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
export default function CardProximamente() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Proximamente</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>Esta sección estará disponible próximamente</CardDescription>
            </CardContent>
            <CardFooter>
                <p>Gracias por su paciencia</p>
            </CardFooter>
        </Card>
    )
}