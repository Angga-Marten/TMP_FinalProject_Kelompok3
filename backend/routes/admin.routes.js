import { Router } from "express";
import {
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authAdmin);

router.get("/teams", getTeams);
router.get("/teams/:id", getTeamById);
router.put("/teams/:id", updateTeam);
router.delete("/teams/:id", deleteTeam);

export default router;
