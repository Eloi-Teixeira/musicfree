import { Download, Music } from "lucide-react";
import type { Video } from "../types";

function VideoCard({ video }: { video: Video }) {
  const videoTitle =
    video.title.length > 50 ? video.title.slice(0, 47) + "..." : video.title;

  return (
    <div className="video-card">
      <div className="video-thumbnail">
        <img src={video.thumbnail} alt={video.title} />
      </div>
      <div className="video-info">
        <h3 className="video-title">{videoTitle}</h3>
        <div className="video-duration">
          <Music className="music-icon" />
          <p>{video.duration ?? "00:00"}</p>
        </div>
      </div>
      <button className="download-button">
        <Download />
      </button>
    </div>
  );
}

export default VideoCard;
