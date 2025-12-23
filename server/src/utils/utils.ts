import { ThumbnailDimension, VideoMetadata, YTDLP } from "../types";
import { getMusicFromDB, saveMusicToDB } from "./utilsDB";
import { spawn } from "child_process";

const pendingRequests = new Map<string, Promise<VideoMetadata | null>>();

export function extractYoutubeId(url: string): string | null {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
  const match = url.match(regex);

  return match ? match[1] : null;
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

function getMetadataYTDLP(videoUrl: string): Promise<YTDLP | undefined> {
  return new Promise((resolve, reject) => {
    const ytdlp = spawn("yt-dlp", [videoUrl, "--dump-json"]);
    const chunks: Buffer[] = [];

    ytdlp.stdout.on("data", (chunk) => chunks.push(chunk));

    ytdlp.on("close", (code) => {
      if (code === 0) {
        try {
          const jsonOutput = Buffer.concat(chunks).toString("utf8");
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

function transformToMetadata(data: YTDLP, url: string): VideoMetadata {
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
    artist: data.uploader || "Unknown Artist",
    releaseDate: data?.upload_date || "Unknown Date",
    thumbnailUrl: selectedThumbnail ? selectedThumbnail.url : "",
    duration: data.duration || 0,
    id: data.id,
    uploader_id: data.uploader_id,
    url,
    created_at: new Date(),
  };
  return metadata;
}

export async function getMetadata(url: string) {
  try {
    const videoId = extractYoutubeId(url);
    if (!videoId) {
      throw new Error("Não foi possível extrair o ID do vídeo.");
    }
    const musicData = await getMusicFromDB(videoId);
    if (musicData) {
      console.log(`Metadados obtidos do banco para: ${videoId}`);
      return musicData;
    }

    const data = await getMetadataYTDLP(videoId);
    if (!data) {
      throw new Error("Falha ao obter metadados do vídeo.");
    }

    if (pendingRequests.has(videoId)) {
      console.log(`Aguardando download já iniciado para: ${videoId}`);
      return await pendingRequests.get(videoId);
    }

    const downloadPromise = (async () => {
      try {
        const data = await getMetadataYTDLP(videoId);
        if (!data) throw new Error("Falha no yt-dlp");

        const metadata = transformToMetadata(data, url);
        console.log(`Metadados obtidos do yt-dlp para: ${videoId}`);

        await saveMusicToDB(metadata);
        return metadata;
      } finally {
        pendingRequests.delete(videoId);
      }
    })();

    pendingRequests.set(videoId, downloadPromise);

    return await downloadPromise;
  } catch (error) {
    console.error("Erro ao obter metadados:", error);
    return null;
  }
}
