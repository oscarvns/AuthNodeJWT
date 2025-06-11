const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configurar CORS para permitir solicitudes desde tu frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Permitir cookies y credenciales
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de autenticación funcionando correctamente',
    version: '1.0.0'
  });
});


app.listen(PORT, () => {
  console.log(`Servidor API corriendo en puerto ${PORT}`);
});