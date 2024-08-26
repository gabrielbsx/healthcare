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
import { signInUseCaseFactory } from "@/main/factory/sign-in-usecase.factory";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/presenter/components/ui/use-toast";
import { AxiosError } from "axios";

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

type LoginProps = z.infer<typeof loginSchema>;

function Login() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const signInUseCase = signInUseCaseFactory();

  const mutation = useMutation({
    mutationFn: (data: LoginProps) => signInUseCase.execute(data),
    onSuccess: () => {
      toast({
        title: "Login efetuado com sucesso",
        description: "Você será redirecionado para a página inicial",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: "Erro ao efetuar login",
          description: error?.response?.data?.message || error.message,
        });
      }

      return toast({
        title: "Erro ao efetuar login",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: LoginProps) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Entre com sua conta</CardTitle>
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
                  placeholder="Escreva seu usuário"
                  {...register("username", {
                    required: "Username is required",
                  })}
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
                  placeholder="Escreva sua senha"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <FormDescription>{errors.password.message}</FormDescription>
                )}
              </div>

              <Button type="submit" className="w-full mt-4">
                Entrar
              </Button>

              <div className="flex justify-between mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
                <Link
                  to="/register"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  Cadastre-se
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Login;
