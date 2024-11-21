import express from 'express';
import { bicycleControllers } from './bicycle.controller';

const router = express.Router();

router.post('/products', bicycleControllers.createBicycle);
router.get('/products', bicycleControllers.getAllBicycles);
router.get('/products/:_id', bicycleControllers.getSingleBicycle);

router.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err.message || 'Internal Server Error',
    });
});

export const BicycleRoutes = router;
