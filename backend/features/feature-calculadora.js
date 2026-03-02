// ============================================
// FEATURE 2: Calculadora de interés compuesto
// ============================================/

function setupCalculadoraFeature(app) {
    
    // Endpoint de calculadora
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

    console.log('✅ Feature de Calculadora cargada correctamente');
}

module.exports = setupCalculadoraFeature;