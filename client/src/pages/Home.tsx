import InputDownload from "../components/InputDownload";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>MusicsFree</h1>
        <div className="features">
          <div className="feature">DOWNLOADS GRÁTIS</div>
          <div className="feature">SEM ANÚNCIOS</div>
          <div className="feature">ALTA QUALIDADE</div>
          <div className="feature">ILIMITADO</div>
        </div>
      </header>

      <main className="home-content">
        <section className="input-section">
          <InputDownload />
        </section>

        <section className="downloads-section">
          <h2>Últimos Downloads</h2>
          <div className="empty-downloads">
            <div className="empty-downloads-icon">⬇️</div>
            <p>Seu histórico de downloads aparecerá aqui.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
