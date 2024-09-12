import express from 'express';
import { productController } from '../controllers/productController.js';
import { validateProductData, validateProductId } from '../middlewares/productMiddleware.js';  // Corrige la ruta de los middlewares
import { verifyToken } from '../middlewares/userMiddleware.js';  // Middleware para verificar el token

const router = express.Router();

// Las rutas de productos
router.get('/productos', productController.getProducts);  // Obtener todos los productos

router.get('/producto/:id', validateProductId, productController.getProductById);  // Obtener producto por ID

router.post('/agregar-producto', verifyToken, validateProductData, productController.createProduct);  // Crear producto (requiere token y validación)

router.put('/actualizar-producto/:id', verifyToken, validateProductId, validateProductData, productController.updateProduct);  // Actualizar producto por ID

router.delete('/eliminar-producto/:id', verifyToken, validateProductId, productController.deleteProduct);  // Eliminar producto por ID (requiere token)

export default router;

