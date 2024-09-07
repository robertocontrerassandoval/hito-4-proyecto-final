// userModel.js
import pool from '../db/dbConfig.js';  // Asegúrate de tener configurada la conexión a la base de datos

export const userModel = {
    addUser: async (userData) => {
        const { name, email, password, date_birth } = userData;
        const sql = 'INSERT INTO users (name, email, password, date_birth) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, password, date_birth];
        const result = await pool.query(sql, values);
        return result.rows[0];
    },
    
    getUser: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const result = await pool.query(sql, [email]);
        return result.rows[0];
    },

    addProduct: async (productData) => {
        const { titulo, imagen, descripcion, precio, stock } = productData;
        const sql = 'INSERT INTO products (titulo, imagen, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [titulo, imagen, descripcion, precio, stock];
        const result = await pool.query(sql, values);
        return result.rows[0];
    }
};
