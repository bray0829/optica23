import "./style.css";
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <nav className="c-menu">
      <Link to="/">Pacientes</Link>
      <Link to="/pacientes-atendidos">Atendidos</Link>
      <Link to="/examenes">Exámenes Visuales</Link>
      <Link to="/usuarios">Usuarios</Link>
      <Link to="/favoritos">Tratamientos</Link>
    </nav>
  );
}

export default Menu;
