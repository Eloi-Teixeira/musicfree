import { CheckCircle2, Download, History } from "lucide-react";
import InputDownload from "../components/InputDownload";
import VideoCard from "../components/VideoCard";
import { useOutletContext } from "react-router-dom";
import type { Video } from "../types";
import { useEffect } from "react";

function HomePage() {
  const { videos } = useOutletContext<{ videos: Video[] }>();
  useEffect(() => {
    console.log("Videos loaded:", videos);
  }, [videos]);
  
  const features = [
    "DOWNLOADS GRÁTIS",
    "SEM ANÚNCIOS",
    "ALTA QUALIDADE",
    "ILIMITADO"
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
            {videos && videos?.length === 0 ? (
              <div className="empty-downloads">
                <div className="empty-downloads-icon"><Download /></div>
                <p>Seu histórico de downloads aparecerá aqui.</p>
              </div>
            ) : (
              videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
