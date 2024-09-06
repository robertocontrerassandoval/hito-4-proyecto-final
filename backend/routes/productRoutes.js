import express from 'express';
import { productController } from '../controllers/productController.js';
import { validateProductData, validateProductId } from './productMiddleware.js';
import { verifyToken } from '../middlewares/userMiddleware.js';

const router = express.Router();

router.get('/products', productController.getProducts);
router.get('/products/:id', validateProductId, productController.getProductById);
router.post('/products', verifyToken, validateProductData, productController.createProduct);
router.put('/products/:id', verifyToken, validateProductId, validateProductData, productController.updateProduct);
router.delete('/products/:id', verifyToken, validateProductId, productController.deleteProduct);

export default router;

