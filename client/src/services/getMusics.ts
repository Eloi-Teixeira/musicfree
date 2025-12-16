export default async function getMusics(videoURL: string) {
  try {
    const musicResponse = await fetch(
      `http://localhost:4000/api/download?url=${videoURL}`
    );
    const metadataResponse = await fetch(
      `http://localhost:4000/api/metadata?url=${videoURL}`
    );
    const blob = await musicResponse.blob();
    return {
      music: blob,
      metadata: await metadataResponse.json(),
    };
  } catch (error) {
    console.error("Erro ao buscar a música:", error);
    throw error;
  }
}
