import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import productRoutes from './routes/productRoutes.js';  // Ajusta la ruta a tus archivos de rutas
import userRoutes from './routes/userRoutes.js';  // Ajusta la ruta a tus archivos de rutas

// Configuración del entorno
config();

// Inicializar la aplicación Express
const app = express();

// Middleware
app.use(cors({origin: process.env.STATIC_SITE})); // Permitir solicitudes de diferentes orígenes
app.use(express.json()); // Analizar el cuerpo de las solicitudes en formato JSON

// Rutas
app.use('/api/products', productRoutes);  // Ruta para las operaciones de productos
app.use('/api/user', userRoutes);  // Ruta para las operaciones de usuarios

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de e-commerce');
});

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Manejo de errores internos del servidor
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Error interno del servidor' });
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚨🚨 Servidor corriendo en el puerto ${PORT} 🚨🚨`);
});

export default app;
