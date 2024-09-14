import express from 'express';
import { controller } from '../controllers/userController.js';
import { validateUserCreation, validateLogin, verifyToken } from '../middlewares/userMiddleware.js';

const router = express.Router();

// Ruta principal
router.get('/', controller.home);

// Ruta para crear un nuevo producto (requiere autenticación con JWT)
router.post('/producto', verifyToken, controller.createProduct);

// Ruta para crear un nuevo usuario
router.post('/usuario', validateUserCreation, controller.createUser);

// Ruta para login de usuario
router.post('/login', validateLogin, controller.login);

// Ruta para manejar errores 404 (no encontrada)
router.use('*', controller.notFound);

export default router;

