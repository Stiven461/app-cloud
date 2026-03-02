// ============================================
// FEATURE 3: Frontend + Integración
// ============================================

const API_URL = window.location.origin;

async function checkServerStatus() {
    const statusDiv = document.getElementById('status');
    
    try {
        const response = await fetch(`${API_URL}/api/status`);
        const data = await response.json();
        
        statusDiv.innerHTML = `✅ ${data.message}`;
        statusDiv.className = 'status-card online';
        
    } catch (error) {
        statusDiv.innerHTML = '❌ Error: No se puede conectar con el servidor';
        statusDiv.className = 'status-card offline';
    }
}