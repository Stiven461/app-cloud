const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

// Importar features (esto lo harán todos)
const setupRegistroFeature = require('./features/feature-registro');

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Configurar features
setupRegistroFeature(app);  // <-- SOLO TU FEATURE POR AHORA

// Endpoint de prueba / status
app.get('/api/status', (req, res) => {
    res.json({ 
        message: "API funcionando correctamente 🚀",
        features: [

            "POST /api/registro - Validación de usuarios",
            "POST /api/interes-compuesto - Calculadora financiera (Integrante 2)",

            "POST /api/registro - Validación de usuarios (Integrante 1)",
            "POST /api/interes-compuesto - Calculadora financiera",

            "GET /api/status - Estado del servidor"
        ]
    });
});

// Servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);

    console.log(`📌 Integrante 2: Feature de Calculadora activa`);

    console.log(`📌 Integrante 1: Feature de Registro activa`);

});