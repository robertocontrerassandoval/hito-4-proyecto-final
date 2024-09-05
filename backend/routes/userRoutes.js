import { controller } from "../controllers/userController.js";
import express from "express";

const router = express.Router();  //aqui es donde se conecta

router.get('/', controller.home);

router.get('*', controller.notFound);
export default router