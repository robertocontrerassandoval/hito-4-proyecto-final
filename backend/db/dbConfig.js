import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg; // Pool es de pg

// Desestructuramos las variables de entorno
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

// Configuración del pool
const config = {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true, // Permitir que el pool se cierre cuando está inactivo
    idleTimeoutMillis: 30000, // Tiempo en milisegundos antes de que una conexión inactiva sea cerrada
    connectionTimeoutMillis: 2000, // Tiempo en milisegundos antes de que una conexión sea rechazada si no se puede establecer
};

// Inicializamos el pool
const pool = new Pool(config);

// Probar la conexión
const testConnection = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('🚨🚨 Base de datos conectada 🚨🚨', res.rows[0]);
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.stack);
    }
};

testConnection();

// Exportamos el pool para que pueda ser utilizado en otras partes del proyecto
export default pool;
