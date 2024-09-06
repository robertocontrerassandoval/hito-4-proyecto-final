import { productModel } from '../models/productModel.js';

// Controlador para obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};

// Controlador para obtener un producto por ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const { titulo, imagen, descripcion, precio, stock } = req.body;

        const newProduct = await productModel.addProduct({ titulo, imagen, descripcion, precio, stock });
        res.status(201).json({ message: 'Producto creado', product: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};

// Controlador para actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, imagen, descripcion, precio, stock } = req.body;

        const updatedProduct = await productModel.updateProduct(id, { titulo, imagen, descripcion, precio, stock });

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto actualizado', product: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};

// Controlador para eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productModel.deleteProduct(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};

export const productController = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
