import { getProduct, agregarProducto } from "../Firebase.js";

const listaPropiedades = document.getElementById('listapropiedades');

// Función para renderizar las propiedades en la página
function renderizarPropiedades(propiedad) {
    const div = document.createElement('div');
    div.classList.add('col-12', 'col-md-4', 'mb-4');
    div.innerHTML = `
        <div class="card" style="width: 18rem; max-height: 450px;">
            <img src="${propiedad.img}" class="card-img-top" alt="Imagen de propiedad">
            <div class="card-body">
                <h5 class="card-title">${propiedad.name}</h5>
                <p class="card-text">${propiedad.characteristics}</p>
                <p class="card-text" style="font-weight: bold;">${propiedad.price}</p>
                <button id="button-${propiedad.id}" class="button">Ver propiedad</button>
            </div>
        </div>
    `;
    return div.outerHTML;
}

// Función para activar eventos en los botones
function activarClickEnBotones(propiedades) {
    propiedades.forEach(propiedad => {
        const boton = document.querySelector(`#button-${propiedad.id}`);
        if (boton) {
            boton.addEventListener('click', () => {
                alert(`Propiedad seleccionada: ${propiedad.name}`);
            });
        }
    });
}

// Función para cargar las propiedades desde Firebase
async function cargarPropiedades() {
    const productsSnapshot = await getProduct();
    const propiedades = productsSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            name: data.Nombre,
            price: data.Precio,
            size: data.size,
            quantity: data.quantity,
            characteristics: data.Descripcion,
            img: data.img
            
        };
    });

    propiedades.forEach(propiedad => {
        listaPropiedades.innerHTML += renderizarPropiedades(propiedad);
    });
    activarClickEnBotones(propiedades);
}

cargarPropiedades();

// Filtro de propiedades
document.getElementById('filtroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores de los filtros
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const ubicacion = document.getElementById('ubicacion').value.toLowerCase();
    const tipo = document.getElementById('tipo').value.toLowerCase();

    // Obtener todas las propiedades renderizadas
    const propiedades = Array.from(document.querySelectorAll('.card')).map(card => {
        return {
            titulo: card.querySelector('.card-title').textContent,
            descripcion: card.querySelector('.card-text').textContent,
            ubicacion: card.dataset.ubicacion || '',
            tipo: card.dataset.tipo || ''
        };
    });

    // Filtrar las propiedades
    const propiedadesFiltradas = propiedades.filter(propiedad => {
        return (
            (propiedad.titulo.toLowerCase().includes(keyword) || propiedad.descripcion.toLowerCase().includes(keyword)) &&
            (ubicacion === "" || propiedad.ubicacion.toLowerCase().includes(ubicacion)) &&
            (tipo === "" || propiedad.tipo.toLowerCase() === tipo)
        );
    });

    // Renderizar propiedades filtradas
    listaPropiedades.innerHTML = '';
    propiedadesFiltradas.forEach(propiedad => {
        listaPropiedades.innerHTML += renderizarPropiedades(propiedad);
    });
    activarClickEnBotones(propiedadesFiltradas);
});
