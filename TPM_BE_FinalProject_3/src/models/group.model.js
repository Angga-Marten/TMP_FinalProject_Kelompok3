import { pool } from "../config/database.js";

const createGroup = async (groupName, passwordHash, isBinusian) => {
    
    const [result] = await pool.query(`INSERT INTO user_groups (group_name, password_hash, is_binusian)
        VALUES (?, ?, ?)`, [groupName, passwordHash, isBinusian]);
    
    return result.insertId;
};

//check dupe group names
const findGroupName = async (groupName) => {
    const [rows] = await pool.query(`SELECT id_group FROM user_groups WHERE group_name = ?`,
        [groupName]);
    
    return rows.length ? rows[0] : null;
};

export {
    createGroup,
    findGroupName
};