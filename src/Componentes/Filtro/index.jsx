function Filtro({ onTipoChange }) {
  const categorias = [
    "Todos",
    "Gafas",
    "Lentes de contacto",
    "Lentes de sol",
    "Antirreflejo",
    "Fotocromáticos",
    "Polarizados",
    "Progresivos",
    "Niños",
    "Deportivos",
    "Accesorios"
  ];

  return (
    <div className="c-filtro">
      {categorias.map((categoria, index) => (
        <button
          className="c-filtro-boton"
          key={index}
          onClick={() => onTipoChange(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}

export default Filtro;
