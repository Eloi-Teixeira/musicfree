import { Download, Music } from "lucide-react";
import type { VideoMetadata } from "../types";

function VideoCard({ music }: { music: VideoMetadata }) {
  const videoTitle =
    music.title.length > 50 ? music.title.slice(0, 47) + "..." : music.title;
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor( seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    return `${minutes}:${String(secs).padStart(2, "0")}`;
  };
  
  const duration = formatDuration(music.duration);

  return (
    <div className="music-card">
      <div className="music-thumbnail">
        <img src={music.thumbnailUrl} alt={music.title} />
      </div>
      <div className="music-info">
        <h3 className="music-title">{videoTitle}</h3>
        <div className="music-duration">
          <Music className="music-icon" />
          <p>{duration ?? "00:00"}</p>
        </div>
      </div>
      <button className="download-button">
        <Download />
      </button>
    </div>
  );
}

export default VideoCard;
