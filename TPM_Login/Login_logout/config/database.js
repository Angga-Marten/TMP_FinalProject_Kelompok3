import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
});

const connectDB = async () => {
    try {
        await pool.query("SELECT 1");
        console.log(`MySQL connection successful, ${process.env.DB_HOST}`);
    } catch (error) {
        console.error("MySQL connection failed :<", error);
        process.exit(1);
    }
}

export { pool };
export default connectDB;
