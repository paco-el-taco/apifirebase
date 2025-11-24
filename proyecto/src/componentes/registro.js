import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig.js';
import mostrarLogin from './login.js';

export default function mostrarRegistro() {
  const app = document.getElementById("app");
  app.classList.add("form-view");
  app.classList.remove("grid-view");
  
  app.innerHTML = `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h2>📝 Registro</h2>
          <p>Crea tu cuenta</p>
        </div>
        <form id="registroForm">
          <div class="form-group">
            <label for="nombre">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              placeholder="Tu nombre completo"
              required
            />
          </div>
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
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>
          <div class="form-group">
            <label for="fecha">Fecha de Nacimiento</label>
            <input 
              type="date" 
              id="fecha"
              required
            />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono</label>
            <input 
              type="tel" 
              id="telefono" 
              placeholder="+34 123 456 789"
              required
            />
          </div>
          <button type="submit" id="btnRegistro" class="btn-primary">Registrarse</button>
        </form>
        <div class="auth-footer">
          <p>¿Ya tienes cuenta? <a href="#" onclick="alert('Inicia sesión desde el menú')">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById("registroForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const fecha = document.getElementById("fecha").value;
    const telefono = document.getElementById("telefono").value;
    
    const btnRegistro = document.getElementById("btnRegistro");
    btnRegistro.textContent = "Registrando...";
    btnRegistro.disabled = true;
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
      const user = userCredential.user;
      
      await setDoc(doc(db, 'usuarios', user.uid), {
        uid: user.uid,
        nombre,
        correo,
        fecha,
        telefono,
        ganados: 0,
        perdidos: 0,
        fechaRegistro: new Date().toISOString()
      });
      
      alert('¡Usuario registrado correctamente!');
      mostrarLogin();
    } catch (error) {
      let mensaje = 'Error al registrarse: ';
      
      if (error.code === 'auth/email-already-in-use') {
        mensaje += 'Este correo ya está registrado.';
      } else if (error.code === 'auth/weak-password') {
        mensaje += 'La contraseña debe tener al menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        mensaje += 'El correo no es válido.';
      } else {
        mensaje += error.message;
      }
      
      alert(mensaje);
      btnRegistro.textContent = "Registrarse";
      btnRegistro.disabled = false;
    }
  });
}