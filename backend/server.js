const express = require('express');
const cors = require('cors');
require('dotenv').config();

const duenosRoutes = require('./routes/duenos');
const mascotasRoutes = require('./routes/mascotas');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal para verificar que el servidor funciona
app.get('/', (req, res) => {
    res.send('<h1>API Veterinaria funcionando correctamente 🚀</h1><p>Ve a <a href="/api/duenos">/api/duenos</a> para ver los datos.</p>');
});

app.use('/api/duenos', duenosRoutes);
app.use('/api/mascotas', mascotasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});