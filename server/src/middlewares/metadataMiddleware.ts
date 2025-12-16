import ytdl from "@distube/ytdl-core";
import { Request, Response, NextFunction } from "express";
import { URL } from "url";

interface ThumbnailDimension {
  url: string;
  width: number;
  height: number;
}

export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
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
    const info = await ytdl.getInfo(url);
    let selectedThumbnail: ThumbnailDimension | null = null;
    const thumbnails: ThumbnailDimension[] = info.videoDetails.thumbnails.map(
      (thumb) => ({
        url: thumb.url,
        width: thumb.width,
        height: thumb.height,
      })
    );
    selectedThumbnail = selectBestThumbnail(thumbnails);

    const metadata: VideoMetadata = {
      title: info.videoDetails.title || "Unknown Title",
      artist:
        info.videoDetails.author?.name ??
        info.videoDetails.ownerChannelName ??
        "Unknown Artist",
      releaseDate: info.videoDetails.uploadDate ?? "Unknown Date",
      thumbnailUrl: selectedThumbnail ? selectedThumbnail.url : "",
    };

    return metadata;
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
    throw error;
  }
}

export async function metadataMiddleware(
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
