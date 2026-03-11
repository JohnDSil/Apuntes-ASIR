async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    try {
        const res = await fetch('./apuntes.json');
        const datos = await res.json();

        window.datosAsignaturas = datos; // Guardamos para uso posterior
        renderizarPortada();

    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">⚠️ ERROR: ${error.message}</p>`;
    }
}

function renderizarPortada() {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.innerHTML = window.datosAsignaturas.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="verDetalle('${asig.siglas}')" class="btn">ACCEDER A DATOS</button>
        </article>
    `).join('');
}

function verDetalle(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    
    // Si es REDES (PAR), mostramos los PDFs de forma interactiva
    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, titulo: "Caracterización de Redes", file: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, titulo: "Modelo OSI y TCP/IP", file: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, titulo: "Direccionamiento IP", file: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, titulo: "Tecnologías Inalámbricas", file: "ud4_tecnologialnalambrica.pdf" },
            { id: 5, titulo: "Switches Cisco", file: "ud5_switchesCisco.pdf" },
            { id: 6, titulo: "Routers Cisco", file: "ud6_routerCisco.pdf" }
        ];

        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: left;">
                <button onclick="renderizarPortada()" class="btn" style="margin-bottom:20px;">⬅ VOLVER</button>
                <h2 style="color:var(--cian)">🌐 ARCHIVO DE REDES (PAR)</h2>
                <div id="subgrid" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:15px;">
                    ${unidades.map(u => `
                        <div class="card" style="border-color:var(--cian)">
                            <small class="badge">UNIDAD 0${u.id}</small>
                            <h4 style="margin:10px 0">${u.titulo}</h4>
                            <a href="./Redes/${u.file}" target="_blank" class="btn" style="font-size:0.8em">ABRIR PDF</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        contenedor.innerHTML = `
            <div style="grid-column: 1 / -1;">
                <button onclick="renderizarPortada()" class="btn">⬅ VOLVER</button>
                <p>Accediendo al README de ${siglas}...</p>
                <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:1px solid var(--cobre); background: white;"></iframe>
            </div>
        `;
    }
}

window.onload = cargarSistema;
