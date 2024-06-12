import { doSignInWithEmailAndPassword } from "@/Api/auth";
import Navbar_Home from "../components/navbarMain";
import { Toaster, toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// Imports del formulario
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Login() {
  const formSchema = z.object({
    email: z.string({ required_error: "Por favor ingrese su correo" }).email(),
    password: z
      .string({ required_error: "Por favor ingrese su contraseña" })
      .min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const firebase = await doSignInWithEmailAndPassword(values.email, values.password);
      console.log(firebase);
      if (firebase) {
        window.location.href = "/Recetas";
      } else {
        toast.error("Error al iniciar sesion");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesion");
    }
  };

  return (
    <>
      <Navbar_Home />
      <div className="mt-16 flex justify-center items-center">
        <Card className="w-[350px] px-6 py-5">
          <h2 className="text-center font-semibold text-xl text-blue-500">Iniciar Sesion</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="Contraseña"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="mt-8 bg-gradient-to-r from-sky-500 to-indigo-500"
                type="submit"
              >
                Iniciar Sesion
              </Button>
            </form>
          </Form>
        </Card>
      </div>
      <Toaster position="top-center" />
    </>
  );
}

