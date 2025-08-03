import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    password: '',
    fechaNacimiento: '',
    telefono: '',
  });

  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setExito(null);

    // Validaciones básicas
    if (formulario.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (!/^\d+$/.test(formulario.telefono)) {
      setError("El teléfono solo debe contener números.");
      return;
    }

    // 1. Crear usuario en Supabase Auth
    const { data, error: errorAuth } = await supabase.auth.signUp({
      email: formulario.correo,
      password: formulario.password,
    });

    if (errorAuth) {
      setError(errorAuth.message);
      return;
    }

    const uid = data.user?.id;
    if (!uid) {
      setError("Error inesperado. Intenta nuevamente.");
      return;
    }

    // 2. Insertar en tabla "usuario"
    const { error: errorInsert } = await supabase.from("usuario").insert([
      {
        id: uid,
        nombre: formulario.nombre,
        correo: formulario.correo,
        fecha_nacimiento: formulario.fechaNacimiento,
        telefono: formulario.telefono,
        roll: "usuario",
      },
    ]);

    if (errorInsert) {
      setError("Usuario creado, pero hubo un error en la base de datos: " + errorInsert.message);
    } else {
      setExito("¡Registro exitoso! Redirigiendo al login...");
      setTimeout(() => navigate("/login"), 2500);
    }
  };

  return (
    <section className="registro-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleRegistro} className="registro-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={formulario.correo}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={formulario.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="fechaNacimiento"
          value={formulario.fechaNacimiento}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono (solo números)"
          value={formulario.telefono}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {exito && <p style={{ color: "green" }}>{exito}</p>}

      <h3>¿Ya tienes cuenta?</h3>
      <button onClick={() => navigate(`/login`)}>Iniciar sesión</button>
    </section>
  );
}

export default Registro;
