import { Router } from "express";
import authRoutes from "./auth.routes.js";
import registerRoutes from "./register.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import adminRoutes from "./admin.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/register", registerRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/admin", adminRoutes);

export default router;
