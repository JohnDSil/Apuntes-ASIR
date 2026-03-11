/**
 * S.I.L.V.A. ACADEMY MASTER CORE - VERSIÓN 5.0
 * MoureDev Style + Herramientas ASIR + Gestión de Progreso
 */

// 1. CONFIGURACIÓN DE DATOS
const comandoDiccionario = {
    "ping": { desc: "ICMP: Comprueba conectividad entre equipos.", cat: "REDES" },
    "calc": { desc: "Despliega la calculadora de subredes para PAR.", cat: "TOOLS" },
    "modo lectura": { desc: "Invierte colores del visor (Estudio nocturno).", cat: "UX" },
    "limpiar": { desc: "Reinicia el progreso de lectura del sistema.", cat: "SISTEMA" },
    "raid 5": { desc: "Distribución con paridad. Mínimo 3 discos.", cat: "HARDWARE" },
    "chmod": { desc: "Linux: Modificación de permisos de ficheros.", cat: "SISTEMAS" }
};

const preguntasTest = [
    { q: "¿En qué capa OSI operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Protocolo que asigna IPs dinámicas?", a: "dhcp", cat: "PAR" },
    { q: "¿Máscara /24 en decimal?", a: "255.255.255.0", cat: "PAR" },
    { q: "¿Símbolo de root en Linux?", a: "#", cat: "ISO" },
    { q: "¿Comando para cambiar permisos?", a: "chmod", cat: "ISO" },
    { q: "¿Sentencia SQL para borrar una tabla completa?", a: "drop table", cat: "GBD" },
    { q: "¿RAID conocido como espejo?", a: "1", cat: "FH" },
    { q: "¿Etiqueta HTML para listas ordenadas?", a: "ol", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" }
];

// 2. GESTIÓN DE TIEMPO (UPTIME)
let startTime = Date.now();
setInterval(() => {
    let elapsed = Math.floor((Date.now() - startTime) / 1000);
    let h = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    let m = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    let s = (elapsed % 60).toString().padStart(2, '0');
    const clock = document.getElementById('uptime-clock');
    if(clock) clock.innerText = `${h}:${m}:${s}`;
}, 1000);

// 3. GESTIÓN DE PROGRESO (LOCALSTORAGE)
let progreso = JSON.parse(localStorage.getItem('silva_progreso')) || {};

function marcarCompletado(id, siglas) {
    progreso[id] = !progreso[id];
    localStorage.setItem('silva_progreso', JSON.stringify(progreso));
    navegarA(siglas); // Refrescar sidebar
}

// 4. MOTOR DE CARGA Y BÚSQUEDA
async function cargarSistema() {
    const inputBuscador = document.getElementById('buscador');
    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase().trim();
            
            // Comandos rápidos
            if (val === "calc") document.getElementById('modal-calc').style.display = 'block';
            if (val === "modo lectura") {
                const visor = document.getElementById('visor-pdf');
                if(visor) visor.style.filter = visor.style.filter ? "" : "invert(90%) hue-rotate(180deg)";
            }
            if (val === "limpiar") { localStorage.clear(); location.reload(); }
            
            // Notificaciones
            if (comandoDiccionario[val]) {
                mostrarNotificacion(comandoDiccionario[val].desc, comandoDiccionario[val].cat);
            }

            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (e) { console.error("Fallo de núcleo S.I.L.V.A."); }
}

// 5. RENDERIZADO DE INTERFAZ
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    if(!contenedor) return;
    contenedor.style.display = "grid";
    
    let html = datos.map(asig => `
        <article class="card">
            <div>
                <span style="color:var(--accent); font-weight:800; font-size:0.75rem;">CURSO // 01</span>
                <h2>${asig.siglas}</h2>
                <p>${asig.nombre}</p>
            </div>
            <button onclick="navegarA('${asig.siglas}')" class="btn">Abrir Consola</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="background: var(--accent); color: white; border:none;">
            <div>
                <span style="color:rgba(255,255,255,0.7); font-weight:800; font-size:0.75rem;">TOOLS</span>
                <h2 style="color:white">Calculadora IP</h2>
                <p style="color:white">Herramienta rápida para subredes y máscaras.</p>
            </div>
            <button onclick="document.getElementById('modal-calc').style.display='block'" class="btn" style="background:white; color:var(--accent)">Lanzar Calc</button>
        </article>
        <article class="card" style="background: #1a1a1a; border: 1px dashed var(--accent);">
            <div>
                <span style="color:var(--accent); font-weight:800; font-size:0.75rem;">TEST</span>
                <h2>Simulador 30Q</h2>
                <p>Protocolo de autoevaluación final.</p>
            </div>
            <button onclick="iniciarTest()" class="btn">Iniciar Prueba</button>
        </article>`;
    contenedor.innerHTML = html;
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    let unidades = [];
    let carpeta = "";

    // Mapeo de unidades
    if (siglas === 'PAR') {
        carpeta = "Redes";
        unidades = [
            { id: 1, t: "Caracterización", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "IP Addressing", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 5, t: "Switching", f: "ud5_switchesCisco.pdf" }
        ];
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "SQL DDL", f: "ud1_DDL.pdf" },
            { id: 3, t: "Consultas SQL", f: "ud3_consultas.pdf" }
        ];
    } else if (siglas === 'FH') {
        carpeta = "Hardware";
        unidades = [
            { id: 5, t: "RAID y SAI", f: "ud5_CPD-Servidor-RAID-SAI.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 3, t: "HTML5 Pro", f: "ud3_HTML.pdf" },
            { id: 5, t: "Sindicación RSS", f: "ud5_javascript.pdf" }
        ];
    }

    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div class="dashboard-container">
                <div class="sidebar">
                    <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:transparent; border:1px solid #333; margin-bottom:2rem; width:100%; color:white;">< Volver</button>
                    ${unidades.map(u => {
                        const uid = `${siglas}-${u.id}`;
                        const comp = progreso[uid] ? '✅' : '⭕';
                        return `
                        <div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')">
                            <span onclick="event.stopPropagation(); marcarCompletado('${uid}', '${siglas}')" style="cursor:pointer; margin-right:10px;">${comp}</span>
                            <strong>UD ${u.id}</strong><br><small>${u.t}</small>
                        </div>`
                    }).join('')}
                </div>
                <div id="visor-pdf" style="transition: filter 0.3s;"><p style="color:#444; text-align:center; margin-top:40vh;">Selecciona unidad para cargar...</p></div>
            </div>`;
    } else {
        contenedor.innerHTML = `<div style="padding:2rem; text-align:center;"><button onclick="renderizarPortada(window.datosAsignaturas)" class="btn">Volver</button><br><br><iframe src="./${siglas}/README.md" style="width:100%; height:800px; border:1px solid #333; border-radius:12px;"></iframe></div>`;
    }
}

// 6. FUNCIONES AUXILIARES
function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj, cat) {
    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:30px; right:30px; background:#1a1a1a; color:#fff; padding:1.5rem; border-radius:12px; border:2px solid #00a3ff; z-index:4000; box-shadow:0 10px 30px rgba(0,0,0,0.5);`;
    aviso.innerHTML = `<span style="color:#00a3ff">●</span> [${cat}] ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 4000);
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[SIMULADOR ASIR]\n\n${p.q}`);
    if (r && r.toLowerCase().trim() === p.a.toLowerCase()) alert("✅ CORRECTO");
    else if (r !== null) alert(`❌ INCORRECTO. Era: ${p.a}`);
}

window.onload = cargarSistema;
