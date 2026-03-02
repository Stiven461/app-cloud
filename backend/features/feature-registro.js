// ============================================
// FEATURE 1: Registro con validaciones
// Autor: NEIDER MEJIA
// Archivo: feature-registro.js
// ============================================

function setupRegistroFeature(app) {
    
    // Endpoint de registro
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

    console.log('✅ Feature de Registro cargada correctamente');
}

module.exports = setupRegistroFeature;