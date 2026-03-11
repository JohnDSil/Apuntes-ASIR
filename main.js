/**
 * ARCHIVO MECÁNICO - MOTOR VERSIÓN TITÁN
 * Buscador Inteligente + Diccionario ASIR + Dashboards
 */

// 1. Diccionario de consulta rápida (Chuletario de examen)
const comandoDiccionario = {
    "ping": "ICMP: Comprueba la conectividad entre dos nodos de red.",
    "ls": "Linux: Lista el contenido de un directorio.",
    "chmod": "Linux: Cambia los permisos de un archivo o carpeta.",
    "ipconfig": "Windows: Muestra la configuración de red TCP/IP.",
    "mkdir": "Crea un nuevo directorio en el sistema.",
    "sql": "Lenguaje de consulta estructurado para Bases de Datos.",
    "osi": "Modelo de 7 capas para la estandarización de redes."
};

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        if (!res.ok) throw new Error('No se pudo conectar con el núcleo de datos');
        window.datosAsignaturas = await res.json();
        
        renderizarPortada(window.datosAsignaturas);

        // Lógica del buscador y diccionario
        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            
            // Notificación si es un comando conocido
            if (comandoDiccionario[val]) {
                mostrarNotificacion(comandoDiccionario[val]);
            }

            // Filtrado de tarjetas
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || 
                a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });

    } catch (error) {
        contenedor.innerHTML = `<p style="color:red; text-align:center;">⚠️ ERROR: ${error.message}</p>`;
    }
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    contenedor.innerHTML = datos.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER A LA UNIDAD</button>
        </article>
    `).join('');
}

function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    
    if (siglas === 'PAR') {
        const unidades = [
            { id: 1, t: "Caracterización de Redes", f: "ud1_caracterizacionRedes%20(1).pdf" },
            { id: 2, t: "Modelo OSI", f: "ud2_modelosOSI-TCPIP%20(1).pdf" },
            { id: 3, t: "Direccionamiento IP", f: "ud3_direccionamientoIP%20(1).pdf" },
            { id: 4, t: "Tecnología Inalámbrica", f: "ud4_tecnologiaInalambrica.pdf" }
        ];
        contenedor.innerHTML = crearDashboardHTML(siglas, unidades, "Redes");
    } 
    else if (siglas === 'GBD') {
        const unidades = [
            { id: 1, t: "Introducción a las BBDD", f: "introduccion.pdf" },
            { id: 2, t: "Modelo Entidad-Relación", f: "entidad_relacion.pdf" }
        ];
        contenedor.innerHTML = crearDashboardHTML(siglas, unidades, "Base de Datos");
    } 
    else {
        contenedor.innerHTML = `
            <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:20px;">⬅ VOLVER</button>
            <iframe src="./${siglas}/README.md" style="width:100%; height:600px; border:2px solid var(--cobre); background:white;"></iframe>`;
    }
}

function crearDashboardHTML(siglas, unidades, carpeta) {
    return `
        <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="margin-bottom:20px;">⬅ VOLVER AL MENÚ</button>
        <h2 style="color:var(--cian)">📂 DASHBOARD: ${siglas}</h2>
        <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px;">
            <div id="lista-unidades">
                ${unidades.map(u => `
                    <div class="card" style="margin-bottom:10px; cursor:pointer;" onclick="cargarVisor('./${carpeta}/${u.f}')">
                        <small class="badge">UD ${u.id}</small>
                        <h4 style="margin:5px 0;">${u.t}</h4>
                    </div>
                `).join('')}
            </div>
            <div id="visor-pdf" style="border:2px solid var(--cobre); height:600px; background:#111;">
                <p style="text-align:center; padding-top:200px; color:var(--cobre);">Seleccione un archivo del terminal</p>
            </div>
        </div>`;
}

function cargarVisor(ruta) {
    document.getElementById('visor-pdf').innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" />`;
}

function mostrarNotificacion(msj) {
    let aviso = document.createElement('div');
    aviso.style = "position:fixed; bottom:20px; right:20px; background:var(--cian); color:#000; padding:15px; border: 2px solid #000; font-weight:bold; z-index:1000; font-family:monospace; box-shadow: 5px 5px 0px #000;";
    aviso.innerHTML = `> INFO: ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => aviso.remove(), 5000);
}

window.onload = cargarSistema;

