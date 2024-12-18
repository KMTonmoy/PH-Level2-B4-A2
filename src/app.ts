import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';
import { BicycleRoutes } from './app/modules/BiCycle/bicycle.route';
import { OrderRoutes } from './app/modules/Order/order.routes';

const app: Application = express();


app.use(express.json());
app.use(cors());


app.use('/api', BicycleRoutes);
app.use('/api', OrderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send(`Bi-Cycle Store Running Here !!!`);
});

export default app;
