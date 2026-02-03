import { getAllGroups, findGroupById, updateGroup, deleteGroup } from "../models/group.model.js";
import { findLeaderByGroupId, updateLeader } from "../models/leader.model.js";

function formatTeamRow(row) {
  if (!row) return null;
  return {
    id: row.id_group,
    teamName: row.group_name,
    teamSize: 1,
    participantType: row.is_binusian ? "binusian" : "non-binusian",
    registrationDate: row.created_at,
    leader: row.id_leader
      ? {
        id: row.id_leader,
        fullName: row.full_name,
        email: row.email,
        whatsappNumber: row.whatsapp_number,
        lineId: row.line_id,
        githubId: row.github_gitlab_id,
        birthPlace: row.birth_place,
        birthDate: row.birth_date,
        cvPath: row.cv_path,
        flazzCardPath: row.flazz_card_path,
        idCardPath: row.id_card_path,
      }
      : null,
  };
}

export const getTeams = async (req, res) => {
  try {
    const { search, sortBy } = req.query;
    const options = {};
    if (search) options.search = search;
    if (sortBy) options.sortBy = sortBy;

    const rows = await getAllGroups(options);

    const teamMap = new Map();
    for (const row of rows) {
      if (!row.id_group) continue;
      if (!teamMap.has(row.id_group)) {
        teamMap.set(row.id_group, formatTeamRow(row));
      }
    }
    const teams = Array.from(teamMap.values()).filter((t) => t !== null);

    return res.status(200).json({ teams });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const rows = await getAllGroups({});
    const row = rows.find((r) => r.id_group === id);
    if (!row) {
      return res.status(404).json({ message: "Team not found." });
    }
    const team = formatTeamRow(row);
    return res.status(200).json(team);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body;

    const group = await findGroupById(id);
    if (!group) {
      return res.status(404).json({ message: "Team not found." });
    }

    if (body.group_name != null) {
      await updateGroup(id, { group_name: body.group_name });
    }
    if (body.is_binusian != null) {
      await updateGroup(id, { is_binusian: !!body.is_binusian });
    }

    const leader = await findLeaderByGroupId(id);
    if (leader && body.leader) {
      const l = body.leader;
      await updateLeader(leader.id_leader, {
        full_name: l.fullName,
        email: l.email,
        whatsapp_number: l.whatsappNumber,
        line_id: l.lineId,
        github_gitlab_id: l.githubId,
        birth_place: l.birthPlace,
        birth_date: l.birthDate,
      });
    }

    const rows = await getAllGroups({});
    const row = rows.find((r) => r.id_group === id);
    return res.status(200).json(formatTeamRow(row));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deleted = await deleteGroup(id);
    if (!deleted) {
      return res.status(404).json({ message: "Team not found." });
    }
    return res.status(200).json({ message: "Team deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
