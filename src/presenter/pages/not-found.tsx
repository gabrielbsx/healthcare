import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

function NotFoundPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <>
      (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md text-center shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-6xl font-extrabold text-red-500">
              404
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-6">
              Oops! A página que você está procurando não existe.
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={goBack} className="w-full">
                Voltar
              </Button>
              <Button onClick={goToHome} className="w-full">
                Ir para o início
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default NotFoundPage;
