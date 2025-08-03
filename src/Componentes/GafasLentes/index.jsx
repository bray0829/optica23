import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppContext } from '../../contexto/contexto';
import "./style.css";

function GafasLentes() {
  const { listaCapturados, totalPokes } = useContext(AppContext);
  const espacio = Array.from({ length: totalPokes }, (_, i) => i + 1);
  const navigate = useNavigate();

  return (
    <>
      <p>{listaCapturados.length} productos visualizados de {totalPokes} disponibles</p>
      <section className="c-productos c-lista">
        {espacio.map((id) => {
          const estaRegistrado = listaCapturados.includes(id.toString());
          return (
            <div
              key={id}
              className={estaRegistrado ? "c-item c-producto-adquirido" : "c-item"}
              onClick={() => estaRegistrado ? navigate(`/gafas-lentes/${id}`) : null}
            >
              {estaRegistrado ? (
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  width="auto"
                  height="45"
                  loading="lazy"
                  alt={`Producto ${id}`}
                />
              ) : null}
              <p>{`ID: ${id}`}</p>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default GafasLentes;
