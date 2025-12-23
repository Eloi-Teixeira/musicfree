import express from "express";
import { downloadAudio, getVideoInfo } from "../controllers/downloadController";

const router = express.Router();

// Rota de Download
router.get("/download", downloadAudio);
router.get("/metadata", getVideoInfo);

export default router;
