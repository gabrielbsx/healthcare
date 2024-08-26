import Container from "@/presenter/components/container";
import { Button } from "@/presenter/components/ui/button";
import { useEffect, useState } from "react";

interface Vaccination {
  id: number;
  name: string;
  date: string;
}

function HomePage() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newVaccination, setNewVaccination] = useState({ name: "", date: "" });

  useEffect(() => {
    const storedVaccinations = localStorage.getItem("vaccinations");
    if (storedVaccinations) {
      setVaccinations(JSON.parse(storedVaccinations));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("vaccinations", JSON.stringify(vaccinations));
  }, [vaccinations]);

  const handleAddVaccination = () => {
    if (newVaccination.name && newVaccination.date) {
      setVaccinations([...vaccinations, { id: Date.now(), ...newVaccination }]);
      setNewVaccination({ name: "", date: "" });
    }
  };

  const handleDeleteVaccination = (id: number) => {
    setVaccinations(vaccinations.filter((vac) => vac.id !== id));
  };

  const handleUpdateVaccination = (
    id: number,
    updatedVaccination: Vaccination
  ) => {
    setVaccinations(
      vaccinations.map((vac) => (vac.id === id ? updatedVaccination : vac))
    );
  };

  const filteredVaccinations = vaccinations.filter((vac) =>
    vac.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container>
        <div className="p-6 max-w-4xl mt-10 mx-auto bg-white rounded-xl border shadow-md space-y-4">
          <h1 className="text-2xl font-bold mb-4">Lista de vacinação</h1>

          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Pesquisar vacinações..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="space-y-2">
            {filteredVaccinations.map((vac) => (
              <div
                key={vac.id}
                className="p-3 border rounded flex justify-between items-center"
              >
                <div>
                  <strong>{vac.name}</strong>
                  <div>{vac.date}</div>
                </div>
                <div className="space-x-2">
                  <Button
                    className="bg-blue-500 text-white"
                    onClick={() =>
                      handleUpdateVaccination(vac.id, {
                        ...vac,
                        name: prompt("Update name", vac.name) || vac.name,
                        date: prompt("Update date", vac.date) || vac.date,
                      })
                    }
                  >
                    Editar
                  </Button>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={() => handleDeleteVaccination(vac.id)}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Nome da vacinação"
              value={newVaccination.name}
              onChange={(e) =>
                setNewVaccination({ ...newVaccination, name: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full p-2 border rounded"
              placeholder="Data da vacinação"
              value={newVaccination.date}
              onChange={(e) =>
                setNewVaccination({ ...newVaccination, date: e.target.value })
              }
            />
            <button
              className="w-full p-2 bg-green-500 text-white rounded"
              onClick={handleAddVaccination}
            >
              Adicionar vacinação
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default HomePage;
