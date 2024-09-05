import express from "express";
import { controller } from "../controllers/userController.js";


const router = express.Router();  //aqui es donde se conecta

router.get('/', controller.home);

router.post('/create-product', controller.createProduct);

router.get('*', controller.notFound);

export default router