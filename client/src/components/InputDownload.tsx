import YoutubeIcon from "../assets/YoutubeIcon";

function InputDownload() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Lógica para lidar com o download da música
  };

  return (
    <form
      className="input-download"
      onSubmit={handleSubmit}
    >
      <label htmlFor="music-link">
        <YoutubeIcon />
      </label>
      <input type="text" id="music-link" placeholder="Cole o link da música" />
      <button type="submit">Download</button>
    </form>
  );
}

export default InputDownload;
