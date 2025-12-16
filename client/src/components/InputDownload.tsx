import { useState } from "react";
import YoutubeIcon from "../assets/YoutubeIcon";
import getMusics from "../services/getMusics";

function InputDownload() {
  const [link, setLink] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Link da música:", link);
    const data = await getMusics(link);
    console.log("Blob recebido:", data.music);

    const url = window.URL.createObjectURL(data.music);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.metadata.data.title}.mp3`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <form className="input-download" onSubmit={handleSubmit}>
      <label htmlFor="music-link">
        <YoutubeIcon />
      </label>
      <input
        type="text"
        id="music-link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Cole o link da música"
      />
      <button type="submit">Download</button>
    </form>
  );
}

export default InputDownload;
