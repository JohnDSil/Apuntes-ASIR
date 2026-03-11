// Función para cargar los apuntes
async function cargarApuntes() {
    try {
        const respuesta = await fetch('apuntes.json');
        const datos = await respuesta.json();
        
        const contenedor = document.getElementById('contenedor-apuntes');
        contenedor.innerHTML = ""; // Limpiamos el mensaje de carga

        datos.forEach(asig => {
            const card = `
                <div class="tarjeta-asignatura">
                    <h3>${asig.siglas}</h3>
                    <p>${asig.nombre}</p>
                    <span class="badge">${asig.estado}</span>
                    <a href="${asig.url}" class="btn">ACCEDER</a>
                </div>
            `;
            contenedor.innerHTML += card;
        });
    } catch (error) {
        console.error("Error en la transmisión de datos:", error);
    }
}

// Ejecutar al cargar la página
window.onload = cargarApuntes;
