async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    try {
        const res = await fetch('./apuntes.json');
        if (!res.ok) throw new Error('No se pudo conectar con el núcleo de datos');
        const datos = await res.json();

        contenedor.innerHTML = datos.map(asig => `
            <article class="card">
                <div class="badge">${asig.estado}</div>
                <h2>${asig.siglas}</h2>
                <p>${asig.nombre}</p>
                <a href="${asig.enlace}" class="btn">ACCEDER</a>
            </article>
        `).join('');

    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">⚠️ ERROR: ${error.message}</p>`;
    }
}

window.onload = cargarSistema;
