import { config } from 'dotenv';
config();

// Validar creación de usuario
export const validateUserCreation = (req, res, next) => {
    const { name, email, password, date_birth } = req.body;

    if (!name || !email || !password || !date_birth) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    next();
};

// Validar login
export const validateLogin = (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'El email es obligatorio' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Email no válido' });
    }

    next();
};

// Middleware para verificar el token JWT
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;  // Guardar los datos del usuario verificado en req.user
        next();  // Continuar al siguiente middleware o controlador
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};
