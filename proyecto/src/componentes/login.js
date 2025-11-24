import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function mostrarLogin() {
  const app = document.getElementById("app");
  app.classList.add("form-view");
  app.classList.remove("grid-view");
  
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>🔐 Iniciar Sesión</h2>
          <p>Accede a tu cuenta</p>
        </div>
        <form id="loginForm">
          <div class="form-group">
            <label for="correo">Correo Electrónico</label>
            <input 
              type="email" 
              id="correo" 
              placeholder="tu@email.com"
              required
            />
          </div>
          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input 
              type="password" 
              id="contrasena" 
              placeholder="Tu contraseña"
              required
            />
          </div>
          <button type="submit" id="btnLogin" class="btn-primary">Ingresar</button>
        </form>
        <div class="auth-footer">
          <p>¿No tienes cuenta? <a href="#" onclick="alert('Registrate desde el menú')">Registrate aquí</a></p>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    
    const btnLogin = document.getElementById("btnLogin");
    btnLogin.textContent = "Cargando...";
    btnLogin.disabled = true;
    
    try {
      await signInWithEmailAndPassword(auth, correo, contrasena);
      window.location.reload();
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
      btnLogin.textContent = "Ingresar";
      btnLogin.disabled = false;
    }
  });
}