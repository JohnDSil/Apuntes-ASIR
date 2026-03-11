/**
 * MOTOR ACADÉMICO S.I.L.V.A. - VERSION FINAL 2026
 * Dashboard Full: PAR, GBD, FH, LMSGI (5 Unidades)
 */

// 1. BANCO DE PREGUNTAS (30 cuestiones clave)
const preguntasTest = [
    { q: "¿En qué capa del modelo OSI opera un Router?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs automáticas?", a: "dhcp", cat: "PAR" },
    { q: "¿Qué significa RSS?", a: "really simple syndication", cat: "LMSGI" },
    { q: "¿Cuál es la etiqueta raíz de un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Qué formato se usa para sindicar contenidos además de RSS?", a: "atom", cat: "LMSGI" },
    { q: "¿Sentencia SQL para borrar una tabla completa de la base de datos?", a: "drop table", cat: "GBD" },
    { q: "¿Qué nivel de RAID requiere al menos 3 discos y ofrece paridad?", a: "5", cat: "FH" },
    { q: "¿Comando Linux para ver los procesos en ejecución?", a: "top", cat: "ISO" },
    { q: "¿Qué puerto usa el protocolo DNS?", a: "53", cat: "PAR" },
    { q: "¿Cuál es la extensión de un archivo de hojas de estilo?", a: ".css", cat: "LMSGI" }
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
    } catch (e) { console.error("Error crítico de acceso."); }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER AL NÚCLEO</button>
        </article>
    `).join('');
    html += `<article class="card" style="border: 2px dashed #3b82f6; background: #f8fafc;"><h2>SIMULADOR FINAL</h2><p>Ponte a prueba con 30 cuestiones aleatorias.</p><button onclick="iniciarTest()" class="btn" style="background: #1e293b;">Iniciar Test</button></article>`;
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
            { id: 1, t: "Caracterización", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "OSI / TCP-IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Wireless", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Switching", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routing", f: "ud6_routerCisco.pdf" },
            { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
        ];
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "DDL", f: "ud1_DDL.pdf" },
            { id: 2, t: "SQL", f: "ud2_comandosSQL.pdf" },
            { id: 3, t: "Consultas", f: "ud3_consultas.pdf" },
            { id: 4, t: "Subconsultas", f: "ud4_subConsultas.pdf" }
        ];
    } else if (siglas === 'FH') {
        carpeta = "Hardware";
        unidades = [
            { id: 1, t: "Sistemas Inf.", f: "ud1_sistemas_informaticos.pdf" },
            { id: 2, t: "Representación", f: "ud2_representacion_comunicacion.pdf" },
            { id: 3, t: "Arquitectura PC", f: "ud3_arquitectura_ordenador.pdf" },
            { id: 4, t: "Componentes", f: "ud4_componentesOrdenador.pdf" },
            { id: 5, t: "CPD, RAID y SAI", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML y DTD", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath y XSLT", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3", f: "ud4_css.pdf" },
            { id: 5, t: "Sindicación (RSS)", f: "ud5_javascript.pdf" } // Nota: Renombrado a sindicación si sube el archivo correspondiente
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div style="margin-bottom: 2rem; max-width: 1200px; margin: auto; padding: 0 1rem;"><button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:#64748b; width:150px;">< Volver</button></div>
            <div class="dashboard-container">
                <div class="sidebar">
                    <h3 style="margin-top:0;">Unidades</h3>
                    ${unidades.map(u => `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')"><strong style="color:#3b82f6;">UD ${u.id}</strong><br><small>${u.t}</small></div>`).join('')}
                </div>
                <div id="visor-pdf"><div style="text-align:center; padding-top:300px; color:#cbd5e1;"><p>📂 Selecciona un módulo de datos</p></div></div>
            </div>`;
    } else {
        contenedor.innerHTML = `<div style="margin: auto; max-width: 1200px;"><button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< Volver</button><iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:none; margin-top:2rem;"></iframe></div>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR - ${p.cat}]\n\n${p.q}`);
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ CORRECTO.");
        else alert(`❌ INCORRECTO. La solución es: ${p.a}`);
    }
}

window.onload = cargarSistema;
