const API_URL = window.location.origin;  // Usa el mismo dominio donde está servido

// ============================================
// VERIFICAR ESTADO DEL SERVIDOR
// ============================================
async function checkServerStatus() {
    const statusDiv = document.getElementById('status');
    
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();
        
        statusDiv.innerHTML = `✅ ${data.message}`;
        statusDiv.className = 'status-card online';
        
        // Actualizar lista de endpoints
        const endpointsList = document.getElementById('endpointsList');
        if (endpointsList && data.features) {
            endpointsList.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');
        }
    } catch (error) {
        statusDiv.innerHTML = '❌ Error: No se puede conectar con el servidor';
        statusDiv.className = 'status-card offline';
    }
}

// ============================================
// FEATURE 1: REGISTRO
// ============================================
document.getElementById('formRegistro')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = document.getElementById('resultadoRegistro');
    resultado.innerHTML = '<div class="loader"></div> Procesando...';
    resultado.className = 'resultado';
    
    const datos = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        edad: document.getElementById('edad').value
    };
    
    try {
        const response = await fetch(`${API_URL}/api/registro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
        resultado.innerHTML = '❌ Error de conexión con el servidor';
        resultado.className = 'resultado error';
    }
});

// ============================================
// FEATURE 2: CALCULADORA
// ============================================
document.getElementById('formCalculadora')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const resultado = document.getElementById('resultadoCalculadora');
    resultado.innerHTML = '<div class="loader"></div> Calculando...';
    resultado.className = 'resultado';
    
    const datos = {
        capital: document.getElementById('capital').value,
        tasa: document.getElementById('tasa').value,
        tiempo: document.getElementById('tiempo').value
    };
    
    try {
        const response = await fetch(`${API_URL}/api/interes-compuesto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            resultado.innerHTML = `
                <strong>✅ ${data.mensaje}</strong><br>
                💰 Capital inicial: $${data.datos.capital_inicial.toLocaleString()}<br>
                📊 Tasa: ${data.datos.tasa_porcentaje}% anual<br>
                ⏱️ Tiempo: ${data.datos.tiempo_anios} años<br>
                <strong>💰 Monto final: $${data.datos.monto_final.toLocaleString()}</strong><br>
                📈 Ganancia: $${data.datos.ganancia.toLocaleString()}
            `;
            resultado.className = 'resultado success';
        } else {
            resultado.innerHTML = `❌ ${data.error}`;
            resultado.className = 'resultado error';
        }
    } catch (error) {
        resultado.innerHTML = '❌ Error de conexión con el servidor';
        resultado.className = 'resultado error';
    }
});

// ============================================
// FEATURE 3: TEST DE CONEXIÓN
// ============================================
document.getElementById('btnTest')?.addEventListener('click', async () => {
    const resultado = document.getElementById('resultadoTest');
    resultado.innerHTML = '<div class="loader"></div> Probando conexión...';
    resultado.className = 'resultado';
    
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();
        
        resultado.innerHTML = `
            ✅ Conexión exitosa<br>
            📡 ${data.message}<br>
            🔌 Features disponibles: ${data.features.length}
        `;
        resultado.className = 'resultado success';
    } catch (error) {
        resultado.innerHTML = '❌ No se pudo conectar al backend';
        resultado.className = 'resultado error';
    }
});

// ============================================
// INICIALIZAR
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    checkServerStatus();
});