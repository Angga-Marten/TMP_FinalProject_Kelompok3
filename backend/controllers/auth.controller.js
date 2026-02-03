import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

export const login = async (req, res) => {
  try {
    const { groupName, password } = req.body;

    if (!groupName || !password) {
      return res.status(400).json({ message: "Group name and password are required." });
    }

    const [adminRows] = await pool.query(
      `SELECT id_admin, username, password FROM admins WHERE username = ?`,
      [groupName]
    );

    if (adminRows.length > 0) {
      const admin = adminRows[0];
      const valid = await bcrypt.compare(password, admin.password);
      if (valid) {
        const token = jwt.sign(
          { id: admin.id_admin, role: "admin" },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        );
        return res.status(200).json({ message: "Login successful.", token, role: "admin" });
      }
    }

    const [rows] = await pool.query(
      `SELECT id_group, group_name, password_hash FROM user_groups WHERE group_name = ?`,
      [groupName]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "Invalid group name or password." });
    }

    const group = rows[0];
    const valid = await bcrypt.compare(password, group.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid group name or password." });
    }

    const token = jwt.sign(
      { id: group.id_group, role: "participant" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ message: "Login successful.", token, role: "participant" });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  return res.status(200).json({ message: "Logout successful." });
};
