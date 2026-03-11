/**
 * SISTEMA OPERATIVO S.I.L.V.A. - VERSIÓN ULTRA FINAL
 * Dashboard LMSGI + Banco de 20 Preguntas + Estética Quantum
 */

const preguntasTest = [
    // --- REDES (PAR) ---
    { q: "¿Capa OSI donde operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Capa OSI de los Switches?", a: "2", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Protocolo para resolución de nombres de dominio?", a: "dns", cat: "PAR" },
    { q: "¿Qué protocolo usa el comando 'ping'?", a: "icmp", cat: "PAR" },
    
    // --- SISTEMAS (ISO) ---
    { q: "¿Comando para cambiar permisos en Linux?", a: "chmod", cat: "ISO" },
    { q: "¿Comando para cambiar el dueño de un archivo?", a: "chown", cat: "ISO" },
    { q: "¿Directorio donde residen las configuraciones en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Cómo se llama el intérprete de comandos por defecto en Ubuntu?", a: "bash", cat: "ISO" },

    // --- BASES DE DATOS (GBD) ---
    { q: "¿Siglas de Structured Query Language?", a: "sql", cat: "GBD" },
    { q: "¿Sentencia para añadir datos a una tabla?", a: "insert", cat: "GBD" },
    { q: "¿Sentencia para modificar datos existentes?", a: "update", cat: "GBD" },
    { q: "¿Clave que relaciona dos tablas?", a: "foreign key", cat: "GBD" },
    { q: "¿Propiedad que asegura que una transacción se hace o no se hace?", a: "atomicidad", cat: "GBD" },

    // --- LENGUAJES DE MARCAS (LMSGI) ---
    { q: "¿Etiqueta para crear una lista no ordenada?", a: "ul", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Lenguaje para realizar consultas sobre documentos XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Atributo para enlazar un archivo CSS externo?", a: "href", cat: "LMSGI" },
    { q: "¿Etiqueta raíz de un documento HTML?", a: "html", cat: "LMSGI" }
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
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) { console.error("Error crítico de sistema."); }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div class="badge">SISTEMA_ACTIVO</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER AL NÚCLEO</button>
        </article>
    `).join('');
    html += `<article class="card" style="border: 2px dashed var(--rojo);"><div class="badge" style="background:var(--rojo)">WAR_GAME</div><h2>TEST FINAL</h2><button onclick="iniciarTest()" class="btn" style="border-color:var(--rojo); color:var(--rojo)">INICIAR SIMULACIÓN</button></article>`;
    contenedor.innerHTML = html;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    let unidades = [];
    let carpeta = "";

    if (siglas === 'PAR') {
        carpeta = "Redes";
        unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI / TCP-IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Switches Cisco", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routers Cisco", f: "ud6_routerCisco.pdf" }
            { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML y Estructuras", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath y XQuery", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5: Estructura", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3: Estilo", f: "ud4_css.pdf" },
            { id: 5, t: "Introducción JS", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="width:200px;">< VOLVER</button>
            <h2 style="color:var(--cian)">${siglas} > DASHBOARD INTERACTIVO</h2>
            <div style="display:grid; grid-template-columns: 1fr 3fr; gap:20px; margin-top:20px;">
                <div>${unidades.map(u => `<div class="card" style="margin-bottom:10px; cursor:pointer; padding:10px;" onclick="cargarVisor('./${carpeta}/${u.f}')"><small>UD ${u.id}</small><br>${u.t}</div>`).join('')}</div>
                <div id="visor-pdf" style="border:2px solid var(--cian); height:750px; background:#000;"><p style="text-align:center; padding-top:350px;">ESPERANDO MÓDULO DE DATOS...</p></div>
            </div>`;
    } else {
        contenedor.innerHTML = `<button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< VOLVER</button><h2 style="color:var(--cian)">${siglas} > README</h2><iframe src="./${siglas}/README.md" style="width:100%; height:750px; border:2px solid var(--cian); background:#fff; margin-top:20px;"></iframe>`;
    }
}

function cargarVisor(ruta) { document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`; }

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. EXAM SIMULATOR]\nASIGNATURA: ${p.cat}\n\nPREGUNTA: ${p.q}`);
    if (r && r.toLowerCase() === p.a.toLowerCase()) alert("SUCCESS: Respuesta correcta. Nivel de acceso aumentado.");
    else alert(`FAILURE: Respuesta incorrecta. La solución era: ${p.a}`);
}

window.onload = cargarSistema;
