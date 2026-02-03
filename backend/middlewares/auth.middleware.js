import jwt from "jsonwebtoken";
import { error } from "../utils/response.js";

export const authParticipant = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return error(res, "Access denied. Please login.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "participant") {
      return error(res, "Forbidden. Participant access only.", 403);
    }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return error(res, "Invalid or expired token.", 401);
  }
};

export const authAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return error(res, "Access denied. Admin login required.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return error(res, "Forbidden. Admin access only.", 403);
    }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return error(res, "Invalid or expired token.", 401);
  }
};

/** Optional: any logged-in user (participant or admin) */
export const authAny = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return error(res, "Access denied. Please login.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    return error(res, "Invalid or expired token.", 401);
  }
};
