import { Button } from "@/presenter/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presenter/components/ui/card";
import {
  Form,
  FormDescription,
  FormField,
} from "@/presenter/components/ui/form";
import { Input } from "@/presenter/components/ui/input";
import { Label } from "@/presenter/components/ui/label";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpUseCaseFactory } from "@/main/factory/sign-up-usecase.factory";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/presenter/components/ui/use-toast";
import { AxiosError } from "axios";

const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z
    .string()
    .min(6, "Confirm Password must be at least 6 characters long"),
});

type RegisterProps = z.infer<typeof registerSchema>;

function Register() {
  const registerForm = useForm<RegisterProps>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUpUseCase = signUpUseCaseFactory();

  const mutation = useMutation({
    mutationFn: (data: RegisterProps) => signUpUseCase.execute({
      username: data.username,
      password: data.password,
      passwordConfirmation: data.confirmPassword,
    }),
    onSuccess: () => {
      toast({
        title: "Registro efetuado com sucesso",
        description: "Você será redirecionado para a página inicial",
      });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return toast({
          title: "Erro ao efetuar o registro",
          description: error?.response?.data?.message || error.message,
        });
      }

      return toast({
        title: "Erro ao efetuar o registro",
        description: error.message,
      });
    },
  });

  const onSubmit = (data: RegisterProps) => {
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Crie sua conta</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...registerForm}>
              <form
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="username">Usuário</Label>
                      <Input
                        type="text"
                        id="username"
                        placeholder="Escolha seu usuário"
                        {...field}
                      />
                      {fieldState.error && (
                        <FormDescription>
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </div>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Senha</Label>
                      <Input
                        type="password"
                        id="password"
                        placeholder="Escolha sua senha"
                        {...field}
                      />
                      {fieldState.error && (
                        <FormDescription>
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </div>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field, fieldState }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirme sua senha
                      </Label>
                      <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="Repita sua senha"
                        {...field}
                      />
                      {fieldState.error && (
                        <FormDescription>
                          {fieldState.error.message}
                        </FormDescription>
                      )}
                    </div>
                  )}
                />

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
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Register;
