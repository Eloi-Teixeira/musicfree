// Video metadata types
export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
}

// Thumbnail types
export interface ThumbnailDimension {
  url: string;
  width: number;
  height: number;
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

export interface DownloadMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
}
