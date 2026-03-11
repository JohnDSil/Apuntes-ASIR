/**
 * S.I.L.V.A. ENTERPRISE - MASTER CORE ENGINE
 * Versión Final 2026: Dashboard Multidisciplinar + Diccionario + Simulador 30Q
 */

// 1. DICCIONARIO TÉCNICO CORPORATIVO
const comandoDiccionario = {
    "ping": { desc: "ICMP: Diagnóstico de conectividad de red.", cat: "NET" },
    "traceroute": { desc: "Muestra la ruta y saltos de paquetes hasta el destino.", cat: "NET" },
    "nslookup": { desc: "Consulta registros en servidores DNS.", cat: "NET" },
    "chmod": { desc: "Linux: Modificación de permisos de ficheros/directorios.", cat: "SYS" },
    "chown": { desc: "Linux: Cambio de propietario de un archivo.", cat: "SYS" },
    "grep": { desc: "Filtro de búsqueda de patrones en texto.", cat: "SYS" },
    "select": { desc: "SQL: Operación de recuperación de registros (DML).", cat: "DATA" },
    "truncate": { desc: "SQL: Vaciado rápido de tabla sin eliminar estructura (DDL).", cat: "DATA" },
    "rollback": { desc: "SQL: Reversión de transacciones no confirmadas.", cat: "DATA" },
    "xml": { desc: "Extensible Markup Language: Transporte de datos estructurados.", cat: "WEB" },
    "rss": { desc: "Really Simple Syndication: Sindicación de contenidos vía XML.", cat: "WEB" },
    "raid 5": { desc: "Almacenamiento con paridad distribuida. Mínimo 3 discos.", cat: "STG" },
    "sai": { desc: "Sistema de alimentación ininterrumpida (UPS).", cat: "STG" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN (ALTA DIFICULTAD)
const preguntasTest = [
    { q: "¿En qué capa OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo asigna direcciones IP dinámicamente?", a: "dhcp", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Máscara /24 en formato decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Protocolo para resolución de nombres de dominio?", a: "dns", cat: "PAR" },
    { q: "¿Comando Linux para ver la ruta actual?", a: "pwd", cat: "ISO" },
    { q: "¿Directorio de configuración global en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Símbolo del usuario root en el prompt?", a: "#", cat: "ISO" },
    { q: "¿Comando para cambiar permisos?", a: "chmod", cat: "ISO" },
    { q: "¿Sentencia SQL para borrar una tabla completa?", a: "drop table", cat: "GBD" },
    { q: "¿Cláusula SQL para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Clave que identifica unívocamente una fila?", a: "primary key", cat: "GBD" },
    { q: "¿Propiedad ACID que asegura transacciones indivisibles?", a: "atomicidad", cat: "GBD" },
    { q: "¿Sentencia para añadir datos a una tabla?", a: "insert", cat: "GBD" },
    { q: "¿Etiqueta HTML para listas ordenadas?", a: "ol", cat: "LMSGI" },
    { q: "¿Siglas de eXtensible Markup Language?", a: "xml", cat: "LMSGI" },
    { q: "¿Atributo HTML para enlaces externos?", a: "href", cat: "LMSGI" },
    { q: "¿Lenguaje de consulta de nodos XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Etiqueta raíz obligatoria de un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Nivel de RAID conocido como 'Espejo'?", a: "1", cat: "FH" },
    { q: "¿Memoria volátil del ordenador?", a: "ram", cat: "FH" },
    { q: "¿Sistema numérico base 16?", a: "hexadecimal", cat: "FH" },
    { q: "¿Siglas del Centro de Proceso de Datos?", a: "cpd", cat: "FH" },
    { q: "¿Qué nivel de RAID requiere paridad y 3 discos?", a: "5", cat: "FH" },
    { q: "¿Puerto del protocolo SSH?", a: "22", cat: "PAR" },
    { q: "¿Comando Linux para crear un directorio?", a: "mkdir", cat: "ISO" },
    { q: "¿Sentencia SQL para modificar datos?", a: "update", cat: "GBD" },
    { q: "¿Etiqueta HTML para el título de la pestaña?", a: "title", cat: "LMSGI" },
    { q: "¿Siglas de la Unidad Central de Procesamiento?", a: "cpu", cat: "FH" }
];

// 3. INICIALIZACIÓN Y MOTOR DE BÚSQUEDA
async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            // Notificación de comando inteligente
            if (comandoDiccionario[val]) {
                mostrarNotificacion(comandoDiccionario[val].desc, comandoDiccionario[val].cat);
            }
            // Filtrado de recursos
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) {
        console.error("Critical System Failure: Matrix not found.");
    }
}

// 4. SISTEMA DE NOTIFICACIONES CORPORATIVAS
function mostrarNotificacion(msj, cat) {
    let toast = document.createElement('div');
    toast.style = `position:fixed; bottom:24px; right:24px; background:#1e293b; color:#fff; 
                   padding:1rem; border-radius:8px; border:1px solid #0ea5e9; 
                   font-size:0.85rem; z-index:2000; box-shadow: 0 10px 15px rgba(0,0,0,0.4); 
                   font-family: 'Segoe UI', sans-serif; transition: opacity 0.5s;`;
    toast.innerHTML = `<span style="color:#0ea5e9; font-weight:bold;">[${cat}_INFO]</span> ${msj}`;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 500); }, 4000);
}

// 5. RENDERIZADO DE LA CONSOLA PRINCIPAL
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <p style="margin:0; font-size:0.7rem; color:#0ea5e9; font-weight:bold; letter-spacing:1px;">CORE_MODULE // ACTIVE</p>
            <h2 style="margin: 0.5rem 0;">${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">Deploy Console</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="background: rgba(14, 165, 233, 0.05); border: 1px dashed #0ea5e9;">
            <p style="margin:0; font-size:0.7rem; color:#0ea5e9; font-weight:bold;">TRAINING_PROTOCOLS</p>
            <h2>Simulador 30Q</h2>
            <p>Ejecutar protocolo de autoevaluación certificada.</p>
            <button onclick="iniciarTest()" class="btn" style="background:transparent; border:1px solid #0ea5e9; color:#0ea5e9">Start Simulation</button>
        </article>`;
    contenedor.innerHTML = html;
}

// 6. DASHBOARDS ESPECÍFICOS Y VISOR
function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    let unidades = [];
    let carpeta = "";

    // Mapeo de recursos por módulo
    if (siglas === 'PAR') {
        carpeta = "Redes";
        unidades = [
            { id: 1, t: "Redes: Caracterización", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI / TCP-IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Switches Cisco", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routers Cisco", f: "ud6_routerCisco.pdf" },
            { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
        ];
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "SQL: Lenguaje DDL", f: "ud1_DDL.pdf" },
            { id: 2, t: "SQL: Manipulación", f: "ud2_comandosSQL.pdf" },
            { id: 3, t: "SQL: Consultas", f: "ud3_consultas.pdf" },
            { id: 4, t: "SQL: Subconsultas", f: "ud4_subConsultas.pdf" }
        ];
    } else if (siglas === 'FH') {
        carpeta = "Hardware";
        unidades = [
            { id: 1, t: "Sistemas Informáticos", f: "ud1_sistemas_informaticos.pdf" },
            { id: 2, t: "Rep. Información", f: "ud2_representacion_comunicacion.pdf" },
            { id: 3, t: "Arquitectura PC", f: "ud3_arquitectura_ordenador.pdf" },
            { id: 4, t: "Componentes", f: "ud4_componentesOrdenador.pdf" },
            { id: 5, t: "CPD, RAID y SAI", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML y Marcación", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath / Consultas", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5 Estructura", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3 Diseño", f: "ud4_css.pdf" },
            { id: 5, t: "Sindicación RSS", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div class="dashboard-container">
                <div class="sidebar">
                    <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:2rem; background:rgba(255,255,255,0.05); color:#fff; width:100%; border:1px solid #444;">&lt; Back to Console</button>
                    <h4 style="color:#94a3b8; text-transform:uppercase; font-size:0.7rem; letter-spacing:1px; margin-bottom:1rem;">Available Modules</h4>
                    ${unidades.map(u => `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')">UD ${u.id}: ${u.t}</div>`).join('')}
                </div>
                <div id="visor-pdf" style="background:#000;"><p style="color:#444">AWAITING RESOURCE DEPLOYMENT...</p></div>
            </div>`;
    } else {
        // Fallback para módulos sin unidades PDF definidas (ISO, etc.)
        contenedor.innerHTML = `
            <div style="padding:2rem; max-width:1200px; margin:auto;">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:2rem; background:#444;">&lt; Return to Hub</button>
                <iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:1px solid rgba(255,255,255,0.1); border-radius:8px;"></iframe>
            </div>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULATOR]\nSEC_DOMAIN: ${p.cat}\n\nQUERY: ${p.q}`);
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ PROTOCOL SUCCESS: Data valid.");
        else alert(`❌ PROTOCOL FAILURE: Correct string was "${p.a}"`);
    }
}

// ARRANQUE DE SISTEMA
window.onload = cargarSistema;
