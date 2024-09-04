import pg from "pg";
import 'dotenv/config';
const {Pool} = pg;


const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, } = process.env;

const config = {
    host:DB_HOST,
    port:DB_PORT,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_SATABASE,
    allowExitOnIdle: true
};

try {
    await pool.query('SELECT NOW()');
    console.log('Base de datos conectada    ');
} catch (error) {
    
}

const pool = new Pool(config)

export default pool