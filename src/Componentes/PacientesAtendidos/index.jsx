import { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import './style.css';

function PacientesAtendidos() {
  const { name } = useParams(); // Aquí podría ser el ID o nombre del paciente
  const [paciente, setPaciente] = useState(null);
  const { favoritos, setFavoritos } = useContext(AppContext);

  const esFavorito = favoritos.some(p => p.id === paciente?.id);

  useEffect(() => {
    // Reemplaza esta parte con tu fetch desde Supabase o backend real
    fetch(`https://api.mioptica.com/pacientes/${name}`)
      .then(response => response.json())
      .then(data => setPaciente(data))
      .catch(error => console.error("Error:", error));
  }, [name]);

  const toggleFavorito = () => {
    if (!paciente) return;
    if (esFavorito) {
      setFavoritos(favoritos.filter(p => p.id !== paciente.id));
    } else {
      setFavoritos([...favoritos, { id: paciente.id, nombre: paciente.nombre }]);
    }
  };

  if (!paciente) return <p>Cargando paciente...</p>;

  return (
    <div className="c-paciente-detalle">
      <img 
        src={paciente.foto || "https://via.placeholder.com/200"} 
        alt={paciente.nombre} 
        width="200"
      />
      
      <h2>{paciente.nombre}</h2>
      <p><strong>ID:</strong> {paciente.id}</p>
      <p><strong>Edad:</strong> {paciente.edad} años</p>
      <p><strong>Diagnóstico visual:</strong> {paciente.diagnostico}</p>
      <p><strong>Tipo de lente recomendado:</strong> {paciente.lente}</p>
      <p><strong>Agudeza visual:</strong> {paciente.agudezaVisual} / 10</p>
      <p><strong>Fecha de atención:</strong> {paciente.fechaAtencion}</p>

      <button onClick={toggleFavorito}>
        {esFavorito ? '❤️ Paciente Prioritario' : '🤍 Marcar como Prioritario'}
      </button>
    </div>
  );
}

export default PacientesAtendidos;
