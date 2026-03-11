/**
 * ARCHIVO MECÁNICO - MOTOR DE NAVEGACIÓN SPA
 * Versión Blindada para el Sr. Silva
 */

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    try {
        const res = await fetch('./apuntes.json');
        if (!res.ok) throw new Error('Fallo en la matriz de datos');
        window.datosAsignaturas = await res.json();
        renderizarPortada();
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red; text-align:center;">⚠️ ERROR DE SISTEMA: ${error.message}</p>`;
    }
}

function renderizarPortada() {
    const contenedor = document.getElementById('grid-apuntes');
    // Forzamos el diseño de cuadrícula para la portada
    contenedor.style.display = "grid"; 
    contenedor.innerHTML = window.datosAsignaturas.map(asig => `
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
    // Cambiamos a bloque para que el dashboard ocupe todo el ancho
    contenedor.style.display = "block"; 
    
    let contenidoExtra = "";

    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI y TCP/IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnologías Inalámbricas", f: "ud4_tecnologialnalambrica.pdf" },
            { id: 5, t: "Switches Cisco", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routers Cisco", f: "ud6_routerCisco.pdf" }
        ];

        contenidoExtra = `
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px; margin-top:20px;">
                <div id="lista-unidades">
                    ${unidades.map(u => `
                        <div class="card" style="margin-bottom:10px; cursor:pointer; border-color:var(--cian);" 
                             onclick="cargarVisor('./Redes/${u.f}')">
                            <small class="badge">UD ${u.id}</small>
                            <h4 style="margin:5px 0; font-size:0.9em;">${u.t}</h4>
                        </div>
                    `).join('')}
                </div>
                <div id="visor-pdf" style="border:2px solid var(--cobre); height:600px; background:#333; display:flex; align-items:center; justify-content:center;">
                    <p style="color:var(--cobre)">⬅ Seleccione una unidad para iniciar la lectura</p>
                </div>
            </div>
        `;
    } else {
        // Fallback para otras asignaturas (ISO, LMSGI...)
        contenidoExtra = `
            <div style="margin-top:20px;">
                <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:2px solid var(--cobre); background:#fff;"></iframe>
            </div>
        `;
    }

    contenedor.innerHTML = `
        <button onclick="renderizarPortada()" class="btn" style="margin-bottom:20px;">⬅ VOLVER AL MENÚ PRINCIPAL</button>
        <h2 style="color:var(--cian); border-bottom:1px solid var(--cobre); padding-bottom:10px;">📂 DASHBOARD: ${siglas}</h2>
        ${contenidoExtra}
    `;
}

function cargarVisor(ruta) {
    const visor = document.getElementById('visor-pdf');
    // Usamos <embed> para visualizar el PDF directamente
    visor.innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

// Punto de entrada del programa
window.onload = cargarSistema;
