import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import config from './app/config';
import { BicycleRoutes } from './app/modules/BiCycle/bicycle.route';
import { OrderRoutes } from './app/modules/Order/order.routes';
import { UserRoutes } from './app/User/user.route';
import { CartRoutes } from './app/modules/Cart/cart.route';
import { PaymentRoutes } from './app/modules/Payment/pay.route';
 
const app: Application = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api', UserRoutes);
app.use('/api', BicycleRoutes);
app.use('/api', OrderRoutes);
app.use('/api', CartRoutes);
app.use('/api', PaymentRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send(`Bi-Cycle Store Running Here !!!`);
});

export default app;
