export default function ErrorComponent() {
  return (
    <>
      <div className="error-container">
        <h2 className="error-title">Algo deu errado</h2>
        <p className="error-message">Ocorreu um erro inesperado. Tente novamente mais tarde.</p>

        <button
          className="error-button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Tentar novamente
        </button>
      </div>
    </>
  );
}
