import ytdl from "@distube/ytdl-core";
import { Request, Response, NextFunction } from "express";
import { URL } from "url";
import type { VideoMetadata, ThumbnailDimension, YTDLP } from "../types";

// Exemplo de como obter todos os metadados do yt-dlp
import { spawn } from "child_process";

export function getMetadataYTDLP(videoUrl: string): Promise<YTDLP | undefined> {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn("yt-dlp", [videoUrl, "--dump-json"]);
    let jsonOutput = "";

    ytdlp.stdout.on("data", (data) => {
      jsonOutput += data.toString();
    });

    ytdlp.on("close", (code) => {
      if (code === 0) {
        try {
          const metadata = JSON.parse(jsonOutput) as YTDLP;
          resolve(metadata);
        } catch (e) {
          reject(new Error("Falha ao processar JSON do yt-dlp."));
        }
      } else {
        reject(new Error(`yt-dlp falhou com código: ${code}`));
      }
    });
    ytdlp.on("error", reject);
  });
}

export function normalizeYouTubeURL(url: string) {
  try {
    return new URL(url).href;
  } catch {
    return "https://" + url;
  }
}

function selectBestThumbnail(
  thumbnails: ThumbnailDimension[]
): ThumbnailDimension | null {
  const MAX_DIMENSION = 800;

  const suitableThumbnails = thumbnails
    .filter(
      (thumb) => thumb.width <= MAX_DIMENSION && thumb.height <= MAX_DIMENSION
    )
    .sort((a, b) => b.width * b.height - a.width * a.height);

  return suitableThumbnails.length > 0 ? suitableThumbnails[0] : null;
}

export async function getMetadata(url: string) {
  if (!ytdl.validateURL(url)) {
    throw new Error("URL do YouTube inválida.");
  }
  url = normalizeYouTubeURL(url);

  try {
    const data = await getMetadataYTDLP(url);
    if (data === undefined) {
      throw new Error();
    }
    let selectedThumbnail: ThumbnailDimension | null = null;
    const thumbnails: ThumbnailDimension[] = data.thumbnails
      .filter((i) => i?.height && i?.width)
      .map((thumb) => ({
        url: thumb.url,
        width: thumb.width,
        height: thumb.height,
        resolution: thumb.resolution,
      }));
    selectedThumbnail = selectBestThumbnail(thumbnails);

    const metadata: VideoMetadata = {
      title: data.title || "Unknown Title",
      artist: data.uploader,
      releaseDate: data?.upload_date,
      thumbnailUrl: selectedThumbnail ? selectedThumbnail.url : "",
      duration: data.duration,
    };

    return metadata;
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
    throw error;
  }
}

export async function extractVideoMetadata(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let videoURL = req.query.url as string;
    if (!videoURL) {
      return res
        .status(400)
        .json({ error: "URL do YouTube inválida ou ausente." });
    }
    videoURL = normalizeYouTubeURL(videoURL);

    const metadata: VideoMetadata = await getMetadata(videoURL);
    (req as any).videoMetadata = metadata;
    next();
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
    res.status(500).json({ error: "Erro ao obter metadados do vídeo." });
  }
}
