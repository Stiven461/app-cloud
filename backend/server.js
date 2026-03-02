const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Importar features
const setupCalculadoraFeature = require('./features/feature-calculadora');

// Configurar features
setupCalculadoraFeature(app);

// Endpoint de prueba / status
app.get('/api/status', (req, res) => {
    res.json({ 
        message: "API funcionando correctamente 🚀",
        features: [
            "POST /api/registro - Validación de usuarios",
            "POST /api/interes-compuesto - Calculadora financiera (Integrante 2)",
            "GET /api/status - Estado del servidor"
        ]
    });
});