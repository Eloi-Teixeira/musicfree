import express, { Request, Response } from 'express';
import cors from 'cors';
import app from './app';

const PORT = 4000;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server rodando em http://localhost:${PORT}`);
});