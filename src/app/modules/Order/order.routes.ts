import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.post('/orders', orderControllers.orderBicycle);
router.get('/orders/revenue', orderControllers.calculateTotalRevenue);

export const OrderRoutes = router;

