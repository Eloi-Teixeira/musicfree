import { CircleUserIcon, Download, Music } from "lucide-react";
import { formatDuration, formatTitle } from "../utils/musicUtils";
import { useMusic } from "../contexts/MusicContext";

export function MusicDiplay() {
  const { loading, downloadMusic, setSelectedMusic, selectedMusic } =
    useMusic();
  return (
    <section className="music-display">
      <figure>
        <img
          src={selectedMusic?.thumbnailUrl}
          alt={`Thumbnail de ${selectedMusic?.title}`}
        />
        <span className="duration">
          {formatDuration(selectedMusic?.duration ?? 0)}
        </span>
      </figure>
      <div className="music-details">
        <h3>{formatTitle(selectedMusic?.title ?? "")}</h3>
        <p>
          <CircleUserIcon size={14} /> {selectedMusic?.artist}
        </p>
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
            {loading ? "Baixando ..." : "Baixar a Música"}
          </button>
          <button
            onClick={() => {
              if (loading) {
                alert(
                  "Existe um dowload em carregamento, sair agora NÂO irá cancelá-lo."
                );
              }
              setSelectedMusic(null);
            }}
            className="back-btn"
          >
            Voltar
          </button>
        </div>
      </div>
    </section>
  );
}
