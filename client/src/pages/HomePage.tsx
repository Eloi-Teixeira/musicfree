import { CheckCircle2, Download, History } from "lucide-react";
import InputDownload from "../components/InputDownload";
import MusicCard from "../components/MusicCard";
import { useMusic } from "../contexts/MusicContext";
import { MusicDiplay } from "../components/MusicDisplay";

function HomePage() {
  const { musicData, selectedMusic } = useMusic();

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
          {selectedMusic ? <MusicDiplay /> : <InputDownload />}
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
              musicData
                .sort(
                  (a, b) =>
                    new Date(a.created_at).getTime() -
                    new Date(b.created_at).getTime()
                )
                .reverse()
                .slice(0, 5)
                .map((video, i) => (
                  <MusicCard key={"Music" + i} music={video} />
                ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
