import { CheckCircle2, Download } from "lucide-react";
import InputDownload from "../components/InputDownload";
import "./Home.css";

function Home() {
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
          <h2>Últimos Downloads</h2>
          <div className="downloads-container">
            <div className="empty-downloads-icon"><Download /></div>
            <p>Seu histórico de downloads aparecerá aqui.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
