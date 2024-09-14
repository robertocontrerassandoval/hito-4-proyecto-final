import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
config();

// Expresión regular para validar emails (reutilizable)
const emailRegex = /\S+@\S+\.\S+/;

// Middleware para validar la creación de usuario
export const validateUserCreation = (req, res, next) => {
    const { name, email, password, date_birth } = req.body;

    if (!name || !email || !password || !date_birth) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email no válido' });
    }

    // Validar longitud de la contraseña
    if (password.length < 6) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 6 caracteres' });
    }

    next();  // Continuar si todo está correcto
};

// Middleware para validar login
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email y contraseña son obligatorios' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de email no válido' });
    }

    next();  // Continuar si todo está correcto
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    // Eliminar el prefijo 'Bearer ' si está presente
    const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7) : token;

    try {
        const verified = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        req.user = verified;  // Guardar los datos del usuario verificado en req.user
        next();  // Continuar al siguiente middleware o controlador
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};
