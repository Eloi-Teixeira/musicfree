import express from "express";
import { downloadAudio, getVideoInfo } from "../controllers/downloadController";
import { extractVideoMetadata } from "../middlewares/metadataMiddleware";

const router = express.Router();

// Rota de Download
router.get("/download", extractVideoMetadata, downloadAudio);
router.get("/metadata", getVideoInfo);

export default router;
