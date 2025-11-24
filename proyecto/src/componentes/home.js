export default async function mostrarHome() {
  const appContainer = document.getElementById("app");
  appContainer.classList.remove("form-view");
  appContainer.classList.add("grid-view");
  appContainer.innerHTML = "<h2>Cargando animes...</h2>";
  
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await response.json();
    const animes = data.data;
    
    appContainer.innerHTML = "";
    
    animes.forEach((anime) => {
      const card = document.createElement("div");
      card.classList.add("app-card");
      
      // Usar imagen con mejor relación calidad/tamaño
      const imagenUrl = anime.images.jpg.image_url;
      
      card.innerHTML = `
        <div class="image-container">
          <img 
            src="${imagenUrl}" 
            alt="${anime.title}" 
            loading="lazy"
            decoding="async"
          >
          <div class="image-overlay">
            <div class="overlay-text">⭐ ${anime.score}/10</div>
          </div>
        </div>
        <div class="app-info">
          <h2>${anime.title}</h2>
          <p style="font-size: 12px; color: #999;">${anime.title_japanese || "N/A"}</p>
          <p><strong>Tipo:</strong> ${anime.type || "N/A"}</p>
          <p><strong>Episodios:</strong> ${anime.episodes || "N/A"}</p>
          <p><strong>Calificación:</strong> ⭐ ${anime.score}/10</p>
          <p><strong>Ranking:</strong> #${anime.rank}</p>
          <p><strong>Popularidad:</strong> #${anime.popularity}</p>
          <p><strong>Temporada:</strong> ${anime.season || "N/A"} ${anime.year || ""}</p>
          <p style="font-size: 13px; line-height: 1.4; color: #555;">${anime.synopsis || "Sin sinopsis disponible"}</p>
          <p><a href="${anime.url}" target="_blank">📺 Ver en MyAnimeList</a></p>
        </div>
      `;
      appContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    appContainer.innerHTML = "<p>Error al cargar los animes 😢</p>";
  }
}