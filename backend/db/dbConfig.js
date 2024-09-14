import pg from "pg";
import 'dotenv/config';

const { Pool } = pg; // Pool es de pg

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true
};

const pool = new Pool(config); // Primero inicializamos el pool

// Probar la conexión

    try {
        await pool.query('SELECT NOW()');
        console.log('🚨🚨 Base de datos conectada 🚨🚨');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }






export default pool;
