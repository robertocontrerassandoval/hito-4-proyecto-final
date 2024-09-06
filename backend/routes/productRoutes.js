import express from 'express';
import { productController } from '../controllers/productController.js';
import { validateProductData, validateProductId } from '../middlewares/productMiddleware.js';  // Corrige la ruta de los middlewares
import { verifyToken } from '../middlewares/userMiddleware.js';  // Middleware para verificar el token

const router = express.Router();

// Las rutas de productos
router.get('/', productController.getProducts);  // Obtener todos los productos

router.get('/:id', validateProductId, productController.getProductById);  // Obtener producto por ID

router.post('/', verifyToken, validateProductData, productController.createProduct);  // Crear producto (requiere token y validación)

router.put('/:id', verifyToken, validateProductId, validateProductData, productController.updateProduct);  // Actualizar producto por ID

router.delete('/:id', verifyToken, validateProductId, productController.deleteProduct);  // Eliminar producto por ID (requiere token)

export default router;

