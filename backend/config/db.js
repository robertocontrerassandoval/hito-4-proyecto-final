import pg from "pg";
import 'dotenv/config';
const {Pool} = pg; //este Pool es de pg


const {DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE  } = process.env;

const config = {
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_DATABASE,
    allowExitOnIdle: true
};

try {
    await pool.query('SELECT NOW()');
    console.log('🚨🚨 Base de datos conectada 🚨🚨');
} catch (error) {
    
}

const pool = new Pool(config)  //este pool es el que conecta con la base de datos

export default pool