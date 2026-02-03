import { Router } from "express";
import { getMe, getFile } from "../controllers/dashboard.controller.js";
import { authParticipant } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authParticipant, getMe);
router.get("/files/:type", authParticipant, getFile);

export default router;
