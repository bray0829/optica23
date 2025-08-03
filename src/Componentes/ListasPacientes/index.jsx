import { useState, useEffect, useContext } from 'react';
import Filtro from '../Filtro';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

import './style.css';

function ListaPacientes() {
  const { data, setData, tipoSeleccionado, setTipoSeleccionado } = useContext(AppContext);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const handleTipoChange = (tipo) => {
    setTipoSeleccionado(tipo);
  };

  let resultados = data;

  if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = data.filter(paciente =>
      paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  if (!isNaN(busqueda)) {
    resultados = data.filter(paciente =>
      paciente.id.toString().includes(busqueda)
    );
  }

  return (
    <>
      <input
        type="text"
        placeholder="Buscar paciente por nombre o ID"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      <Filtro onTipoChange={handleTipoChange} />

      <section className='c-lista'>
        {resultados.map((paciente, index) => (
          <div
            className='c-lista-paciente'
            onClick={() => navigate(`/gafas-lentes/${paciente.id}`)}
            key={index}
          >
            <p>ID: {paciente.id}</p>
            <img
              src={paciente.imagen || 'https://via.placeholder.com/80'}
              alt={`Paciente ${paciente.nombre}`}
              width='auto'
              height='60'
              loading='lazy'
            />
            <p>{paciente.nombre}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export default ListaPacientes;
