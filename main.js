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

const preguntasTest = [
    // --- REDES (PAR) ---
    { q: "¿En qué capa del modelo OSI trabaja un Router?", a: "3", cat: "PAR" },
    { q: "¿Qué protocolo se usa para asignar IPs de forma automática?", a: "dhcp", cat: "PAR" },
    { q: "¿Cuál es la máscara por defecto de una red Clase C (ej: 192.168.1.0)?", a: "255.255.255.0", cat: "PAR" },
    
    // --- SISTEMAS (ISO) ---
    { q: "Comando Linux para ver el manual de una instrucción:", a: "man", cat: "ISO" },
    { q: "Símbolo que representa el directorio raíz en Linux:", a: "/", cat: "ISO" },
    { q: "Comando para cambiar el propietario de un archivo:", a: "chown", cat: "ISO" },
    
    // --- BASES DE DATOS (GBD) ---
    { q: "Sentencia SQL para borrar todos los datos de una tabla sin borrar la tabla:", a: "truncate", cat: "GBD" },
    { q: "¿Qué cláusula SQL se usa para filtrar resultados?", a: "where", cat: "GBD" },
    { q: "¿Cómo se llama la clave que identifica de forma única una fila?", a: "primary key", cat: "GBD" },
    
    // --- HARDWARE (FH) ---
    { q: "¿Qué componente realiza las operaciones aritméticas y lógicas?", a: "cpu", cat: "GENERIC" },
    { q: "¿Qué memoria es volátil y pierde los datos al apagar el equipo?", a: "ram", cat: "GENERIC" }
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
