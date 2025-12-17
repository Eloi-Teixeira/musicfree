import { useState } from "react";
import type { VideoMetadata } from "../types";
import { useSubmitMessage } from "./SubmitMessage";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface GetMetadataResponse {
  data: VideoMetadata;
}

export default function useMusicManager() {
  const [loading, setLoading] = useState(false);
  const [musicData, setMusicData] = useState<VideoMetadata[]>([]);

  const { Feedback, showError, showSuccess } = useSubmitMessage({
    successMessage: "Música baixada com sucesso!",
    errorMessage: "Erro ao baixar a música. Tente novamente mais tarde.",
  });

  function saveLocalStorage(value: VideoMetadata[]) {
    try {
      const prevValue = localStorage.getItem("downloadedMusics");
      if (prevValue) {
        const newValue = JSON.parse(prevValue) as [];
        value = value.concat(newValue)
      }
      localStorage.setItem("downloadedMusics", JSON.stringify(value));
      // Dispara evento customizado para atualizar HomePage na mesma aba
      window.dispatchEvent(new CustomEvent("musicAdded"));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  }

  async function getMusicInfo(videoURL: string) {
    setLoading(true);
    try {
      const response = await fetch(apiUrl + `/metadata?url=${videoURL}`);
      if (!response.ok) {
        console.error("Erro ao buscar os metadados:");
        throw new Error();
      }
      const { data } = (await response.json()) as GetMetadataResponse;
      setMusicData((prevData) => {
        const newData = [...prevData, data];
        saveLocalStorage(newData);
        return newData;
      });
      showSuccess();
      return data;
    } catch (err) {
      showError("Erro ao buscar a música");
    } finally {
      setLoading(false);
    }
  }

  async function downloadMusic(videoURL: string) {
    setLoading(true);
    try {
      const response = await fetch(apiUrl + `/download?url=${videoURL}`);
      if (!response.ok) {
        console.error("Erro ao baixar a música:");
        throw new Error();
      }
      showSuccess();
      const blob = await response.blob();
      return blob;
    } catch (err) {
      showError();
      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    musicData,
    setMusicData,
    getMusicInfo,
    downloadMusic,
    Feedback,
  };
}
