/**
 * SISTEMA OPERATIVO DE APUNTES - SR. SILVA
 */
const comandoDiccionario = {
    "ping": { desc: "ICMP: Test de conectividad.", cat: "PAR" },
    "osi": { desc: "Modelo de 7 capas de red.", cat: "PAR" },
    "ls": { desc: "Listado de directorios Linux.", cat: "ISO" }
};

const preguntasTest = [
    { q: "¿Capa OSI donde operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Comando para ver manuales en Linux?", a: "man", cat: "ISO" }
];

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            if (comandoDiccionario[val]) {
                const cmd = comandoDiccionario[val];
                mostrarNotificacion(cmd.desc, cmd.cat);
            }
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">ERROR DE ENLACE AL NÚCLEO</p>`;
    }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">INICIAR SESIÓN</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="border: 1px dashed var(--cobre);">
            <div class="badge" style="color:var(--cobre)">SIMULACIÓN</div>
            <h2>ENTRENAMIENTO</h2>
            <button onclick="iniciarTest()" class="btn">INICIAR TEST</button>
        </article>`;
    contenedor.innerHTML = html;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    
    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, t: "Redes: Caracterización", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" }
        ];
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< VOLVER</button>
            <h2 style="color:var(--cian); margin: 20px 0;">SISTEMA DE REDES > ACCESO</h2>
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px;">
                <div>${unidades.map(u => `
                    <div class="card" style="margin-bottom:10px; cursor:pointer;" onclick="cargarVisor('./Redes/${u.f}')">
                        <small class="badge">UD ${u.id}</small>
                        <h4>${u.t}</h4>
                    </div>`).join('')}
                </div>
                <div id="visor-pdf"><p style="text-align:center; padding-top:200px;">ESPERANDO SELECCIÓN...</p></div>
            </div>`;
    } else {
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< VOLVER</button>
            <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:1px solid var(--cian); background:#fff; margin-top:20px;"></iframe>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj, cat) {
    let aviso = document.createElement('div');
    const color = cat === 'PAR' ? 'var(--cian)' : 'var(--cobre)';
    aviso.style = `position:fixed; bottom:20px; right:20px; background:#000; color:${color}; 
                   padding:15px; border:2px solid ${color}; font-family:monospace; box-shadow: 0 0 15px ${color}; z-index:1000;`;
    aviso.innerHTML = `> [${cat}]: ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 4000);
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[SISTEMA DE TEST]\n\n${p.q}`);
    if (r && r.toLowerCase() === p.a.toLowerCase()) mostrarNotificacion("CONCEDIDO.", p.cat);
    else mostrarNotificacion("DENEGADO.", "ERR");
}

window.onload = cargarSistema;
