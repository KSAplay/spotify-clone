import { Router } from "express";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
import { getStats } from "../controllers/stat.controller.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getStats);

export default router;
