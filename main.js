/**
 * MOTOR ACADÉMICO S.I.L.V.A. - FULL VERSION 2026
 * Dashboard Profesional + Soporte Multidisciplinar + Simulador
 */

// 1. BANCO DE PREGUNTAS (20 cuestiones clave de 1º ASIR)
const preguntasTest = [
    { q: "¿En qué capa del modelo OSI opera un Router?", a: "3", cat: "PAR" },
    { q: "¿En qué capa opera un Switch?", a: "2", cat: "PAR" },
    { q: "¿Qué protocolo asigna IPs automáticas?", a: "dhcp", cat: "PAR" },
    { q: "¿Puerto por defecto de HTTPS?", a: "443", cat: "PAR" },
    { q: "¿Protocolo para resolución de nombres de dominio?", a: "dns", cat: "PAR" },
    { q: "¿Comando Linux para cambiar permisos?", a: "chmod", cat: "ISO" },
    { q: "¿Comando Linux para cambiar el dueño de un archivo?", a: "chown", cat: "ISO" },
    { q: "¿Directorio de configuraciones globales en Linux?", a: "/etc", cat: "ISO" },
    { q: "¿Comando para listar procesos en tiempo real?", a: "top", cat: "ISO" },
    { q: "¿Cómo se llama el intérprete de comandos por defecto?", a: "bash", cat: "ISO" },
    { q: "¿Qué comando SQL se usa para insertar datos?", a: "insert", cat: "GBD" },
    { q: "¿Qué cláusula SQL se usa para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Sentencia SQL para borrar datos sin borrar la tabla?", a: "truncate", cat: "GBD" },
    { q: "¿Clave que relaciona dos tablas en una BBDD?", a: "foreign key", cat: "GBD" },
    { q: "¿Siglas de Structured Query Language?", a: "sql", cat: "GBD" },
    { q: "¿Etiqueta HTML para crear una lista no ordenada?", a: "ul", cat: "LMSGI" },
    { q: "¿Qué significan las siglas XML?", a: "extensible markup language", cat: "LMSGI" },
    { q: "¿Lenguaje para realizar consultas sobre XML?", a: "xpath", cat: "LMSGI" },
    { q: "¿Atributo para enlazar un archivo CSS externo?", a: "href", cat: "LMSGI" },
    { q: "¿Qué memoria pierde los datos al apagar el PC?", a: "ram", cat: "FH" }
];

// 2. CARGA INICIAL Y BUSCADOR
async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (error) {
        contenedor.innerHTML = `<div style="text-align:center; padding:2rem;">⚠️ Error al cargar el núcleo de datos.</div>`;
    }
}

// 3. RENDERIZADO DE LA PORTADA
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
    
    // Tarjeta del Simulador
    html += `
        <article class="card" style="border: 2px dashed #cbd5e1; background: #f1f5f9;">
            <h2 style="color: #64748b;">Simulador de Examen</h2>
            <p>Ponte a prueba con 20 preguntas aleatorias del temario oficial.</p>
            <button onclick="iniciarTest()" class="btn" style="background: #64748b;">Iniciar Test</button>
        </article>`;
    
    contenedor.innerHTML = html;
}

// 4. NAVEGACIÓN ENTRE ASIGNATURAS Y DASHBOARDS
function navegarA(siglas) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "block";
    let unidades = [];
    let carpeta = "";

    // Mapeo de contenidos según la asignatura
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
    } else if (siglas === 'GBD') {
        carpeta = "Base de Datos";
        unidades = [
            { id: 1, t: "Lenguaje DDL (Creación)", f: "ud1_DDL.pdf" },
            { id: 2, t: "Comandos SQL", f: "ud2_comandosSQL.pdf" },
            { id: 3, t: "Consultas Simples", f: "ud3_consultas.pdf" },
            { id: 4, t: "Subconsultas", f: "ud4_subConsultas.pdf" }
        ];
    } else if (siglas === 'LMSGI') {
        carpeta = "Lenguaje de Marcas";
        unidades = [
            { id: 1, t: "XML y Estructuras", f: "ud1_XML.pdf" },
            { id: 2, t: "XPath y XQuery", f: "ud2_xpathXquery.pdf" },
            { id: 3, t: "HTML5 Profesional", f: "ud3_HTML.pdf" },
            { id: 4, t: "CSS3 Diseño", f: "ud4_css.pdf" },
            { id: 5, t: "Introducción JS", f: "ud5_javascript.pdf" }
        ];
    }

    // Renderizado del Dashboard con Sidebar o del README por defecto
    if (unidades.length > 0) {
        contenedor.innerHTML = `
            <div style="margin-bottom: 2rem; max-width: 1200px; margin: auto; padding: 0 1rem;">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:#64748b; width:150px;">< Volver</button>
            </div>
            <div class="dashboard-container">
                <div class="sidebar">
                    <h3 style="margin-top:0; font-size:1.1rem; color:#1e293b;">Unidades Disponibles</h3>
                    ${unidades.map(u => `
                        <div class="unit-item" onclick="cargarVisor('./${carpeta}/${u.f}')">
                            <strong style="color:#3b82f6;">UD ${u.id}</strong><br>
                            <span style="font-size:0.85rem;">${u.t}</span>
                        </div>
                    `).join('')}
                </div>
                <div id="visor-pdf">
                    <div style="text-align:center; padding-top:300px; color:#cbd5e1;">
                        <p style="font-size:1.2rem;">📂 Seleccione una unidad del menú lateral</p>
                    </div>
                </div>
            </div>`;
    } else {
        // Para asignaturas sin PDFs definidos (ISO, FH), cargamos su README
        contenedor.innerHTML = `
            <div style="margin-bottom: 2rem; max-width: 1200px; margin: auto; padding: 0 1rem;">
                <button onclick="renderizarPortada(window.datosAsignaturas)" class="btn" style="background:#64748b; width:150px;">< Volver</button>
            </div>
            <div style="max-width:1200px; margin:auto; background:white; padding:2rem; border-radius:12px; border:1px solid #e2e8f0;">
                <h2 style="color:#3b82f6;">${siglas} > Documentación</h2>
                <iframe src="./${siglas}/README.md" style="width:100%; height:700px; border:none; margin-top:1rem;"></iframe>
            </div>`;
    }
}

// 5. FUNCIONES DEL VISOR Y SIMULADOR
function cargarVisor(ruta) {
    const visor = document.getElementById('visor-pdf');
    visor.innerHTML = `<embed src="${ruta}" type="application/pdf" width="100%" height="100%" style="border-radius:8px;" />`;
}

function iniciarTest() {
    const p = preguntasTest[Math.floor(Math.random() * preguntasTest.length)];
    const r = prompt(`[S.I.L.V.A. SIMULADOR - ${p.cat}]\n\nPREGUNTA: ${p.q}`);
    
    if (r !== null) {
        if (r.toLowerCase().trim() === p.a.toLowerCase()) {
            alert("✅ CORRECTO. Acceso concedido.");
        } else {
            alert(`❌ INCORRECTO. La respuesta esperada era: ${p.a}`);
        }
    }
}

// 6. LANZAMIENTO
window.onload = cargarSistema;
