import { Router } from "express";
import * as SpotifyController from "../controllers/spotify_controller.js";

const router = Router();

router.get('spotify/refresh', SpotifyController.getRefreshToken);
export default router;