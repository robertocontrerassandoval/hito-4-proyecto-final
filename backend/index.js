import express from 'express';
import userRoutes from './routes/userRoutes.js';  // Importar las rutas de usuarios
import productRoutes from './routes/productRoutes.js';  // Importar las rutas de productos
import { config } from 'dotenv';

config();  // Cargar variables de entorno desde .env

// Middleware
const app = express();
app.use(express.json());  // Para leer JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true }));  // Para manejar formularios

// Routes
app.use('/users', userRoutes);  // Ruta para las operaciones de usuarios
app.use('/products', productRoutes);  // Ruta para las operaciones de productos

const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`🚨🚨 Server running on port 🚨🚨 ${PORT}`);
});
