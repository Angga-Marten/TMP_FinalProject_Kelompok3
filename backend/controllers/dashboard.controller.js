import { findGroupById } from "../models/group.model.js";
import { findLeaderByGroupId } from "../models/leader.model.js";
import path from "path";
import fs from "fs";

export const getMe = async (req, res) => {
  try {
    const groupId = req.user.id;
    const group = await findGroupById(groupId);
    if (!group) {
      return res.status(404).json({ message: "Team not found." });
    }
    const leader = await findLeaderByGroupId(groupId);
    if (!leader) {
      return res.status(404).json({ message: "Leader data not found." });
    }

    const participantType = group.is_binusian ? "Binusian" : "Non-Binusian";
    const created = group.created_at
      ? new Date(group.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      : null;

    return res.status(200).json({
      team: {
        id: group.id_group,
        name: group.group_name,
        isBinusian: !!group.is_binusian,
        participantType,
        createdAt: group.created_at,
        registrationDate: created,
      },
      leader: {
        fullName: leader.full_name,
        email: leader.email,
        whatsappNumber: leader.whatsapp_number,
        lineId: leader.line_id,
        githubId: leader.github_gitlab_id,
        birthPlace: leader.birth_place,
        birthDate: leader.birth_date,
        cvPath: leader.cv_path,
        flazzCardPath: leader.flazz_card_path,
        idCardPath: leader.id_card_path,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getFile = async (req, res) => {
  try {
    const { type } = req.params;
    const groupId = req.user.id;

    const leader = await findLeaderByGroupId(groupId);
    if (!leader) {
      return res.status(404).json({ message: "Leader not found." });
    }

    let filePath = null;
    if (type === "cv") {
      filePath = leader.cv_path;
    } else if (type === "id") {
      filePath = leader.flazz_card_path || leader.id_card_path;
    }

    const absolutePath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    if (!filePath || !fs.existsSync(absolutePath)) {
      return res.status(404).json({ message: "File not found." });
    }

    const ext = path.extname(absolutePath).toLowerCase();
    const contentType =
      ext === ".pdf"
        ? "application/pdf"
        : [".jpg", ".jpeg"].includes(ext)
          ? "image/jpeg"
          : ext === ".png"
            ? "image/png"
            : "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.sendFile(path.resolve(absolutePath));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
