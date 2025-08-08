import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const alteraciones = ["All", "estrabismo", "insuficiencia de convergencia", "nistagmus", "ambliopía"];

  const favoritosGuardados = JSON.parse(localStorage.getItem("favoritosPacientes")) || [];
  const [favoritos, setFavoritos] = useState(favoritosGuardados);

  const remitidosGuardados = JSON.parse(localStorage.getItem("remitidosPacientes")) || [];
  const [remitidos, setRemitidos] = useState(remitidosGuardados);

  const [pacientes, setPacientes] = useState([]);
  const [alteracionSeleccionada, setAlteracionSeleccionada] = useState('All');

  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        let url = "https://tu-api-de-optica.com/pacientes";
        if (alteracionSeleccionada !== "All") {
          url += `?alteracion=${encodeURIComponent(alteracionSeleccionada)}`;
        }

        const res = await fetch(url);
        const json = await res.json();
        setPacientes(json);
      } catch (error) {
        console.error("Error al obtener pacientes:", error);
      }
    };

    obtenerPacientes();
  }, [alteracionSeleccionada]);

  useEffect(() => {
    localStorage.setItem("favoritosPacientes", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    localStorage.setItem("remitidosPacientes", JSON.stringify(remitidos));
  }, [remitidos]);

  return (
    <AppContext.Provider value={{
      pacientes, setPacientes,
      favoritos, setFavoritos,
      remitidos, setRemitidos,
      alteracionSeleccionada, setAlteracionSeleccionada,
      alteraciones
    }}>
      {children}
    </AppContext.Provider>
  );
}
