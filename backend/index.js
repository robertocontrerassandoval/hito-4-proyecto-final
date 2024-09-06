import express from 'express';
import userRoutes from './routes/userRoutes.js';  // Importar las rutas
import { config } from 'dotenv';
config();

//Middleware
const app = express();
app.use(express.json());  // Para leer JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); //si es de react y con formulario

//Routes
app.use('/', userRoutes);

const PORT =  process.env.PORT || 3000;

app.listen(PORT, () => {console.log(`🚨🚨 Server running on port 🚨🚨 ${PORT}`);

});