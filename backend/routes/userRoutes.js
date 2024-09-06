import express from "express";
import { controller } from "../controllers/userController.js";
import { validateUserCreation, validateLogin } from '../middlewares/userMiddleware.js';


const router = express.Router();  //aqui es donde se conecta

router.get('/', controller.home);

router.post('/create-product', controller.createProduct);

router.post('/create-user', validateUserCreation, controller.createUser);

router.post('/login', validateLogin, controller.login);

router.get('*', controller.notFound);

export default router;