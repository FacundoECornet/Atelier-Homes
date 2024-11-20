let propiedades = [];  // Variable global para almacenar las propiedades

// Función para cargar propiedades desde el archivo JSON
async function cargarPropiedades() {
    try {
        const response = await fetch('propiedades.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        propiedades = await response.json();  // Asignar a la variable global
        console.log(propiedades);  // Verifica que el JSON se haya cargado correctamente
        renderizarPropiedades(propiedades);  // Llamar a renderizar después de cargar los datos
    } catch (error) {
        console.error(error);
    }
}

// Función para renderizar las propiedades en la página
function renderizarPropiedades(propiedades) {
    const listaPropiedades = document.getElementById('listapropiedades');
    listaPropiedades.innerHTML = '';  // Limpiar antes de agregar nuevas cards

    propiedades.forEach(propiedad => {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-4', 'mb-4');  // Asegurarse de que las cards se alineen bien
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${propiedad.imagen}" class="card-img-top" alt="Imagen de propiedad">
            <div class="card-body">
                <h5 class="card-title">${propiedad.titulo}</h5>
                <p class="card-text">${propiedad.descripcion}</p>
                <p class="card-text" style="font-weight: bold;">${propiedad.tipo}</p>
                <a href="#"><button class="button">Ver propiedad</button></a>
            </div>
        </div>
        `;
        listaPropiedades.appendChild(div);  // Añadir la card al contenedor
    });
}

// Llamar a la función para cargar las propiedades al cargar la página
cargarPropiedades();

// Filtro de propiedades
document.getElementById('filtroForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores de los filtros
    const keyword = document.getElementById('keyword').value.toLowerCase();
    const ubicacion = document.getElementById('ubicacion').value.toLowerCase();
    const tipo = document.getElementById('tipo').value.toLowerCase();

    // Filtrar las propiedades
    const propiedadesFiltradas = propiedades.filter(propiedad => {
        return (
            (propiedad.titulo.toLowerCase().includes(keyword) || propiedad.descripcion.toLowerCase().includes(keyword)) &&
            (ubicacion === "" || propiedad.ubicacion.toLowerCase().includes(ubicacion)) &&
            (tipo === "" || propiedad.tipo.toLowerCase() === tipo)
        );
    });

    // Renderizar las propiedades filtradas
    renderizarPropiedades(propiedadesFiltradas);
});
