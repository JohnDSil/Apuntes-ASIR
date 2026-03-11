/**
 * Motor de renderizado de apuntes - Sr. Silva
 */
async function inicializarArchivo() {
    try {
        // 1. Pedimos los datos al archivo JSON
        const respuesta = await fetch('apuntes.json');
        const apuntes = await respuesta.json();

        // 2. Localizamos el contenedor en el HTML
        const contenedor = document.getElementById('grid-apuntes');
        contenedor.innerHTML = ""; // Limpiar mensaje de carga

        // 3. Generamos las tarjetas dinámicamente
        apuntes.forEach(asig => {
            const cardHTML = `
                <article class="card">
                    <span class="badge">${asig.estado}</span>
                    <h3>${asig.siglas}</h3>
                    <p>${asig.nombre}</p>
                    <small style="display:block; margin-bottom:15px; color:#d1d1d1;">
                        ${asig.descripcion}
                    </small>
                    <a href="${asig.enlace}" class="btn">ACCEDER A DATOS</a>
                </article>
            `;
            contenedor.innerHTML += cardHTML;
        });

        console.log("✅ Sistemas de datos sincronizados.");
    } catch (error) {
        console.error("❌ Error en la matriz de datos:", error);
        document.getElementById('grid-apuntes').innerHTML = "<p>Error en la transmisión de datos.</p>";
    }
}

// Iniciar al cargar la ventana
window.onload = inicializarArchivo;;
