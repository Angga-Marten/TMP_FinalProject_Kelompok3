import { pool } from "../config/db.js";

export const createGroup = async (groupName, passwordHash, isBinusian) => {
  const [result] = await pool.query(
    `INSERT INTO user_groups (group_name, password_hash, is_binusian) VALUES (?, ?, ?)`,
    [groupName, passwordHash, isBinusian]
  );
  return result.insertId;
};

export const findGroupByName = async (groupName) => {
  const [rows] = await pool.query(
    `SELECT id_group, group_name, password_hash, is_binusian, created_at FROM user_groups WHERE group_name = ?`,
    [groupName]
  );
  return rows.length ? rows[0] : null;
};

export const findGroupById = async (idGroup) => {
  const [rows] = await pool.query(
    `SELECT id_group, group_name, is_binusian, created_at FROM user_groups WHERE id_group = ?`,
    [idGroup]
  );
  return rows.length ? rows[0] : null;
};

export const updateGroup = async (idGroup, data) => {
  const fields = [];
  const values = [];
  if (data.group_name != null) {
    fields.push("group_name = ?");
    values.push(data.group_name);
  }
  if (data.is_binusian != null) {
    fields.push("is_binusian = ?");
    values.push(data.is_binusian);
  }
  if (fields.length === 0) return null;
  values.push(idGroup);
  await pool.query(
    `UPDATE user_groups SET ${fields.join(", ")} WHERE id_group = ?`,
    values
  );
  return findGroupById(idGroup);
};

export const deleteGroup = async (idGroup) => {
  const [result] = await pool.query(`DELETE FROM user_groups WHERE id_group = ?`, [idGroup]);
  return result.affectedRows > 0;
};

export const getAllGroups = async (options = {}) => {
  let sql = `
    SELECT g.id_group, g.group_name, g.is_binusian, g.created_at,
           l.id_leader, l.full_name, l.email, l.whatsapp_number, l.line_id, l.github_gitlab_id,
           l.birth_place, l.birth_date, l.cv_path, l.flazz_card_path, l.id_card_path
    FROM user_groups g
    LEFT JOIN user_leaders l ON g.id_group = l.id_group
    WHERE 1=1
  `;
  const params = [];

  if (options.search) {
    sql += ` AND g.group_name LIKE ?`;
    params.push(`%${options.search}%`);
  }

  const orderBy =
    options.sortBy === "name_asc"
      ? "g.group_name ASC"
      : options.sortBy === "name_desc"
        ? "g.group_name DESC"
        : options.sortBy === "date_asc"
          ? "g.created_at ASC"
          : "g.created_at DESC";
  sql += ` ORDER BY ${orderBy}`;

  const [rows] = await pool.query(sql, params);
  return rows;
};
