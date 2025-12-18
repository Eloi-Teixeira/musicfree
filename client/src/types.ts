// API Response types
export interface VideoMetadata {
  title: string;
  artist: string;
  releaseDate: string;
  thumbnailUrl: string;
  duration: number;
  url: string;
  id: string;
  uploader_id: string | null;
  created_at: string | Date;
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
  error?: string;
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

export const MUSIC_KEY_STORAGE = "downloadedMusics";

export interface MusicContextType {
  musicData: VideoMetadata[];
  loading: boolean;
  getMusicInfo: (videoURL: string) => Promise<VideoMetadata | null>;
  downloadMusic: (music: VideoMetadata) => Promise<void>;
  removeMusic: (id: string) => void; // Adicionei um extra útil
  setSelectedMusic: React.Dispatch<React.SetStateAction<VideoMetadata | null>>;
  selectedMusic: VideoMetadata | null;
}
