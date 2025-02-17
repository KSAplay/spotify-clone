import { Router } from "express";
import { getAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.get("/", getAdmin);
//router.post("/song", protectRoute, requireAdmin, createSong);

export default router;
