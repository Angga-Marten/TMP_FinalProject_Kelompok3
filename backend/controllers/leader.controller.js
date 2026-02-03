import {
  createLeader,
  findLeaderByEmail,
  findLeaderByWhatsapp,
  findLeaderByLineId,
  findLeaderByGroupId,
} from "../models/leader.model.js";
import { findGroupById, deleteGroup } from "../models/group.model.js";

const allowedFileTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

const isAtLeast17 = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 17;
};

const cleanupGroupIfOrphaned = async (groupId) => {
  if (!groupId) return;
  // Only delete the group if it does not have a leader yet
  const existingLeader = await findLeaderByGroupId(groupId);
  if (!existingLeader) {
    await deleteGroup(groupId);
  }
};

export const registerLeader = async (req, res) => {
  try {
    const {
      groupId,
      fullName,
      email,
      whatsappNumber,
      lineId,
      githubId,
      birthPlace,
      birthDate,
      isBinusian,
    } = req.body;

    const { cvFile, flazzFile, idCardFile } = req.files || {};
    const cv = cvFile?.[0];
    const flazz = flazzFile?.[0];
    const idCard = idCardFile?.[0];

    if (!groupId) {
      return res.status(400).json({ message: "Group ID is required. Complete step 1 (Group Info) first." });
    }

    const numericGroupId = Number(groupId);
    const group = await findGroupById(numericGroupId);
    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    if (!fullName || !email || !whatsappNumber || !lineId || !birthPlace || !birthDate) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    if (!email.includes("@")) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "Invalid email format." });
    }
    if (await findLeaderByEmail(email)) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(409).json({ message: "Email already registered." });
    }

    if (String(whatsappNumber).replace(/\D/g, "").length < 9) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "WhatsApp number must be at least 9 digits." });
    }
    if (await findLeaderByWhatsapp(whatsappNumber)) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(409).json({ message: "WhatsApp number already registered." });
    }

    if (await findLeaderByLineId(lineId)) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(409).json({ message: "LINE ID already registered." });
    }

    if (!isAtLeast17(birthDate)) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "Leader must be at least 17 years old." });
    }

    if (!cv || !allowedFileTypes.includes(cv.mimetype)) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "CV file is required and must be pdf/jpg/jpeg/png." });
    }

    const isBinusianBool = isBinusian === "true" || isBinusian === true;
    if (isBinusianBool && (!flazz || !allowedFileTypes.includes(flazz.mimetype))) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "Flazz card is required for Binusian." });
    }
    if (!isBinusianBool && (!idCard || !allowedFileTypes.includes(idCard.mimetype))) {
      await cleanupGroupIfOrphaned(numericGroupId);
      return res.status(400).json({ message: "ID card is required for Non-Binusian." });
    }

    const leaderId = await createLeader({
      idGroup: numericGroupId,
      fullName,
      email,
      whatsappNumber,
      lineId,
      githubId: githubId || null,
      birthPlace,
      birthDate,
      cvPath: cv.path,
      flazzPath: flazz?.path || null,
      idCardPath: idCard?.path || null,
    });

    return res.status(201).json({ message: "Leader registered successfully.", leaderId });
  } catch (err) {
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(404).json({ message: "Group not found." });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
