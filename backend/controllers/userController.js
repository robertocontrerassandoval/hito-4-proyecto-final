import { model } from "../models/userModel.js";

const home = (req, res) => {
    res.send('Home page');
}

const createProduct = (req, res) => {
    const {titulo, imagen, descripcion,precio, stock} = req.body;
    const result = model.addProduct({titulo, imagen, descripcion,precio, stock})
    res.send('producto creado');
}

const notFound = (req, res) => {
    res.send('404 - Not Found');
}
export const controller = {
    home,
    notFound, 
    createProduct
}