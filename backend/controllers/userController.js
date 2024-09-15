import { userModel } from '../models/userModel.js'; // Asegúrate de que userModel esté correctamente implementado
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { validationResult } from 'express-validator';

// Cargar las variables de entorno
config();

// Controlador Home
const home = (req, res) => {
    res.send('Home page');
};

// Crear producto
const createProduct = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { titulo, imagen, descripcion, precio, stock } = req.body;

        // Asegúrate de que userModel tenga el método addProduct implementado correctamente
        const result = await userModel.addProduct({ titulo, imagen, descripcion, precio, stock });
        res.status(201).json({ message: 'Producto creado', product: result });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

// Crear usuario con encriptación de contraseña
const createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, date_birth } = req.body;

    try {
        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Guardar el usuario en la base de datos
        const result = await userModel.addUser({
            name,
            email,
            password: hashedPassword,
            date_birth,
        });

        res.status(201).json({ message: 'Usuario creado', user: result });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error al crear usuario', error: error.message });
    }
};

// Login con validación de contraseña y generación de JWT
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Verificar si el email existe en la base de datos
        const user = await userModel.getUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Email no existe' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token válido por 1 hora
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error en el login', error: error.message });
    }
};

// Ruta para manejar errores 404
const notFound = (req, res) => {
    res.status(404).send('404 - Not Found');
};

export const controller = {
    home,
    createProduct,
    createUser,
    login,
    notFound,
};

