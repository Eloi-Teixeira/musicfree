import { useState } from "react";
import YoutubeIcon from "../assets/YoutubeIcon";
import type { VideoMetadata } from "../types";
import { useMusic } from "../contexts/MusicContext";
import { formatDuration, formatTitle } from "../utils/musicUtils";
import { CircleUserIcon, Download, Music } from "lucide-react";

function InputDownload() {
  const [link, setLink] = useState("");
  const [selectedMusic, setSelectedMusic] = useState<VideoMetadata | null>(
    null
  );
  const { getMusicInfo, downloadMusic, loading } = useMusic();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          <section className="music-display">
            <figure>
              <img
                src={selectedMusic?.thumbnailUrl}
                alt={`Thumbnail de ${selectedMusic?.title}`}
              />
              <span className="duration">
                {formatDuration(selectedMusic?.duration) ?? "00:00"}
              </span>
            </figure>
            <div className="music-details">
              <h3>{formatTitle(selectedMusic?.title ?? "")}</h3>
              <p><CircleUserIcon size={14}/> {selectedMusic?.artist}</p>
              <p>
                <Music size={14} /> Qualidade de Áudio: <span>320kbps</span>
              </p>
              <div className="music-btns">
                <button
                  onClick={async () => {
                    if (selectedMusic) {
                      await downloadMusic(selectedMusic);
                    }
                  }}
                  disabled={loading}
                  className="download-btn"
                >
                  <Download size={22}></Download>
                  Baixar {loading ? "..." : "Música"}
                </button>
                <button
                  onClick={() => {
                    if (loading) {
                      alert(
                        "Existe um dowload em carregamento, sair agora NÂO irá cancelá-lo."
                      );
                    }
                    setLink("");
                    setSelectedMusic(null);
                  }}
                  className="back-btn"
                >
                  Voltar
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default InputDownload;
