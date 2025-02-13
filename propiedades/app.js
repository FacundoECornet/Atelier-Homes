import { getPropiedades } from "../Firebase.js";

const listaPropiedades = document.getElementById('listapropiedades');

// Función para renderizar cada propiedad con enlace en la imagen
function renderizarPropiedad(propiedad) {
    return `
        <div class="card">
            <!-- Verifica que la URL sea válida antes de usarla -->
            <a href="${propiedad.url}" target="_blank">
                <img src="${propiedad.img}" class="card-img-top" alt="Imagen de propiedad">
            </a>
            <div class="card-body text-center">
                <h5 class="card-title">${propiedad.name}</h5>
            </div>
        </div>
    `;
}

// Función para cargar las propiedades desde Firebase
async function cargarPropiedades() {
    try {
        const productsSnapshot = await getPropiedades();
        const propiedades = productsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.Nombre || "Sin Nombre", 
                img: data.img || "https://via.placeholder.com/250x350", 
                // Verifica que url sea un string válido
                url: typeof data.url === "string" && data.url !== "" ? data.url : "#" ,
            };
        });

        // Renderizar todas las propiedades
        listaPropiedades.innerHTML = propiedades.map(renderizarPropiedad).join('');
    } catch (error) {
        console.error("Error al cargar propiedades:", error);
    }
}

// Ejecutar la función al cargar la página
cargarPropiedades();

