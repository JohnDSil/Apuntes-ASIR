/**
 * SISTEMA OPERATIVO S.I.L.V.A. - NÚCLEO INTEGRAL
 * Versión 4.0: Dashboard Total + Simulador + Diccionario
 */

// 1. DICCIONARIO TÉCNICO CON CATEGORÍAS
const comandoDiccionario = {
    "ping": { desc: "ICMP: Diagnóstico de conectividad de red.", cat: "PAR" },
    "osi": { desc: "Modelo de 7 capas para estandarizar redes.", cat: "PAR" },
    "chmod": { desc: "Linux: Cambia permisos de archivos/carpetas.", cat: "ISO" },
    "chown": { desc: "Linux: Cambia el propietario de un archivo.", cat: "ISO" },
    "select": { desc: "SQL: Recupera datos de una tabla.", cat: "GBD" },
    "truncate": { desc: "SQL: Vacía una tabla sin borrar su estructura.", cat: "GBD" },
    "bios": { desc: "Firmware que inicia el hardware del sistema.", cat: "FH" },
    "cpu": { desc: "Unidad Central de Procesamiento: el cerebro.", cat: "FH" },
    "xml": { desc: "Lenguaje de marcas extensible para datos.", cat: "LMSGI" },
    "xpath": { desc: "Lenguaje para navegar nodos en un XML.", cat: "LMSGI" }
};

// 2. BANCO DE 20 PREGUNTAS DE EXAMEN
const preguntasTest = [
    { q: "¿En qué capa OSI trabaja un Switch?", a: "2", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs dinámicas?", a: "dhcp", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Protocolo para resolución de nombres?", a: "dns", cat: "PAR" },
    { q: "¿Capa OSI donde operan los Routers?", a: "3", cat: "PAR" },
    { q: "¿Comando Linux para ver el manual?", a: "man", cat: "ISO" },
    { q: "¿Símbolo del directorio raíz en Linux?", a: "/", cat: "ISO" },
    { q: "¿Directorio de configuraciones en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Cláusula SQL para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Sentencia SQL para añadir datos?", a: "insert", cat: "GBD" },
    { q: "¿Clave que relaciona dos tablas?", a: "foreign key", cat: "GBD" },
    { q: "¿Propiedad ACID de transacciones 'todo o nada'?", a: "atomicidad", cat: "GBD" },
    { q: "¿Memoria que pierde datos al apagar el PC?", a: "ram", cat: "FH" },
    { q: "¿Componente que realiza cálculos lógicos?", a: "cpu", cat: "FH" },
    { q: "¿Etiqueta HTML para enlaces?", a: "a", cat: "LMSGI" },
    { q: "¿Etiqueta para una lista no ordenada?", a: "ul", cat: "LMSGI" },
    { q: "¿Atributo para enlazar CSS externo?", a: "href", cat: "LMSGI" },
    { q: "¿Es XML un lenguaje de programación?", a: "no", cat: "LMSGI" },
    { q: "¿Etiqueta raíz obligatoria en HTML?", a: "html", cat: "LMSGI" }
];

// 3. CARGA INICIAL DEL SISTEMA
async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            
            // Notificación si el comando existe
            if (comandoDiccionario[val]) {
                const cmd = comandoDiccionario[val];
                mostrarNotificacion(cmd.desc, cmd.cat);
            }

            // Filtrado de tarjetas
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red; text-align:center;">⚠️ FALLO DE NÚCLEO: REVISE apuntes.json</p>`;
    }
}

// 4. RENDERIZADO DE PORTADA (TARJETAS)
function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div class="badge">SYSTEM_OK</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER AL NÚCLEO</button>
        </article>
    `).join('');
    
    html += `
        <article class="card" style="border: 2px dashed #ff0055;">
            <div class="badge" style="background:#ff0055; color:#fff;">WAR_GAME</div>
            <h2>TEST DE EXAMEN</h2>
            <button onclick="iniciarTest()" class="btn" style="border-color:#ff0055; color:#ff0055">INICIAR SIMULACIÓN</button>
        </article>`;
    contenedor.innerHTML = html;
}

// 5. NAVEGACIÓN Y DASHBOARDS
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
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="width:200px; margin-bottom:20px;">< VOLVER</button>
            <h2 style="color:#00ffff">${siglas} > DASHBOARD INTERACTIVO</h2>
            <div style="display:grid; grid-template-columns: 1fr 3fr; gap:20px; margin-top:20px;">
                <div id="lista-unidades">
                    ${unidades.map(u => `
                        <div class="card" style="margin-bottom:10px; cursor:pointer; padding:10px;" onclick="cargarVisor('./${carpeta}/${u.f}')">
                            <small class="badge">UD ${u.id}</small><br>
                            <h4 style="margin:5px 0;">${u.t}</h4>
                        </div>
                    `).join('')}
                </div>
                <div id="visor-pdf" style="border:2px solid #00ffff; height:750px; background:#000;">
                    <p style="text-align:center; padding-top:350px; color:#666;">SELECCIONE MÓDULO PARA VISUALIZAR</p>
                </div>
            </div>`;
    } else {
        // Fallback para GBD, FH e ISO si cargan desde README
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:20px;">< VOLVER</button>
            <h2 style="color:#00ffff">${siglas} > DOCUMENTACIÓN</h2>
            <iframe src="./${siglas}/README.md" style="width:100%; height:750px; border:2px solid #00ffff; background:#fff;"></iframe>`;
    }
}

// 6. FUNCIONES AUXILIARES (VISOR, NOTIFICACIÓN, TEST)
function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj, cat) {
    const paleta = { 'PAR': '#00ffff', 'GBD': '#e68a00', 'ISO': '#00ff00', 'LMSGI': '#ff00ff', 'GENERIC': '#ffffff' };
    const color = paleta[cat] || paleta['GENERIC'];
    
    let aviso = document.createElement('div');
    aviso.className = "notificacion-popup";
    aviso.style = `position:fixed; bottom:20px; right:20px; background:#000; color:${color}; 
                   padding:20px; border:2px solid ${color}; font-family:monospace; 
                   box-shadow: 0 0 15px ${color}; z-index:1000;`;
    aviso.innerHTML = `> [${cat}] INFO: ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => { aviso.style.opacity = "0"; setTimeout(() => aviso.remove(), 500); }, 4000);
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR DE EXAMEN]\nCATEGORÍA: ${p.cat}\n\nPREGUNTA: ${p.q}`);
    if (r && r.toLowerCase() === p.a.toLowerCase()) {
        alert("✔️ ACCESO CONCEDIDO: Respuesta correcta.");
    } else {
        alert(`❌ ACCESO DENEGADO: La respuesta era "${p.a}"`);
    }
}

// ARRANQUE DEL SISTEMA
window.onload = cargarSistema;
