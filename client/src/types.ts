// Video types
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
}

// API Response types
export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
}

// Get Musics API Response types
export interface GetMusicsResponse {
  music: Blob;
  metadata: {
    data: VideoMetadata;
  };
}

// API Error Response types
export interface APIErrorResponse {
  error: string;
}

// Component Props types
export interface VideoCardProps {
  video: Video;
}

// Menu item types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Download history types
export interface DownloadedVideo extends Video {
  downloadedAt: Date;
  filePath?: string;
}

// Local storage types
export interface StorageData {
  downloadedVideos: DownloadedVideo[];
}
