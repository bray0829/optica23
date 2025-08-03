import { useContext } from 'react';
import { AppContext } from '../../contexto/contexto';
import { useNavigate } from "react-router-dom";

function Favoritos() {
  const { favoritos } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {favoritos.length === 0 ? (
        <p>No hay productos o tratamientos favoritos aún.</p>
      ) : (
        <div className='c-lista'>
          {favoritos.map((producto, index) => (
            <div
              className='c-lista-producto'
              onClick={() => navigate(`/gafas-lentes/${producto.id}`)}
              key={index}
            >
              <img
                src={producto.imagen || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${producto.id}.png`}
                alt={`Producto: ${producto.nombre}`}
                width='auto'
                height='60'
                loading='lazy'
              />
              <p>{producto.nombre}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Favoritos;
