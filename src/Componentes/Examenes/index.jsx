import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';

function Examenes() {
  const { data, listaCapturados, setListaCapturados, setTipoSeleccionado } = useContext(AppContext);
  const [examenes, setExamenes] = useState([]);

  const navigate = useNavigate();

  // Aseguramos que se muestren todos los tipos disponibles
  useEffect(() => {
    setTipoSeleccionado("All");
  }, [setTipoSeleccionado]);

  // Generar exámenes al cargar los datos
  useEffect(() => {
    if (data.length > 0) {
      generarExamenes();
    }
  }, [data]);

  const generarExamenes = () => {
    let nuevos = [];

    while (nuevos.length < 4) {
      const index = Math.floor(Math.random() * data.length);
      nuevos.push(data[index]);
    }

    setExamenes(nuevos);

    const nuevosIds = nuevos
      .map(ex => ex.url.split("/")[6])
      .filter(id => !listaCapturados.includes(id));

    setListaCapturados(prev => [...prev, ...nuevosIds]);
  };

  return (
    <section className="c-examenes c-lista">
      {examenes.map((examen, index) => (
        <div
          className="c-lista-examen c-un_examen"
          key={index}
          onClick={() => navigate(`/examenes/${examen.name}`)}
        >
          <p>ID: {examen.url.split("/")[6]}</p>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${examen.url.split("/")[6]}.png`}
            alt={`Examen: ${examen.name}`}
            width="60"
            height="60"
          />
          <p>{examen.name}</p>
        </div>
      ))}
      <button onClick={generarExamenes}>Generar nuevos exámenes</button>
    </section>
  );
}

export default Examenes;
