// Video metadata types
export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
  duration: number;
}

// Thumbnail types
export interface ThumbnailDimension {
    url: string;
    width: number;
    height: number;
    resolution: string;
}

// API Response types
export interface MetadataResponse {
  data: VideoMetadata;
}

export interface ErrorResponse {
  error: string;
}

// Download request/response types
export interface DownloadRequest {
  url: string;
}

export interface YTDLP {
  thumbnails: ThumbnailDimension[]
  thumbnail: string;
  uploader: string;
  duration: number;
  upload_date: string;
  title: string;
  description: string;
  uploader_id: string;
  id: string;
}
