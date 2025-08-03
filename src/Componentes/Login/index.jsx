import { useState } from 'react';
import { supabase } from '../../supabase';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMensajeError("Por favor, completa todos los campos.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMensajeError("❌ Usuario o contraseña inválidos.");
    } else {
      setMensajeError("");
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Iniciar sesión</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>

      {mensajeError && <p className="error-msg">{mensajeError}</p>}

      <hr />
      <h3>¿Aún no tienes cuenta?</h3>
      <button className="registro-btn" onClick={() => navigate("/registro")}>
        Crear cuenta
      </button>
    </div>
  );
}

export default Login;
