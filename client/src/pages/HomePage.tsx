import { CheckCircle2, Download, History } from "lucide-react";
import InputDownload from "../components/InputDownload";
import "./Home.css";
import VideoCard from "../components/VideoCard";

function HomePage() {
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
            <div className="empty-downloads-icon"><Download /></div>
            <p>Seu histórico de downloads aparecerá aqui.</p>
          </div>
          <VideoCard video={{
            id: "1",
            title: "Exemplo de Música",
            thumbnail: "https://i.pinimg.com/1200x/c6/27/5a/c6275a5027de66756f22da762e6e84ec.jpg",
            duration: "3:45"
          }} />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
