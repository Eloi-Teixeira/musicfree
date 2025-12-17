import { useState } from "react";
import YoutubeIcon from "../assets/YoutubeIcon";
import useMusicManager from "../hook/useMusicManager";
import type { VideoMetadata } from "../types";
import { useSubmitMessage } from "../hook/SubmitMessage";

const YOUTUBE_REGEX = /^(?:https?:\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})(?:.+)?$/;

function InputDownload() {

  const [link, setLink] = useState("");
  const [selectedMusic, setSelectedMusic] = useState<VideoMetadata | undefined>(
    undefined
  );
  const { getMusicInfo, downloadMusic, loading, Feedback } = useMusicManager();
  const { Feedback: validationFeedback, showError } = useSubmitMessage({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanLink = link.trim();

    if (!cleanLink || !YOUTUBE_REGEX.test(cleanLink)) {
      showError("Adicione um link do YouTube válido!");
      return;
    }

    console.log("Link da música:", link);
    try {
      const metadata = await getMusicInfo(link);
      if (metadata) {
        setSelectedMusic(metadata);
        setLink("");
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
                const data = await downloadMusic(link);
                if (data) {
                  const url = window.URL.createObjectURL(data);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${selectedMusic.title}.mp3`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                }
              }
            }}
            disabled={loading}
          >
            Baixar {loading ? "..." : "Música"}
          </button>
          <button onClick={() => {
            setSelectedMusic(undefined)
          }}>
            Voltar
          </button>
        </>
      )}
      {Feedback}
      {validationFeedback}
    </>
  );
}

export default InputDownload;
