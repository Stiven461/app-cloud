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
    const { nombre, email, edad } = req.body;
    
    // Validaciones
    if (!nombre || !email || !edad) {
        return res.status(400).json({ 
            error: 'Todos los campos son obligatorios' 
        });
    }
    
    if (nombre.length < 3) {
        return res.status(400).json({ 
            error: 'El nombre debe tener al menos 3 caracteres' 
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ 
            error: 'El email no es válido' 
        });
    }
    
    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum < 18) {
        return res.status(400).json({ 
            error: 'Debes ser mayor de 18 años' 
        });
    }
    
    // Si todo está bien
    res.status(200).json({ 
        mensaje: 'Registro exitoso',
        usuario: { nombre, email, edad: edadNum }
    });
});

// ============================================
// FEATURE 2: Calculadora de interés compuesto
// (Integrante 2 - feature/usuario-2)
// ============================================
app.post('/api/interes-compuesto', (req, res) => {
    let { capital, tasa, tiempo } = req.body;
    
    // Validaciones
    if (!capital || !tasa || !tiempo) {
        return res.status(400).json({ 
            error: 'Todos los campos son obligatorios' 
        });
    }
    
    capital = parseFloat(capital);
    tasa = parseFloat(tasa) / 100; // Convertir porcentaje a decimal
    tiempo = parseInt(tiempo);
    
    if (isNaN(capital) || capital <= 0) {
        return res.status(400).json({ 
            error: 'El capital debe ser un número positivo' 
        });
    }
    
    if (isNaN(tasa) || tasa < 0) {
        return res.status(400).json({ 
            error: 'La tasa debe ser un número válido' 
        });
    }
    
    if (isNaN(tiempo) || tiempo <= 0) {
        return res.status(400).json({ 
            error: 'El tiempo debe ser un número positivo' 
        });
    }
    
    // Fórmula: M = C(1 + i)^n
    const montoFinal = capital * Math.pow(1 + tasa, tiempo);
    
    res.status(200).json({
        mensaje: 'Cálculo exitoso',
        datos: {
            capital_inicial: capital,
            tasa_porcentaje: tasa * 100,
            tiempo_anios: tiempo,
            monto_final: Math.round(montoFinal * 100) / 100,
            ganancia: Math.round((montoFinal - capital) * 100) / 100
        }
    });
});

// ============================================
// Endpoint de prueba / status
// ============================================
app.get('/api/status', (req, res) => {
    res.json({ 
        message: "API funcionando correctamente 🚀",
        features: [
            "POST /api/registro - Validación de usuarios",
            "POST /api/interes-compuesto - Calculadora financiera",
            "GET /api/status - Estado del servidor"
        ]
    });
});

// ============================================
// Servir el frontend
// ============================================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ============================================
// Iniciar servidor
// ============================================
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
    console.log(`📌 Frontend: http://localhost:${PORT}`);
    console.log(`📌 Endpoints API:`);
    console.log(`   - GET  http://localhost:${PORT}/api/status`);
    console.log(`   - POST http://localhost:${PORT}/api/registro`);
    console.log(`   - POST http://localhost:${PORT}/api/interes-compuesto`);
});