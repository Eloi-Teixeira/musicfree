import { useState } from "react";
import { useMusic } from "../contexts/MusicContext";
import { Link } from "react-router-dom";
import { formatDate, formatTitle } from "../utils/musicUtils";
import { Download, Trash } from "lucide-react";

function HistoryPage() {
  const { musicData, downloadMusic, removeMusic, loading } = useMusic();
  const [startOffset, setStartOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(10);
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
        <table>
          <tr>
            <th>Nome</th>
            <th>Id</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
          {musicData.slice(startOffset, endOffset).map((music) => (
            <tr>
              <td>{formatTitle(music.title)}</td>
              <td>
                <Link target="_blank" to={music.url}>
                  {formatTitle(music.id, 12)}
                </Link>
              </td>
              <td>{formatDate(music.created_at)}</td>
              <td className="table-btns">
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
              </td>
            </tr>
          ))}
        </table>
        {musicData.length > 10 && (
          <div className="table-control">
            <button
              disabled={startOffset === 0}
              onClick={() => {
                if (startOffset === 0) {
                  return;
                }
                setStartOffset((prev) => prev - 10);
                setEndOffset((prev) => prev - 10);
              }}
            >
              Voltar
            </button>
            <button
              disabled={endOffset > musicData.length}
              onClick={() => {
                if (endOffset > musicData.length) {
                  return;
                }
                setStartOffset((prev) => prev + 10);
                setEndOffset((prev) => prev + 10);
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
