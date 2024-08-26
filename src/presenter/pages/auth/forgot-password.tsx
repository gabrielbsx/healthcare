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

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordProps = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordProps>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordProps) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Recuperar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  {...register("email")}
                />
                {errors.email && (
                  <FormDescription>{errors.email.message}</FormDescription>
                )}
              </div>

              <Button type="submit" className="w-full mt-4">
                Recuperar Senha
              </Button>

              <div className="flex justify-between mt-4">
                <Link
                  to="/login"
                  className="text-sm text-zinc-500 hover:underline"
                >
                  Voltar para o login
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

export default ForgotPassword;
