import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/database.js";

const login = async (req, res) => {
    try {
        const { groupName, password } = req.body;

        if (!groupName || !password) {
            return res.status(400).json({
                message: "Group name and password are required!!"
            });
        }

        // Check admin first
        const [adminRows] = await pool.query(
            `SELECT id_admin, username, password FROM admins WHERE username = ?`,
            [groupName]
        );

        if (adminRows.length > 0) {
            const admin = adminRows[0];
            const isPasswordValid = await bcrypt.compare(password, admin.password);

            if (isPasswordValid) {
                const token = jwt.sign(
                    { id: admin.id_admin, role: 'admin' },
                    process.env.JWT_SECRET,
                    { expiresIn: '7d' }
                );

                return res.status(200).json({
                    message: "Login successful!!",
                    token,
                    role: 'admin'
                });
            }
        }

        // Check if group exists
        const [rows] = await pool.query(
            `SELECT id_group, group_name, password_hash FROM user_groups WHERE group_name = ?`,
            [groupName]
        );

        if (!rows.length) {
            return res.status(401).json({
                message: "Invalid group name or password!!"
            });
        }

        const group = rows[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, group.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid group name or password!!"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: group.id_group, role: 'participant' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            message: "Login successful!!",
            token,
            role: 'participant'
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            message: "Internal server error :<"
        });
    }
};

const logout = async (req, res) => {
    // Since we're using JWT, logout is handled client-side
    // But we provide this endpoint for consistency
    return res.status(200).json({
        message: "Logout successful!!"
    });
};

export {
    login,
    logout
};

