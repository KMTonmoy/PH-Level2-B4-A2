import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';

const app: Application = express();


app.use(express.json());
app.use(cors());



const getAController = (req: Request, res: Response) => {
    res.send('Bi-Cycle store Running On Port' + config.port)
};

app.get('/', getAController);

export default app;
