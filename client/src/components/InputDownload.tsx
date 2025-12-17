import { useState } from "react";
import YoutubeIcon from "../assets/YoutubeIcon";
import type { VideoMetadata } from "../types";
import { useMusic } from "../contexts/MusicContext";

function InputDownload() {
  const [link, setLink] = useState("");
  const [selectedMusic, setSelectedMusic] = useState<VideoMetadata | undefined>(
    undefined
  );
  const { getMusicInfo, downloadMusic, loading } =
    useMusic();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Link da música:", link);
    
    try {
      const metadata = await getMusicInfo(link);
      if (metadata) {
        setSelectedMusic(metadata);
      }
    } catch (error) {
      console.error("Erro ao buscar informações da música:", error);
    }
  };

  return (
    <>
      {!selectedMusic ? (
        <form className="input-download" onSubmit={handleSubmit}>
          <label htmlFor="music-link">
            <YoutubeIcon />
          </label>
          <input
            type="text"
            id="music-link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Cole o link da música"
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            Download
          </button>
        </form>
      ) : (
        <>
          <div className="music-info">
            <img
              src={selectedMusic.thumbnailUrl}
              alt={`Thumbnail de ${selectedMusic.title}`}
            />
            <div className="music-details">
              <h3>{selectedMusic.title}</h3>
              <p>{selectedMusic.artist}</p>
            </div>
          </div>
          <button
            onClick={async () => {
              if (selectedMusic) {
                await downloadMusic(selectedMusic);
              }
            }}
            disabled={loading}
          >
            Baixar {loading ? "..." : "Música"}
          </button>
          <button
            onClick={() => {
              setLink("");
              setSelectedMusic(undefined);
            }}
          >
            Voltar
          </button>
        </>
      )}
    </>
  );
}

export default InputDownload;
