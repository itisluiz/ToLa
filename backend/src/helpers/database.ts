import dotenv from "dotenv";
import mariadb from "mariadb"

dotenv.config({path: "./src/config/database.env"});

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

function dbconnection() : Promise<mariadb.PoolConnection>
{
    return pool.getConnection();
}

export default dbconnection;
