// API Response types
export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
  duration: number;
  url: string;
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

export interface GetMetadataResponse {
  data: VideoMetadata;
  erroor?: string;
}

// Component Props types
export interface VideoCardProps {
  video: VideoMetadata;
}

// Menu item types
export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}
