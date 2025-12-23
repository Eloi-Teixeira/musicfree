import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";
import { Link } from "react-router-dom";
import { formatDate, formatTitle } from "../utils/musicUtils";
import { Download, Trash } from "lucide-react";

function HistoryPage() {
  const { musicData, downloadMusic, removeMusic, loading } = useMusic();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  return (
    <div id="history-container">
      <header className="history-header">
        <div>
          <h1>Histórico de Downloads</h1>
          <p>Gerencie suas sessões salvas e músicas baixadas.</p>
        </div>
        <span>Total: {musicData.length} itens</span>
      </header>
      <main className="history-content">
        <div className="table">
          <div className="tr thead">
            <div className="td">Nome</div>
            <div className="td">Id</div>
            <div className="td">Data</div>
            <div className="td">Ações</div>
          </div>

          {musicData.slice(offset, limit).map((music) => (
            <div className="tr" key={music.id}>
              <div className="td">{formatTitle(music.title)}</div>
              <div className="td">
                <Link target="_blank" to={music.url}>
                  {formatTitle(music.id, 12)}
                </Link>
              </div>
              <div className="td">{formatDate(music.created_at)}</div>
              <div className="table-btns td">
                <button
                  title="Baixar música"
                  disabled={loading}
                  onClick={async () => {
                    await downloadMusic(music);
                  }}
                >
                  <Download size={18} />
                </button>
                /
                <button
                  title="Deletar música"
                  onClick={() => {
                    removeMusic(music.id);
                  }}
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        {musicData.length > 10 && (
          <div className="table-control">
            <button
              disabled={offset === 0}
              onClick={() => {
                if (offset === 0) {
                  return;
                }
                setOffset((prev) => prev - 10);
                setLimit((prev) => prev - 10);
              }}
            >
              Voltar
            </button>
            <button
              disabled={limit > musicData.length}
              onClick={() => {
                if (limit > musicData.length) {
                  return;
                }
                setOffset((prev) => prev + 10);
                setLimit((prev) => prev + 10);
              }}
            >
              Proximo
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default HistoryPage;
