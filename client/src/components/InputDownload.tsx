import { useEffect, useRef, useState } from "react";
import YoutubeIcon from "../assets/YoutubeIcon";
import { useMusic } from "../contexts/MusicContext";

function InputDownload() {
  const [link, setLink] = useState("");
  const [progress, setProgress] = useState(0);
  const limits = [0, 30, 60, 80, 95, 100];
  const waitTimes = [2000, 3000, 5000, 5000, 5000];
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([]);

  const { getMusicInfo, loading } = useMusic();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await getMusicInfo(link);
    } catch (error) {
      console.error("Erro ao buscar informações da música:", error);
    } finally {
      setLink("");
    }
  };

  useEffect(() => {
    timeoutIdsRef.current.forEach((id) => clearTimeout(id));
    timeoutIdsRef.current = [];

    if (!loading) {
      setProgress(0);
      return;
    }

    setProgress(0);
    let currentTime = 0;

    waitTimes.forEach((time, index) => {
      currentTime += time;
      const timeoutId = setTimeout(() => {
        setProgress(index + 1);
      }, currentTime);

      timeoutIdsRef.current.push(timeoutId);
    });
    return () => {
      timeoutIdsRef.current.forEach((id) => clearTimeout(id));
      timeoutIdsRef.current = [];
    };
  }, [loading]);

  return (
    <>
      <form className="input-download" onSubmit={handleSubmit}>
        <span
          className="progress-bar"
          style={{ width: limits[progress] + "%" }}
        ></span>
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
    </>
  );
}

export default InputDownload;
