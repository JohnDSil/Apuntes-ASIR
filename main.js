/**
 * SISTEMA OPERATIVO DE APUNTES ALPHA - SR. SILVA
 */

const comandoDiccionario = {
    "ping": { desc: "ICMP: Diagnóstico de conectividad.", cat: "PAR" },
    "chmod": { desc: "Cambio de permisos en Linux.", cat: "ISO" },
    "select": { desc: "DML: Recuperación de datos en SQL.", cat: "GBD" },
    "bios": { desc: "Sistema básico de entrada/salida.", cat: "FH" }
};

const preguntasTest = [
    { q: "¿En qué capa OSI trabaja un Switch?", a: "2", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs dinámicas?", a: "dhcp", cat: "PAR" },
    { q: "¿Comando Linux para ver el manual?", a: "man", cat: "ISO" },
    { q: "¿Símbolo del directorio raíz en Linux?", a: "/", cat: "ISO" },
    { q: "¿Cláusula SQL para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Sentencia SQL para borrar datos sin borrar la tabla?", a: "truncate", cat: "GBD" },
    { q: "¿Qué memoria pierde los datos al apagar el equipo?", a: "ram", cat: "FH" },
    { q: "¿Qué etiqueta HTML se usa para enlaces?", a: "a", cat: "LMSGI" },
    { q: "¿Puerto por defecto del protocolo HTTP?", a: "80", cat: "PAR" },
    { q: "¿Qué componente es el cerebro del PC?", a: "cpu", cat: "FH" }
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
            if (comandoDiccionario[val]) mostrarNotificacion(comandoDiccionario[val].desc, comandoDiccionario[val].cat);
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">ERROR DE CONEXIÓN CON EL SERVIDOR</p>`;
    }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div class="badge">SEC_LEVEL: 01</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER AL NÚCLEO</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="border-color: var(--rojo);">
            <div class="badge" style="background:var(--rojo)">WAR_GAME</div>
            <h2>SIMULACIÓN TEST</h2>
            <button onclick="iniciarTest()" class="btn" style="border-color:var(--rojo); color:var(--rojo)">INICIAR PRUEBA</button>
        </article>`;
    contenedor.innerHTML = html;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    
    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI / TCP-IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Switches Cisco", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routers Cisco", f: "ud6_routerCisco.pdf" }
        ];
        contenedor.innerHTML = generarDashboard(siglas, unidades, "Redes");
    } else {
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< VOLVER</button>
            <h2 style="color:var(--cian)">${siglas} > DOCUMENTACIÓN</h2>
            <iframe src="./${siglas}/README.md" style="width:100%; height:700px; border:2px solid var(--cian); background:#fff; margin-top:20px;"></iframe>`;
    }
}

function generarDashboard(siglas, unidades, carpeta) {
    return `
        <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="width:200px;">< VOLVER</button>
        <h2 style="color:var(--cian)">${siglas} > ARCHIVOS PDF</h2>
        <div style="display:grid; grid-template-columns: 1fr 3fr; gap:20px; margin-top:20px;">
            <div>${unidades.map(u => `<div class="card" style="margin-bottom:10px; cursor:pointer;" onclick="cargarVisor('./${carpeta}/${u.f}')"><small>UD ${u.id}</small><br>${u.t}</div>`).join('')}</div>
            <div id="visor-pdf"><p style="text-align:center; padding-top:300px;">SELECCIONE MÓDULO DE DATOS</p></div>
        </div>`;
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj, cat) {
    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:20px; left:20px; background:#000; color:var(--cian); padding:20px; border:1px solid var(--cian); z-index:1000; box-shadow: 0 0 20px var(--cian);`;
    aviso.innerHTML = `> [${cat}] INFO: ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 5000);
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. TEST - ${p.cat}]\n\n${p.q}`);
    if (r && r.toLowerCase() === p.a.toLowerCase()) alert("ACCESO CONCEDIDO: CORRECTO");
    else alert("ACCESO DENEGADO: ERROR");
}

window.onload = cargarSistema;
