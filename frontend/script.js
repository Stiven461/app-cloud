// ============================================
// FEATURE 3: Frontend + Integración
// ============================================

const API_URL = window.location.origin;

// ============================================
// Verificar estado del servidor
// ============================================

async function checkServerStatus() {
    const statusDiv = document.getElementById('status');
    
    if (!statusDiv) return;

    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();
        
        statusDiv.innerHTML = `✅ ${data.message}`;
        statusDiv.className = 'status-card online';

        // Mostrar features si existen
        const endpointsList = document.getElementById('endpointsList');
        if (endpointsList && data.features) {
            endpointsList.innerHTML = data.features
                .map(f => `<li>${f}</li>`)
                .join('');
        }

    } catch (error) {
        statusDiv.innerHTML = '❌ Error: No se puede conectar con el servidor';
        statusDiv.className = 'status-card offline';
    }
}

// ============================================
// FORMULARIO REGISTRO
// ============================================

document.getElementById('formRegistro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = document.getElementById('resultadoRegistro');
    if (!resultado) return;

    resultado.innerHTML = '<div class="loader"></div> Procesando...';
    resultado.className = 'resultado';

    const datos = {
        nombre: document.getElementById('nombre')?.value,
        email: document.getElementById('email')?.value,
        edad: document.getElementById('edad')?.value
    };

    try {
        const response = await fetch(`${API_URL}/api/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (response.ok) {
            resultado.innerHTML = `
                <strong>✅ ${data.mensaje}</strong><br>
                👤 ${data.usuario.nombre}<br>
                📧 ${data.usuario.email}<br>
                🎂 ${data.usuario.edad} años
            `;
            resultado.className = 'resultado success';
        } else {
            resultado.innerHTML = `❌ ${data.error}`;
            resultado.className = 'resultado error';
        }

    } catch (error) {
        resultado.innerHTML = '❌ Error de conexión';
        resultado.className = 'resultado error';
    }
});

// ============================================
// FORMULARIO CALCULADORA (Interés Compuesto)
// ============================================

document.getElementById('formCalculadora')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const resultado = document.getElementById('resultadoCalculadora');
    if (!resultado) return;

    resultado.innerHTML = '<div class="loader"></div> Calculando...';
    resultado.className = 'resultado';

    const datos = {
        capital: document.getElementById('capital')?.value,
        tasa: document.getElementById('tasa')?.value,
        tiempo: document.getElementById('tiempo')?.value
    };

    try {
        const response = await fetch(`/api/interes-compuesto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (response.ok) {
            resultado.innerHTML = `
                <strong>✅ ${data.mensaje}</strong><br>
                💰 Capital inicial: $${Number(data.datos.capital_inicial).toLocaleString()}<br>
                📊 Tasa: ${data.datos.tasa_porcentaje}% anual<br>
                ⏱️ Tiempo: ${data.datos.tiempo_anios} años<br>
                <strong>💰 Monto final: $${Number(data.datos.monto_final).toLocaleString()}</strong><br>
                📈 Ganancia: $${Number(data.datos.ganancia).toLocaleString()}
            `;
            resultado.className = 'resultado success';
        } else {
            resultado.innerHTML = `❌ ${data.error}`;
            resultado.className = 'resultado error';
        }

    } catch (error) {
        resultado.innerHTML = '❌ Error de conexión';
        resultado.className = 'resultado error';
    }
});

// ============================================
// BOTÓN TEST DE CONEXIÓN
// ============================================

document.getElementById('btnTest')?.addEventListener('click', async () => {
    const resultado = document.getElementById('resultadoTest');
    if (!resultado) return;

    resultado.innerHTML = '<div class="loader"></div> Probando conexión...';
    resultado.className = 'resultado';
    
    try {
        const response = await fetch(`/api/status`);
        const data = await response.json();
        
        resultado.innerHTML = `
            ✅ Conexión exitosa<br>
            📡 ${data.message}<br>
            🔌 Features disponibles: ${data.features?.length || 0}
        `;
        resultado.className = 'resultado success';

    } catch (error) {
        resultado.innerHTML = '❌ No se pudo conectar al backend';
        resultado.className = 'resultado error';
    }
});

// ============================================
// Inicialización al cargar el DOM
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
    console.log('✅ Feature 3: Frontend cargado correctamente');
});