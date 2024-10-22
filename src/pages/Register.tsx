import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
import { doCreateUserWithEmailAndPassword } from "@/Api/auth";
import Navbar_Home from "../components/navbarMain";
import { Toaster, toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addUserWithGoal } from "@/Api/firestore";

export default function Register() {
  const navigate = useNavigate(); // Obtiene navigate para redirigir

  const formSchema = z.object({
    email: z.string({ required_error: "Por favor ingrese su correo" }).email(),
    password: z
      .string({ required_error: "Por favor ingrese su contraseña" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    username: z.string({ required_error: "Por favor ingrese su nombre de usuario" }),
    goal: z.string({ required_error: "Por favor seleccione una meta" }),
    exerciseFrequency: z.string({ required_error: "Por favor seleccione la frecuencia de ejercicio" }),
    waterIntake: z.string({ required_error: "Por favor seleccione la frecuencia de ingesta de agua" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // Crear usuario con correo y contraseña
      const userCredential = await doCreateUserWithEmailAndPassword(values.email, values.password);
      const user = userCredential.user;

      // Guardar datos adicionales del usuario
      await addUserWithGoal(user.uid, { 
        email: values.email, 
        password: values.password,
        username: values.username,
        goal: values.goal,
        exerciseFrequency: values.exerciseFrequency,
        waterIntake: values.waterIntake
      });

      toast.success("Usuario creado correctamente");

      // Redirige al login después de crear el usuario exitosamente
      navigate("/login");
    } catch (error) {
      console.log(error);
      navigate("/login");
      toast.success("Usuario creado correctamente");
    }
  };

  return (
    <>
      <Navbar_Home />
      <div className="mt-16 flex justify-center items-center">
        <Card className="w-[350px] px-6 py-5">
          <h2 className="text-center font-semibold text-xl text-blue-500">Registro</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de Usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una meta" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="perder_peso">Perder Peso</SelectItem>
                          <SelectItem value="ganar_musculo">Ganar Músculo</SelectItem>
                          <SelectItem value="mantenerse">Mantenerse</SelectItem>
                          <SelectItem value="ganar_peso">Ganar Peso</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="exerciseFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frecuencia de Ejercicio</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione la frecuencia de ejercicio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mucho">Hace mucho ejercicio (4-6 días)</SelectItem>
                          <SelectItem value="poco">Hace poco ejercicio (2-3 días)</SelectItem>
                          <SelectItem value="nada">No hace ejercicio</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="waterIntake"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frecuencia de Ingesta de Agua</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione la frecuencia de ingesta de agua" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mucha">Mucha (más de 8 vasos)</SelectItem>
                          <SelectItem value="regular">Regular (4-8 vasos)</SelectItem>
                          <SelectItem value="poca">Poca (menos de 4 vasos)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-8 bg-gradient-to-r from-sky-500 to-indigo-500"
                type="submit"
              >
                Registrarse
              </Button>
            </form>
          </Form>
        </Card>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
