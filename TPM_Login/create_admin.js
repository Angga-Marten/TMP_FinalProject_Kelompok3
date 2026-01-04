import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const createAdmin = async () => {
    let connection;

    try {
        // Connect to database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("Connected to database successfully!");

        // Get admin credentials from command line arguments or use defaults
        const username = process.argv[2] || "admin";
        const password = process.argv[3] || "admin123";

        // Check if admin already exists
        const [existing] = await connection.query(
            "SELECT id_admin FROM admins WHERE username = ?",
            [username]
        );

        if (existing.length > 0) {
            console.log(`❌ Admin with username "${username}" already exists!`);
            console.log("   Use a different username or delete the existing admin first.");
            process.exit(1);
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert admin
        await connection.query(
            "INSERT INTO admins (username, password) VALUES (?, ?)",
            [username, passwordHash]
        );

        console.log("✅ Admin created successfully!");
        console.log(`   Username: ${username}`);
        console.log(`   Password: ${password}`);
        console.log("\n⚠️  IMPORTANT: Change the default password after first login!");

    } catch (error) {
        console.error("❌ Error creating admin:", error.message);

        if (error.code === "ER_NO_SUCH_TABLE") {
            console.error("\n💡 Tip: Make sure you've run database_setup.sql first!");
        }

        process.exit(1);
    } finally {
        if (connection) {
            await connection.end();
        }
    }
};

// Run the script
createAdmin();

