import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT =  process.env.PORT || 3000;

//Middleware
app.use(express.json()); //para leer el body
app.use(express.urlencoded({ extended: true })); //si es de react y con formulario

//Routes
app.use('/', userRoutes);

app.listen(PORT, () => {console.log(`🚨🚨 Server running on port 🚨🚨 ${PORT}`);});