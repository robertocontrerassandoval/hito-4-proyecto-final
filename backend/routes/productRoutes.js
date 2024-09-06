import express from 'express';
import { productController } from '../controllers/productController.js';
import { verifyToken } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/products', productController.getProducts);

router.get('/products/:id', productController.getProductById);

router.post('/products', verifyToken, productController.createProduct);  // Ruta protegida

router.put('/products/:id', verifyToken, productController.updateProduct);  // Ruta protegida

router.delete('/products/:id', verifyToken, productController.deleteProduct);  // Ruta protegida

export default router;
