import { CheckCircle2, Download, History } from "lucide-react";
import InputDownload from "../components/InputDownload";
import VideoCard from "../components/MusicCard";
import { useEffect, useState } from "react";
import type { VideoMetadata } from "../types";

function HomePage() {
  const [musicData, setMusicData] = useState<VideoMetadata[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const loadLocalData = () => {
      try {
        const stored = localStorage.getItem("downloadedMusics");
        if (stored) {
          const parsed = JSON.parse(stored);
          setMusicData(Array.isArray(parsed) ? parsed : []);
        }
      } catch (error) {
        console.error("Erro ao carregar downloads:", error);
        setMusicData([]);
      }
    };

    loadLocalData();

    // Ouvir mudanças no localStorage (sincronizar entre abas)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "downloadedMusics" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setMusicData(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error("Erro ao processar mudança de localStorage:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Ouvir evento customizado (atualizar na mesma aba)
  useEffect(() => {
    const handleMusicAdded = () => {
      const stored = localStorage.getItem("downloadedMusics");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setMusicData(Array.isArray(parsed) ? parsed : []);
        } catch (error) {
          console.error("Erro ao carregar downloads:", error);
        }
      }
    };

    window.addEventListener("musicAdded", handleMusicAdded);
    return () => window.removeEventListener("musicAdded", handleMusicAdded);
  }, []);

  const features = [
    "DOWNLOADS GRÁTIS",
    "SEM ANÚNCIOS",
    "ALTA QUALIDADE",
    "ILIMITADO",
  ];
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MusicsFree</h1>
        <div className="features">
          {features.map((feature, index) => (
            <span key={index} className="feature-item">
              <CheckCircle2 size={14} />
              {feature}
            </span>
          ))}
        </div>
      </header>

      <main className="home-content">
        <section className="input-section max-width-container">
          <InputDownload />
        </section>

        <section className="downloads-section max-width-container">
          <header>
            <div>
              <History size={20} />
            </div>
            <h2>Últimos Downloads</h2>
          </header>
          <div className="downloads-container">
            {musicData && musicData?.length === 0 ? (
              <div className="empty-downloads">
                <div className="empty-downloads-icon">
                  <Download />
                </div>
                <p>Seu histórico de downloads aparecerá aqui.</p>
              </div>
            ) : (
              musicData.map((video, i) => (
                <VideoCard key={"Music" + i} music={video} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
