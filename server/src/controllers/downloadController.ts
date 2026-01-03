import { Request, Response } from "express";
import { spawn } from "child_process";
import { getMetadata } from "../utils/utils";

const YTDLP_BIN = "yt-dlp";

async function downloadAudio(req: Request, res: Response) {
  try {
    const videoURL = req.query.url as string;
    const metadata = await getMetadata(videoURL);
    console.log("URL recebida para download:", videoURL);

    if (!metadata) {
      res.status(400).json({ error: "URL do YouTube inválida ou ausente." });
      return;
    }

    const filename = `${"audio_yt_dlp"}.mp3`;
    const args = [
      videoURL,
      "-f",
      "bestaudio",
      "-x",
      "--audio-format",
      "mp3",
      "-o",
      "-",
      "--force-overwrites",
      "--quiet",
    ];

    res.header("Content-Disposition", `attachment; filename ="${filename}"`);
    res.header("Content-type", "audio/mpeg");
    const ytdlp = spawn(YTDLP_BIN, args);

    ytdlp.stdout.pipe(res);

    ytdlp.stderr.on("data", (data) => {
      console.error(`yt-dlp stderr: ${data}`);
    });

    ytdlp.on("close", (code) => {
      if (code !== 0) {
        console.error(`yt-dlp process exited with code ${code}`);
        if (!res.headersSent) {
          res.status(500).send("Erro ao processar o áudio.");
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao processar o download" });
  }
}

async function getVideoInfo(req: Request, res: Response) {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).json({ error: "URL do YouTube inválida ou ausente." });
    return;
  }
  try {
    const metadata = await getMetadata(url);
    if (!metadata) {
      res.status(500).json({ error: "Não foi possível obter os metadados." });
      return;
    }
    res.status(200).json({ data: metadata });
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter metadados do vídeo." });
  }
}

export { downloadAudio, getVideoInfo };
