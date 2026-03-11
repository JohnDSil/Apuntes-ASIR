/**
 * ARCHIVO MECÁNICO - MOTOR VERSIÓN OMEGA
 * Buscador + Dashboard Interactivo Total
 */

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        
        // Render inicial
        renderizarPortada(window.datosAsignaturas);

        // Lógica del buscador
        inputBuscador.addEventListener('input', (e) => {
            const termino = e.target.value.toLowerCase();
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(termino) || 
                a.siglas.toLowerCase().includes(termino)
            );
            renderizarPortada(filtrados);
        });

    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">⚠️ ERROR DE MATRIZ: ${error.message}</p>`;
    }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    contenedor.innerHTML = datos.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER A LA UNIDAD</button>
        </article>
    `).join('');
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    
    let contenidoDashboard = "";

    if (siglas === 'PAR') {
        // Dashboard de Redes (PDFs)
        const unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" }
        ];
        contenidoDashboard = crearDashboardHTML(siglas, unidades, "Redes");
    } 
    else if (siglas === 'GBD') {
        // Dashboard de Bases de Datos
        const unidades = [
            { id: 1, t: "Introducción a las BBDD", f: "introduccion.pdf" },
            { id: 2, t: "Modelo Entidad-Relación", f: "entidad_relacion.pdf" },
            { id: 3, t: "Modelo Relacional", f: "relacional.pdf" }
        ];
        contenidoDashboard = crearDashboardHTML(siglas, unidades, "BBDD");
    } 
    else {
        // Por defecto: README
        contenidoDashboard = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:20px;">⬅ VOLVER</button>
            <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:1px solid var(--cobre); background:white;"></iframe>`;
    }

    contenedor.innerHTML = contenidoDashboard;
}

function crearDashboardHTML(siglas, unidades, carpeta) {
    return `
        <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:20px;">⬅ VOLVER AL MENÚ</button>
        <h2 style="color:var(--cian)">📂 DASHBOARD: ${siglas}</h2>
        <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px;">
            <div id="lista-unidades">
                ${unidades.map(u => `
                    <div class="card" style="margin-bottom:10px; cursor:pointer;" onclick="cargarVisor('./${carpeta}/${u.f}')">
                        <small class="badge">UD ${u.id}</small>
                        <h4 style="margin:5px 0;">${u.t}</h4>
                    </div>
                `).join('')}
            </div>
            <div id="visor-pdf" style="border:2px solid var(--cobre); height:600px; background:#111;">
                <p style="text-align:center; padding-top:200px; color:var(--cobre);">Seleccione un archivo del terminal</p>
            </div>
        </div>`;
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

window.onload = cargarSistema;

