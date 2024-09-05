import pool from "../config/db.js";  //conexion a la base de datos

//Agregar producto
const addProduct = async ({titulo, imagen, descripcion, precio, stock}) => {
    
    try {
        const sql = 'INSERT INTO productos (titulo, imagen, descripcion, precio, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        value = [ titulo, imagen, descripcion, precio, stock]

        const result = await pool.query(sql, value);
        if(result.rowCount > 0){
            return result.rows
        }else {
            return false
        }
    } catch (error) {
        console.log('Error', error.message)
    }
}

//Modificar producto

//consultar Productos

//Eliminar producto


// agregar, modificar, revisar y borrar cliente

export const model = {
    addProduct
}