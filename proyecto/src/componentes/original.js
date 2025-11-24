export default function mostrarFavoritos() {
    const app = document.getElementById("app");
    app.classList.remove("form-view");
    app.classList.add("grid-view");

    app.innerHTML = `<h2>Mis Favoritos ⭐</h2>`;

    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Si no hay favoritos
    if (favoritos.length === 0) {
        app.innerHTML += `
            <p style="color:white; margin-top:20px;">
                No tienes favoritos aún 😢<br>
                Agrega algunos desde la página principal.
            </p>
        `;
        return;
    }

    // Mostrar cada favorito
    favoritos.forEach(fav => {
        const card = document.createElement("div");
        card.classList.add("app-card");

        card.innerHTML = `
            <div class="image-container">
                <img src="${fav.image}" alt="${fav.title}">
            </div>

            <div class="app-info">
                <h2>${fav.title}</h2>

                <button class="fav-remove-btn" data-id="${fav.id}">
                    ❌ Quitar de favoritos
                </button>
            </div>
        `;

        app.appendChild(card);
    });

    // Botones para eliminar
    document.querySelectorAll(".fav-remove-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
            
            // Filtrar para eliminar
            favoritos = favoritos.filter(f => f.id != btn.dataset.id);

            // Guardar cambios
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            // Recargar la vista
            mostrarFavoritos();
        });
    });
}

