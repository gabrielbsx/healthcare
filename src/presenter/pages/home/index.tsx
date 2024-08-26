import Container from "@/presenter/components/container";
import useAuthUser from "@/presenter/hooks/use-auth-user";

function HomePage() {
  const { user } = useAuthUser();

  return (
    <>
      <div>Home page</div>
      <>{user}</>
      <Container></Container>
    </>
  );
}

export default HomePage;
