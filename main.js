/**
 * ARCHIVO MECÁNICO - MOTOR VERSIÓN ALPHA-TEST
 * Buscador + Colores Dinámicos + Generador de Examen
 */

const comandoDiccionario = {
    "ping": { desc: "ICMP: Comprueba conectividad.", cat: "PAR" },
    "ls": { desc: "Linux: Lista directorios.", cat: "ISO" },
    "chmod": { desc: "Linux: Cambia permisos.", cat: "ISO" },
    "sql": { desc: "Lenguaje de consulta de BBDD.", cat: "GBD" },
    "osi": { desc: "Modelo de 7 capas de red.", cat: "PAR" }
};

// Banco de preguntas para el entrenamiento
const preguntasTest = [
    { q: "¿En qué capa de OSI trabaja un Switch?", a: "2", cat: "PAR" },
    { q: "¿Qué comando Linux cambia permisos?", a: "chmod", cat: "ISO" },
    { q: "¿Siglas de Structured Query Language?", a: "sql", cat: "GBD" }
];

async function cargarSistema() {
    const contenedor = document.getElementById('grid-apuntes');
    const inputBuscador = document.getElementById('buscador');

    try {
        const res = await fetch('./apuntes.json');
        window.datosAsignaturas = await res.json();
        renderizarPortada(window.datosAsignaturas);

        inputBuscador.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            
            // Lógica de colores y notificaciones
            if (comandoDiccionario[val]) {
                const cmd = comandoDiccionario[val];
                mostrarNotificacion(cmd.desc, cmd.cat);
            }

            const filtrados = window.datosAsignaturas.filter(a => 
                a.nombre.toLowerCase().includes(val) || a.siglas.toLowerCase().includes(val)
            );
            renderizarPortada(filtrados);
        });
    } catch (error) {
        contenedor.innerHTML = `<p style="color:red">⚠️ ERROR DE NÚCLEO</p>`;
    }
}

function mostrarNotificacion(msj, cat) {
    const paleta = {
        'PAR': '#00ffff', // Cian
        'GBD': '#e68a00', // Cobre
        'ISO': '#00ff00', // Verde
        'GENERIC': '#ffffff'
    };
    const color = paleta[cat] || paleta['GENERIC'];

    let aviso = document.createElement('div');
    aviso.style = `position:fixed; bottom:20px; right:20px; background:#000; color:${color}; 
                   padding:15px; border:2px solid ${color}; font-family:monospace; 
                   box-shadow: 0 0 15px ${color}; z-index:1000;`;
    aviso.innerHTML = `> [${cat}]: ${msj}`;
    document.body.appendChild(aviso);
    setTimeout(() => { aviso.style.opacity="0"; setTimeout(()=>aviso.remove(), 500); }, 4000);
}

function renderizarPortada(datos) {
    const contenedor = document.getElementById('grid-apuntes');
    contenedor.style.display = "grid";
    let html = datos.map(asig => `
        <article class="card">
            <div class="badge">${asig.estado}</div>
            <h2>${asig.siglas}</h2>
            <p>${asig.nombre}</p>
            <button onclick="navegarA('${asig.siglas}')" class="btn">ACCEDER</button>
        </article>
    `).join('');
    
    // Añadimos la tarjeta especial de Test
    html += `
        <article class="card" style="border-style: dashed; opacity: 0.8;">
            <div class="badge" style="color:#ff00ff">MODO ENTRENAMIENTO</div>
            <h2>TEST</h2>
            <p>Ponte a prueba para los finales.</p>
            <button onclick="iniciarTest()" class="btn" style="border-color:#ff00ff; color:#ff00ff">INICIAR SIMULACIÓN</button>
        </article>
    `;
    contenedor.innerHTML = html;
}

function iniciarTest() {
    const index = Math.floor(Math.random() * preguntasTest.length);
    const p = preguntasTest[index];
    const respuesta = prompt(`[SISTEMA DE TEST - ${p.cat}]\n\n${p.q}`);
    
    if (respuesta && respuesta.toLowerCase() === p.a.toLowerCase()) {
        mostrarNotificacion("¡ACCESO CONCEDIDO! Respuesta correcta.", p.cat);
    } else {
        mostrarNotificacion("ACCESO DENEGADO. Inténtelo de nuevo.", "GENERIC");
    }
}

// ... Mantener funciones navegarA, crearDashboardHTML y cargarVisor de las versiones anteriores ...

window.onload = cargarSistema;
