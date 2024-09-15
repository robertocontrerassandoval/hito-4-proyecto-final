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

        // Agregar el producto a la base de datos
        const result = await userModel.addProduct({ titulo, imagen, descripcion, precio, stock });
        res.status(201).json({ message: 'Producto creado', product: result });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear producto' });
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
        // Verificar si el usuario ya existe
        const existingUser = await userModel.getUser(email);
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

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

        res.status(201).json({ message: 'Usuario creado con éxito', user: result });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor al crear usuario' });
    }
};

// Login con validación de contraseña y generación de JWT
const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await userModel.getUser(email);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // El token expira en 1 hora
        );

        // Retornar token y detalles del usuario
        res.status(200).json({ message: 'Login exitoso', token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ message: 'Error interno del servidor durante el login' });
    }
};

// Ruta para manejar errores 404
const notFound = (req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
};

export const controller = {
    home,
    createProduct,
    createUser,
    login,
    notFound,
};

