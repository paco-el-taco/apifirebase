import mostrarLogout from "./componentes/logout";
import mostrarLogin from "./componentes/login";
import mostrarRegistro from "./componentes/registro";
import mostrarHome from "./componentes/home";
import './style.css';


import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'firebase/auth';
onAuthStateChanged(auth, (user) => {
if (user) {
document.getElementById("menu").innerHTML = `
<nav>
<button id="menuHome">Home</button>
<button id="menuOriginal">Original</button>
<button id="menuLogout">Logout</button>
</nav>
`;
document.getElementById("menuHome").addEventListener("click",
mostrarHome);

document.getElementById("menuLogout").addEventListener("click",
mostrarLogout);
mostrarHome()
} else{
document.getElementById("menu").innerHTML = `
<nav>

<button id="menuLogin">Login</button>
<button id="menuRegistro">Registro</button>
</nav>
`;
document.getElementById("menuLogin").addEventListener("click",
mostrarLogin);
document.getElementById("menuRegistro").addEventListener("click",
mostrarRegistro);
mostrarLogin();
}
})
