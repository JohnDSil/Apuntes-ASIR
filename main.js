/**
 * ARCHIVO MECÁNICO - MOTOR SPA
 * Sistema verificado para el Sr. Silva
 */

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    try {
        const res = await fetch('./apuntes.json');
        if (!res.ok) throw new Error('No se pudo cargar apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada();
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">⚠️ ERROR: ${error.message}</p>`;
    }
}

function renderizarPortada() {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    contenedor.innerHTML = window.datosAsignaturas.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER</button>
        </article>
    `).join('');
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    
    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI y TCP/IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnologías Inalámbricas", f: "ud4_tecnologialnalambrica.pdf" },
            { id: 5, t: "Switches Cisco", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routers Cisco", f: "ud6_routerCisco.pdf" }
        ];

        contenedor.innerHTML = `
            <button onclick="renderizarPortada()" class="btn" style="margin-bottom:20px;">⬅ VOLVER</button>
            <h2 style="color:var(--cian)">📂 DASHBOARD: REDES</h2>
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px;">
                <div id="lista-unidades">
                    ${unidades.map(u => `
                        <div class="card" style="margin-bottom:10px; cursor:pointer;" onclick="cargarVisor('./Redes/${u.f}')">
                            <small class="badge">UD ${u.id}</small>
                            <h4 style="margin:5px 0;">${u.t}</h4>
                        </div>
                    `).join('')}
                </div>
                <div id="visor-pdf" style="border:2px solid var(--cobre); height:600px; background:#222;">
                    <p style="text-align:center; padding-top:200px;">Seleccione una unidad</p>
                </div>
            </div>`;
    } else {
        contenedor.innerHTML = `
            <button onclick="renderizarPortada()" class="btn" style="margin-bottom:20px;">⬅ VOLVER</button>
            <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:2px solid var(--cobre); background:white;"></iframe>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

window.onload = cargarSistema;
