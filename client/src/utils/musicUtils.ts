import type { VideoMetadata } from "../types";

const YOUTUBE_REGEX =
  /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})(?:.+)?$/;

export function isValidMusicData(data: any): data is VideoMetadata[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.url === "string" &&
        typeof item.artist === "string" &&
        typeof item.thumbnailUrl === "string" &&
        typeof item.releaseDate === "string" &&
        typeof item.duration === "number"
    )
  );
}

export function validateURL(url: string): boolean {
  if (typeof url !== "string") return false;
  const cleanUrl = url.trim();
  return cleanUrl.length > 0 && YOUTUBE_REGEX.test(cleanUrl);
}

export function triggerFileDownload(blob: Blob, filename: string) {
  const newUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = newUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(newUrl);
}

export function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  }
  return `${minutes}:${String(secs).padStart(2, "0")}`;
}

export function formatTitle(title: string, limit = 50) {
  return title.length > limit ? title.slice(0, limit - 3) + "..." : title;
}
