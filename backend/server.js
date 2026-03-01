const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: "API funcionando correctamente 🚀" });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});