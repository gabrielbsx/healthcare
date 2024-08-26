import { Button } from "@/presenter/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presenter/components/ui/card";
import { FormDescription } from "@/presenter/components/ui/form";
import { Input } from "@/presenter/components/ui/input";
import { Label } from "@/presenter/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

type RegisterProps = z.infer<typeof registerSchema>;

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterProps) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Crie sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  type="text"
                  id="username"
                  placeholder="Escolha seu usuário"
                  {...register("username")}
                />
                {errors.username && (
                  <FormDescription>{errors.username.message}</FormDescription>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Escolha sua senha"
                  {...register("password")}
                />
                {errors.password && (
                  <FormDescription>{errors.password.message}</FormDescription>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirme sua senha</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Repita sua senha"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <FormDescription>
                    {errors.confirmPassword.message}
                  </FormDescription>
                )}
              </div>

              <Button type="submit" className="w-full mt-4">
                Registrar
              </Button>

              <div className="flex justify-center mt-4">
                <Link
                  to="/login"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  Já tem uma conta? Entre
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Register;
