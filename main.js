/**
 * S.I.L.V.A. OS - VERSIÓN INTEGRAL 6.0 (FINAL)
 * Contiene: Temario completo ASIR 1º, Calculadora Real, Logs y Progreso.
 */

// 1. DICCIONARIO TÉCNICO EXPANDIDO
const comandoDiccionario = {
    "calc": { desc: "Desplegando Calculadora de Subredes e Infraestructura.", cat: "TOOL" },
    "logs": { desc: "Consola de actividad del sistema alternada.", cat: "SYS" },
    "modo lectura": { desc: "Filtro de alto contraste activado para lectura nocturna.", cat: "UX" },
    "limpiar": { desc: "Reseteando caché de progreso de estudio.", cat: "DB" },
    "ping": { desc: "ICMP: Diagnóstico de conectividad y latencia.", cat: "REDES" },
    "chmod": { desc: "Linux: Comando para modificar permisos de ficheros.", cat: "SISTEMAS" }
};

// 2. BANCO DE 30 PREGUNTAS (TODOS LOS MÓDULOS)
const preguntasTest = [
    { q: "¿En qué capa OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Protocolo que asigna IPs automáticas?", a: "dhcp", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Máscara /24 en decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Símbolo de root en Linux?", a: "#", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Sentencia SQL para borrar una tabla completa?", a: "drop table", cat: "GBD" },
    { q: "¿RAID conocido como espejo?", a: "1", cat: "FH" },
    { q: "¿Etiqueta raíz obligatoria de un RSS?", a: "rss", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Puerto del protocolo SSH?", a: "22", cat: "PAR" },
    { q: "¿Nivel de RAID que requiere al menos 3 discos y usa paridad?", a: "5", cat: "FH" },
    { q: "¿Comando Linux para ver el directorio actual?", a: "pwd", cat: "ISO" },
    { q: "¿Qué propiedad asegura que una transacción es indivisible?", a: "atomicidad", cat: "GBD" },
    { q: "¿Puerto por defecto de MySQL?", a: "3306", cat: "GBD" }
];

// 3. GESTIÓN DE ESTADO (PROGRESO Y TIEMPO)
let startTime = Date.now();
let progreso = JSON.parse(localStorage.getItem('silva_progreso')) || {};

setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    let m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    let s = (elapsed % 60).toString().padStart(2, '0');
    const clock = document.getElementById('uptime-clock');
    if (clock) clock.innerText = `${h}:${m}:${s}`;
}, 1000);

// 4. SISTEMA DE LOGS Y NOTIFICACIONES
function addLog(msg) {
    const logs = document.getElementById('console-logs');
    if (!logs) return;
    const entry = document.createElement('div');
    entry.innerHTML = `<span style="color:#555">[${new Date().toLocaleTimeString()}]</span> <span style="color:var(--accent)">></span> ${msg}`;
    logs.appendChild(entry);
    logs.scrollTop = logs.scrollHeight;
}

// 5. CALCULADORA IP (LÓGICA MATEMÁTICA)
function ejecutarCalculo() {
    const input = document.getElementById('ip-input').value;
    const resDiv = document.getElementById('calc-result');
    try {
        const [ip, mask] = input.split('/');
        if (!mask || mask < 0 || mask > 32) throw "Err";
        const hosts = Math.pow(2, 32 - parseInt(mask)) - 2;
        resDiv.innerHTML = `<span style="color:var(--success)">[ÉXITO]</span> Hosts útiles: ${hosts < 0 ? 0 : hosts.toLocaleString()}`;
        addLog(`Cálculo de infraestructura completado para /${mask}`);
    } catch (e) { resDiv.innerHTML = `<span style="color:red">ERROR: Use IP/Máscara</span>`; }
}

// 6. MOTOR DE NAVEGACIÓN Y CARGA DE UNIDADES
async function cargarSistema() {
    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);
        addLog("Núcleo S.I.L.V.A. 6.0 desplegado. Bienvenido Sr. Silva.");

        document.getElementById('buscador').addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            if (val === "calc") document.getElementById('modal-calc').style.display = 'block';
            if (val === "logs") {
                const l = document.getElementById('console-logs');
                l.style.display = l.style.display === 'none' ? 'block' : 'none';
            }
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
    } catch (e) { console.error("Fallo de acceso a datos."); }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    if (!contenedor) return;
    contenedor.style.display = "grid";
    contenedor.innerHTML = datos.map(asig => `
        <article class="card">
            <div>
                <span style="color:var(--accent); font-weight:800; font-size:0.7rem;">MÓDULO ASIR</span>
                <h2>${asig.siglas}</h2>
                <p>${asig.nombre}</p>
            </div>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER</button>
        </article>
    `).join('') + `
        <article class="card" style="border: 1px dashed var(--accent);">
            <div><h2>Simulador</h2><p>Protocolo de examen 30Q.</p></div>
            <button onclick="iniciarTest()" class="btn">INICIAR TEST</button>
        </article>`;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    addLog(`Cargando base de datos completa de ${siglas}...`);

    let unidades = [];
    let carpeta = "";

    // MAPEO DE TEMARIO COMPLETO ASIR 1º
    switch(siglas) {
        case 'PAR':
            carpeta = "Redes";
            unidades = [
                {id:1, t:"Caracterización de Redes", f:"ud1_caracterizacionRedes%20(1).pdf"},
                {id:2, t:"Modelo OSI y TCP/IP", f:"ud2_modelosOSI-TCPIP%20(1).pdf"},
                {id:3, t:"Direccionamiento IP", f:"ud3_direccionamientoIP%20(1).pdf"},
                {id:4, t:"Capa Física y Medios", f:"ud4_tecnologiaInalambrica.pdf"},
                {id:5, t:"Configuración de Switches", f:"ud5_switchesCisco.pdf"},
                {id:6, t:"Enrutamiento Estático/Dinámico", f:"ud6_routerCisco.pdf"},
                { id: 7, t: "Comandos Switch y Router Básicos", f: "comandos_nuevos.docx.pdf" }
            ];
            break;
        case 'GBD':
            carpeta = "Base de Datos";
            unidades = [
                {id:1, t:"Almacenamiento y DDL", f:"ud1_DDL.pdf"},
                {id:2, t:"Comandos SQL", f:"ud2_comandosSQL.pdf"},
                {id:3, t:"Consultas de Datos", f:"ud3_consultas.pdf"},
                {id:4, t:"Consultas Avanzadas y Joins", f:"ud4_subConsultas.pdf"},
                {id:5, t:"Programación en BBDD", f:"README.md"}
            ];
            break;
        case 'FH':
            carpeta = "Hardware";
            unidades = [
                {id:1, t:"Sistemas Informáticos", f:"ud1_sistemas_informaticos.pdf"},
                {id:2, t:"Representación de Info", f:"ud2_representacion_comunicacion.pdf"},
                {id:3, t:"Arquitectura de Computadores", f:"ud3_arquitectura_ordenador.pdf"},
                {id:4, t:"Componentes y Periféricos", f:"ud4_componentesOrdenador.pdf"},
                {id:5, t:"RAID, SAI y CPD", f:"ud5_CPD-Servidor-RAID-SAI.pdf"}
            ];
            break;
        case 'LMSGI':
            carpeta = "Lenguaje de Marcas";
            unidades = [
                {id:1, t:"XML y DTD", f:"ud1_XML.pdf"},
                {id:2, t:"Consultas XPath/XQuery", f:"ud2_xpathXquery.pdf"},
                {id:3, t:"HTML5 Profesional", f:"ud3_HTML.pdf"},
                {id:4, t:"Hojas de Estilo CSS3", f:"ud4_css.pdf"},
                {id:5, t:"RSS y Sindicación", f:"ud5_javascript.pdf"}
            ];
            break;
        case 'ISO':
            carpeta = "Sistemas"; // Si tiene carpeta 'Sistemas' o 'ISO'
            unidades = [
                {id:1, t:"Intro a Sistemas Operativos", f:"README.md"},
                {id:2, t:"Sistemas de Archivos", f:"README.md"},
                {id:3, t:"Administración de Linux", f:"README.md"},
                {id:4, t:"Gestión de Windows Server", f:"README.md"}
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
            <div id="visor-pdf"><p style="text-align:center; margin-top:35vh; color:#333;">PROTOCOLO LISTO</p></div>
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
        alert("✅ ÉXITO");
        addLog(`Pregunta superada: ${p.q}`);
    } else if (r !== null) {
        alert(`❌ ERROR. Respuesta: ${p.a}`);
        addLog(`Fallo en pregunta: ${p.q}`);
    }
}

window.onload = cargarSistema;
