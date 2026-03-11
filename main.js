/**
 * MOTOR ACADÉMICO S.I.L.V.A. - VERSIÓN FINAL GOLD 2026
 * Diccionario Inteligente + Simulador 30Q + Dashboards Pro
 */

// 1. DICCIONARIO DE COMANDOS (PARA EL BUSCADOR)
const comandoDiccionario = {
    "ping": { desc: "ICMP: Comprueba conectividad entre nodos.", cat: "PAR" },
    "traceroute": { desc: "Muestra la ruta y saltos de los paquetes.", cat: "PAR" },
    "nslookup": { desc: "Consulta registros en servidores DNS.", cat: "PAR" },
    "netstat": { desc: "Muestra conexiones activas y puertos abiertos.", cat: "PAR" },
    "chmod": { desc: "Linux: Cambia permisos (Lectura/Escritura/Ejecución).", cat: "ISO" },
    "chown": { desc: "Linux: Cambia el propietario de un archivo.", cat: "ISO" },
    "grep": { desc: "Filtra líneas de texto que coinciden con un patrón.", cat: "ISO" },
    "sudo": { desc: "Ejecuta comandos con privilegios de root.", cat: "ISO" },
    "select": { desc: "SQL: Recupera registros de una tabla.", cat: "GBD" },
    "insert": { desc: "SQL: Añade nuevas filas a una tabla.", cat: "GBD" },
    "truncate": { desc: "SQL: Vacía la tabla sin borrar su estructura (DDL).", cat: "GBD" },
    "rollback": { desc: "SQL: Revierte una transacción no confirmada.", cat: "GBD" },
    "xml": { desc: "Lenguaje de Marcas para transporte de datos.", cat: "LMSGI" },
    "rss": { desc: "Formato XML para sindicación de contenidos.", cat: "LMSGI" },
    "flexbox": { desc: "Modelo de diseño CSS para layouts flexibles.", cat: "LMSGI" },
    "raid 5": { desc: "Distribución con paridad. Tolera fallo de 1 disco.", cat: "FH" },
    "sai": { desc: "Sistema de alimentación ininterrumpida (Batería).", cat: "FH" },
    "uefi": { desc: "Interfaz moderna de firmware sucesora de BIOS.", cat: "FH" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN
const preguntasTest = [
    { q: "¿Capa OSI donde operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Capa OSI de los Switches?", a: "2", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Protocolo para asignar IPs dinámicas?", a: "dhcp", cat: "PAR" },
    { q: "¿Máscara /24 en formato decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Comando Linux para ver la ruta actual?", a: "pwd", cat: "ISO" },
    { q: "¿Directorio de configuración del sistema en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para crear una carpeta?", a: "mkdir", cat: "ISO" },
    { q: "¿Comando para ver procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Símbolo del usuario root en el prompt?", a: "#", cat: "ISO" },
    { q: "¿Sentencia SQL para borrar una tabla?", a: "drop table", cat: "GBD" },
    { q: "¿Cláusula SQL para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Clave que identifica unívocamente una fila?", a: "primary key", cat: "GBD" },
    { q: "¿Operación SQL para unir dos tablas?", a: "join", cat: "GBD" },
    { q: "¿Qué significa la 'A' en las propiedades ACID?", a: "atomicidad", cat: "GBD" },
    { q: "¿Etiqueta HTML para listas ordenadas?", a: "ol", cat: "LMSGI" },
    { q: "¿Qué significa CSS?", a: "cascading style sheets", cat: "LMSGI" },
    { q: "¿Etiqueta raíz de un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Atributo para abrir enlace en pestaña nueva?", a: "_blank", cat: "LMSGI" },
    { q: "¿Lenguaje de consulta de XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Nivel de RAID 'Espejo'?", a: "1", cat: "FH" },
    { q: "¿Memoria volátil del PC?", a: "ram", cat: "FH" },
    { q: "¿Componente que suministra energía?", a: "fuente de alimentacion", cat: "FH" },
    { q: "¿En qué sistema numérico se basa el Hexadecimal?", a: "16", cat: "FH" },
    { q: "¿Siglas del Centro de Proceso de Datos?", a: "cpd", cat: "FH" },
    { q: "¿Protocolo de correo entrante (puerto 110)?", a: "pop3", cat: "PAR" },
    { q: "¿Comando Linux para borrar un archivo?", a: "rm", cat: "ISO" },
    { q: "¿Atributo HTML para el texto alternativo de imagen?", a: "alt", cat: "LMSGI" },
    { q: "¿Nivel de RAID que suma capacidades sin seguridad?", a: "0", cat: "FH" },
    { q: "¿Puerto por defecto de una base de datos MySQL?", a: "3306", cat: "GBD" }
];

// 3. LÓGICA DE INICIO Y BÚSQUEDA
async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');
    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            // Notificación de comando
            if (comandoDiccionario[val]) {
                mostrarNotificacion(comandoDiccionario[val].desc, comandoDiccionario[val].cat);
            }
            // Filtrado de tarjetas
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) { console.error("Error crítico."); }
}

// 4. RENDERIZADO
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">Abrir Materiales</button>
        </article>
    `).join('');
    html += `<article class="card" style="border: 2px dashed #cbd5e1; background: #f1f5f9;"><h2>Simulador 30Q</h2><p>Entrenamiento intensivo ASIR.</p><button onclick="iniciarTest()" class="btn" style="background: #64748b;">Iniciar Simulacro</button></article>`;
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
            { id: 6, t: "Routing", f: "ud6_routerCisco.pdf" }
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
            { id: 1, t: "Sistemas", f: "ud1_sistemas_informaticos.pdf" },
            { id: 2, t: "Rep. Info", f: "ud2_representacion_comunicacion.pdf" },
            { id: 3, t: "Arquitectura", f: "ud3_arquitectura_ordenador.pdf" },
            { id: 4, t: "Componentes", f: "ud4_componentesOrdenador.pdf" },
            { id: 5, t: "CPD/RAID", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3", f: "ud4_css.pdf" },
            { id: 5, t: "Sindicación", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div style="margin-bottom: 2rem; max-width: 1200px; margin: auto;"><button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:#64748b; width:150px;">< Volver</button></div>
            <div class="dashboard-container">
                <div class="sidebar">
                    <h3 style="margin-top:0;">Unidades</h3>
                    ${unidades.map(u => `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')"><strong>UD ${u.id}</strong><br><small>${u.t}</small></div>`).join('')}
                </div>
                <div id="visor-pdf"><div style="text-align:center; padding-top:300px; color:#cbd5e1;"><p>📂 Seleccione unidad</p></div></div>
            </div>`;
    } else {
        contenedor.innerHTML = `<button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">< Volver</button><iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:none; margin-top:1rem;"></iframe>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj, cat) {
    const col = { 'PAR': '#3b82f6', 'GBD': '#10b981', 'ISO': '#8b5cf6', 'LMSGI': '#f59e0b', 'FH': '#ef4444' };
    const color = col[cat] || '#64748b';
    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:20px; right:20px; background:#fff; padding:15px; border-left:5px solid ${color}; border-radius:8px; box-shadow: 0 10px 15px rgba(0,0,0,0.1); z-index:1000; font-size:0.9rem;`;
    aviso.innerHTML = `<strong style="color:${color}">[${cat}]</strong> ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => { aviso.style.opacity="0"; setTimeout(()=>aviso.remove(), 500); }, 4000);
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR - ${p.cat}]\n\n${p.q}`);
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ CORRECTO.");
        else alert(`❌ INCORRECTO. Era: ${p.a}`);
    }
}

window.onload = cargarSistema;
