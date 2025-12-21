import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  MUSIC_KEY_STORAGE,
  MusicContextType,
  GetMetadataResponse,
  VideoMetadata,
} from "../types";
import { useSubmitMessage } from "../hook/SubmitMessage";
import {
  isValidMusicData,
  triggerFileDownload,
  validateURL,
} from "../utils/musicUtils";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const MusicContext = createContext<MusicContextType | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<VideoMetadata[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<VideoMetadata | null>(
    null
  );
  const ABORT_SIGNAL_TIME = 30_000;

  const { Feedback, showError, showSuccess } = useSubmitMessage({
    successMessage: "Operação realizada com sucesso!",
    errorMessage: "Ocorreu um erro. Tente novamente.",
  });

  useEffect(() => {
    try {
      const rawData = localStorage.getItem(MUSIC_KEY_STORAGE);
      if (rawData) {
        const parsedData = JSON.parse(rawData);
        if (isValidMusicData(parsedData)) {
          setMusicData(parsedData);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar dados locais:", e);
    }
  }, []);

  useEffect(() => {
    if (musicData.length > 0) {
      localStorage.setItem(MUSIC_KEY_STORAGE, JSON.stringify(musicData));
    }
  }, [musicData]);

  const fetchMusicService = useCallback(
    async <T,>(
      videoURL: string,
      endpoint: "metadata" | "download",
      processResponse: (res: Response) => Promise<T>
    ): Promise<T | null> => {
      if (loading) return null;
      setLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), ABORT_SIGNAL_TIME);
      const errorMessage = `Erro ao ${
        endpoint === "metadata" ? "buscar" : "baixar"
      } a música`;
      try {
        if (!validateURL(videoURL)) throw new Error("URL inválida");

        const response = await fetch(`${apiUrl}/${endpoint}?url=${videoURL}`, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(errorMessage);
        }

        const result = await processResponse(response);
        return result;
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === "AbortError") {
            showError("O servidor demorou muito para responder.");
            return null;
          } else if (err.name === "TypeError") {
            showError(errorMessage);
            return null;
          }
          showError(err.message);
        }
        return null;
      } finally {
        if (timeoutId) clearTimeout(timeoutId);
        setLoading(false);
      }
    },
    [loading, showError, ABORT_SIGNAL_TIME]
  );

  const getMusicInfo = useCallback(
    async (videoURL: string) => {
      const existing = musicData.find((m) => m.url === videoURL);
      if (existing) {
        showSuccess("Música já está na lista!");
        setSelectedMusic(existing);
        return existing;
      }

      const data = await fetchMusicService<VideoMetadata>(
        videoURL,
        "metadata",
        async (res) => {
          const json = (await res.json()) as GetMetadataResponse;
          return json.data;
        }
      );

      if (data) {
        if (!data.created_at) data.created_at = new Date();
        setMusicData((prev) => [...prev, data]);
        setSelectedMusic(data);
        showSuccess("Música encontrada!");
      }
      return data;
    },
    [musicData, fetchMusicService, showSuccess]
  );

  const downloadMusic = useCallback(
    async (music: VideoMetadata) => {
      const blob = await fetchMusicService<Blob>(
        music.url,
        "download",
        async (res) => await res.blob()
      );

      if (blob) {
        const fileName = `${music.title.replace(/[,!]/g, "")}.mp3`;
        triggerFileDownload(blob, fileName);
        showSuccess("Download iniciado!");
      }
    },
    [fetchMusicService, showSuccess]
  );

  const removeMusic = useCallback((id: string) => {
    setMusicData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <MusicContext.Provider
      value={{
        selectedMusic,
        setSelectedMusic,
        musicData,
        loading,
        getMusicInfo,
        downloadMusic,
        removeMusic,
      }}
    >
      {children}
      {Feedback}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic deve ser usado dentro de um MusicProvider");
  }
  return context;
}
