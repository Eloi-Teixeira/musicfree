import express from 'express';
import cors from 'cors';
import downloadRoute from './routes/downloadRoute';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', downloadRoute);

export default app;