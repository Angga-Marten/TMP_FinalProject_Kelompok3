import { pool } from "../config/database.js";

const createLeader = async (leaderData) => {
        const {
        idGroup,
        fullName,
        email,
        whatsappNumber,
        lineId,
        githubId,
        birthPlace,
        birthDate,
        cvPath,
        flazzPath,
        idCardPath
    } = leaderData;

     const [result] = await pool.query(
        `INSERT INTO user_leaders
        (id_group, full_name, email, whatsapp_number, line_id, github_gitlab_id,
         birth_place, birth_date, cv_path, flazz_card_path, id_card_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            idGroup,
            fullName,
            email,
            whatsappNumber,
            lineId,
            githubId,
            birthPlace,
            birthDate,
            cvPath,
            flazzPath,
            idCardPath
        ]
    );

    return result.insertId;
};

const findLeaderEmail = async (email) => {
    const [rows] = await pool.query(`SELECT id_leader FROM user_leaders WHERE email = ?`,
        [email]);
    
    return rows.length ? rows[0] : null;
};

const findLeaderWhatsapp = async (whatsappNumber) => {
    const [rows] = await pool.query(
        `SELECT id_leader FROM user_leaders WHERE whatsapp_number = ?`,
        [whatsappNumber]
    );
    return rows.length ? rows[0] : null;
};

const findLeaderLineId = async (lineId) => {
    const [rows] = await pool.query(`SELECT id_leader FROM user_leaders WHERE line_id = ?`,
        [lineId]);
    
    return rows.length ? rows[0] : null;
};

export { 
    createLeader,
    findLeaderEmail,
    findLeaderWhatsapp,
    findLeaderLineId
};