/**
 * S.I.L.V.A. ACADEMY CORE - VERSIÓN DEFINITIVA
 * Estética MoureDev // Funcionalidad Enterprise
 */

// 1. DICCIONARIO DE COMANDOS (NOTIFICACIONES EN BUSCADOR)
const comandoDiccionario = {
    "ping": { desc: "ICMP: Comprueba conectividad entre equipos de red.", cat: "REDES" },
    "traceroute": { desc: "Muestra la ruta y saltos de los paquetes hasta el destino.", cat: "REDES" },
    "nslookup": { desc: "Consulta registros en servidores de nombres DNS.", cat: "REDES" },
    "chmod": { desc: "Linux: Modificación de permisos de archivos y directorios.", cat: "SISTEMAS" },
    "chown": { desc: "Linux: Cambio del propietario de un archivo.", cat: "SISTEMAS" },
    "grep": { desc: "Buscador de patrones de texto dentro de ficheros.", cat: "SISTEMAS" },
    "select": { desc: "SQL: Sentencia de recuperación de datos (DML).", cat: "DATOS" },
    "truncate": { desc: "SQL: Vaciado de tabla sin eliminar su estructura (DDL).", cat: "DATOS" },
    "rollback": { desc: "SQL: Deshacer una transacción no confirmada.", cat: "DATOS" },
    "xml": { desc: "Lenguaje de Marcas Extensible para transporte de datos.", cat: "WEB" },
    "rss": { desc: "Sindicación de contenidos basada en XML.", cat: "WEB" },
    "raid 5": { desc: "Almacenamiento con paridad distribuida. Mínimo 3 discos.", cat: "HARDWARE" },
    "sai": { desc: "Sistema de alimentación ininterrumpida (Batería de respaldo).", cat: "HARDWARE" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN
const preguntasTest = [
    { q: "¿En qué capa del modelo OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo asigna direcciones IP automáticamente?", a: "dhcp", cat: "PAR" },
    { q: "¿Cuál es el puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Cómo se escribe la máscara /24 en decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Qué protocolo traduce nombres de dominio a IPs?", a: "dns", cat: "PAR" },
    { q: "¿Comando Linux para ver la ruta del directorio actual?", a: "pwd", cat: "ISO" },
    { q: "¿En qué directorio se guardan las configuraciones en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Qué comando muestra procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Qué símbolo identifica al superusuario (root) en el terminal?", a: "#", cat: "ISO" },
    { q: "¿Qué comando cambia los permisos de un archivo?", a: "chmod", cat: "ISO" },
    { q: "¿Sentencia SQL para eliminar una tabla completa?", a: "drop table", cat: "GBD" },
    { q: "¿Qué cláusula SQL se usa para filtrar registros?", a: "where", cat: "GBD" },
    { q: "¿Cómo se llama la clave que identifica de forma única una fila?", a: "primary key", cat: "GBD" },
    { q: "¿Qué propiedad asegura que una transacción es indivisible?", a: "atomicidad", cat: "GBD" },
    { q: "¿Qué sentencia SQL añade registros a una tabla?", a: "insert", cat: "GBD" },
    { q: "¿Etiqueta HTML para listas ordenadas?", a: "ol", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Qué atributo de la etiqueta <a> define el destino del enlace?", a: "href", cat: "LMSGI" },
    { q: "¿Lenguaje para realizar consultas en documentos XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Etiqueta raíz obligatoria en un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Qué nivel de RAID se conoce como 'Espejo'?", a: "1", cat: "FH" },
    { q: "¿Cómo se llama la memoria volátil del sistema?", a: "ram", cat: "FH" },
    { q: "¿Qué sistema numérico utiliza la base 16?", a: "hexadecimal", cat: "FH" },
    { q: "¿Siglas de Centro de Proceso de Datos?", a: "cpd", cat: "FH" },
    { q: "¿Qué RAID requiere al menos 3 discos y usa paridad?", a: "5", cat: "FH" },
    { q: "¿Cuál es el puerto estándar del protocolo SSH?", a: "22", cat: "PAR" },
    { q: "¿Qué comando Linux crea un nuevo directorio?", a: "mkdir", cat: "ISO" },
    { q: "¿Sentencia SQL para actualizar datos existentes?", a: "update", cat: "GBD" },
    { q: "¿Qué etiqueta HTML define el título de la pestaña?", a: "title", cat: "LMSGI" },
    { q: "¿Siglas de la Unidad Central de Procesamiento?", a: "cpu", cat: "FH" }
];

// 3. CARGA DE SISTEMA Y BUSCADOR
async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (comandoDiccionario[val]) {
                const info = comandoDiccionario[val];
                mostrarNotificacion(info.desc, info.cat);
            }
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) {
        console.error("Fallo de sistema al cargar JSON.");
    }
}

// 4. NOTIFICACIONES ESTILO ACADEMY
function mostrarNotificacion(msj, cat) {
    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:30px; right:30px; background:#1a1a1a; color:#fff; 
                   padding:1.5rem; border-radius:12px; border:2px solid #00a3ff; 
                   z-index:2000; box-shadow: 0 20px 40px rgba(0,0,0,0.5); font-weight:500;`;
    aviso.innerHTML = `<span style="color:#00a3ff; font-weight:900; margin-right:10px;">●</span> [${cat}] ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => { aviso.style.opacity = "0"; setTimeout(() => aviso.remove(), 500); }, 4000);
}

// 5. RENDERIZADO DE LA PORTADA
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div>
                <span style="color:var(--accent); font-weight:800; font-size:0.75rem; letter-spacing:1px;">CURSO // ACTIVO</span>
                <h2>${asig.siglas}</h2>
                <p>${asig.nombre}</p>
            </div>
            <button onclick="navegarA('${asig.siglas}')" class="btn">Empezar a estudiar</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="background: var(--accent); color: white; border:none;">
            <div>
                <span style="color:rgba(255,255,255,0.7); font-weight:800; font-size:0.75rem;">AUTOEVALUACIÓN</span>
                <h2 style="color:white">Simulador 30Q</h2>
                <p style="color:white">Pon a prueba tus conocimientos con el simulador de examen.</p>
            </div>
            <button onclick="iniciarTest()" class="btn" style="background:white; color:var(--accent)">Iniciar Test</button>
        </article>`;
    contenedor.innerHTML = html;
}

// 6. DASHBOARDS Y GESTIÓN DE PDFS
function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    let unidades = [];
    let carpeta = "";

    if (siglas === 'PAR') {
        carpeta = "Redes";
        unidades = [
            { id: 1, t: "Caracterización", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI / TCP-IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Wireless", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Switching", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Routing", f: "ud6_routerCisco.pdf" },
            { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
        ];
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "SQL: DDL", f: "ud1_DDL.pdf" },
            { id: 2, t: "SQL: DML", f: "ud2_comandosSQL.pdf" },
            { id: 3, t: "SQL: Consultas", f: "ud3_consultas.pdf" },
            { id: 4, t: "SQL: Subconsultas", f: "ud4_subConsultas.pdf" }
        ];
    } else if (siglas === 'FH') {
        carpeta = "Hardware";
        unidades = [
            { id: 1, t: "Sistemas", f: "ud1_sistemas_informaticos.pdf" },
            { id: 2, t: "Rep. Info", f: "ud2_representacion_comunicacion.pdf" },
            { id: 3, t: "Arquitectura", f: "ud3_arquitectura_ordenador.pdf" },
            { id: 4, t: "Componentes", f: "ud4_componentesOrdenador.pdf" },
            { id: 5, t: "CPD / RAID", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3", f: "ud4_css.pdf" },
            { id: 5, t: "Sindicación RSS", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div class="dashboard-container">
                <div class="sidebar">
                    <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:transparent; border:1px solid #333; margin-bottom:2rem; width:100%; color:white;">< Volver</button>
                    ${unidades.map(u => `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')"><strong>UD ${u.id}</strong><br><small>${u.t}</small></div>`).join('')}
                </div>
                <div id="visor-pdf"><p style="color:#444; text-align:center; margin-top:40vh;">Selecciona un tema para empezar</p></div>
            </div>`;
    } else {
        contenedor.innerHTML = `<div style="padding:2rem; text-align:center;"><button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">Volver</button><br><br><iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:1px solid #333; border-radius:12px;"></iframe></div>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR]\nÁREA: ${p.cat}\n\n${p.q}`);
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ ¡Correcto!");
        else alert(`❌ Incorrecto. La solución era: ${p.a}`);
    }
}

window.onload = cargarSistema;
