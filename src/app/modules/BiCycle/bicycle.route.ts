import express, { Request, Response, NextFunction } from 'express';
import { bicycleControllers } from './bicycle.controller';

const router = express.Router();


router.post('/products', bicycleControllers.createBicycle);


router.get('/products', bicycleControllers.getAllBicycles);

router.get('/products/:_id', bicycleControllers.getSingleBicycle);

router.put('/products/:_id', bicycleControllers.updateBicycle);

router.delete('/products/:_id', bicycleControllers.deleteBicycle);

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: err.message || 'Internal Server Error',
    });
});

export const BicycleRoutes = router;
