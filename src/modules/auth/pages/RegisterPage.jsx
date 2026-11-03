export default function RegisterPage() {
  return (
    <div>
      <h1>Registro</h1>

      <form>
        <input type="text" placeholder="Nombre" />

        <input type="email" placeholder="Correo" />

        <input type="password" placeholder="Contraseña" />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
