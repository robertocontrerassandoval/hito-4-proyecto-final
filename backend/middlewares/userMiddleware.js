import { usersModel } from '../models/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


// userMiddleware.js
export const validateUserCreation = (req, res, next) => {
    const { name, email, password, date_birth } = req.body;

    if (!name || !email || !password || !date_birth) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Regex para validar formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    next(); // Si todo está bien, pasa al siguiente middleware o controlador
};

export const validateLogin = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    next(); // Si todo está bien, pasa al siguiente middleware o controlador
};
