import { Download, Music } from "lucide-react";
import type { VideoMetadata } from "../types";
import { useMusic } from "../contexts/MusicContext";
import { formatDuration, formatTitle } from "../utils/musicUtils";

function VideoCard({ music }: { music: VideoMetadata }) {
  const { downloadMusic, loading } = useMusic();
  
  return (
    <div className="music-card">
      <div className="music-thumbnail">
        <img src={music.thumbnailUrl} alt={music.title} />
      </div>
      <div className="music-info">
        <h3 className="music-title">{formatTitle(music.title)}</h3>
        <div className="music-duration">
          <Music className="music-icon" />
          <p>{formatDuration(music.duration) ?? "00:00"}</p>
        </div>
      </div>
      <button
        className="download-button"
        onClick={async (e) => {
          e.preventDefault();
          await downloadMusic(music);
        }}
        disabled={loading}
      >
        <Download />
      </button>
    </div>
  );
}

export default VideoCard;
