/**
 * S.I.L.V.A. ENTERPRISE - NÚCLEO MAESTRO (VERSIÓN ESPAÑOL)
 * Dashboard Profesional + Diccionario Inteligente + Simulador de Examen 30Q
 */

// 1. DICCIONARIO TÉCNICO DE COMANDOS
const comandoDiccionario = {
    "ping": { desc: "ICMP: Diagnóstico de conectividad entre equipos de red.", cat: "REDES" },
    "traceroute": { desc: "Muestra la ruta y los saltos de los paquetes hasta el destino.", cat: "REDES" },
    "nslookup": { desc: "Consulta registros en servidores de nombres DNS.", cat: "REDES" },
    "chmod": { desc: "Linux: Modificación de permisos de archivos y directorios.", cat: "SISTEMAS" },
    "chown": { desc: "Linux: Cambio del propietario de un archivo o carpeta.", cat: "SISTEMAS" },
    "grep": { desc: "Buscador de patrones de texto dentro de ficheros.", cat: "SISTEMAS" },
    "select": { desc: "SQL: Sentencia de recuperación de datos (DML).", cat: "DATOS" },
    "truncate": { desc: "SQL: Vaciado de tabla sin eliminar su estructura (DDL).", cat: "DATOS" },
    "rollback": { desc: "SQL: Deshacer una transacción no confirmada (COMMIT).", cat: "DATOS" },
    "xml": { desc: "Lenguaje de Marcas Extensible para transporte de datos.", cat: "WEB" },
    "rss": { desc: "Sindicación de contenidos basada en XML.", cat: "WEB" },
    "raid 5": { desc: "Almacenamiento con paridad distribuida. Mínimo 3 discos.", cat: "HARDWARE" },
    "sai": { desc: "Sistema de alimentación ininterrumpida (Batería de respaldo).", cat: "HARDWARE" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN (ASIR 1º)
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
    { q: "¿Etiqueta HTML para listas ordenadas (1, 2, 3...)?", a: "ol", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Qué atributo de la etiqueta <a> define el destino del enlace?", a: "href", cat: "LMSGI" },
    { q: "¿Lenguaje para realizar consultas en documentos XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Etiqueta raíz obligatoria en un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Qué nivel de RAID se conoce como 'Espejo' o 'Mirroring'?", a: "1", cat: "FH" },
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
            // Notificación inteligente
            if (comandoDiccionario[val]) {
                const info = comandoDiccionario[val];
                mostrarNotificacion(info.desc, info.cat);
            }
            // Filtrado de tarjetas
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) {
        console.error("Fallo crítico: No se ha podido cargar la matriz de datos.");
    }
}

// 4. NOTIFICACIONES DE CONSOLA
function mostrarNotificacion(msj, cat) {
    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:24px; right:24px; background:#1e293b; color:#fff; 
                   padding:1rem; border-radius:8px; border:1px solid #0ea5e9; 
                   font-size:0.85rem; z-index:2000; box-shadow: 0 10px 15px rgba(0,0,0,0.4); 
                   font-family: sans-serif; transition: opacity 0.5s;`;
    aviso.innerHTML = `<span style="color:#0ea5e9; font-weight:bold;">[INFO_${cat}]</span> ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => { aviso.style.opacity = "0"; setTimeout(() => aviso.remove(), 500); }, 4000);
}

// 5. RENDERIZADO DE LA INTERFAZ PRINCIPAL
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <p style="margin:0; font-size:0.7rem; color:#0ea5e9; font-weight:bold; letter-spacing:1px;">MÓDULO // ACTIVO</p>
            <h2 style="margin: 0.5rem 0;">${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">Desplegar Consola</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="background: rgba(14, 165, 233, 0.05); border: 1px dashed #0ea5e9;">
            <p style="margin:0; font-size:0.7rem; color:#0ea5e9; font-weight:bold;">PROTOCOLOS_ENTRENAMIENTO</p>
            <h2>Simulador 30Q</h2>
            <p>Iniciar cuestionario de autoevaluación técnica.</p>
            <button onclick="iniciarTest()" class="btn" style="background:transparent; border:1px solid #0ea5e9; color:#0ea5e9">Iniciar Simulación</button>
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
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI y TCP/IP", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" },
            { id: 5, t: "Conmutación (Switching)", f: "ud5_switchesCisco.pdf" },
            { id: 6, t: "Enrutamiento (Routing)", f: "ud6_routerCisco.pdf" },
            { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
        ];
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "SQL: Definición de Datos (DDL)", f: "ud1_DDL.pdf" },
            { id: 2, t: "SQL: Manipulación (DML)", f: "ud2_comandosSQL.pdf" },
            { id: 3, t: "Consultas de Selección", f: "ud3_consultas.pdf" },
            { id: 4, t: "Subconsultas y Uniones", f: "ud4_subConsultas.pdf" }
        ];
    } else if (siglas === 'FH') {
        carpeta = "Hardware";
        unidades = [
            { id: 1, t: "Sistemas Informáticos", f: "ud1_sistemas_informaticos.pdf" },
            { id: 2, t: "Representación de la Info.", f: "ud2_representacion_comunicacion.pdf" },
            { id: 3, t: "Arquitectura del Ordenador", f: "ud3_arquitectura_ordenador.pdf" },
            { id: 4, t: "Componentes Físicos", f: "ud4_componentesOrdenador.pdf" },
            { id: 5, t: "Servidores, RAID y SAI", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML y Marcación Estructurada", f: "ud1_XML.pdf" },
            { id: 2, t: "Consultas XPath y XSLT", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "Desarrollo con HTML5", f: "ud3_HTML.pdf" },
            { id: 4, t: "Estilos con CSS3", f: "ud4_css.pdf" },
            { id: 5, t: "Sindicación de Contenidos (RSS)", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div class="dashboard-container">
                <div class="sidebar">
                    <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:2rem; background:rgba(255,255,255,0.05); color:#fff; width:100%; border:1px solid #444;">&lt; Volver al Panel</button>
                    <h4 style="color:#94a3b8; text-transform:uppercase; font-size:0.7rem; letter-spacing:1px; margin-bottom:1rem;">Recursos Disponibles</h4>
                    ${unidades.map(u => `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')">UD ${u.id}: ${u.t}</div>`).join('')}
                </div>
                <div id="visor-pdf" style="background:#000;"><p style="color:#444">ESPERANDO DESPLIEGUE DE RECURSO...</p></div>
            </div>`;
    } else {
        contenedor.innerHTML = `
            <div style="padding:2rem; max-width:1200px; margin:auto;">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:2rem; background:#444;">&lt; Volver al Hub</button>
                <iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:1px solid rgba(255,255,255,0.1); border-radius:8px;"></iframe>
            </div>`;
    }
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR]\nÁREA: ${p.cat}\n\nPREGUNTA: ${p.q}`);
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ ÉXITO DE PROTOCOLO: Respuesta válida.");
        else alert(`❌ ERROR DE PROTOCOLO: La respuesta correcta era "${p.a}"`);
    }
}

// ARRANQUE DE LA CONSOLA
window.onload = cargarSistema;
