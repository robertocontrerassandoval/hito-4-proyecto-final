import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT =  process.env.PORT || 3000;


//Routes
app.use('/', userRoutes);

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});