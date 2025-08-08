import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AppProvider } from './Contexto/Contexto';

import { supabase } from "./supabase";

import Examenes from './Componentes/Examenes';
import PacientesAtendidos from './Componentes/PacientesAtendidos';
import Favoritos from "./Componentes/Favoritos/index.jsx";
import ListasPacientes from './Componentes/ListasPacientes';
import GafasLentes from './Componentes/GafasLentes';
import Usuarios from './Componentes/Usuario';
import Menu from './Componentes/Menu';

import './App.css';
import Login from './Componentes/Login';
import Registro from './Componentes/Registro';

function App() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function verificarSesion() {
      const { data: { session } } = await supabase.auth.getSession();
      setUsuario(session?.user || null);
      setCargando(false);
    }

    verificarSesion();

    supabase.auth.onAuthStateChange((_event, session) => {
      setUsuario(session?.user || null);
    });
  }, []);

  if (cargando) return <p>Cargando...</p>;

  return (
    <AppProvider>
      <Router>
        {usuario && <Menu />}
        <Routes>
          <Route path="/" element={usuario ? <ListasPacientes /> : <Navigate to="/login" />} />
          <Route path="/usuarios" element={usuario ? <Usuarios /> : <Navigate to="/login" />} />
          <Route path="/examenes" element={usuario ? <Examenes /> : <Navigate to="/login" />} />
          <Route path="/pacientes-atendidos" element={usuario ? <PacientesAtendidos /> : <Navigate to="/login" />} />
          <Route path="/favoritos" element={usuario ? <Favoritos /> : <Navigate to="/login" />} />
          <Route path="/gafas-lentes/:id" element={usuario ? <GafasLentes /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
