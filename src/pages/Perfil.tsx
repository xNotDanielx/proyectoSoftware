import React, { useEffect, useState } from "react";
import Navbar_Menu from "@/components/navbarMenu";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getUserData, updateUserProfile } from "@/Api/firestore";
import { Toaster, toast } from "sonner";
import { auth } from "@/Api/firebase";

const Perfil = () => {
  const [loading, setLoading] = useState(true);
  const formSchema = z.object({
    email: z.string().email({ message: "Por favor ingrese su correo" }),
    password: z.string().min(6, { message: "Por favor ingrese su contraseña" }),
    username: z.string().min(3, { message: "Por favor ingrese su nombre de usuario" }),
    goal: z.string({ message: "Por favor seleccione una meta" }),
    exerciseFrequency: z.string({
      message: "Por favor seleccione la frecuencia de ejercicio",
    }),
    waterIntake: z.string({
      message: "Por favor seleccione la frecuencia de ingesta de agua",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      goal: "",
      exerciseFrequency: "",
      waterIntake: "",
    },
  });

  useEffect(() => {
    const user = auth.currentUser;

    if (user) {
      getUserData(user.uid)
        .then((data) => {
          if (data) {
            form.reset(data);
          }
        })
        .catch((error) => {
          console.error("Error loading user data:", error);
          toast.error("Error al cargar los datos del usuario");
        })
        .finally(() => setLoading(false));
    } else {
      toast.error("Usuario no autenticado");
      setLoading(false);
    }
  }, [form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const user = auth.currentUser;

      if (user) {
        await updateUserProfile(user.uid, {
          email: values.email,
          password: values.password,
          username: values.username,
          goal: values.goal,
          exerciseFrequency: values.exerciseFrequency,
          waterIntake: values.waterIntake,
        });
        toast.success("Perfil actualizado correctamente");
      } else {
        toast.error("Usuario no autenticado");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar el perfil");
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="flex gap-96">
        <Navbar_Menu />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-blue-700 text-3xl font-bold">Perfil</h1>
          <Card className="w-[350px] px-6 py-5">
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
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                        }} value={field.value}>
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
                  Actualizar Perfil
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
};

export default Perfil;


