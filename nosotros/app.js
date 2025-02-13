import { getNosotros } from "../Firebase.js";

const listanosotros = document.getElementById('listanosotros');

// Función para renderizar un integrante de "Nosotros"
function renderizarnosotros(nosotros) {
    return `
     
  
    
      <div class="card justify-content-center" style="width: 18rem; max-height: 450px;">
        <div class="card-img-wrapper">
          <img src="${nosotros.img}" class="card-img-top" alt="Imagen de integrante" style="height: 350px; object-fit: cover;">
          <div class="overlay">
            <div class="description">
              <p>${nosotros.description}</p> <!-- Aquí va la corta descripción -->
            </div>
          </div>
        </div>
        
          <h5 class="card-title justify-content-center">${nosotros.name}</h5>
        
</div>
    `;
}

async function cargarnosotros() {
    try {
        const snapshot = await getNosotros();
        const nosotros = snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().nombre,
            img: doc.data().img,
            description: doc.data().descripcion // Asegúrate de que el campo sea "descripcion" en tu base de datos
        }));

        // 🔹 Se usa nosotros en minúscula
        listanosotros.innerHTML = nosotros.map(renderizarnosotros).join('');
    } catch (error) {
        console.error("Error al cargar 'Nosotros':", error);
    }
}


cargarnosotros();
