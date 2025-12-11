import express, { Request, Response } from 'express';
import cors from 'cors';
import ytdl from '@distube/ytdl-core';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Rota de Download
app.get('/download', async (req: Request, res: Response): Promise<void> => {
    try {
        const videoURL = req.query.url as string;

        if (!videoURL || !ytdl.validateURL(videoURL)) {
            res.status(400).send('URL inválida');
            return;
        }

        // Obter informações do vídeo para pegar o título
        const info = await ytdl.getInfo(videoURL);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, ''); // Remove caracteres especiais

        // Configurar headers para o navegador entender que é um arquivo para baixar
        res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
        res.header('Content-Type', 'audio/mpeg');

        // Baixar apenas o áudio e enviar para o cliente (Pipe)
        ytdl(videoURL, {
            quality: 'highestaudio',
            filter: 'audioonly',
        }).pipe(res);

    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar o download');
    }
});

app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
});