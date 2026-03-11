
/**
 * S.I.L.V.A. OS - VERSIÓN TOTAL INTEGRAL 2026
 * Contiene: 30 Preguntas, Diccionario Expandido, Calculadora Real y Temario Completo ASIR.
 */

// 1. DICCIONARIO TÉCNICO COMPLETO (Actualizado)
const comandoDiccionario = {
    "ping": { desc: "ICMP: Comprueba conectividad entre equipos.", cat: "REDES" },
    "traceroute": { desc: "Muestra la ruta y saltos de paquetes hasta el destino.", cat: "REDES" },
    "chmod": { desc: "Linux: Modificación de permisos (Ej: chmod 777 archivo).", cat: "SISTEMAS" },
    "chown": { desc: "Linux: Cambio de propietario de un archivo o carpeta.", cat: "SISTEMAS" },
    "grep": { desc: "Filtro de búsqueda de patrones en texto o archivos.", cat: "SISTEMAS" },
    "select": { desc: "SQL: Sentencia DML para recuperar registros.", cat: "DATOS" },
    "raid 5": { desc: "Distribución con paridad. Mínimo 3 discos. Tolera fallo de 1.", cat: "HARDWARE" },
    "sai": { desc: "Sistema de alimentación ininterrumpida para evitar apagones.", cat: "HARDWARE" },
    "calc": { desc: "Iniciando Calculadora de Redes / Subnetting.", cat: "SISTEMA" },
    "modo lectura": { desc: "Alternando filtro de inversión cromática para estudio.", cat: "UX" }
};

// 2. BANCO DE 30 PREGUNTAS DE EXAMEN
const preguntasTest = [
    { q: "¿En qué capa OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs automáticas?", a: "dhcp", cat: "PAR" },
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

// 3. VARIABLES DE ESTADO
let progreso = JSON.parse(localStorage.getItem('silva_progreso')) || {};
let startTime = Date.now();

// 4. FUNCIONES DE INTERFAZ
function addLog(msg) {
    const logs = document.getElementById('console-logs');
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="color:#555">[${new Date().toLocaleTimeString()}]</span> > ${msg}`;
    logs.appendChild(entry);
    logs.scrollTop = logs.scrollHeight;
}

setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    let m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    let s = (elapsed % 60).toString().padStart(2, '0');
    if(document.getElementById('uptime-clock')) document.getElementById('uptime-clock').innerText = `${h}:${m}:${s}`;
}, 1000);

// 5. CALCULADORA IP
function ejecutarCalculo() {
    const input = document.getElementById('ip-input').value;
    const resDiv = document.getElementById('calc-result');
    try {
        const [ip, mask] = input.split('/');
        const hosts = Math.pow(2, 32 - parseInt(mask)) - 2;
        resDiv.innerHTML = `<span style="color:var(--accent)">RED:</span> ${ip}<br><span style="color:var(--accent)">HOSTS:</span> ${hosts < 0 ? 0 : hosts.toLocaleString()}`;
        addLog(`Cálculo completado para ${input}`);
    } catch(e) { resDiv.innerHTML = "Error: Use IP/MASK"; }
}

// 6. CARGA DE ASIGNATURAS Y UNIDADES COMPLETAS
async function cargarSistema() {
    const res = await fetch('./apuntes.json');
    window.datosAsignaturas = await res.json();
    renderizarPortada(window.datosAsignaturas);
    addLog("SISTEMA TOTAL DESPLEGADO. Unidades actualizadas.");

    document.getElementById('buscador').addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        if (val === "calc") document.getElementById('modal-calc').style.display = 'block';
        if (val === "modo lectura") {
            const v = document.getElementById('visor-pdf');
            if(v) v.style.filter = v.style.filter ? "" : "invert(90%) hue-rotate(180deg)";
        }
        if (comandoDiccionario[val]) addLog(comandoDiccionario[val].desc);
        
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
            <button onclick="iniciarTest()" class="btn">INICIAR</button>
        </article>`;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    addLog(`Cargando temarios de ${siglas}...`);

    let unidades = [];
    let carpeta = "";

    // MAPEO EXTENDIDO DE UNIDADES (Sr. Silva, aquí están todas)
    switch(siglas) {
        case 'PAR':
            carpeta = "Redes";
            unidades = [
                {id:1, t:"Caracterización de Redes", f:"ud1_caracterizacionRedes.pdf"},
                {id:2, t:"Modelo OSI y TCP/IP", f:"ud2_modelosOSI-TCPIP.pdf"},
                {id:3, t:"Direccionamiento IP", f:"ud3_direccionamientoIP.pdf"},
                {id:4, t:"Capa Física", f:"ud4_capafisica.pdf"},
                {id:5, t:"Switching (Cisco)", f:"ud5_switchesCisco.pdf"},
                {id:6, t:"Routing (Cisco)", f:"ud6_routerCisco.pdf"}
            ];
            break;
        case 'GBD':
            carpeta = "Base de Datos";
            unidades = [
                {id:1, t:"Almacenamiento e Intro SQL", f:"ud1_DDL.pdf"},
                {id:2, t:"Comandos SQL", f:"ud2_comandosSQL.pdf"},
                {id:3, t:"Consultas (Select)", f:"ud3_consultas.pdf"},
                {id:4, t:"Subconsultas y Joins", f:"ud4_subConsultas.pdf"},
                {id:5, t:"PL/SQL e Intro Programación", f:"ud5_plsql.pdf"}
            ];
            break;
        case 'FH':
            carpeta = "Hardware";
            unidades = [
                {id:1, t:"Sistemas Informáticos", f:"ud1_sistemas_informaticos.pdf"},
                {id:2, t:"Componentes Internos", f:"ud2_componentes.pdf"},
                {id:3, t:"Arquitectura Ordenador", f:"ud3_arquitectura_ordenador.pdf"},
                {id:4, t:"Periféricos", f:"ud4_perifericos.pdf"},
                {id:5, t:"RAID, SAI y CPD", f:"ud5_CPD-Servidor-RAID-SAI.pdf"}
            ];
            break;
        case 'LMSGI':
            carpeta = "Lenguaje de Marcas";
            unidades = [
                {id:1, t:"XML y DTD", f:"ud1_XML.pdf"},
                {id:2, t:"Estructura de Datos", f:"ud2_estructuras.pdf"},
                {id:3, t:"HTML5 y CSS3", f:"ud3_HTML.pdf"},
                {id:4, t:"XSLT y XPath", f:"ud4_xslt.pdf"},
                {id:5, t:"RSS y JavaScript", f:"ud5_javascript.pdf"}
            ];
            break;
        case 'ISO':
            carpeta = "Sistemas";
            unidades = [
                {id:1, t:"Intro Sistemas Operativos", f:"ud1_introduccion.pdf"},
                {id:2, t:"Arquitectura y Gestión", f:"ud2_gestion.pdf"},
                {id:3, t:"Instalación y Configuración", f:"ud3_instalacion.pdf"},
                {id:4, t:"Sistemas de Archivos", f:"ud4_archivos.pdf"},
                {id:5, t:"Administración Linux/Win", f:"ud5_admin.pdf"}
            ];
            break;
    }

    contenedor.innerHTML = `
        <div class="dashboard-container">
            <div class="sidebar">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="width:100%; margin-bottom:1rem; background:#333;">VOLVER</button>
                ${unidades.map(u => {
                    const uid = `${siglas}-${u.id}`;
                    const icon = progreso[uid] ? '✅' : '⭕';
                    return `<div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}', '${u.t}')">
                        <span onclick="event.stopPropagation(); toggleProgreso('${uid}','${siglas}')">${icon}</span> UD${u.id}: ${u.t}
                    </div>`
                }).join('')}
            </div>
            <div id="visor-pdf"><p style="text-align:center; margin-top:35vh; color:#333;">SELECCIONE UNIDAD</p></div>
        </div>`;
}

function toggleProgreso(id, siglas) {
    progreso[id] = !progreso[id];
    localStorage.setItem('silva_progreso', JSON.stringify(progreso));
    navegarA(siglas);
}

function cargarVisor(ruta, titulo) {
    addLog(`Cargando: ${titulo}`);
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. TEST]\n\n${p.q}`);
    if (r && r.toLowerCase().trim() === p.a.toLowerCase()) {
        alert("✅ CORRECTO");
        addLog(`Test superado: ${p.q}`);
    } else {
        alert(`❌ ERROR. Era: ${p.a}`);
        addLog(`Test fallido: ${p.q}`);
    }
}

window.onload = cargarSistema;
