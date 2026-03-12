/**
 * S.I.L.V.A. OS - VERSIÓN FINAL INTEGRAL 6.2
 * Desarrollado para: Sr. Silva // Academia ASIR
 * Funciones: Diccionario, Simulador 30Q, Calculadora IP, Logs y Temarios.
 */

// 1. DICCIONARIO TÉCNICO CON NOTIFICACIÓN
const comandoDiccionario = {
    "calc": { desc: "Iniciando Calculadora de Redes e Infraestructura.", cat: "HERRAMIENTA" },
    "logs": { desc: "Alternando visibilidad del monitor de actividad.", cat: "SISTEMA" },
    "modo lectura": { desc: "Filtro de alto contraste para estudio nocturno.", cat: "UX" },
    "limpiar": { desc: "Purgando caché de progreso local del navegador.", cat: "DB" },
    "ping": { desc: "ICMP: Comprueba conectividad y latencia entre nodos.", cat: "PAR" },
    "chmod": { desc: "Linux: Modifica permisos (Lectura, Escritura, Ejecución).", cat: "ISO" },
    "chown": { desc: "Linux: Cambia el propietario de un archivo o directorio.", cat: "ISO" },
    "select": { desc: "SQL: Sentencia DML para recuperar registros de una tabla.", cat: "GBD" },
    "truncate": { desc: "SQL: Vacía una tabla sin borrar su estructura (DDL).", cat: "GBD" },
    "xml": { desc: "Marcas: Lenguaje de marcado para transporte de datos.", cat: "LMSGI" },
    "rss": { desc: "Marcas: Sindicación de contenidos basada en XML.", cat: "LMSGI" },
    "raid 5": { desc: "Hardware: Paridad distribuida. Mínimo 3 discos. Tolera 1 fallo.", cat: "FH" },
    "sai": { desc: "Hardware: Sistema de Alimentación Ininterrumpida (UPS).", cat: "FH" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN
const preguntasTest = [
    { q: "¿En qué capa OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs automáticamente?", a: "dhcp", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Máscara /24 en decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Protocolo para resolución de nombres?", a: "dns", cat: "PAR" },
    { q: "¿Comando Linux para ver la ruta actual?", a: "pwd", cat: "ISO" },
    { q: "¿Directorio de configuración global en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Símbolo del usuario root en el prompt?", a: "#", cat: "ISO" },
    { q: "¿Comando para borrar un archivo en Linux?", a: "rm", cat: "ISO" },
    { q: "¿Sentencia SQL para borrar una tabla completa?", a: "drop table", cat: "GBD" },
    { q: "¿Cláusula SQL para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Clave que identifica unívocamente una fila?", a: "primary key", cat: "GBD" },
    { q: "¿Propiedad ACID que asegura transacciones indivisibles?", a: "atomicidad", cat: "GBD" },
    { q: "¿Sentencia para añadir datos a una tabla?", a: "insert", cat: "GBD" },
    { q: "¿Etiqueta HTML para listas ordenadas?", a: "ol", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Atributo HTML para el destino de un enlace?", a: "href", cat: "LMSGI" },
    { q: "¿Lenguaje de consulta de nodos XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Etiqueta raíz obligatoria de un canal RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Nivel de RAID 'Espejo'?", a: "1", cat: "FH" },
    { q: "¿Memoria volátil del PC?", a: "ram", cat: "FH" },
    { q: "¿Sistema numérico base 16?", a: "hexadecimal", cat: "FH" },
    { q: "¿Siglas del Centro de Proceso de Datos?", a: "cpd", cat: "FH" },
    { q: "¿Qué RAID requiere paridad y 3 discos?", a: "5", cat: "FH" },
    { q: "¿Puerto del protocolo SSH?", a: "22", cat: "PAR" },
    { q: "¿Comando Linux para crear un directorio?", a: "mkdir", cat: "ISO" },
    { q: "¿Sentencia SQL para modificar datos?", a: "update", cat: "GBD" },
    { q: "¿Etiqueta HTML para el título de la pestaña?", a: "title", cat: "LMSGI" },
    { q: "¿Siglas de la Unidad Central de Procesamiento?", a: "cpu", cat: "FH" }
];

// 3. GESTIÓN DE ESTADOS (TIEMPO Y PROGRESO)
let startTime = Date.now();
let progreso = JSON.parse(localStorage.getItem('silva_progreso')) || {};

setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    let m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    let s = (elapsed % 60).toString().padStart(2, '0');
    if(document.getElementById('uptime-clock')) document.getElementById('uptime-clock').innerText = `${h}:${m}:${s}`;
}, 1000);

// 4. SISTEMA DE LOGS Y NOTIFICACIONES VISUALES
function addLog(msg) {
    const logs = document.getElementById('console-logs');
    if (!logs) return;
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="color:#555">[${new Date().toLocaleTimeString()}]</span> <span style="color:var(--accent)">></span> ${msg}`;
    logs.appendChild(entry);
    logs.scrollTop = logs.scrollHeight;
}

function mostrarNotificacion(msg, cat) {
    const vieja = document.getElementById('notificacion-silva');
    if (vieja) vieja.remove();
    const toast = document.createElement('div');
    toast.id = 'notificacion-silva';
    toast.style = `position:fixed; top:20px; right:20px; background:#111; border:2px solid var(--accent); padding:1rem; border-radius:8px; z-index:9999; box-shadow:0 0 20px rgba(0,163,255,0.4); min-width:250px; color:white;`;
    toast.innerHTML = `<div style="font-size:0.7rem; color:var(--accent); font-weight:bold; margin-bottom:5px;">[${cat}] DEFINICIÓN</div><div>${msg}</div>`;
    document.body.appendChild(toast);
    setTimeout(() => { if(toast) toast.remove(); }, 4000);
}

// 5. CALCULADORA IP FUNCIONAL
function ejecutarCalculo() {
    const input = document.getElementById('ip-input').value;
    const resDiv = document.getElementById('calc-result');
    try {
        const [ip, mask] = input.split('/');
        const hosts = Math.pow(2, 32 - parseInt(mask)) - 2;
        resDiv.innerHTML = `<span style="color:var(--accent)">RED:</span> ${ip}<br><span style="color:var(--accent)">HOSTS ÚTILES:</span> ${hosts < 0 ? 0 : hosts.toLocaleString()}`;
        addLog(`Cálculo de infraestructura completado para /${mask}`);
    } catch(e) { resDiv.innerHTML = "Error: Use IP/Máscara"; }
}

// 6. CARGA DE SISTEMA Y TEMARIOS COMPLETOS
async function cargarSistema() {
    const res = await fetch('./apuntes.json');
    window.datosAsignaturas = await res.json();
    renderizarPortada(window.datosAsignaturas);
    addLog("SISTEMA S.I.L.V.A. TOTALMENTE OPERATIVO.");

    document.getElementById('buscador').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        if (comandoDiccionario[val]) {
            const cmd = comandoDiccionario[val];
            mostrarNotificacion(cmd.desc, cmd.cat);
            addLog(cmd.desc);
            if (val === "calc") document.getElementById('modal-calc').style.display = 'block';
            if (val === "modo lectura") {
                const v = document.getElementById('visor-pdf');
                if(v) v.style.filter = v.style.filter ? "" : "invert(90%) hue-rotate(180deg)";
            }
        }
        const filtrados = window.datosAsignaturas.filter(a => 
            a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
        );
        renderizarPortada(filtrados);
    });
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    contenedor.innerHTML = datos.map(asig => `
        <article class="card">
            <div><span style="color:var(--accent); font-weight:800; font-size:0.75rem;">MÓDULO ASIR</span>
            <h2>${asig.siglas}</h2><p>${asig.nombre}</p></div>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER</button>
        </article>
    `).join('') + `
        <article class="card" style="border: 1px dashed var(--accent);">
            <div><h2>Simulador</h2><p>Test de 30 preguntas de examen.</p></div>
            <button onclick="iniciarTest()" class="btn">INICIAR TEST</button>
        </article>`;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    addLog(`Cargando temarios completos de ${siglas}...`);

    let unidades = [];
    let carpeta = "";

    switch(siglas) {
        case 'PAR':
            carpeta = "Redes";
            unidades = [
                {id:1, t:"Caracterización de Redes", f:"ud1_caracterizacionRedes%20(1).pdf"},
                {id:2, t:"Modelo OSI y TCP/IP", f:"ud2_modelosOSI-TCPIP%20(1).pdf"},
                {id:3, t:"Direccionamiento IP", f:"ud3_direccionamientoIP%20(1).pdf"},
                {id:4, t:"Capa Física", f:"ud4_tecnologiaInalambrica.pdf"},
                {id:5, t:"Switching (Cisco)", f:"ud5_switchesCisco.pdf"},
                {id:6, t:"Routing (Cisco)", f:"ud6_routerCisco.pdf"}
            ];
            break;
        case 'GBD':
            carpeta = "Base de Datos";
            unidades = [
                {id:1, t:"DDL y SQL Intro", f:"ud1_DDL.pdf"},
                {id:2, t:"Comandos SQL", f:"ud2_comandosSQL.pdf"},
                {id:3, t:"Consultas Select", f:"ud3_consultas.pdf"},
                {id:4, t:"Avanzadas y Joins", f:"ud4_subConsultas.pdf"},
                {id:5, t:"Programación BBDD", f:"README.md"}
            ];
            break;
        case 'FH':
            carpeta = "Hardware";
            unidades = [
                {id:1, t:"Sistemas Informáticos", f:"ud1_sistemas_informaticos.pdf"},
                {id:2, t:"Rep. Información", f:"ud2_representacion_comunicacion.pdf"},
                {id:3, t:"Arquitectura PC", f:"ud3_arquitectura_ordenador.pdf"},
                {id:4, t:"Componentes", f:"ud4_componentesOrdenador.pdf"},
                {id:5, t:"RAID, SAI y CPD", f:"ud5_CPD-Servidor-RAID-SAI.pdf"}
            ];
            break;
        case 'LMSGI':
            carpeta = "Lenguaje de Marcas";
            unidades = [
                {id:1, t:"XML y DTD", f:"ud1_XML.pdf"},
                {id:2, t:"XPath y XQuery", f:"ud2_xpathXquery.pdf"},
                {id:3, t:"HTML5 Profesional", f:"ud3_HTML.pdf"},
                {id:4, t:"CSS3 Estilos", f:"ud4_css.pdf"},
                {id:5, t:"Sindicación RSS", f:"ud5_javascript.pdf"}
            ];
            break;
        case 'ISO':
            carpeta = "Sistemas";
            unidades = [
                {id:1, t:"Intro a S.O.", f:"README.md"},
                {id:3, t:"Admin Linux/Win", f:"README.md"},
                {id:5, t:"Seguridad", f:"README.md"}
            ];
            break;
    }

    contenedor.innerHTML = `
        <div class="dashboard-container">
            <div class="sidebar">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="width:100%; margin-bottom:1rem; background:#222;">VOLVER</button>
                ${unidades.map(u => {
                    const uid = `${siglas}-${u.id}`;
                    const icon = progreso[uid] ? '✅' : '⭕';
                    return `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}', '${u.t}')">
                        <span onclick="event.stopPropagation(); toggleProgreso('${uid}','${siglas}')">${icon}</span> UD${u.id}: ${u.t}
                    </div>`
                }).join('')}
            </div>
            <div id="visor-pdf"><p style="text-align:center; margin-top:35vh; color:#333;">RECURSO LISTO</p></div>
        </div>`;
}

function toggleProgreso(id, siglas) {
    progreso[id] = !progreso[id];
    localStorage.setItem('silva_progreso', JSON.stringify(progreso));
    navegarA(siglas);
}

function cargarVisor(ruta, titulo) {
    addLog(`Desplegando recurso: ${titulo}`);
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. TEST]\n\n${p.q}`);
    if (r && r.toLowerCase().trim() === p.a.toLowerCase()) {
        alert("✅ CORRECTO");
        addLog(`Acierto en test: ${p.q}`);
    } else {
        alert(`❌ ERROR. Era: ${p.a}`);
        addLog(`Fallo en test: ${p.q}`);
    }
}

window.onload = cargarSistema;
