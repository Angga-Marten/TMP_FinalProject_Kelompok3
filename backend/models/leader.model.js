import { pool } from "../config/db.js";

export const createLeader = async (leaderData) => {
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
    idCardPath,
  } = leaderData;

  const [result] = await pool.query(
    `INSERT INTO user_leaders (id_group, full_name, email, whatsapp_number, line_id, github_gitlab_id, birth_place, birth_date, cv_path, flazz_card_path, id_card_path)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      idGroup,
      fullName,
      email,
      whatsappNumber,
      lineId,
      githubId || null,
      birthPlace,
      birthDate,
      cvPath,
      flazzPath || null,
      idCardPath || null,
    ]
  );
  return result.insertId;
};

export const findLeaderByGroupId = async (idGroup) => {
  const [rows] = await pool.query(
    `SELECT * FROM user_leaders WHERE id_group = ?`,
    [idGroup]
  );
  return rows.length ? rows[0] : null;
};

export const findLeaderByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT id_leader FROM user_leaders WHERE email = ?`, [email]);
  return rows.length ? rows[0] : null;
};

export const findLeaderByWhatsapp = async (whatsappNumber) => {
  const [rows] = await pool.query(
    `SELECT id_leader FROM user_leaders WHERE whatsapp_number = ?`,
    [whatsappNumber]
  );
  return rows.length ? rows[0] : null;
};

export const findLeaderByLineId = async (lineId) => {
  const [rows] = await pool.query(`SELECT id_leader FROM user_leaders WHERE line_id = ?`, [lineId]);
  return rows.length ? rows[0] : null;
};

export const updateLeader = async (idLeader, data) => {
  const allowed = [
    "full_name",
    "email",
    "whatsapp_number",
    "line_id",
    "github_gitlab_id",
    "birth_place",
    "birth_date",
  ];
  const fields = [];
  const values = [];
  for (const key of allowed) {
    if (data[key] !== undefined) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
  }
  if (fields.length === 0) return null;
  values.push(idLeader);
  await pool.query(`UPDATE user_leaders SET ${fields.join(", ")} WHERE id_leader = ?`, values);
  const [rows] = await pool.query(`SELECT * FROM user_leaders WHERE id_leader = ?`, [idLeader]);
  return rows[0] || null;
};
