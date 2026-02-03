import "dotenv/config";
import bcrypt from "bcrypt";
import mysql from "mysql2/promise";

const createAdmin = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log("Connected to database.");

    const username = process.argv[2] || "admin";
    const password = process.argv[3] || "admin123";

    const [existing] = await connection.query(
      "SELECT id_admin FROM admins WHERE username = ?",
      [username]
    );

    if (existing.length > 0) {
      console.log(`Admin "${username}" already exists.`);
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await connection.query("INSERT INTO admins (username, password) VALUES (?, ?)", [
      username,
      passwordHash,
    ]);

    console.log("Admin created successfully.");
    console.log(`  Username: ${username}`);
    console.log(`  Password: ${password}`);
  } catch (err) {
    console.error("Error creating admin:", err.message);
    if (err.code === "ER_NO_SUCH_TABLE") {
      console.error("Run database_setup.sql first.");
    }
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
};

createAdmin();
