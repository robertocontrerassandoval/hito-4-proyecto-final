import pool from "../config/db.js";  //conexion a la base de datos

export const productModel = {
    getAllProducts: async () => {
        const query = 'SELECT * FROM products';
        const result = await pool.query(query);
        return result.rows;
    },

    getProductById: async (id) => {
        const query = 'SELECT * FROM products WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    },

    addProduct: async (productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        const query = 'INSERT INTO products (titulo, imagen, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [titulo, imagen, descripcion, precio, stock];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    updateProduct: async (id, productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        const query = `
            UPDATE products 
            SET titulo = $1, imagen = $2, descripcion = $3, precio = $4, stock = $5
            WHERE id = $6
            RETURNING *`;
        const values = [titulo, imagen, descripcion, precio, stock, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    },

    deleteProduct: async (id) => {
        const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
};
