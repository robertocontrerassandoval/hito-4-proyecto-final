import { model } from "../models/userModel.js";

const home = (req, res) => {
    res.send('Home page');
}

const createProduct = async (req, res) => {
    const {titulo, imagen, descripcion,precio, stock} = req.body;
    const result = await model.addProduct({titulo, imagen, descripcion,precio, stock})
    res.send('producto creado');
}

const createUser = async(req, res) => {
    const {name, email, password, date_birth} = req.body;
    const result = await model.addUser({name, email, password, date_birth})
    res.send('usuario creado');
}

const login = async(req, res) => {

    try {
        const { email} = req.body;

        //verificamos que el email exista
        const user =  await model.getUser(email);
        console.log(user)   
        if(!user) {
            res.send('Email no existe');
        }else {
            res.send('Email existe');
        }
    
    } catch (error) {
        console.log('Error', error);
    }}

const notFound = (req, res) => {
    res.send('404 - Not Found');
}

export const controller = {
    home,
    notFound, 
    createProduct,
    createUser,
    login
}