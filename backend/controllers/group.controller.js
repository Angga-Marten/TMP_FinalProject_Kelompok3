import bcrypt from "bcrypt";
import { createGroup, findGroupByName } from "../models/group.model.js";
import { validatePassword } from "../utils/password.helper.js";

export const registerGroup = async (req, res) => {
  try {
    const { groupName, password, confirmPassword, isBinusian } = req.body;

    if (!groupName || password === undefined || confirmPassword === undefined || isBinusian === undefined) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const existing = await findGroupByName(groupName);
    if (existing) {
      return res.status(409).json({ message: "Group name already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const groupId = await createGroup(groupName, passwordHash, !!isBinusian);

    return res.status(201).json({ message: "Group registered successfully.", groupId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};
