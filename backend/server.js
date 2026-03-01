const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// ============================================
// FEATURE 1: Registro con validaciones
// (Integrante 1 - feature/usuario-1)
// ============================================
app.post('/api/registro', (req, res) => {
    // TODO: Implementar validaciones
    const { nombre, email, edad } = req.body;
    
    // Respuesta temporal mientras desarrollan
    res.json({ 
        mensaje: 'Endpoint de registro - En desarrollo',
        datos_recibidos: { nombre, email, edad }
    });
});

// ============================================
// FEATURE 2: Calculadora de interés compuesto
// (Integrante 2 - feature/usuario-2)
// ============================================
app.post('/api/interes-compuesto', (req, res) => {
    // TODO: Implementar cálculo financiero
    const { capital, tasa, tiempo } = req.body;
    
    // Respuesta temporal
    res.json({ 
        mensaje: 'Endpoint de calculadora - En desarrollo',
        datos_recibidos: { capital, tasa, tiempo }
    });
});

// ============================================
// Endpoint de prueba (el que ya tenía tu amigo)
// ============================================
app.get('/api/status', (req, res) => {
    res.json({ 
        message: "API funcionando correctamente 🚀",
        features: [
            "POST /api/registro",
            "POST /api/interes-compuesto",
            "GET /api/status"
        ]
    });
});

// Servir el frontend (esto ya lo tenía tu amigo)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`📌 Frontend: http://localhost:${PORT}`);
    console.log(`📌 Endpoints API:`);
    console.log(`   - GET  http://localhost:${PORT}/api/status`);
    console.log(`   - POST http://localhost:${PORT}/api/registro`);
    console.log(`   - POST http://localhost:${PORT}/api/interes-compuesto`);
});