import express from "express";
import { downloadAudio, getVideoInfo } from "../controllers/downloadController";
import { metadataMiddleware } from "../middlewares/metadataMiddleware";

const router = express.Router();

// Rota de Download
router.get("/download", metadataMiddleware, downloadAudio);
router.get("/metadata", getVideoInfo);

export default router;
