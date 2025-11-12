import express from "express";
import * as TokenController from "../controllers/tokens_controller.js";

const router = express.Router();

router.post('/token/create', TokenController.createToken);

export default router;