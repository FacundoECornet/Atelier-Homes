let propiedades = [];  

// Función para cargar propiedades desde el archivo JSON
async function cargarPropiedades() {
    try {
        const response = await fetch('propiedades.json');
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        propiedades = await response.json();  
        console.log(propiedades);  
        renderizarPropiedades(propiedades);  
    } catch (error) {
        console.error(error);
    }
}

// Función para renderizar las propiedades en la página
function renderizarPropiedades(propiedades) {
    const listaPropiedades = document.getElementById('listapropiedades');
    listaPropiedades.innerHTML = '';  

    propiedades.forEach(propiedad => {
        const div = document.createElement('div');
        div.classList.add('col-12', 'col-md-4', 'mb-4');  
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
        listaPropiedades.appendChild(div);  
    });
}


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

    renderizarPropiedades(propiedadesFiltradas);
});






