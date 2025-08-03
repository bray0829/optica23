import { useEffect, useState } from "react";
import { supabase } from "../../supabase";
import './usuarios.css';

export default function Usuarios() {
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    fecha_nacimiento: "",
    telefono: "",
    roll: ""
  });

  const [nuevaUrl, setNuevaUrl] = useState("");
  const [imagenes, setImagenes] = useState([]);

  // Obtener datos del usuario actual
  useEffect(() => {
    async function fetchUsuario() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("usuario")
          .select("*")
          .eq("id", user.id)
          .single();
        if (data) {
          setUsuario(data);
          setForm(data);
          fetchImagenes(user.id);
        }
      }
    }

    fetchUsuario();
  }, []);

  const fetchImagenes = async (usuarioid) => {
    const { data } = await supabase
      .from("multimedia")
      .select("*")
      .eq("usuarioid", usuarioid);
    if (data) setImagenes(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("usuario")
      .update(form)
      .eq("id", usuario.id);
    if (error) alert("❌ Error al actualizar");
    else alert("✅ Datos actualizados correctamente");
  };

  const handleAgregarUrl = async () => {
    if (!nuevaUrl.trim()) return;
    const { error } = await supabase
      .from("multimedia")
      .insert([{ url: nuevaUrl, usuarioid: usuario.id }]);
    if (error) {
      alert("❌ Error al agregar la imagen");
    } else {
      setNuevaUrl("");
      fetchImagenes(usuario.id);
    }
  };

  const handleEliminarImagen = async (id) => {
    const { error } = await supabase
      .from("multimedia")
      .delete()
      .eq("id", id);
    if (!error) {
      setImagenes(imagenes.filter((img) => img.id !== id));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login"; // Redirige al login al cerrar sesión
  };

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="usuario-container">
      <h2>👤 Mi Perfil</h2>
      <form className="form-perfil">
        <label>Nombre completo:
          <input name="nombre" value={form.nombre} onChange={handleChange} />
        </label>
        <label>Correo:
          <input name="correo" value={form.correo} onChange={handleChange} />
        </label>
        <label>Fecha de nacimiento:
          <input type="date" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
        </label>
        <label>Teléfono:
          <input name="telefono" value={form.telefono} onChange={handleChange} />
        </label>
        <label>Rol:
          <input name="roll" value={form.roll} onChange={handleChange} />
        </label>
        <button type="button" onClick={handleUpdate}>💾 Guardar cambios</button>
      </form>

      <hr />

      <h3>🖼️ Agregar imagen (URL)</h3>
      <div className="agregar-imagen">
        <input
          type="text"
          placeholder="https://ejemplo.com/imagen.jpg"
          value={nuevaUrl}
          onChange={(e) => setNuevaUrl(e.target.value)}
        />
        <button onClick={handleAgregarUrl}>Agregar</button>
      </div>

      <h3>📸 Mis imágenes</h3>
      <div className="galeria">
        {imagenes.map((img) => (
          <div key={img.id} className="imagen-card">
            <img src={img.url} alt="Imagen subida" />
            <button onClick={() => handleEliminarImagen(img.id)}>🗑️ Eliminar</button>
          </div>
        ))}
      </div>

      <hr />
      <h3>🚪 ¿Quieres cerrar sesión?</h3>
      <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
