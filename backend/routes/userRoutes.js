import express from 'express';
import { controller } from '../controllers/userController.js';
import { validateUserCreation, validateLogin, verifyToken } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/', controller.home);

router.post('/create-product', verifyToken, controller.createProduct);  // Ruta protegida por JWT

router.post('/create-user', validateUserCreation, controller.createUser);

router.post('/login', validateLogin, controller.login);

router.get('*', controller.notFound);

export default router;
