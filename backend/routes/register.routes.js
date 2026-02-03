import { Router } from "express";
import { registerGroup } from "../controllers/group.controller.js";
import { registerLeader } from "../controllers/leader.controller.js";
import upload from "../config/multer.js";

const router = Router();

router.post("/group", registerGroup);
router.post(
  "/leader",
  upload.fields([
    { name: "cvFile", maxCount: 1 },
    { name: "flazzFile", maxCount: 1 },
    { name: "idCardFile", maxCount: 1 },
  ]),
  registerLeader
);

export default router;
